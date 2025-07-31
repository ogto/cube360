export default function InquirySection() {
  return (
        <section
          id="inquiry"
          className="vh-screen w-full flex flex-col justify-center items-center bg-[#f8fafc]"
        >
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
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.477 2 2 5.825 2 10.11c0 2.533 1.722 4.82 4.46 6.228-.203.693-.734 2.501-.851 2.947 0 0-.017.16.084.22.101.06.23-.016.23-.016.304-.043 3.278-2.15 3.824-2.541.745.11 1.516.17 2.253.17 5.523 0 10-3.825 10-8.11C22 5.825 17.523 2 12 2Z" fill="#fae100"/>
                  </svg>
                  카카오톡 문의
                </a>
              </div>
            </div>
          </div>
        </section>
  );
}