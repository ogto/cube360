import { useCallback } from "react";

export default function OverviewSection2() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="overview"
      className="w-full relative bg-[#f8f8f8] flex justify-center"
    >
      {/* 가로 전체 꽉 차게 + 비율 유지 */}
      <img
        src="/images/overview.png"
        alt="단양 동화마을 안내"
        className="w-full h-auto object-contain"
      />

      {/* 필요시 텍스트/버튼 영역 */}
      <div
        className="
          absolute
          bottom-[12%] left-1/2 -translate-x-1/2
          z-10
          w-full max-w-full sm:max-w-2xl md:max-w-4xl
          text-center px-4
        "
      >
        {/* 예: 버튼이나 설명 텍스트 들어갈 자리 */}
      </div>
    </section>
  );
}
