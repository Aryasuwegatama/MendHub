export default function ProviderRouteLoading() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="rounded-[2rem] border border-white/20 bg-white/55 p-8 dark:border-white/10 dark:bg-slate-950/42">
          <div className="h-4 w-36 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-5 h-12 w-full max-w-2xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-5 w-full max-w-3xl rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-5 w-full max-w-2xl rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/20 bg-white/55 p-8 dark:border-white/10 dark:bg-slate-950/42">
              <div className="h-8 w-56 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-5 h-5 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-5 w-11/12 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="h-28 rounded-[1.5rem] bg-slate-200 dark:bg-slate-800" />
                <div className="h-28 rounded-[1.5rem] bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/20 bg-white/55 p-8 dark:border-white/10 dark:bg-slate-950/42">
              <div className="h-8 w-40 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="mt-6 space-y-4">
                <div className="h-24 rounded-[1.5rem] bg-slate-200 dark:bg-slate-800" />
                <div className="h-24 rounded-[1.5rem] bg-slate-200 dark:bg-slate-800" />
                <div className="h-24 rounded-[1.5rem] bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-44 rounded-[2rem] border border-white/20 bg-white/55 dark:border-white/10 dark:bg-slate-950/42" />
            <div className="h-44 rounded-[2rem] border border-white/20 bg-white/55 dark:border-white/10 dark:bg-slate-950/42" />
            <div className="h-72 rounded-[2rem] border border-white/20 bg-white/55 dark:border-white/10 dark:bg-slate-950/42" />
          </div>
        </div>
      </div>
    </div>
  );
}