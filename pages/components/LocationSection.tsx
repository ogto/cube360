import RoundImageCard from "./RoundImageCard";

const communityList = [
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e3a84c6ba_800.jpg",
    title: "규모",
    desc: "수익을 보장하는 충북 최대 규모의 27세대 풀빌라 세컨하우스",
  },
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e72a4a0a5_800.jpg",
    title: "위치",
    desc: "ㄷ단양을 감싸는 국도 36호선에 접하는 단지 조성",
  },
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e741b8ac1_800.jpg",
    title: "관광",
    desc: "ㅅ수상 레져 시설의 개발로 수변 광관 인구 대거 유입",
  },
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e741cca2b_800.jpg",
    title: "정책적 혜택",
    desc: "사업지의 용도지역 변경으로 지가 상승, 인구감소지역 지정으로 인한 세제 혜택: 2주택자 해당X",
  },
];

export default function LocationSection() {
  return (
    <section
      id="location"
      className="w-full min-h-screen flex flex-col justify-center items-center bg-[#fffaf5] px-0"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-full max-w-[1440px] px-2 md:px-8 lg:px-20 xl:px-0 mx-auto flex flex-col flex-1 justify-center pt-10 sm:pt-16 pb-16 sm:pb-24 lg:pb-36">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-normal mb-16 mt-4 xl:mt-0 text-center tracking-tight"
          style={{ fontFamily: "Nanum Myeongjo, serif", color: "#ff8800ff" }}
        >
          COMMUNITY
        </h1>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal mb-16 mt-4 xl:mt-0 text-center tracking-tight"
          style={{ fontFamily: "Nanum Myeongjo, serif", color: "#274777" }}
        >
          커뮤니티 시설 안내
        </h2>

        <div
          className="
            grid w-full
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-2
            xl:grid-cols-4
            gap-y-24 gap-x-14
            px-2 sm:px-4 md:px-0
            place-items-center
          "
        >
          {communityList.map((item, i) => (
            <RoundImageCard
              key={i}
              img={item.img}
              title={item.title}
              desc={item.desc}
              delay={0.14 * i}
              sizeMobile={210}
              sizeDesktop={340}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
