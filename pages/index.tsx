import Head from "next/head";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HeroSection2 from "./components/HeroSection2";
import HeroSection3 from "./components/HeroSection3";
import OverviewSection from "./components/OverviewSection";
import LocationSection from "./components/LocationSection";
import UnitSection from "./components/UnitSection";
import ScheduleSection from "./components/ScheduleSection";
import InquirySection from "./components/InquirySection";

export default function Home() {


  return (
    <>
      <Head>
        <title>CUBE360 | 단양 프리미엄 분양</title>
        <meta
          name="description"
          content="단양의 미래가치를 담은 프리미엄 분양, cube360에서 확인하세요."
        />
        <meta property="og:title" content="CUBE360 단양 분양" />
        <meta
          property="og:description"
          content="자연과 혁신이 공존하는 단양 cube360 프리미엄 주거"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cube360.kr" />
      </Head>

      {/* 글로벌 스타일: 스크롤 스무스 + 가로 스크롤 방지 + 배경 애니메이션 */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .vh-screen { min-height: 100vh; }

        @keyframes drone-pan {
          0% { background-position-y: top; }
          100% { background-position-y: bottom; }
        }
        .hero-drone {
          animation: drone-pan 25s linear infinite;
          background-size: cover;
          background-position-x: center;
          background-position-y: top;
          background-repeat: no-repeat;
        }
      `}</style>

      <Header />
      <main className="w-full">
        {/* main */}
        <HeroSection />
        <HeroSection2 />
        <HeroSection3 />

        {/* 입지 환경*/}
        <OverviewSection />

        {/* 커뮤니티 */}
        <LocationSection />

        {/* 객실 타입 안내 */}
        <UnitSection />

        {/* 분양 일정 */}
        {/* <ScheduleSection /> */}
        {/* 문의 폼 */}
        <InquirySection />
      </main>
    </>
  );
}
