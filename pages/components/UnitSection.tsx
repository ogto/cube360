"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

/* =========================
 * 유틸
 * ========================= */
const normalizeName = (name: string) => {
  const m = name.match(/^m(\d+)\.(jpg|jpeg|png|webp)$/i);
  if (m) return `${m[1]}.${m[2]}`.toLowerCase();
  return name.toLowerCase();
};

const makePhotos = (dir: string, count: number, excludes: string[] = []) => {
  const excludeSet = new Set(excludes.map(normalizeName));
  return Array.from({ length: count }, (_, i) => `${dir}/${i + 1}.jpg`).filter((src) => {
    const base = (src.split("/").pop() || "").toLowerCase();
    return !excludeSet.has(normalizeName(base));
  });
};

/* =========================
 * 타입 데이터
 * ========================= */
type Unit = {
  key: "A" | "B" | "C";
  name: string;
  rooms: number;
  py: number;
  floors: number;
  main: { src: string; label: string }[];
  photos: string[];
};

const unitA: Unit = {
  key: "A",
  name: "A TYPE",
  rooms: 18,
  py: 22,
  floors: 1,
  main: [{ src: "/images/type/m1.jpg", label: "단층" }],
  photos: makePhotos("/images/type", 70, ["m1.jpg"]),
};

const unitB: Unit = {
  key: "B",
  name: "B TYPE",
  rooms: 9,
  py: 29,
  floors: 1,
  main: [{ src: "/images/type/m2.png", label: "단층" }],
  photos: makePhotos("/images/type", 70, ["m2.png", "2.jpg"]),
};

const unitC: Unit = {
  key: "C",
  name: "C TYPE",
  rooms: 4,
  py: 50,
  floors: 2,
  main: [
    { src: "/images/type/m1.jpg", label: "1층" },
    { src: "/images/type/m4.jpg", label: "2층" },
  ],
  photos: makePhotos("/images/type", 70, ["m1.jpg", "m4.jpg"]),
};

/* =========================
 * 탭
 * ========================= */
function TypeTab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        active
          ? "px-5 py-3 rounded-full text-white bg-[#292821] border border-[#292821] shadow-sm text-xl md:text-2xl tracking-wide"
          : "px-5 py-3 rounded-full text-[#7d6847] bg-white border border-[#e7e0c9] hover:bg-[#f4efe2] transition text-xl md:text-2xl tracking-wide"
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

/* =========================
 * 본문
 * ========================= */
