import { useCallback } from "react";
import Image from "next/image";

const scheduleImages = [
  { src: "/images/schedule/3.png", alt: "Schedule 3" },
];

export default function ScheduleSection() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    // 섹션 전체(풀폭) 배경을 흰색으로
    <section id="schedule" className="w-full bg-white py-12 md:py-16">
      {/* 가로 최대 1440, 중앙정렬 */}
      <div
        className="
          max-w-[1440px] mx-auto px-4
          flex flex-col gap-6
        "
      >
        {/* 제목 */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-normal text-center tracking-tight mb-6"
          style={{ fontFamily: "Nanum Myeongjo, serif", color: "#274777" }}
        >
          분양 일정 계획
        </h2>

        {/* 이미지 영역 */}
        {scheduleImages.map((img, idx) => (
          <div
            key={img.src}
            className="
              relative w-full
              h-[300px] sm:h-[300px] md:h-[600px]
              rounded-xl overflow-hidden bg-transparent
            "
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-contain"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
