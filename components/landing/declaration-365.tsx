// v6 시그니처 선언문 #1 · "우리는 365일간 만들고/팔고/공유합니다"
export function Declaration365() {
  return (
    <section className="section-padding">
      <div className="container-narrow text-center space-y-8">
        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          우리가 매일 하는 일
        </p>
        <h2 className="headline-md leading-relaxed">
          우리는 365일간,
          <br />
          사람들이 사랑하는 서비스를
          <br />
          <span className="text-brand-green-dark font-bold">
            만들고 · 팔고 · 공유합니다.
          </span>
        </h2>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-8">
          <div className="space-y-2">
            <div className="text-3xl">🔨</div>
            <p className="text-sm font-medium">만들고</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">💰</div>
            <p className="text-sm font-medium">팔고</p>
          </div>
          <div className="space-y-2">
            <div className="text-3xl">🤝</div>
            <p className="text-sm font-medium">공유합니다</p>
          </div>
        </div>
      </div>
    </section>
  );
}
