import { useCallback } from "react";

export default function HeroSection2() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="hero"
      className="vh-screen w-full relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/2new.png)",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      {/* 텍스트 박스: 반응형 중앙 정렬 */}
      <div
        className="
          absolute
          top-[12%] sm:top-[15%]   /* 더 위로 올림 (22% → 12~15%) */
          right-4 sm:right-[5%]     /* 모바일은 좌측 여백 1rem, PC는 10% */
          z-10
          w-[90%] sm:w-auto        /* 모바일 화면 꽉 차지 않게 */
          max-w-full sm:max-w-2xl md:max-w-3xl
          text-right px-2 sm:px-0
        "
      >
        <h2 className="text-yellow-400 text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-lg leading-tight">
          단양 천혜의 자연 속
        </h2>
        <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-snug drop-shadow-lg font-bold">
          프라이빗한 <br className="block" />
          고급 세컨<br /> 하우스
        </h1>
      </div>
    </section>
  );
}

