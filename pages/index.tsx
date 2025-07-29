import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactFullpage from "@fullpage/react-fullpage";

export default function Home() {
  const sectionNames = [
    "메인",
    "사업 개요",
    "입지 안내",
    "세대 타입 안내",
    "분양 일정",
    "문의",
  ];

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
        <meta property="og:url" content="https://cube360.vercel.app/" />
      </Head>
      <ReactFullpage
        credits={{ enabled: false }}
        scrollingSpeed={900}
        navigation
        navigationTooltips={sectionNames}
        showActiveTooltip
        anchors={[
          "hero",
          "overview",
          "location",
          "unit",
          "schedule",
          "inquiry",
        ]}
        render={({ fullpageApi }) => (
          <ReactFullpage.Wrapper>
            {/* Hero */}
            <section
              className="section hero-drone w-screen h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{
                backgroundImage: "url(/images/hero-drone.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 bg-black/60 z-0" /> {/* 어둡게 */}
              <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] mb-7 tracking-tight">
                  단양의 미래, <span className="text-[#53a3ff]">CUBE360</span>
                </h1>
                <p className="text-2xl md:text-3xl text-white font-semibold mb-10 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                  자연과 혁신이 만나는 곳,<br />
                  프리미엄 라이프스타일을 누려보세요.
                </p>
                <Link
                  href="#inquiry"
                  onClick={e => {
                    e.preventDefault();
                    fullpageApi.moveTo("inquiry");
                  }}
                  className="bg-[#53a3ff] hover:bg-[#2267b7] text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-2xl transition-all tracking-wide"
                >
                  분양 문의하기
                </Link>
              </div>
            </section>

            {/* 사업 개요 */}
            <section className="section w-screen h-screen flex flex-col justify-center items-center bg-[#f8fafc]">
              <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-20 px-6">
                <div className="flex-1 space-y-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d283a] mb-6">사업 개요</h2>
                  <ul className="space-y-3 text-[1.22rem] text-[#444] font-medium">
                    <li>
                      <span className="font-bold text-[#111]">위치:</span> 단양군 중심가 핵심 입지
                    </li>
                    <li>
                      <span className="font-bold text-[#111]">규모:</span> 총 250세대, 2개동
                    </li>
                    <li>
                      <span className="font-bold text-[#111]">전용면적:</span> 84㎡, 101㎡ 타입
                    </li>
                    <li>
                      <span className="font-bold text-[#111]">특장점:</span> 전세대 남향, 자연조망, 프리미엄 커뮤니티
                    </li>
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <Image
                    src="/unit-a.jpg"
                    alt="프리미엄 단지 조감도"
                    width={410}
                    height={300}
                    className="rounded-2xl shadow-2xl border"
                    priority
                  />
                </div>
              </div>
            </section>

            {/* 입지 안내 */}
            <section className="section w-screen h-screen flex flex-col justify-center items-center bg-[#eef3f7]">
              <div className="max-w-5xl w-full px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d283a] mb-10">입지 안내</h2>
                <div className="w-full h-[32rem] rounded-2xl overflow-hidden border shadow-2xl">
                  <iframe
                    src="https://map.naver.com/p?c=15.00,0,0,0,dh"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    title="네이버 지도"
                  />
                </div>
                <div className="text-center mt-6 text-gray-500 text-base">
                  ※ 실제 위치 좌표로 링크 수정 필요
                </div>
              </div>
            </section>

            {/* 세대 타입 안내 */}
            <section className="section w-screen h-screen flex flex-col justify-center items-center bg-[#f8fafc]">
              <div className="max-w-5xl w-full px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d283a] mb-12 text-center">세대 타입 안내</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border">
                    <Image
                      src="/unit-a.jpg"
                      alt="84㎡ 타입"
                      width={330}
                      height={200}
                      className="rounded-xl mb-4"
                    />
                    <h3 className="text-2xl font-bold text-[#1d283a] mb-3">84㎡ 타입</h3>
                    <ul className="text-gray-700 text-lg mb-2 text-center font-medium">
                      <li>실용적 4Bay 구조</li>
                      <li>대형 팬트리·드레스룸</li>
                      <li>남향 위주 배치</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border">
                    <Image
                      src="/unit-b.jpg"
                      alt="101㎡ 타입"
                      width={330}
                      height={200}
                      className="rounded-xl mb-4"
                    />
                    <h3 className="text-2xl font-bold text-[#1d283a] mb-3">101㎡ 타입</h3>
                    <ul className="text-gray-700 text-lg mb-2 text-center font-medium">
                      <li>광폭 거실, 프라이빗 욕실</li>
                      <li>넓은 발코니 & 대형 수납</li>
                      <li>커뮤니티 시설 인접</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 분양 일정 */}
            <section className="section w-screen h-screen flex flex-col justify-center items-center bg-[#eef3f7]">
              <div className="max-w-4xl w-full px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d283a] mb-9 text-center">분양 일정</h2>
                <ul className="flex flex-col md:flex-row justify-center gap-16 text-xl text-center">
                  <li>
                    <div className="font-semibold mb-2 text-[#1d283a]">청약 접수</div>
                    <div className="text-[#53a3ff] font-extrabold text-2xl">2025. 9. 1 ~ 9. 3</div>
                  </li>
                  <li>
                    <div className="font-semibold mb-2 text-[#1d283a]">당첨자 발표</div>
                    <div className="text-[#53a3ff] font-extrabold text-2xl">2025. 9. 6</div>
                  </li>
                  <li>
                    <div className="font-semibold mb-2 text-[#1d283a]">계약 기간</div>
                    <div className="text-[#53a3ff] font-extrabold text-2xl">2025. 9. 10 ~ 9. 12</div>
                  </li>
                </ul>
              </div>
            </section>

            {/* 문의 폼 */}
            <section className="section w-screen h-screen flex flex-col justify-center items-center bg-[#f8fafc]">
              <div className="max-w-2xl w-full px-6">
                <div className="bg-white p-12 rounded-3xl shadow-2xl border">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-[#1d283a]">
                    분양 문의
                  </h2>
                  <form className="space-y-7">
                    <input
                      type="text"
                      placeholder="이름"
                      className="w-full border rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#53a3ff] transition placeholder:text-gray-500 text-[#222] font-medium"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="연락처"
                      className="w-full border rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#53a3ff] transition placeholder:text-gray-500 text-[#222] font-medium"
                      required
                    />
                    <select
                      className="w-full border rounded-xl px-5 py-4 text-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#53a3ff] placeholder:text-gray-500 text-[#222] font-medium"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        관심 타입 선택
                      </option>
                      <option value="84">84㎡</option>
                      <option value="101">101㎡</option>
                      <option value="미정">미정</option>
                    </select>
                    <textarea
                      placeholder="문의 내용"
                      rows={4}
                      className="w-full border rounded-xl px-5 py-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#53a3ff] transition placeholder:text-gray-500 text-[#222] font-medium"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#53a3ff] hover:bg-[#2267b7] text-white text-xl font-bold py-4 rounded-xl transition shadow-lg"
                    >
                      문의하기
                    </button>
                  </form>
                  <div className="mt-7 flex justify-center gap-4">
                    <a
                      href="https://pf.kakao.com/_ixkQpb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fae100] font-bold px-5 py-3 bg-gray-900 rounded-xl flex items-center gap-2 hover:bg-[#3c1e1e] transition text-lg"
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 5.825 2 10.11c0 2.533 1.722 4.82 4.46 6.228-.203.693-.734 2.501-.851 2.947 0 0-.017.16.084.22.101.06.23-.016.23-.016.304-.043 3.278-2.15 3.824-2.541.745.11 1.516.17 2.253.17 5.523 0 10-3.825 10-8.11C22 5.825 17.523 2 12 2Z" fill="#fae100"/></svg>
                      카카오톡 문의
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </ReactFullpage.Wrapper>
        )}
      />
    </>
  );
}
