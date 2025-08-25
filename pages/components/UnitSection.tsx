import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";

// 공통 유틸: 사진 배열 생성 (예: 1.jpg~72.jpg 중 main 제외)
const makePhotos = (dir: string, count: number, mainFile: string) =>
  Array.from({ length: count }, (_, i) => `${dir}/${i + 1}.jpg`).filter(
    (src) => src !== `${dir}/${mainFile}`
  );

// 타입 데이터 정의
type Unit = {
  key: "A" | "B" | "C";
  name: string;
  rooms: number;
  py: number;
  floors: number;
  main: { src: string; label: string }[];   // 라벨 포함
  photos: string[];
};


const unitA: Unit = {
  key: "A",
  name: "A TYPE",
  rooms: 10,
  py: 22,
  floors: 1,
  main: [{ src: "/images/type/m1.jpg", label: "단층" }],
  photos: makePhotos("/images/type", 70, "m1.jpg"),
};

const unitB: Unit = {
  key: "B",
  name: "B TYPE",
  rooms: 9,
  py: 29,
  floors: 1,
  main: [{ src: "/images/type/m2.png", label: "단층" }],
  photos: makePhotos("/images/type", 70, "m2.png"),
};


const unitC: Unit = {
  key: "C",
  name: "C TYPE",
  rooms: 6,
  py: 50,
  floors: 2,
  main: [
    { src: "/images/type/m1.jpg", label: "1층" },
    { src: "/images/type/m4.jpg", label: "2층" }
  ],
  photos: makePhotos("/images/type", 70, "m1.jpg"),
};

