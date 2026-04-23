// 솔 1인칭 소개 — 따뜻한 톤
export function Host() {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid md:grid-cols-[200px_1fr] gap-10 items-start">
          <div className="w-48 h-48 rounded-2xl overflow-hidden mx-auto md:mx-0 bg-brand-green/10 flex items-center justify-center">
            <span className="text-7xl">🐌</span>
          </div>
          <div className="space-y-5 text-base md:text-lg leading-relaxed">
            <p>안녕하세요, 솔이에요. 🐌</p>
            <p>
              전북 완주에서 <b>60평 펜션</b>이랑{" "}
              <b>120평 CNC 공방</b>을 7년째 운영하고 있어요.
              에어비앤비 평점 5.0, 7000명 넘는 게스트를 호스팅했어요.
            </p>
            <p>
              3년 전에 AI 자동화를 시작했고, 지금은 예약·결제·고객관리·마케팅까지
              거의 다 시스템이 알아서 해요.
            </p>
            <p>
              이걸 혼자 하면서 느꼈어요 —
              <br />
              <b>&ldquo;같이 했으면 훨씬 빨랐을 텐데.&rdquo;</b>
            </p>
            <p>
              그래서 이 멤버십을 만들었어요. 같은 고민을 가진 사람들이 모여서,
              매달 하나씩 함께 만들어가는 거예요.
            </p>
            <p className="text-brand-green-dark font-medium">
              느리더라도 멈추지 않으면 도착해요. 🐌
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
