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

      {/* 텍스트 박스: 하단 중앙 + 텍스트 중앙 정렬 */}
      <div
        className="
          absolute
          bottom-[12%] left-1/2 -translate-x-1/2
          z-10
          w-full max-w-full sm:max-w-2xl md:max-w-4xl
          text-center px-4
        "
      >
        <h2 className="text-yellow-400 text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-lg leading-tight">
          단양군과 함께하는
        </h2>
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-snug drop-shadow-lg font-bold">
          자연과 관광의 중심 단지 <br className="block" />
          단양 동화마을입니다 
        </h1>
      </div>
    </section>
  );
}
