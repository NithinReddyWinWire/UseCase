import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

function HomePage() {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  const account = instance.getActiveAccount() ?? accounts[0];

  console.log("MSAL account:", account);
  console.log("ID token claims:", account?.idTokenClaims);

  const firstName = (account?.idTokenClaims?.name as string) || "User";

  const roles = (account?.idTokenClaims?.roles as string[]) || [];
  const isAdmin = roles.includes("Admin");
  
  

  return (
  <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FCFBF8] px-8 py-8 sm:px-16 sm:py-10">

    {/* Background texture */}
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #24558F 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
    </div>

    {/* Top bar */}
    <div className="relative z-10 mb-10 flex items-center justify-between sm:mb-12">

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043277] shadow-md shadow-[#043277]/20">
          <span className="font-dm-sans text-lg font-bold text-white">
            WR
          </span>
        </div>

        <span className="font-fraunces text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
          WinReview
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-dm-sans text-sm text-[#666666]">
          Hi, {firstName}
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DCE6F2] font-dm-sans text-sm font-medium text-[#043277] ring-2 ring-white">
          {firstName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>

    {/* Main content */}
    <div className="relative z-10 flex flex-1 flex-col justify-center">
      <div className="mx-auto w-full max-w-4xl">

        <h1 className="mb-2 font-fraunces text-4xl font-semibold tracking-tight text-[#111111] sm:text-5xl">
          Your Word matters
        </h1>

        <p className="mb-10 font-dm-sans text-base text-[#666666] sm:text-lg">
          Choose an action below to get started.
        </p>

        {/* Cards */}
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">

          {/* Write a review */}
          <button
            type="button"
            onClick={() => navigate("/writeReview")}
            className="group flex flex-col rounded-3xl border border-[#F7DCD8] bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#E99A8F] hover:shadow-xl hover:shadow-[#BF230D]/10 sm:p-9"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDF3F1]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-7 w-7 text-[#BF230D]"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487a2.06 2.06 0 1 1 2.914 2.914L8.5 18.677l-4 1 1-4 11.362-11.19Z"
                />
              </svg>
            </div>

            <span className="mb-1.5 font-dm-sans text-xl font-semibold text-[#111111]">
              Write a review
            </span>

            <span className="font-dm-sans text-sm leading-relaxed text-[#666666]">
              Share feedback on a project or teammate.
            </span>

            <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F7DCD8] px-3 py-1 font-dm-sans text-xs font-semibold text-[#BF230D]">
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
            className="group flex flex-col rounded-3xl border border-[#E5E7EB] bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#7191B5] hover:shadow-xl hover:shadow-[#043277]/10 sm:p-9"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#043277]">
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
                  d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.008v.008H3.75V6.75Zm0 5.25h.008v.008H3.75V12Zm0 5.25h.008v.008H3.75V17.25Z"
                />
              </svg>
            </div>

            <span className="mb-1.5 font-dm-sans text-xl font-semibold text-[#111111]">
              See my reviews
            </span>

            <span className="font-dm-sans text-sm leading-relaxed text-[#666666]">
              View feedback written about you.
            </span>

            <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F2F6FA] px-3 py-1 font-dm-sans text-xs font-semibold text-[#043277]">
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

          {/* Approve Reviews */}
          {isAdmin && (
            <button
              type="button"
              className="group flex flex-col rounded-3xl border border-[#E5E7EB] bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#7191B5] hover:shadow-xl hover:shadow-[#043277]/10 sm:p-9"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#043277]">
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
                    d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>

              <span className="mb-1.5 font-dm-sans text-xl font-semibold text-[#111111]">
                Approve feedbacks
              </span>

              <span className="font-dm-sans text-sm leading-relaxed text-[#666666]">
                Review and approve feedback submitted by users.
              </span>

              <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F2F6FA] px-3 py-1 font-dm-sans text-xs font-semibold text-[#043277]">
                Review all

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
          )}
        </div>

        {/* Status strip */}
        <div className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-5 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className="h-5 w-5 flex-shrink-0 text-[#24558F]"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <p className="font-dm-sans text-sm text-[#666666]">
            You have{" "}
            <span className="font-medium text-[#111111]">
              2 reviews
            </span>{" "}
            awaiting admin approval
          </p>
        </div>

      </div>
    </div>
  </div>
);

}



export default HomePage;