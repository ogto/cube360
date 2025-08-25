import { useCallback } from "react";
import Image from "next/image";

const scheduleImages = [
  { src: "/images/schedule/3.png", alt: "Schedule 3" },
  { src: "/images/schedule/4.png", alt: "Schedule 4" },
];

export default function ScheduleSection2() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id="hero" className="w-full bg-[#faf8f2]">
      {/* 모바일: 세로, md 이상: 가로 */}
      <div
        className="
          w-full mx-auto px-4
          h-[calc(100svh-1rem)]
          flex flex-col md:flex-row gap-4
        "
      >
        {scheduleImages.map((img, idx) => (
          <div
            key={img.src}
            className="relative flex-1 rounded-xl overflow-hidden bg-transparent"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
