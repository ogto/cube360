import { useCallback } from "react";

export default function HeroSection() {
    const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return (
    <section
      id="hero"
      className="vh-screen w-full hero-drone flex flex-col justify-center items-center text-center relative overflow-hidden"
      style={{
        backgroundImage: "url(/images/hero-drone.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative flex flex-col items-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] mb-7 tracking-tight">
          단양의 미래, <span className="text-[#53a3ff]">CUBE360</span>
        </h1>
        <p className="text-2xl md:text-3xl text-white font-semibold mb-10 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          자연과 혁신이 만나는 곳,<br />
          프리미엄 라이프스타일을 누려보세요.
        </p>
        <button
          onClick={() => scrollToId("inquiry")}
          className="bg-[#53a3ff] hover:bg-[#2267b7] text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-2xl transition-all tracking-wide"
        >
          분양 문의하기
        </button>
      </div>
    </section>
  )
}