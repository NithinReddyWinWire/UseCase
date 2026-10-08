import MyFeedbackCard from "../Components/MyFeedbackCard";

import { useEffect, useState } from "react";
import {
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

type MyFeedback = {
  rating: number;
  comment: string;
  createdAt: string;
  categoryName: string | null;
  feedbackByUserName: string | null;
};

function MyReviewsPage() {
  const { instance, accounts } = useMsal();

  const [feedbacks, setFeedbacks] = useState<MyFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const loadMyFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getAccessToken();

      const response = await fetch(
        "/Feedback/Feedback/My-Feedback",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load feedback: ${response.status}`
        );
      }

      const data: MyFeedback[] = await response.json();

      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to load my feedback:", error);
      setError("Failed to load your feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyFeedback();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF8] p-6 font-[DM_Sans]">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-[Fraunces] text-3xl font-semibold text-[#111111]">
            My Reviews
          </h1>

          <p className="mt-4 text-sm text-[#666666]">
            Loading your feedback...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF8] p-6 font-[DM_Sans]">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-[Fraunces] text-3xl font-semibold text-[#111111]">
            My Reviews
          </h1>

          <p className="mt-2 text-sm text-[#666666]">
            Feedback that has been approved and shared with you.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Empty state */}
        {feedbacks.length === 0 ? (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-14 text-center shadow-sm">
            <h2 className="font-[Fraunces] text-xl font-semibold text-[#111111]">
              No reviews yet
            </h2>

            <p className="mt-2 text-sm text-[#666666]">
              You don't have any approved feedback yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <MyFeedbackCard
                    key={`${feedback.createdAt}-${index}`}
                    feedback={feedback}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyReviewsPage;