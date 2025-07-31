export default function ScheduleSection() {
  return (
            <section
          id="schedule"
          className="vh-screen w-full flex flex-col justify-center items-center bg-[#eef3f7]"
        >
          <div className="max-w-4xl w-full px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1d283a] mb-9 text-center">
              분양 일정
            </h2>
            <ul className="flex flex-col md:flex-row justify-center gap-16 text-xl text-center">
              <li>
                <div className="font-semibold mb-2 text-[#1d283a]">청약 접수</div>
                <div className="text-[#53a3ff] font-extrabold text-2xl">
                  2025. 9. 1 ~ 9. 3
                </div>
              </li>
              <li>
                <div className="font-semibold mb-2 text-[#1d283a]">당첨자 발표</div>
                <div className="text-[#53a3ff] font-extrabold text-2xl">2025. 9. 6</div>
              </li>
              <li>
                <div className="font-semibold mb-2 text-[#1d283a]">계약 기간</div>
                <div className="text-[#53a3ff] font-extrabold text-2xl">
                  2025. 9. 10 ~ 9. 12
                </div>
              </li>
            </ul>
          </div>
        </section>
  );
}