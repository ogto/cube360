import { useState } from "react";
import Image from "next/image";

// 타입별 정보
const unitTypeList = [
  {
    key: "45",
    name: "45 TYPE",
    roomCount: 120,
    area: "45.4583㎡ (13.7511py)",
    contract: "76.5963㎡ (23.1704py)",
    img3d: "/unit-45-3d.png",
    photos: [
      "/unit-45-1.jpg",
      "/unit-45-2.jpg",
      "/unit-45-3.jpg",
      "/unit-45-4.jpg",
    ],
  },
  {
    key: "94",
    name: "94 TYPE",
    roomCount: 48,
    area: "94.0175㎡ (28.4402py)",
    contract: "158.4175㎡ (47.9213py)",
    img3d: "/unit-94-3d.png",
    photos: [
      "/unit-94-1.jpg",
      "/unit-94-2.jpg",
      "/unit-94-3.jpg",
      "/unit-94-4.jpg",
    ],
  },
  {
    key: "151",
    name: "151 TYPE",
    roomCount: 4,
    area: "151.6759㎡ (45.8820py)",
    contract: "255.5706㎡ (77.3101py)",
    img3d: "/unit-151-3d.png",
    photos: [
      "/unit-151-1.jpg",
      "/unit-151-2.jpg",
      "/unit-151-3.jpg",
      "/unit-151-4.jpg",
    ],
  },
];

export default function UnitSection() {
  const [selected, setSelected] = useState(unitTypeList[0].key);
  const unit = unitTypeList.find((u) => u.key === selected);

  return (
    <section id="unit" className="w-full bg-[#fefcf7] pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* 타이틀 영역 */}
        <div className="text-center mb-8">
          <div className="text-[2.3rem] md:text-[2.8rem] tracking-wider text-[#a98d33] font-normal" style={{ fontFamily: "Nanum Myeongjo, serif" }}>TYPE</div>
          <div className="text-xl md:text-2xl text-[#58594e] mt-1 mb-3 font-light">객실타입</div>
        </div>

        {/* 탭 */}
        <div className="flex justify-center mb-10 border-b border-[#ede8d7] max-w-lg mx-auto">
          {unitTypeList.map((t) => (
            <button
              key={t.key}
              className={`px-6 pb-2 text-lg md:text-xl font-light transition border-b-2 ${selected === t.key
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
              <span className="text-lg font-normal ml-1" style={{ fontFamily: "Nanum Myeongjo, serif" }}>type</span>
            </div>
            <table className="w-full text-base md:text-lg">
              <tbody>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">객실 수</td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">{unit?.roomCount}</td>
                </tr>
                <tr>
                  <td className="py-2 text-[#b3a98a] w-24 border-b border-[#ebebeb] font-normal">전용면적</td>
                  <td className="py-2 pl-3 border-b border-[#ebebeb] text-[#36353b]">{unit?.area}</td>
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
            <div key={photo} className="aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm border bg-[#f8f6ee]">
              <Image
                src={photo}
                alt={`${unit?.name} 인테리어 ${idx + 1}`}
                width={350}
                height={260}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
