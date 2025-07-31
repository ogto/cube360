import { useState, useEffect } from "react";
import Image from "next/image";

// 타입별 정보
const unitTypeList = [
  {
    key: "45",
    name: "45 TYPE",
    roomCount: 120,
    area: "45.4583㎡ (13.7511py)",
    contract: "76.5963㎡ (23.1704py)",
    img3d: "/images/3d-room.png",
    photos: [
      "/images/room-1.jpg",
      "/images/room-2.jpg",
      "/images/room-3.jpg",
      "/images/room-4.jpg"
    ],
  },
  {
    key: "94",
    name: "94 TYPE",
    roomCount: 48,
    area: "94.0175㎡ (28.4402py)",
    contract: "158.4175㎡ (47.9213py)",
    img3d: "/images/3d-room.png",
    photos: [
      "/images/room-1.jpg",
      "/images/room-2.jpg",
      "/images/room-3.jpg",
      "/images/room-4.jpg"
    ],
  },
  {
    key: "151",
    name: "151 TYPE",
    roomCount: 4,
    area: "151.6759㎡ (45.8820py)",
    contract: "255.5706㎡ (77.3101py)",
    img3d: "/images/3d-room.png",
    photos: [
      "/images/room-1.jpg",
      "/images/room-2.jpg",
      "/images/room-3.jpg",
      "/images/room-4.jpg"
    ],
  },
];

export default function UnitSection() {
  const [selected, setSelected] = useState(unitTypeList[0].key);
  const unit = unitTypeList.find((u) => u.key === selected);

  // 팝업 상태
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // 팝업 오픈
  const openModal = (img: string) => {
    setModalImage(img);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  // 팝업 닫기
  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
    document.body.style.overflow = "";
  };

  // esc로 닫기
  useEffect(() => {
    if (!showModal) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showModal]);

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

        {/* 탭 */}
        <div className="flex justify-center mb-10 border-b border-[#ede8d7] max-w-lg mx-auto">
          {unitTypeList.map((t) => (
            <button
              key={t.key}
              className={`px-6 pb-2 text-lg md:text-xl font-light transition border-b-2 ${
                selected === t.key
                  ? "border-[#bc9e51] text-[#bc9e51] font-semibold"
                  : "border-transparent text-[#b7b2a2] hover:text-[#7d6847]"
              }`}
              onClick={() => setSelected(t.key)}
              style={{ letterSpacing: "0.07em" }}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* 중앙 구조 */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20">
          {/* 좌측: 정보 */}
          <div className="w-full max-w-xs">
            <div className="text-[2rem] md:text-[2.5rem] font-extrabold mb-5 text-[#292821]">
              <span className="font-light">{unit?.key}</span>
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
                    {unit?.roomCount}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">
                    전용면적
                  </td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">
                    {unit?.area}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 font-normal">계약면적</td>
                  <td className="py-2 pl-3 text-[#36353b]">{unit?.contract}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* 우측: 3D 이미지 */}
          <div className="w-full flex-1 flex justify-center">
            <div className="w-[340px] md:w-[430px]">
              <Image
                src={unit?.img3d ?? ""}
                alt={unit?.name ?? ""}
                width={430}
                height={320}
                className="w-full h-auto rounded-2xl shadow-md"
                style={{ background: "#f6f3ee" }}
              />
            </div>
          </div>
        </div>

        {/* 하단: 인테리어 이미지 4장 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 px-2">
          {unit?.photos.map((photo, idx) => (
            <button
              key={photo}
              onClick={() => openModal(photo)}
              className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm border bg-[#f8f6ee] transition hover:shadow-xl focus:outline-none"
              style={{ cursor: "zoom-in" }}
              tabIndex={0}
              aria-label="이미지 크게 보기"
              type="button"
            >
              <Image
                src={photo}
                alt={`${unit?.name} 인테리어 ${idx + 1}`}
                width={700}
                height={540}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 이미지 팝업(모달) */}
      {showModal && modalImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center animate-fadein"
          onClick={closeModal}
        >
          <div
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-8 md:top-10 md:right-12 text-white/90 text-5xl md:text-6xl font-light hover:text-[#ffd86a] transition z-10"
              aria-label="닫기"
              tabIndex={0}
              type="button"
            >
              ×
            </button>
            <div className="w-[96vw] max-w-5xl max-h-[80vh] flex items-center justify-center">
              <Image
                src={modalImage}
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

      {/* Fade In 애니메이션 */}
      <style jsx global>{`
        .animate-fadein {
          animation: fadein 0.25s;
        }
        @keyframes fadein {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
      `}</style>
    </section>
  );
}
