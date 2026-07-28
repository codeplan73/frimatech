export default function PostsLoading() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <div className="mx-auto h-10 w-64 animate-pulse rounded bg-white/10" />
          <div className="mx-auto mt-4 h-5 w-96 animate-pulse rounded bg-white/10" />
        </div>
      </section>
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 6}).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="aspect-[3/2] animate-pulse rounded-t-2xl bg-slate-100" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-20 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-5 w-full animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
