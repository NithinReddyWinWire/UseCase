function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-white px-8 py-8 sm:px-16 sm:py-10">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0E4B8E 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 mb-10 flex items-center justify-between sm:mb-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 shadow-md shadow-blue-900/20">
            <span className="font-dm-sans text-lg font-bold text-white">
              WR
            </span>
          </div>

          <span className="font-fraunces text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            WinReview
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-dm-sans text-sm text-slate-500">
            Hi, Nithu
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-dm-sans text-sm font-medium text-blue-900 ring-2 ring-white">
            N
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="mb-2 font-fraunces text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Your Word matters
          </h1>

          <p className="mb-10 font-dm-sans text-base text-slate-500 sm:text-lg">
            Choose an action below to get started.
          </p>

          {/* Cards */}
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Write a review */}
            <button
              type="button"
              className="group flex flex-col rounded-3xl border-2 border-orange-600 bg-orange-500  p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-200/60 sm:p-9"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff9ea]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-7 w-7 text-amber-500"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487a2.06 2.06 0 1 1 2.914 2.914L8.5 18.677l-4 1 1-4 11.362-11.19Z"
                  />
                </svg>
              </div>

              <span className="mb-1.5 font-dm-sans text-xl font-semibold text-white">
                Write a review
              </span>

              <span className="font-dm-sans text-sm leading-relaxed text-amber-100">
                Share feedback on a project or teammate.
              </span>

              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 font-dm-sans text-xs font-semibold text-orange-700">
                Get started

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>

            {/* See my reviews */}
            <button
              type="button"
              className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 sm:p-9"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-7 w-7 text-white"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.008v.008H3.75V6.75Zm0 5.25h.008v.008H3.75V12Zm0 5.25h.008v.008H3.75v-.008Z"
                  />
                </svg>
              </div>

              <span className="mb-1.5 font-dm-sans text-xl font-semibold text-slate-900">
                See my reviews
              </span>

              <span className="font-dm-sans text-sm leading-relaxed text-slate-500">
                View feedback written about you.
              </span>

              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 font-dm-sans text-xs font-semibold text-blue-900">
                View all

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Status strip */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5 flex-shrink-0 text-slate-400"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p className="font-dm-sans text-sm text-slate-600">
              You have{" "}
              <span className="font-medium text-slate-900">2 reviews</span>{" "}
              awaiting admin approval
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;