"use client";

import RoundImageCard from "./RoundImageCard";

const communityList = [
  {
    img: "/images/location/1.jpg",
    title: "규모",
    subtitle: "[충북 최대 체류 시설]",
    desc: "정주인과 관광객 모두가\n주목하는 충북 최대 규모의\n27세대 풀빌라 세컨하우스",
  },
  {
    img: "/images/location/2.png",
    title: "관광",
    subtitle: "[지역관광발전지수 1등급]",
    desc: "남한강변 수상 레져 시설의\n개발로 천혜의 자연 속\n수변 관광 인구 대거 유입 예상",
  },
  {
    img: "/images/location/3.png",
    title: "위치",
    subtitle: "[주요 지역까지 15분 이내]",
    desc: "단양을 감싸는 국도 36호선에\n접하는 단지 조성\n단양군청과 충주호 등 인접",
  },
  {
    img: "/images/location/4.png",
    title: "정책적 혜택",
    subtitle: "[지가상승으로 가치UP]",
    desc: "용도지역 변경과\n인구감소지역 지정\n> 2주택자 해당X",
  },
];

export default function LocationSection() {
  return (
    <section
      id="location"
      className="w-full min-h-screen flex flex-col justify-center items-center bg-[#fffaf5] px-0"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full max-w-[1840px] px-2 md:px-8 lg:px-20 xl:px-0 mx-auto flex flex-col flex-1 justify-center pt-10 sm:pt-16 pb-16 sm:pb-24 lg:pb-36">
        {/* <h1
          className="text-3xl sm:text-4xl md:text-5xl font-normal mb-6 text-center tracking-tight"
          style={{ fontFamily: "Nanum Myeongjo, serif", color: "#ff8800ff" }}
        >
          COMMUNITY
        </h1> */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-normal mb-16 text-center tracking-tight"
          style={{ fontFamily: "Nanum Myeongjo, serif", color: "#274777" }}
        >
          특장점
        </h2>

        <div
          className="
            grid w-full
            grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4
            gap-y-[144px] gap-x-[84px]
            px-2 sm:px-4 md:px-0
            place-items-center
          "
        >
          {communityList.map((item, i) => (
            <RoundImageCard
              key={i}
              img={item.img}
              title={item.title}
              subtitle={item.subtitle}
              desc={item.desc}
              delay={0.14 * i}
              sizeMobile={210}
              sizeDesktop={340}
              objectFit={i === 3 ? "contain" : "cover"} // ✅ 4번째(인덱스 3)만 contain
            />
          ))}
        </div>
      </div>
    </section>
  );
}
