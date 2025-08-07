import { useCallback } from "react";

export default function HeroSection() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="hero"
      className="vh-screen w-full relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/1.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      {/* 텍스트 박스: 좌측 상단, 모바일/PC 반응형 */}
<div
  className="
    absolute
    top-[22%] left-1/2
    -translate-x-1/2 sm:left-[16%] sm:translate-x-0
    z-10
    w-full max-w-full sm:max-w-2xl md:max-w-3xl
    text-left px-4
  "
>
  <h2 className="text-yellow-400 text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 drop-shadow-lg leading-tight">
    단양의 새로운 랜드마크
  </h2>
  <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 leading-snug drop-shadow-lg font-bold">
    충북 최대 규모의<br className="block sm:hidden" />
    단독형 풀빌라 단지
  </h1>
</div>

    </section>
  );
}
