export default function PostLoading() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-6 h-4 w-24 animate-pulse rounded bg-white/10" />
          <div className="mb-4 h-5 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-white/10" />
          <div className="h-4 w-64 animate-pulse rounded bg-white/10" />
        </div>
      </section>
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-12 aspect-[2/1] animate-pulse rounded-2xl bg-slate-100" />
          <div className="space-y-3">
            {Array.from({length: 8}).map((_, i) => (
              <div
                key={i}
                className="h-4 animate-pulse rounded bg-slate-100"
                style={{width: `${85 + Math.random() * 15}%`}}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
