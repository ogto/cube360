"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const scheduleImages = [
  { src: "/images/schedule/3.png", alt: "Schedule 3" },
  { src: "/images/schedule/4.png", alt: "Schedule 4" },
];

type Point = { x: number; y: number };

export default function ScheduleSection2() {
  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // 모달/인덱스
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // 줌/이동 상태
  const [zoom, setZoom] = useState(1); // 1 ~ 3
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPointerRef = useRef<Point | null>(null);

  // 멀티터치(핀치)
  const pointers = useRef<Map<number, Point>>(new Map());
  const lastPinchDist = useRef<number | null>(null);

  const Z_MIN = 1;
  const Z_MAX = 3;
  const Z_STEP = 0.2;

  const openModal = (idx: number) => {
    setModalIndex(idx);
    setShowModal(true);
    setZoom(1);
    setPos({ x: 0, y: 0 });
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setShowModal(false);
    setModalIndex(null);
    setZoom(1);
    setPos({ x: 0, y: 0 });
    document.body.style.overflow = "";
    pointers.current.clear();
    lastPinchDist.current = null;
  };
  const prevModal = () => {
    if (modalIndex === null) return;
    setModalIndex((i) => ((i! - 1 + scheduleImages.length) % scheduleImages.length));
    setZoom(1);
    setPos({ x: 0, y: 0 });
  };
  const nextModal = () => {
    if (modalIndex === null) return;
    setModalIndex((i) => ((i! + 1) % scheduleImages.length));
    setZoom(1);
    setPos({ x: 0, y: 0 });
  };

  // 컨테이너 중심/크기
  const getCenter = () => {
    const el = containerRef.current;
    if (!el) return { x: 0, y: 0, w: 0, h: 0 };
    const rect = el.getBoundingClientRect();
    return { x: rect.width / 2, y: rect.height / 2, w: rect.width, h: rect.height };
  };

  // 허용 이동 범위
  const clampPos = (z: number, p: Point) => {
    const { w, h } = getCenter();
    const maxX = (w * (z - 1)) / 2;
    const maxY = (h * (z - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, p.x)),
      y: Math.max(-maxY, Math.min(maxY, p.y)),
    };
  };

  // 특정 anchor 기준 줌
  const zoomAt = (newZ: number, anchor: Point) => {
    const el = containerRef.current;
    if (!el) {
      setZoom(newZ);
      return;
    }
    const { x: cx, y: cy } = getCenter();
    const oldZ = zoom;
    const ratio = newZ / oldZ;

    const newPos = {
      x: pos.x + (ratio - 1) * (pos.x - (anchor.x - cx)),
      y: pos.y + (ratio - 1) * (pos.y - (anchor.y - cy)),
    };

    setZoom(newZ);
    setPos(clampPos(newZ, newPos));
  };

  // 마우스 휠 줌
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const anchor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const dir = e.deltaY > 0 ? -1 : 1; // 위로 스크롤 시 확대
    const target = Math.min(Z_MAX, Math.max(Z_MIN, +(zoom + dir * Z_STEP).toFixed(3)));
    zoomAt(target, anchor);
  };

  // 더블클릭 줌 토글
  const onDoubleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const anchor = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const target = zoom === 1 ? 2 : 1;
    zoomAt(target, anchor);
  };

  // 포인터(드래그/핀치)
  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const [p1, p2] = Array.from(pointers.current.values());
      lastPinchDist.current = Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }

    setPanning(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    if (!pointers.current.has(e.pointerId)) return;

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // 핀치
    if (pointers.current.size === 2) {
      const [p1, p2] = Array.from(pointers.current.values());
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      const prev = lastPinchDist.current ?? dist;
      const delta = dist / prev;

      const rect = el.getBoundingClientRect();
      const anchor = { x: (p1.x + p2.x) / 2 - rect.left, y: (p1.y + p2.y) / 2 - rect.top };
      const target = Math.min(Z_MAX, Math.max(Z_MIN, +(zoom * delta).toFixed(3)));
      zoomAt(target, anchor);

      lastPinchDist.current = dist;
      return;
    }

    // 드래그
    if (panning && zoom > 1 && lastPointerRef.current) {
      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      const next = clampPos(zoom, { x: pos.x + dx, y: pos.y + dy });
      setPos(next);
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (el) el.releasePointerCapture?.(e.pointerId);
    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) lastPinchDist.current = null;
    if (pointers.current.size === 0) {
      setPanning(false);
      lastPointerRef.current = null;
    }
  };

  // 키보드
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();

      // 줌 == 1: 좌/우로 이미지 넘김, 줌 > 1: 이동
      if (zoom === 1) {
        if (e.key === "ArrowLeft") prevModal();
        if (e.key === "ArrowRight") nextModal();
      } else {
        const step = 40;
        if (e.key === "ArrowUp" || e.key.toLowerCase() === "w")
          setPos((p) => clampPos(zoom, { x: p.x, y: p.y + step }));
        if (e.key === "ArrowDown" || e.key.toLowerCase() === "s")
          setPos((p) => clampPos(zoom, { x: p.x, y: p.y - step }));
        if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
          setPos((p) => clampPos(zoom, { x: p.x + step, y: p.y }));
        if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
          setPos((p) => clampPos(zoom, { x: p.x - step, y: p.y }));
      }

      if (e.key.toLowerCase() === "z") {
        const { x, y } = getCenter();
        zoomAt(zoom === 1 ? 2 : 1, { x, y });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, zoom, pos]);

  return (
    <section id="hero" className="w-full bg-[#faf8f2] py-12">
      <div
        className="
          w-full mx-auto px-4
          min-h-screen
          flex flex-col items-center justify-center gap-8
        "
      >
        {scheduleImages.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openModal(idx)}
            className="
              relative w-full max-w-[960px]
              aspect-[4/3] sm:aspect-[16/9]
              rounded-xl overflow-hidden bg-transparent
              ring-1 ring-black/5 hover:ring-black/15 transition
              cursor-zoom-in
            "
            aria-label={`${img.alt} 크게 보기`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 960px"
              priority={idx === 0}
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* 모달 */}
      {showModal && modalIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-[1px] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="relative w-[96vw] max-w-6xl h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 */}
            <button
              type="button"
              onClick={closeModal}
              className="fixed top-4 right-5 z-[10010] text-white/95 hover:text-white text-4xl md:text-5xl leading-none"
              aria-label="닫기"
            >
              ×
            </button>

            {/* 이전/다음 */}
            {scheduleImages.length > 1 && (
              <>
                <button
                    type="button"
                    onClick={prevModal}
                    className="fixed left-3 md:left-5 top-1/2 -translate-y-1/2 z-[10010] text-white/90 hover:text-white text-5xl md:text-6xl leading-none"
                    aria-label="이전 이미지"
                  >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextModal}
                  className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[10010] text-white/90 hover:text-white text-5xl md:text-6xl leading-none"
                  aria-label="다음 이미지"
                >
                  ›
                </button>
              </>
            )}

            {/* 하단 스크림(대비 확보) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[10000] bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* 고정 컨트롤 바 */}
            <div
              className="fixed left-1/2 z-[10010] -translate-x-1/2"
              style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 20px)" }}
            >
              <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    const { x, y } = getCenter();
                    zoomAt(Math.max(Z_MIN, +(zoom - Z_STEP).toFixed(3)), { x, y });
                  }}
                  className="rounded-full px-3 py-2 text-white/90 hover:bg-white/10"
                  aria-label="축소"
                >
                  −
                </button>
                <span className="px-3 py-2 text-white/95 text-sm font-medium tabular-nums select-none">
                  {(zoom * 100).toFixed(0)}%
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const { x, y } = getCenter();
                    zoomAt(Math.min(Z_MAX, +(zoom + Z_STEP).toFixed(3)), { x, y });
                  }}
                  className="rounded-full px-3 py-2 text-white/90 hover:bg-white/10"
                  aria-label="확대"
                >
                  ＋
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPos({ x: 0, y: 0 });
                  }}
                  className="ml-1 rounded-full px-3 py-2 text-white/90 hover:bg-white/10"
                  aria-label="리셋"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* 줌/이동 캔버스 */}
            <div
              ref={containerRef}
              className={`
                relative w-full h-full overflow-hidden rounded-lg
                ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
              `}
              onWheel={onWheel}
              onDoubleClick={onDoubleClick}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div
                className="absolute inset-0 will-change-transform transition-transform duration-100 ease-out"
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              >
                <Image
                  src={scheduleImages[modalIndex].src}
                  alt={scheduleImages[modalIndex].alt}
                  fill
                  className="object-contain pointer-events-none select-none"
                  sizes="(max-width: 1200px) 96vw, 1200px"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
