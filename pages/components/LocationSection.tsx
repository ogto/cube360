import RoundImageCard from "./RoundImageCard";

const communityList = [
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e3a84c6ba_800.jpg",
    title: "3단 인피니티풀",
    desc: "발리 카욘리조트를 재현한 인피니티풀",
  },
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e72a4a0a5_800.jpg",
    title: "국내 최초 숲 속의 인공 서핑장",
    desc: "전문제작사가 만드는 최첨단 서핑 머신",
  },
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e741b8ac1_800.jpg",
    title: "반려동물 동반 객실 운영",
    desc: "내 사랑하는 반려견과 함께 즐기는 여행",
  },
  {
    img: "https://cdn.quv.kr/yaujy0573/up/65f3e741cca2b_800.jpg",
    title: "풀파티 운영",
    desc: "특급 호텔 수준의 풀파티",
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
