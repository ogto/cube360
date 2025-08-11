import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";

// 단일 타입: C TYPE
const unitC = {
  key: "C",
  name: "C TYPE",
  roomCount: 120, // 필요 시 숫자 조정
  area: "45.4583㎡ (13.7511py)", // 필요 시 텍스트 조정
  contract: "76.5963㎡ (23.1704py)", // 필요 시 텍스트 조정
  main: "/images/c_type/21.jpg",
  photos: Array.from({ length: 72 }, (_, i) => `/images/c_type/${i + 1}.jpg`).filter(
    (src) => src !== "/images/c_type/21.jpg"
  ),
};

export default function UnitSection() {
  const unit = unitC;

  // 모달 상태
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // 썸네일 슬라이더 상태
  const itemsPerPage = 4;
  const total = unit.photos.length;
  const [startIdx, setStartIdx] = useState(0);

  // 슬라이드 애니메이션 방향: 'left' | 'right' | null
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);

  // 현재 페이지에 보이는 4장(순환)
  const visiblePhotos = useMemo(() => {
    return Array.from({ length: itemsPerPage }, (_, i) => {
      const realIndex = (startIdx + i) % total;
      return { src: unit.photos[realIndex], realIndex };
    });
  }, [startIdx, total, unit.photos]);

  // 화살표 이동
  const goPagePrev = () => {
    setAnimDir("right");
    setStartIdx((prev) => (prev - itemsPerPage + total) % total);
  };
  const goPageNext = () => {
    setAnimDir("left");
    setStartIdx((prev) => (prev + itemsPerPage) % total);
  };

  // 마우스 휠(Shift+Wheel 또는 트랙패드 수평 제스처)로도 이동
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
  }, []);

  // 키보드 좌우로 슬라이더 이동 (모달이 아닐 때)
  useEffect(() => {
    if (showModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPagePrev();
      if (e.key === "ArrowRight") goPageNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal]);

  // 모달 오픈/클로즈
  const openModal = (realIdx: number) => {
    setModalIndex(realIdx);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
    document.body.style.overflow = "";
  };

  // 모달에서 좌우 이동
  const goPrevModal = () => {
    if (modalIndex === null) return;
    setModalIndex((prev) => (prev! === 0 ? total - 1 : (prev as number) - 1));
  };
  const goNextModal = () => {
    if (modalIndex === null) return;
    setModalIndex((prev) => (prev! === total - 1 ? 0 : (prev as number) + 1));
  };

  // 모달에서 키보드 ESC/좌/우
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

  // 애니메이션 종료 시 방향 리셋
  const onSlideAnimEnd = () => setAnimDir(null);

  return (
    <section id="unit" className="w-full bg-[#fefcf7] pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* 타이틀 영역 */}
        <div className="text-center mb-8">
          <div
            className="text-[2.3rem] md:text-[2.8rem] tracking-wider text-[#a98d33] font-normal"
            style={{ fontFamily: "Nanum Myeongjo, serif" }}
          >
            TYPE
          </div>
          <div className="text-xl md:text-2xl text-[#58594e] mt-1 mb-3 font-light">객실타입</div>
        </div>

        {/* 중앙 구조 */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20">
          {/* 좌측: 정보 */}
          <div className="w-full max-w-xs">
            <div className="text-[2rem] md:text-[2.5rem] font-extrabold mb-5 text-[#292821]">
              <span className="font-light">{unit.key}</span>
              <span
                className="text-lg font-normal ml-1"
                style={{ fontFamily: "Nanum Myeongjo, serif" }}
              >
                type
              </span>
            </div>
            <table className="w-full text-base md:text-lg">
              <tbody>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">
                    객실 수
                  </td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">
                    {unit.roomCount}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">
                    전용면적
                  </td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">
                    {unit.area}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 font-normal">계약면적</td>
                  <td className="py-2 pl-3 text-[#36353b]">{unit.contract}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 우측: 메인 이미지 */}
          <div className="w-full flex-1 flex justify-center">
            <div className="w-[340px] md:w-[430px]">
              <Image
                src={unit.main}
                alt={unit.name}
                width={430}
                height={320}
                className="w-full h-auto rounded-2xl shadow-md"
                style={{ background: "#f6f3ee" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* 하단: 인테리어 슬라이드(4개씩 표시) */}
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

          <div
            ref={sliderRef}
            className="relative w-full select-none"
            aria-roledescription="carousel"
          >
            <div
              key={startIdx} // 콘텐츠 교체마다 재생
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${
                animDir === "left"
                  ? "animate-slide-left"
                  : animDir === "right"
                  ? "animate-slide-right"
                  : ""
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
          </div>
        </div>
      </div>

      {/* 이미지 팝업(모달) — 애니메이션 제거 버전 */}
      {showModal && modalIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center" // animate-fadein 제거
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-8 md:top-10 md:right-12 text-white/90 text-5xl md:text-6xl font-light hover:text-[#ffd86a] transition z-10"
              aria-label="닫기"
              tabIndex={0}
              type="button"
            >
              ×
            </button>

            {/* 왼쪽(이전) */}
            <button
              onClick={goPrevModal}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#ffd86a] text-6xl md:text-7xl font-light transition z-10"
              style={{ outline: "none" }}
              aria-label="이전 이미지"
              tabIndex={0}
              type="button"
            >
              &#8592;
            </button>

            {/* 오른쪽(다음) */}
            <button
              onClick={goNextModal}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#ffd86a] text-6xl md:text-7xl font-light transition z-10"
              style={{ outline: "none" }}
              aria-label="다음 이미지"
              tabIndex={0}
              type="button"
            >
              &#8594;
            </button>

            {/* 큰 이미지 — key / 애니메이션 클래스 제거 */}
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

      {/* 애니메이션 정의 */}
      <style jsx global>{`
        .animate-fadein {
          animation: fadein 0.25s;
        }
        @keyframes fadein {
          from { opacity: 0 }
          to   { opacity: 1 }
        }

        /* 썸네일 페이지 전환: 좌/우 슬라이드 인 */
        .animate-slide-left {
          animation: slide-left 220ms ease-out;
        }
        .animate-slide-right {
          animation: slide-right 220ms ease-out;
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* 모달 이미지 전환: 부드러운 확대 + 페이드 인 */
        .animate-zoom-fade {
          animation: zoom-fade 220ms ease-out;
        }
        @keyframes zoom-fade {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
