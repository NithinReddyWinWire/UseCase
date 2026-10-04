
import UserSearch from "../Components/UserSearch";
import ReviewCategories from "../Components/ReviewCategories";
import ProjectSearch from "../Components/ProjectSearch";
import { useState } from "react";

type Category = {
  categoryId: number;
  categoryName: string;
  requiresProject: boolean;
};

function ReviewPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log("Review submitted:", {
      category: selectedCategory,
      review,
    });
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-r from-[#e4fbff] to-[#d5fff9] px-6 py-10 font-['DM_Sans'] text-[#242424] sm:px-10 lg:px-16">
    
    <div className="pointer-events-none absolute inset-0 ">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #FF4500 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
    </div>

      {/* Header */}
      <header className="mb-10">
        <p className="mb-2 text-sm font-medium tracking-wide text-[#6B6B63]">
          WinReview
        </p>

        <h1 className="font-['Fraunces'] text-4xl font-semibold leading-tight tracking-tight text-[#242424] sm:text-5xl">
          Write a Review
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B6B63]">
          Select a user, category, and project where applicable, then share
          your feedback.
        </p>
      </header>

      {/* Selection Section */}
      <section className="w-full">

        <div className="mb-3">
          <h2 className="font-['Fraunces'] text-xl font-medium text-[#242424]">
            Review details
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6  relative rounded-2xl border border-[#E2E0D8] bg-white p-6 md:grid-cols-3">

          {/* User */}
          <div className="min-w-0 p-1">
            <UserSearch
              onUserSelect={(user) => {
                console.log("Selected user:", user); }}/>
          </div>

          {/* Category */}
          <div className="min-w-0">
            <ReviewCategories onCategorySelect={setSelectedCategory}/>
          </div>

          {/* Project */}
          <div className="min-w-0">

            {selectedCategory?.requiresProject ? (
              <ProjectSearch
                onProjectSelect={(project) => {
                  console.log("Selected project:", project);
                }}
              />
            ) :
            
            (
              <div>
                
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Review Section */}
      <section className="mt-10 w-full">

        <div className="mb-3">
          <h2 className="font-['Fraunces'] text-xl font-medium text-[#242424]">
            Your feedback
          </h2>

          <p className="mt-1 text-sm text-[#6B6B63]">
            Share your thoughts about this review.
          </p>
        </div>

        <div className="relative rounded-2xl border border-[#E2E0D8] bg-white p-2">
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="
              min-h-[260px]
              w-full
              resize-y
              rounded-xl
              bg-transparent
              px-4
              py-4
              font-['DM_Sans']
              text-base
              leading-7
              text-[#242424]
              outline-none
              placeholder:text-[#A3A198]
            "
          />
        </div>

      </section>

      {/* Footer / Submit */}
      <div className="mt-6 flex items-center justify-between">

        <p className="text-sm text-[#8A887F]">
          Your review will be submitted for this selection.
        </p>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedCategory || !review.trim()}
          className="
            rounded-lg
            bg-[#061b96]
            px-7
            py-3
            font-['DM_Sans']
            text-sm
            font-semibold
            text-white
            transition
            duration-200
            hover:bg-[#011c3a]
            focus:outline-none
            focus:ring-2
            focus:ring-[#001483]
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-35
          "
        >
          Submit Review
        </button>

      </div>
    </main>
  );
}

export default ReviewPage;

