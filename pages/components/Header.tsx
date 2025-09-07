import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  // { id: "hero", label: "메인" },
  { id: "overview", label: "위치" },
  { id: "location", label: "특장점" },
  { id: "unit", label: "객실타입" },
  { id: "schedule", label: "분양안내" },
  { id: "inquiry", label: "상담문의" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollToId = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm w-full">
      <nav className="max-w-6xl mx-auto px-2 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2">
        {/* 로고 */}
        <div
          className="flex items-center gap-2 min-w-0 shrink-0 cursor-pointer"
          onClick={() => {
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="/images/cube-logo.png"
            alt="CUBE360 로고"
            width={48}
            height={48}
            className="md:w-[56px] md:h-[56px] lg:w-[64px] lg:h-[64px]"
          />
          <span className="text-white text-2xl md:text-3xl font-extrabold tracking-wider whitespace-nowrap truncate max-w-[38vw] md:max-w-[30vw] lg:max-w-none leading-none">
            단양동화마을
          </span>
        </div>
        {/* PC 네비게이션 (가로 스크롤 허용) */}
        <div className="hidden md:flex flex-1 min-w-0 justify-center">
          <div className="no-scrollbar overflow-x-auto overflow-y-hidden whitespace-nowrap flex items-center gap-3 lg:gap-4 px-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="text-white/90 hover:text-white text-2xl md:text-3xl tracking-wider font-semibold px-3 py-2 leading-none rounded-lg hover:bg-white/10 transition cursor-pointer shrink-0"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 모바일: 메뉴 버튼 */}
        <button
          className="md:hidden ml-auto flex items-center justify-center w-10 h-10 z-50"
          onClick={() => setMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          <svg width={28} height={28} fill="none" stroke="#fff" strokeWidth={2.6} viewBox="0 0 28 28">
            <line x1="5" y1="8" x2="23" y2="8" strokeLinecap="round" />
            <line x1="5" y1="14" x2="23" y2="14" strokeLinecap="round" />
            <line x1="5" y1="20" x2="23" y2="20" strokeLinecap="round" />
          </svg>
        </button>

        {/* 모바일 오버레이 메뉴 */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-md min-h-screen min-w-full"
            style={{ WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
          >
            <div className="flex justify-end px-6 py-5">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center"
                aria-label="메뉴 닫기"
              >
                <svg width={30} height={30} fill="none" stroke="#fff" strokeWidth={2.8} viewBox="0 0 30 30">
                  <line x1="7" y1="7" x2="23" y2="23" strokeLinecap="round" />
                  <line x1="23" y1="7" x2="7" y2="23" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className="text-white text-4xl font-bold tracking-wider px-6 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 전역: 스크롤바 숨김 유틸 */}
      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </header>
  );
}