// 탭 버튼
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
          ? "px-4 py-2 rounded-full text-white bg-[#292821] border border-[#292821] shadow-sm"
          : "px-4 py-2 rounded-full text-[#7d6847] bg-white border border-[#e7e0c9] hover:bg-[#f4efe2] transition"
      }
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default function UnitSection() {
  // 현재 선택 타입
  const [typeKey, setTypeKey] = useState<Unit["key"]>("C");
  const unit = useMemo<Unit>(() => {
    if (typeKey === "A") return unitA;
    if (typeKey === "B") return unitB;
    return unitC;
  }, [typeKey]);

  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // 썸네일 슬라이더
  const itemsPerPage = 4;
  const total = unit.photos.length;
  const [startIdx, setStartIdx] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);

  const visiblePhotos = useMemo(() => {
    if (total === 0) return [];
    return Array.from({ length: itemsPerPage }, (_, i) => {
      const realIndex = (startIdx + i) % total;
      return { src: unit.photos[realIndex], realIndex };
    });
  }, [startIdx, total, unit.photos]);

  const goPagePrev = () => {
    if (total === 0) return;
    setAnimDir("right");
    setStartIdx((prev) => (prev - itemsPerPage + total) % total);
  };
  const goPageNext = () => {
    if (total === 0) return;
    setAnimDir("left");
    setStartIdx((prev) => (prev + itemsPerPage) % total);
  };

  const sliderRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (horizontal) {
        e.preventDefault();
        if (e.deltaX > 0 || e.deltaY > 0) goPageNext();
        else goPagePrev();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 키보드 좌우 (모달 아닐 때)
  useEffect(() => {
    if (showModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPagePrev();
      if (e.key === "ArrowRight") goPageNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal, total]);

  // 모달
  const openModal = (realIdx: number) => {
    if (total === 0) return;
    setModalIndex(realIdx);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
    document.body.style.overflow = "";
  };
  const goPrevModal = () => {
    if (modalIndex === null || total === 0) return;
    setModalIndex((prev) => (prev! === 0 ? total - 1 : (prev as number) - 1));
  };
  const goNextModal = () => {
    if (modalIndex === null || total === 0) return;
    setModalIndex((prev) => (prev! === total - 1 ? 0 : (prev as number) + 1));
  };
  useEffect(() => {
    if (!showModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goPrevModal();
      if (e.key === "ArrowRight") goNextModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal, modalIndex, total]);

  const onSlideAnimEnd = () => setAnimDir(null);

  // 타입 변경 시 상태 리셋
  useEffect(() => {
    setStartIdx(0);
    setAnimDir(null);
    setShowModal(false);
    setModalIndex(null);
    document.body.style.overflow = "";
  }, [typeKey]);

  return (
    <section id="unit" className="w-full bg-[#fefcf7] pb-20 pt-12">
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

          <div className="flex items-center justify-center gap-2 md:gap-3">
            <TypeTab active={typeKey === "A"} label="A TYPE" onClick={() => setTypeKey("A")} />
            <TypeTab active={typeKey === "B"} label="B TYPE" onClick={() => setTypeKey("B")} />
            <TypeTab active={typeKey === "C"} label="C TYPE" onClick={() => setTypeKey("C")} />
          </div>
        </div>

        {/* 중앙 */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20">
          {/* 좌측: 정보 테이블 (요구 데이터로 수정) */}
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
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">
                    {unit.rooms} 호
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">평형</td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">
                    {unit.py} py
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 font-normal">층수</td>
                  <td className="py-2 pl-3 text-[#36353b]">
                    {unit.floors}층
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 우측: 메인 이미지 */}
          <div className="w-full flex-1 flex justify-center">
            {/* md 이상에서 정확히 2열 강제, 모바일 1열 */}
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
                  {/* ✅ 라벨 출력 */}
                  <div className="mt-2 text-sm md:text-base text-[#58594e] font-light text-center">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 하단: 인테리어 슬라이드(4개씩) */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="text-[#58594e] text-lg md:text-xl font-light">인테리어 갤러리</div>
            <div className="flex gap-2">
              <button
                onClick={goPagePrev}
                className="rounded-full border px-4 py-2 text-sm text-[#7d6847] border-[#e7e0c9] hover:bg-[#f4efe2] transition"
                aria-label="이전 4장"
                type="button"
              >
                ←
              </button>
              <button
                onClick={goPageNext}
                className="rounded-full border px-4 py-2 text-sm text-[#7d6847] border-[#e7e0c9] hover:bg-[#f4efe2] transition"
                aria-label="다음 4장"
                type="button"
              >
                →
              </button>
            </div>
          </div>

          <div ref={sliderRef} className="relative w-full select-none" aria-roledescription="carousel">
            {total > 0 ? (
              <div
                key={`${typeKey}-${startIdx}`}
                className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${
                  animDir === "left" ? "animate-slide-left" : animDir === "right" ? "animate-slide-right" : ""
                }`}
                onAnimationEnd={onSlideAnimEnd}
              >
                {visiblePhotos.map(({ src, realIndex }) => (
                  <button
                    key={`${src}-${realIndex}`}
                    onClick={() => openModal(realIndex)}
                    className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm border bg-[#f8f6ee] transition hover:shadow-xl focus:outline-none"
                    style={{ cursor: "zoom-in" }}
                    tabIndex={0}
                    aria-label="이미지 크게 보기"
                    type="button"
                  >
                    <Image
                      src={src}
                      alt={`${unit.name} 인테리어`}
                      width={700}
                      height={540}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-[#8a8578] py-12">준비 중입니다.</div>
            )}
          </div>
        </div>
      </div>

      {/* 모달 */}
      {showModal && modalIndex !== null && total > 0 && (
        <div className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center" onClick={closeModal}>
          <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-6 right-8 md:top-10 md:right-12 text-white/90 text-5xl md:text-6xl font-light hover:text-[#ffd86a] transition z-10"
              aria-label="닫기"
              tabIndex={0}
              type="button"
            >
              ×
            </button>
            <button
              onClick={goPrevModal}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#ffd86a] text-6xl md:text-7xl font-light transition z-10"
              aria-label="이전 이미지"
              tabIndex={0}
              type="button"
            >
              &#8592;
            </button>
            <button
              onClick={goNextModal}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#ffd86a] text-6xl md:text-7xl font-light transition z-10"
              aria-label="다음 이미지"
              tabIndex={0}
              type="button"
            >
              &#8594;
            </button>

            <div className="w-[96vw] max-w-5xl max-h-[80vh] flex items-center justify-center">
              <Image
                src={unit.photos[modalIndex]}
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

      {/* 애니메이션 */}
      <style jsx global>{`
        .animate-fadein { animation: fadein 0.25s; }
        @keyframes fadein { from { opacity: 0 } to { opacity: 1 } }

        .animate-slide-left { animation: slide-left 220ms ease-out; }
        .animate-slide-right { animation: slide-right 220ms ease-out; }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .animate-zoom-fade { animation: zoom-fade 220ms ease-out; }
        @keyframes zoom-fade {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
