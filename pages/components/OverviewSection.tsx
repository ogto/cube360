import { motion } from "framer-motion";

export default function OverviewSection() {
  // 카드 데이터
  const cardList = [
    { img: "/images/dodam.jpg", label: "도담삼봉" },
    { img: "/images/gosu.jpg", label: "고수동굴" },
    { img: "/images/guinsa.jpg", label: "구인사" },
    { img: "/images/skywalk.jpg", label: "만천하스카이워크" },
    { img: "/images/ondal.jpg", label: "온달관광지" },
    { img: "/images/paral.jpg", label: "패러글라이딩" },
    { img: "/images/rafting.jpg", label: "래프팅·카약" },
    { img: "/images/garlic.jpg", label: "단양마늘" },
  ];

  return (
    <section
      id="overview"
      className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* 흐릿+오버레이 배경 */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/two-sec.jpg"
          alt="단양 풍경 배경"
          className="w-full h-full object-cover brightness-80"
          draggable={false}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-8 md:gap-10 px-3 sm:px-6 py-10 md:py-16">
        {/* 1. 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
          className="text-center space-y-2 mb-3 md:space-y-3 md:mb-5"
        >
          <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            단양 프리미엄 입지환경
          </div>
          <div
            className="text-base xs:text-lg sm:text-xl font-light text-white bg-[#53a3ff] inline-block px-4 xs:px-6 py-1 rounded-full shadow-md mt-2 md:mt-3 drop-shadow"
            style={{ letterSpacing: "0.07em" }}
          >
            NATURE · TOURISM · LIFESTYLE
          </div>
        </motion.div>

        {/* 2. 접근성 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.3, delay: 0.13, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-center gap-5 md:gap-10 lg:gap-16 items-center"
        >
          {[
            { title: "KTX 청량리", value: "1시간 30분" },
            { title: "중부내륙고속도로", value: "서울 1시간 40분" },
            { title: "원주/제천 인접", value: "40분 이내" },
          ].map((el, i) => (
            <div key={el.title} className="flex flex-col items-center flex-1 min-w-[110px]">
              <div className="text-base xs:text-lg md:text-xl font-normal text-white bg-[#53a3ff] rounded-lg px-4 md:px-5 py-2 mb-2 shadow">
                {el.title}
              </div>
              <div className="text-lg xs:text-xl md:text-2xl lg:text-3xl font-normal text-white drop-shadow">
                {el.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* 3. 지역특산·자연·문화 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, delay: 0.22, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6 my-5 md:my-6"
        >
          <div className="text-center md:text-left flex-1 text-lg xs:text-xl md:text-2xl font-normal text-white">
            단양만의 풍부한
            <br className="md:hidden" />
            <span className="text-white font-normal"> 자연 & 문화관광 인프라</span>
          </div>
          <div className="hidden md:block flex-1 h-[2px] bg-[#b6d8f8] rounded-full mx-2" />
          <div className="text-center md:text-right flex-1 text-sm xs:text-base md:text-lg font-light text-[#e8f2fa] drop-shadow">
            남한강, 소백산, 온달동굴, 마늘 등 단양만의 명소·명물
          </div>
        </motion.div>

        {/* 4. 단양8경/주요관광지 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
        >
          {cardList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, delay: 0.23 + idx * 0.11, ease: "easeOut" }}
              className="flex flex-col items-center bg-white/90 rounded-2xl shadow-lg border p-2 xs:p-3 hover:shadow-2xl transition min-w-0"
            >
              <div
                className="
                  w-full h-[90px] xs:h-[110px] sm:h-[120px] md:h-[130px]
                  rounded-xl bg-center bg-cover mb-2
                "
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              />
              <div className="text-sm xs:text-base md:text-lg font-normal text-[#2267b7] text-center">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
