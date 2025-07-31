import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { id: "hero", label: "메인" },
  { id: "overview", label: "입지 환경" },
  { id: "location", label: "커뮤니티" },
  { id: "unit", label: "객실 타입 안내" },
  // { id: "schedule", label: "분양 일정" },
  { id: "inquiry", label: "문의" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 메뉴 열렸을 때 스크롤 막기
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [menuOpen]);

  // 스크롤 이동
  const scrollToId = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150); // 메뉴 닫히고 이동
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm w-full">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <Image src="/images/cube-logo.png" alt="CUBE360 로고" width={38} height={38} />
          <span className="text-white text-lg md:text-xl font-extrabold tracking-tight">CUBE360</span>
        </div>
        {/* PC: 네비게이션 */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex gap-2 md:gap-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="text-white/90 hover:text-white text-sm md:text-base font-semibold px-3 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {/* PC: 연락처 */}
        <div className="hidden md:flex items-center">
          <a
            href="tel:010-1234-5678"
            className="text-white text-sm md:text-base font-bold px-4 py-2 rounded-lg hover:bg-white/10 transition"
            style={{ whiteSpace: 'nowrap' }}
          >
            010-1234-5678
          </a>
        </div>
        {/* 모바일: 메뉴버튼 */}
        <button
          className="md:hidden ml-auto flex items-center justify-center w-10 h-10 z-50"
          onClick={() => setMenuOpen(true)}
          aria-label="메뉴 열기"
        >
          {/* 햄버거 아이콘 */}
          <svg width={28} height={28} fill="none" stroke="#fff" strokeWidth={2.6} viewBox="0 0 28 28">
            <line x1="5" y1="8" x2="23" y2="8" strokeLinecap="round" />
            <line x1="5" y1="14" x2="23" y2="14" strokeLinecap="round" />
            <line x1="5" y1="20" x2="23" y2="20" strokeLinecap="round" />
          </svg>
        </button>
        {/* 오버레이 메뉴 (모바일) */}
        {menuOpen && (
          <div
            className="
              fixed inset-0 z-[9999] flex flex-col
              bg-black/95 backdrop-blur-md
              min-h-screen min-w-full
            "
            style={{ backgroundColor: "rgba(0,0,0,0.85)", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
          >
            {/* 상단 닫기버튼 */}
            <div className="flex justify-end px-6 py-5">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center"
                aria-label="메뉴 닫기"
              >
                {/* X 아이콘 (SVG) */}
                <svg width={30} height={30} fill="none" stroke="#fff" strokeWidth={2.8} viewBox="0 0 30 30">
                  <line x1="7" y1="7" x2="23" y2="23" strokeLinecap="round" />
                  <line x1="23" y1="7" x2="7" y2="23" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* 메뉴 리스트 */}
            <div className="flex flex-col items-center gap-6 mt-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToId(item.id)}
                  className="text-white text-2xl font-bold tracking-wide px-6 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:010-1234-5678"
                className="mt-12 text-white text-xl font-bold px-10 py-4 rounded-2xl bg-[#34813b] hover:bg-[#53a3ff] transition"
              >
                010-1234-5678
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
