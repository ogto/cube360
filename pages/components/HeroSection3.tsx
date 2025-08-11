import { useCallback } from "react";

export default function HeroSection3() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="hero"
      className="vh-screen w-full relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/3.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      {/* 텍스트 박스: 반응형 중앙 정렬 + 좌측정렬 */}
      <div
        className="
          absolute
          top-[22%] left-1/2 -translate-x-1/2
          sm:left-[20%] sm:translate-x-0
          z-10
          w-full max-w-full sm:max-w-2xl md:max-w-4xl
          text-left px-4
        "
      >
        <h2 className="text-yellow-400 text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-lg leading-tight">
          안정적인 꿈의 투자처,
        </h2>
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-snug drop-shadow-lg font-bold">
          전문 운영사가 보장하는 <br className="block" />
          수익성 부동산
        </h1>
      </div>
    </section>
  );
}