export default function UnitSection() {
  /* 타입 */
  const [typeKey, setTypeKey] = useState<Unit["key"]>("C");
  const unit = useMemo<Unit>(() => {
    if (typeKey === "A") return unitA;
    if (typeKey === "B") return unitB;
    return unitC;
  }, [typeKey]);

  /* 반응형 뷰 세팅 */
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const h = () => setIsMd(mq.matches);
    h();
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // 보여줄 개수(다음 이미지가 미리 보이도록 0.2 여유)
  const slidesToShow = isMd ? 4.2 : 1.2; // 4.2장/1.2장
  const step = isMd ? 4 : 1;             // 버튼/키보드 이동 단위(페이지 개념 유지)

  /* 캐러셀 요소 참조 */
  const viewportRef = useRef<HTMLDivElement | null>(null); // 가시 영역(패딩 포함)
  const trackRef = useRef<HTMLDivElement | null>(null);    // transform 적용 대상

  /* 레이아웃 수치 */
  const [itemW, setItemW] = useState(0);
  const [gap, setGap] = useState(isMd ? 24 : 16);
  const [peek, setPeek] = useState(isMd ? 32 : 20); // 양쪽 패딩(다음 이미지 살짝 보이게)

  useEffect(() => {
    setGap(isMd ? 24 : 16);
    setPeek(isMd ? 32 : 20);
  }, [isMd]);

  // viewport 크기에 맞춰 itemW 계산
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const W = el.clientWidth;
      const totalGap = (slidesToShow - 1) * gap;
      const contentW = W - 2 * peek - totalGap;
      setItemW(contentW / slidesToShow);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [slidesToShow, gap, peek]);

  /* 슬라이드 데이터 & 클론 */
  const photos = unit.photos;
  const totalReal = photos.length;

  // 무한 루프를 위한 클론 수(현재 보이는 수만큼 + 여유)
  const CLONE = Math.ceil(slidesToShow) + 1;
  const head = photos.slice(totalReal - CLONE).concat(); // 앞에 붙일 꼬리
  const tail = photos.slice(0, CLONE).concat();          // 뒤에 붙일 머리
  const slides = head.concat(photos, tail);
  const headLen = head.length;

  /* 인덱스/이동 상태 */
  const [index, setIndex] = useState(headLen); // 가상 인덱스(클론 포함)
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);
  const baseXRef = useRef(0);     // 드래그 시작 시 transformX 기준값
  const [tx, setTx] = useState(0); // 현재 transformX(px)
  const [transitionOn, setTransitionOn] = useState(false);

  // 인덱스 → transform 계산
  const itemStep = itemW + gap;
  const indexToTx = (i: number) => {
    const offset = peek; // 왼쪽 패딩만큼 우측으로 시작
    return -(i * itemStep) + offset;
  };

  // index/레이아웃 변할 때 위치 갱신
  useEffect(() => {
    // 드래그 중에는 강제 갱신 X
    if (dragging) return;
    setTx(indexToTx(index));
  }, [index, itemW, gap, peek]); // eslint-disable-line

  // 타입 바뀌면 초기화
  useEffect(() => {
    setIndex(headLen);
    setDragging(false);
    setTransitionOn(false);
    // 위치 즉시 재계산
    setTx(indexToTx(headLen));
  }, [typeKey]); // eslint-disable-line

  /* 무한 루프: 트랜지션 끝나면 클론 경계 처리 */
  const handleTransitionEnd = () => {
    setTransitionOn(false);
    if (index < headLen) {
      const i = index + totalReal;
      setIndex(i);
      setTransitionOn(false);
      setTx(indexToTx(i));
    } else if (index >= headLen + totalReal) {
      const i = index - totalReal;
      setIndex(i);
      setTransitionOn(false);
      setTx(indexToTx(i));
    }
  };

  /* 내비게이션 */
  const goTo = (i: number) => {
    setTransitionOn(true);
    setIndex(i);
    setTx(indexToTx(i));
  };
  const next = (n = step) => goTo(index + n);
  const prev = (n = step) => goTo(index - n);

  /* 휠/키보드 */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!horizontal) return;
      e.preventDefault();
      if (e.deltaX > 0) next();
      else if (e.deltaX < 0) prev();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [step, index, itemW]); // eslint-disable-line

  // 모달 열려있을 땐 키보드 비활성
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal, step, index, itemW]); // eslint-disable-line

  /* 드래그/스와이프 */
  const onPointerDown = (clientX: number) => {
    setDragging(true);
    setTransitionOn(false);
    startXRef.current = clientX;
    baseXRef.current = tx;
  };
  const onPointerMove = (clientX: number) => {
    if (!dragging) return;
    const dx = clientX - startXRef.current;
    setTx(baseXRef.current + dx);
  };
  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    // 현재 위치 기준 가장 가까운 인덱스로 스냅(자연스러운 “넘어감”)
    const raw = (peek - tx) / itemStep; // 현재 가상 인덱스(실수)
    let target = Math.round(raw);
    // 버튼/페이지 개념 유지: md는 4칸 단위로 스냅
    if (isMd) {
      const mod = target % step;
      // 현재 페이지 경계에서 더 가까운 쪽으로
      if (Math.abs(mod) >= step / 2) target += step - mod;
      else target -= mod;
    }
    goTo(target);
  };

  // 포인터 이벤트
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let down = false;
    const downHandler = (e: PointerEvent) => {
      down = true;
      (e.target as Element).setPointerCapture?.((e as any).pointerId);
      onPointerDown(e.clientX);
    };
    const moveHandler = (e: PointerEvent) => {
      if (!down) return;
      onPointerMove(e.clientX);
    };
    const upHandler = () => {
      if (!down) return;
      down = false;
      onPointerUp();
    };

    track.addEventListener("pointerdown", downHandler);
    window.addEventListener("pointermove", moveHandler);
    window.addEventListener("pointerup", upHandler);
    return () => {
      track.removeEventListener("pointerdown", downHandler);
      window.removeEventListener("pointermove", moveHandler);
      window.removeEventListener("pointerup", upHandler);
    };
  }, [dragging, tx, itemStep, isMd]); // eslint-disable-line

  // iOS 대응 터치 이벤트(포인터 미지원 케이스)
  const touchStart = (e: React.TouchEvent) => onPointerDown(e.touches[0].clientX);
  const touchMove = (e: React.TouchEvent) => onPointerMove(e.touches[0].clientX);
  const touchEnd = () => onPointerUp();

  /* 현재 뷰에 보이는 슬라이드 묶음 (인덱스가 클론 포함이므로 실제 렌더는 전체) */
  const allSlides = slides;

  /* 모달(간결: 스와이프 좌우 + 루프) */
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const openModal = (realIdx: number) => {
    const startAt = headLen + realIdx;
    setModalIndex(realIdx);
    setShowModal(true);
    setIndex(startAt); // 모달 열어도 트랙 위치 동일성 유지
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
    document.body.style.overflow = "";
  };
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  // 모달 내 스와이프는 간결 구현(컨테이너 폭 커밋)
  const modalWrapRef = useRef<HTMLDivElement | null>(null);
  const [mDragging, setMDragging] = useState(false);
  const [mTx, setMTx] = useState(0);
  const [mTransition, setMTransition] = useState(false);
  const mStartRef = useRef(0);
  const MODAL_THRESHOLD = 80;

  const mDown = (x: number) => {
    setMDragging(true);
    setMTransition(false);
    mStartRef.current = x;
  };
  const mMove = (x: number) => {
    if (!mDragging) return;
    setMTx(x - mStartRef.current);
  };
  const mUp = () => {
    if (!mDragging) return;
    setMDragging(false);
    const dx = mTx;
    const W = modalWrapRef.current?.clientWidth || 0;
    if (dx <= -MODAL_THRESHOLD) {
      setMTransition(true);
      setMTx(-W);
      setTimeout(() => {
        setMTransition(false);
        setMTx(0);
        // 다음
        setModalIndex((p) => {
          const n = (p ?? 0) + 1;
          return n >= totalReal ? 0 : n;
        });
      }, 220);
    } else if (dx >= MODAL_THRESHOLD) {
      setMTransition(true);
      setMTx(W);
      setTimeout(() => {
        setMTransition(false);
        setMTx(0);
        // 이전
        setModalIndex((p) => {
          const n = (p ?? 0) - 1;
          return n < 0 ? totalReal - 1 : n;
        });
      }, 220);
    } else {
      setMTransition(true);
      setMTx(0);
      setTimeout(() => setMTransition(false), 200);
    }
  };

  /* 렌더 */
  return (
    <section id="unit" className="w-full bg-[#fefcf7] py-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* 타이틀 + 탭 */}
        <div className="text-center mb-6">
          <div
            className="text-[2.3rem] md:text-[2.8rem] tracking-wider text-[#a98d33] font-normal"
            style={{ fontFamily: "Nanum Myeongjo, serif" }}
          >
            TYPE
          </div>
          <div className="text-xl md:text-2xl text-[#58594e] mt-1 mb-5 font-light">객실타입</div>

          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <TypeTab active={typeKey === "A"} label="A TYPE" onClick={() => setTypeKey("A")} />
            <TypeTab active={typeKey === "B"} label="B TYPE" onClick={() => setTypeKey("B")} />
            <TypeTab active={typeKey === "C"} label="C TYPE" onClick={() => setTypeKey("C")} />
          </div>
        </div>

        {/* 중앙 정보 */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20">
          {/* 좌측 테이블 */}
          <div className="w-full max-w-xs">
            <div className="text-[2rem] md:text-[2.5rem] font-extrabold mb-5 text-[#292821]">
              <span className="font-light">{unit.key}</span>
              <span className="text-lg font-normal ml-1" style={{ fontFamily: "Nanum Myeongjo, serif" }}>
                type
              </span>
            </div>
            <table className="w-full text-base md:text-lg border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">객실수</td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">{unit.rooms} 호</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">평형</td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">{unit.py} py</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 font-normal">층수</td>
                  <td className="py-2 pl-3 text-[#36353b]">{unit.floors}층</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 우측 메인 이미지 */}
          <div className="w-full flex-1 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-[920px] place-items-center">
              {unit.main.map((m, idx) => (
                <div key={idx} className="w-[320px] md:w-[420px] flex flex-col items-center">
                  <Image
                    src={m.src}
                    alt={`${unit.name} ${m.label}`}
                    width={420}
                    height={312}
                    className="w-full h-auto rounded-2xl shadow-md"
                    style={{ background: "#f6f3ee" }}
                    priority={idx === 0}
                  />
                  <div className="mt-2 text-sm md:text-base text-[#58594e] font-light text-center">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 인테리어 캐러셀 */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="text-[#58594e] text-lg md:text-xl font-light">인테리어 갤러리</div>
            <div className="flex gap-2">
              <button
                onClick={() => prev()}
                className="rounded-full border px-4 py-2 text-sm text-[#7d6847] border-[#e7e0c9] hover:bg-[#f4efe2] transition"
                aria-label="이전"
                type="button"
              >
                ←
              </button>
              <button
                onClick={() => next()}
                className="rounded-full border px-4 py-2 text-sm text-[#7d6847] border-[#e7e0c9] hover:bg-[#f4efe2] transition"
                aria-label="다음"
                type="button"
              >
                →
              </button>
            </div>
          </div>

          {/* viewport: 좌우 패딩(peek) + overflow-hidden */}
          <div
            ref={viewportRef}
            className="relative w-full overflow-hidden select-none"
            style={{ touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
          >
            {/* track: flex + gap */}
            <div
              ref={trackRef}
              className="flex items-center"
              style={{
                gap: `${gap}px`,
                padding: `0 ${peek}px`,
                transform: `translate3d(${tx}px,0,0)`,
                transition: transitionOn ? "transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1)" : "none",
                willChange: "transform",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {allSlides.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  onClick={() => {
                    // i -> 실제 인덱스 환산
                    const real = (i - headLen + totalReal) % totalReal;
                    openModal(real);
                  }}
                  className="rounded-xl overflow-hidden shadow-sm border bg-[#f8f6ee] transition hover:shadow-xl focus:outline-none"
                  style={{
                    width: itemW ? `${itemW}px` : undefined,
                    aspectRatio: "4 / 3",
                    cursor: "zoom-in",
                    flex: "0 0 auto",
                  }}
                  type="button"
                >
                  <Image
                    src={src}
                    alt="인테리어"
                    width={700}
                    height={525}
                    className="w-full h-full object-cover"
                    draggable={false}
                    priority={i === index} // 현재 슬라이드 우선 로드
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 모달: 좌우 스와이프(간결/부드럽게) */}
      {showModal && modalIndex !== null && (
        <div className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center" onClick={closeModal}>
          <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-6 right-8 md:top-10 md:right-12 text-white/90 text-5xl md:text-6xl font-light hover:text-[#ffd86a] transition z-10"
              aria-label="닫기"
              type="button"
            >
              ×
            </button>
            <button
              onClick={() => {
                setMTransition(true);
                const W = modalWrapRef.current?.clientWidth || 0;
                setMTx(W);
                setTimeout(() => {
                  setMTransition(false);
                  setMTx(0);
                  setModalIndex((p) => (p! - 1 + totalReal) % totalReal);
                }, 220);
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#ffd86a] text-6xl md:text-7xl font-light transition z-10"
              aria-label="이전 이미지"
              type="button"
            >
              &#8592;
            </button>
            <button
              onClick={() => {
                setMTransition(true);
                const W = modalWrapRef.current?.clientWidth || 0;
                setMTx(-W);
                setTimeout(() => {
                  setMTransition(false);
                  setMTx(0);
                  setModalIndex((p) => (p! + 1) % totalReal);
                }, 220);
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#ffd86a] text-6xl md:text-7xl font-light transition z-10"
              aria-label="다음 이미지"
              type="button"
            >
              &#8594;
            </button>

            <div
              ref={modalWrapRef}
              className="w-[96vw] max-w-5xl max-h-[80vh] flex items-center justify-center"
              style={{
                touchAction: "pan-y",
                transform: `translate3d(${mTx}px,0,0)`,
                transition: mTransition ? "transform 220ms ease-out" : "none",
                willChange: "transform",
              }}
              onPointerDown={(e) => mDown(e.clientX)}
              onPointerMove={(e) => mMove(e.clientX)}
              onPointerUp={mUp}
              onTouchStart={(e) => mDown(e.touches[0].clientX)}
              onTouchMove={(e) => mMove(e.touches[0].clientX)}
              onTouchEnd={mUp}
            >
              <Image
                src={photos[modalIndex]}
                alt="크게보기"
                width={1600}
                height={1200}
                className="rounded-xl object-contain w-full h-full max-h-[80vh] bg-[#f6f3ee] shadow-2xl"
                draggable={false}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
