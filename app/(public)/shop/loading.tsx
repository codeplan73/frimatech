export default function ShopLoading() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#345B58] via-[#345B58] to-[#2a8a7e] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-white/10" />
          <div className="mx-auto mt-4 h-5 w-80 animate-pulse rounded bg-white/10" />
        </div>
      </section>
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({length: 8}).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="aspect-square animate-pulse rounded-t-2xl bg-slate-100" />
                <div className="space-y-2 p-4">
                  <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-5 w-20 animate-pulse rounded bg-slate-100" />
                  <div className="h-9 w-full animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
