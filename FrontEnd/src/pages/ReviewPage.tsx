import UserSearch from "../Components/UserSearch";
import ReviewCategories from "../Components/ReviewCategories";
import ProjectSearch from "../Components/ProjectSearch";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError,} from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

type User = {
  userId: number;
  name: string;
  email: string;
};

type Category = {
  categoryId: number;
  categoryName: string;
  requiresProject: boolean;
};

type Project = {
  projectId: number;
  projectName: string;
};

function ReviewPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");


  const { instance, accounts } = useMsal();

  const getAccessToken = async () => {
    const account = instance.getActiveAccount() ?? accounts[0];

    if (!account) {
      throw new Error("No logged-in Microsoft account found.");
    }

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect({
          ...loginRequest,
          account,
        });

        return "";
      }

      throw error;
    }
  };

  const [submitting, setSubmitting] = useState(false);

  function handleCategorySelect(category: Category | null) {
    setSelectedCategory(category);

    // Clear project when category does not require one
    if (!category?.requiresProject) {
      setSelectedProject(null);
    }
  }

  async function handleSubmit() {
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    if (selectedCategory.requiresProject && !selectedProject) {
      alert("Please select a project.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      setSubmitting(true);

      const token = await getAccessToken();

      const response = await fetch("/Feedback/Feedback/Write", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedbackToUser: selectedUser.userId,
          categoryId: selectedCategory.categoryId,
          rating: rating,
          comment: review,
          projectId: selectedProject?.projectId ?? null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit review: ${response.status}`);
      }

      alert("Review submitted successfully.");

      // Reset form
      setSelectedUser(null);
      setSelectedCategory(null);
      setSelectedProject(null);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-r from-[#e4fbff] to-[#d5fff9] px-6 py-10 font-['DM_Sans'] text-[#242424] sm:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-0">
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

        <div className="relative grid grid-cols-1 gap-6 rounded-2xl border border-[#E2E0D8] bg-white p-6 md:grid-cols-3">
          {/* User */}
          <div className="min-w-0 p-1">
            <UserSearch onUserSelect={setSelectedUser} />
          </div>

          {/* Category */}
          <div className="min-w-0">
            <ReviewCategories
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Project */}
          <div className="min-w-0">
            {selectedCategory?.requiresProject ? (
              <ProjectSearch
                onProjectSelect={setSelectedProject}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>

      {/* Rating Section */}
      <section className="mt-10 w-full">
        <div className="mb-3">
          <h2 className="font-['Fraunces'] text-xl font-medium text-[#242424]">
            Rating
          </h2>

          <p className="mt-1 text-sm text-[#6B6B63]">
            Rate this user from 1 to 5 stars.
          </p>
        </div>

        <div className="flex gap-2 rounded-2xl border border-[#E2E0D8] bg-white p-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`Rate ${star} out of 5`}
              className={`text-4xl transition ${
                star <= rating
                  ? "text-[#FFB400]"
                  : "text-[#D8D6CE]"
              } hover:scale-110`}
            >
              ★
            </button>
          ))}
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
          disabled={
            submitting ||
            !selectedUser ||
            !selectedCategory ||
            (selectedCategory.requiresProject && !selectedProject) ||
            rating === 0 ||
            !review.trim()
          }
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
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </main>
  );
}

export default ReviewPage;