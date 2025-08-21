"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

export default function HeroSection4() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section id="hero" className="vh-screen w-full relative overflow-hidden">
      {/* 배경: 뷰포트 진입 시 페이드인 */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-[opacity,transform]"
        style={{ backgroundImage: "url(/images/4.png)" }}
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}  // 처음 한 번만, 섹션의 30%가 보일 때 시작
        transition={{
          duration: 2.4,                    // ← 여기만 키우면 더 느려짐
          ease: [0.22, 1, 0.36, 1],         // 부드러운 느린-끝 이징
        }}
      />

      {/* 어둡게 오버레이(고정) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 텍스트: 오른쪽 아래, 뷰포트 진입 시 페이드/슬라이드 */}
      <div
        className="
          absolute bottom-[10%] right-4 sm:right-[8%]
          z-10 w-[90%] sm:w-auto max-w-full sm:max-w-2xl md:max-w-4xl
          text-right px-4
        "
      >
        <motion.h1
          initial={{ opacity: 0, y: 14, x: 10 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-snug drop-shadow-lg font-bold"
        >
          실제 동화 마을에서 바라보는 <br /> 풍경입니다
        </motion.h1>
      </div>
    </section>
  );
}
