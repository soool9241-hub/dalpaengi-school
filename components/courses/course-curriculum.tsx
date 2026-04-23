type Session = {
  time: string;
  title: string;
  desc?: string[];
};

type Props = {
  title?: string;
  sessions: Session[];
};

// 코스 커리큘럼 - 시간대별 리스트 (3/6/24시간 공통)
export function CourseCurriculum({ title = "커리큘럼", sessions }: Props) {
  return (
    <section className="section-padding-sm bg-white">
      <div className="container-narrow">
        <div className="text-center mb-10 space-y-2">
          <p className="text-sm text-muted-foreground tracking-widest uppercase">
            Curriculum
          </p>
          <h2 className="headline-md">{title}</h2>
        </div>

        <ol className="space-y-4">
          {sessions.map((s, i) => (
            <li
              key={i}
              className="flex gap-4 p-5 rounded-2xl bg-brand-paper border border-brand-line"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green/10 text-brand-green-dark flex items-center justify-center text-xs font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-xs text-brand-green-dark font-semibold">
                  {s.time}
                </p>
                <p className="font-semibold">{s.title}</p>
                {s.desc && s.desc.length > 0 && (
                  <ul className="pt-1 space-y-0.5 text-sm text-muted-foreground">
                    {s.desc.map((d, di) => (
                      <li key={di}>· {d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
