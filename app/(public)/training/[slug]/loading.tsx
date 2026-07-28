export default function TrainingDetailLoading() {
  return (
    <>
      <section className="bg-white pb-0 pt-8 lg:pt-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
        </div>
      </section>
      <section className="bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-8 aspect-[2/1] animate-pulse rounded-2xl bg-slate-100" />
          <div className="mb-4 flex gap-3">
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
            <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="mb-6 h-10 w-3/4 animate-pulse rounded bg-slate-100" />
          <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 p-6 sm:grid-cols-3">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-5 w-5 animate-pulse rounded bg-slate-100" />
                <div className="space-y-1">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({length: 6}).map((_, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-slate-100"
                style={{width: `${80 + Math.random() * 20}%`}}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
