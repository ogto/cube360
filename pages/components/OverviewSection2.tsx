import { useCallback } from "react";

export default function OverviewSection2() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="overview"
      className="w-screen h-screen relative bg-[#1a1a1a] flex flex-col items-center justify-center px-4"
    >
      {/* 가운데 정렬 + 최대폭 1280px */}
      <div className="w-full max-w-[1280px] mx-auto">
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
            w-full max-w-[1280px]
            text-center px-4
          "
        >
          {/* 버튼/설명 추가 자리 */}
        </div>
      </div>
    </section>
  );
}
