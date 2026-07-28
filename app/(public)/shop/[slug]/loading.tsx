export default function ProductDetailLoading() {
  return (
    <>
      <section className="bg-white pb-0 pt-8 lg:pt-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
        </div>
      </section>
      <section className="bg-white py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-4 aspect-square animate-pulse rounded-2xl bg-slate-100" />
              <div className="flex gap-3">
                {Array.from({length: 3}).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 w-20 animate-pulse rounded-lg bg-slate-100"
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
              <div className="h-8 w-3/4 animate-pulse rounded bg-slate-100" />
              <div className="h-10 w-32 animate-pulse rounded bg-slate-100" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
              <div className="space-y-2 pt-4">
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
              </div>
              <div className="flex gap-4 pt-6">
                <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-100" />
                <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
