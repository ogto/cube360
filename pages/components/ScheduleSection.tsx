import { useCallback } from "react";
import Image from "next/image";

const scheduleImages = [
  { src: "/images/schedule/1.png", alt: "Schedule 1" },
  { src: "/images/schedule/2.png", alt: "Schedule 2" },
];

export default function ScheduleSection() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    // 섹션 전체(풀폭) 배경을 아이보리로
    <section id="hero" className="w-full bg-[#faf8f2] py-20 md:py-20">
      {/* 가로 최대 1440, 중앙정렬, 한 화면에 두 장 */}
      <div
        className="
          max-w-[1040px] mx-auto px-4
          h-[calc(100svh-1rem)]  /* 모바일 브라우저 대응: svh 권장 */
          flex flex-col gap-4
        "
      >
        {scheduleImages.map((img, idx) => (
          <div
            key={img.src}
            className="relative w-full flex-1 rounded-xl overflow-hidden bg-transparent"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1040px) 100vw, 1040px"
              className="object-contain"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </section>

  );
}
