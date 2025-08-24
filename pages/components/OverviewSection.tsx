import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import NaverMapBox from "./NaverMapBox";

function getLineCoord(angle: number, r: number, center: number) {
  // 각도(deg), 반지름(r), 중심 좌표(center) => x, y 반환
  const rad = (angle * Math.PI) / 180;
  return {
    x: center + r * Math.cos(rad),
    y: center + r * Math.sin(rad),
  };
}

export default function OverviewSection() {
  // 반응형: 실제 표시 크기 계산
  const [svgSize, setSvgSize] = useState(800);

  useEffect(() => {
    function handleResize() {
      // 모바일 360~430, PC는 600~800 등 비율에 맞춰서
      const w = window.innerWidth;
      let size = 800;
      if (w < 500) size = Math.max(w - 40, 320);
      else if (w < 900) size = 600;
      else size = 800;
      setSvgSize(size);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // svgSize에 비례해서 크기 지정
  const center = svgSize / 2;
  const innerR = svgSize * 0.11; // 원 크기 비율
  const outerR = svgSize * 0.35;
  const labelGap = svgSize * 0.055;
  const fontSize = svgSize * 0.03;

  const labels = [
    { lines: ["단양시내", "7분"], angle: -135 },
    { lines: ["수양개빛터널", "10분"], angle: -45 },
    { lines: ["도담삼봉", "10분"], angle: 45 },
    { lines: ["온달 관광지", "15분"], angle: 90 },
    { lines: ["스카이워크", "13분"], angle: 135 },
  ];

  // 줄 간격(필요 시 1.45~1.6에서 미세조정)
  const lineHeight = fontSize * 1.55;

  // ▼ 중앙 텍스트 BBox 측정용 (그룹 단위)
  const centerTextGRef = useRef<SVGGElement | null>(null);
  const [textOffset, setTextOffset] = useState({ x: center, y: center });

  useLayoutEffect(() => {
    const measure = () => {
      const g = centerTextGRef.current;
      if (!g) return;
      const b = g.getBBox(); // 실제 렌더 박스
      setTextOffset({
        x: center - (b.x + b.width / 2),
        y: center - (b.y + b.height / 2),
      });
    };
    measure();

    // 웹폰트 로딩 이후 재측정
    const fonts: any = (document as any).fonts;
    if (fonts?.ready) fonts.ready.then(measure);

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [center, svgSize, fontSize, lineHeight]);

  return (
    <section
      id="overview"
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/two-sec.jpg"
          alt="단양 풍경 배경"
          className="w-full h-full object-cover brightness-75"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="w-full max-w-7xl flex flex-col gap-20 px-6 py-20 text-white">
        {/* 1. 위치 설명 */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2 }}
            className="flex-1 text-left space-y-4 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">위치</h2>
            <h4>(충청북도 단양군 단성면 외중방리 산 34번지 일원)</h4>
            <p className="text-xl md:text-2xl font-medium">
              <span className="inline-block mr-2 text-6xl">➝</span>
            </p>
          </motion.div>

          <div className="flex-1 w-full min-h-[260px] md:min-h-[320px] flex items-center justify-center">
            <div className="w-full h-[260px] md:h-[360px]">
              <NaverMapBox />
            </div>
          </div>
        </div>

        {/* 2. 도로 접근 (카드형, 반투명 박스 + 폰트/간격 업) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-8"
        >
          {[
            { from: "동서울 IC", via: "중부고속도로", time: "1.5 Hour" },
            { from: "대전", via: "중부고속도로", time: "2.0 Hour" },
            { from: "수원신갈 IC", via: "경부고속도로", time: "1.5 Hour" },
          ].map(({ from, via, time }) => (
            <div
              key={from}
              className="
                min-w-[260px] max-w-[320px]
                px-8 py-6 md:px-10 md:py-8
                rounded-3xl text-center
                bg-black/45 backdrop-blur-sm
                ring-1 ring-blue-300/40
                shadow-xl shadow-black/30
              "
            >
              <div className="text-white font-semibold text-2xl md:text-3xl leading-snug">
                <span className="font-bold">{from}</span>
                <span className="mx-2">➝</span>
                <span>{via}</span>
              </div>
              <div className="mt-3 text-white/85 text-lg md:text-xl">{time}</div>
            </div>
          ))}
        </motion.div>

        {/* 3. 중심 원 + 방사형 라벨 */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative w-full flex items-center justify-center"
        >
          <svg
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="w-full max-w-[800px] h-auto"
            style={{ aspectRatio: "1" }}
          >
            <defs>
              <radialGradient id="circle-gradient" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0ada37ff" />
                <stop offset="100%" stopColor="#c5dd12ff" />
              </radialGradient>
              <marker
                id="arrow"
                markerWidth={svgSize * 0.016}
                markerHeight={svgSize * 0.016}
                refX={svgSize * 0.008}
                refY={svgSize * 0.008}
                orient="auto"
              >
                <polygon
                  points={`0,0 ${svgSize * 0.016},${svgSize * 0.008} 0,${svgSize * 0.016}`}
                  fill="white"
                />
              </marker>
            </defs>

            <circle
              cx={center}
              cy={center}
              r={innerR}
              fill="url(#circle-gradient)"
              stroke="white"
              strokeWidth={svgSize * 0.01}
            />

            <g ref={centerTextGRef} transform={`translate(${textOffset.x}, ${textOffset.y})`}>
              <text
                fill="white"
                fontSize={fontSize * 1.65}
                fontWeight="bold"
                textAnchor="middle"
                style={{ pointerEvents: "none" }}
              >
                <tspan x="0" dy="0">단양</tspan>
                <tspan x="0" dy={lineHeight}>동화마을</tspan>
              </text>
            </g>

            {labels.map(({ lines, angle }) => {
              const from = getLineCoord(angle, innerR, center);
              const to = getLineCoord(angle, outerR, center);
              const labelPos = getLineCoord(angle, outerR + labelGap, center);
              let anchor: "start" | "middle" | "end" = "middle";
              if (angle < -60 || angle > 60) anchor = "end";
              if (angle > -60 && angle < 60) anchor = "start";
              if (angle === 90) anchor = "middle";

              return (
                <g key={lines.join("-")}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="white"
                    strokeWidth={svgSize * 0.002}
                    markerEnd="url(#arrow)"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    fontSize={fontSize}
                    fill="white"
                    textAnchor={anchor}
                    alignmentBaseline="middle"
                    paintOrder="stroke"
                    stroke="black"
                    strokeWidth={svgSize * 0.002}
                    fontWeight="bold"
                  >
                    <tspan x={labelPos.x} dy="0">{lines[0]}</tspan>
                    <tspan x={labelPos.x} dy={fontSize * 1.2}>{lines[1]}</tspan>
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div> */}
      </div>
    </section>
  );
}
