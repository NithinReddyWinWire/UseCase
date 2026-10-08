import { useEffect, useState } from "react";
import {
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest  } from "../authConfig";

import FeedbackCard from "../Components/FeedbackCard";
import FeedbackDetail from "../Components/FeedbackDetail";

type User = {
  userId: number;
  microsoftObjectId: string;
  name: string;
  email: string;
  role: string;
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

type Feedback = {
  feedbackId: number;
  rating: number;
  comment: string;
  createdAt: string;

  projectId: number | null;
  project: Project | null;

  categoryId: number;
  categories: Category;

  feedbackByUser: number;
  feedbackByUsersId: User;

  feedbackToUser: number;
  feedbackToUsersId: User;

  feedbackStatus: string;

  approvedByUser: number | null;
  approvedByUserId: User | null;

  reviewdAt: string | null;
};

function ApprovePage() {
  const { instance, accounts } = useMsal();
   const account = instance.getActiveAccount() ?? accounts[0];

  const currentMicrosoftObjectId = account?.localAccountId;

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const getAccessToken = async () => {
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

  const loadPendingFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getAccessToken();

      const response = await fetch(
        "/Feedback/Feedback/Pending-Feedback",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load pending feedback: ${response.status}`
        );
      }

      const data: Feedback[] = await response.json();

      setFeedbacks(data);
    } catch (error) {
      console.error("Failed to load pending feedback:", error);
      setError("Failed to load pending feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingFeedback();
  }, []);

  const handleApprove = async (feedbackId: number) => {
    try {
      setApprovingId(feedbackId);
      setError("");

      const token = await getAccessToken();

      const response = await fetch(
        `/Feedback/Feedback/Approve-Feedback?id=${feedbackId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to approve feedback: ${response.status}`
        );
      }

      // Remove the approved feedback from the screen
      setFeedbacks((current) =>
        current.filter(
          (feedback) => feedback.feedbackId !== feedbackId
        )
      );
    } catch (error) {
      console.error("Failed to approve feedback:", error);
      setError("Failed to approve feedback.");
    } finally {
      setApprovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="font-[Fraunces] text-2xl font-semibold">
          Approve Feedback
        </h1>

        <p className="mt-4 text-gray-600">
          Loading pending feedback...
        </p>
      </div>
    );
  }

  return (
  <div className="min-h-screen  bg-gray-50 p-6 font-[DM_Sans]">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-5">
        <h1 className="font-[Fraunces] text-2xl font-semibold text-gray-900">
          Approve Feedback
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and approve pending feedback.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {feedbacks.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-900">
            No pending feedback
          </p>

          <p className="mt-1 text-sm text-gray-500">
            All feedback has been reviewed.
          </p>
        </div>
      ) : (
       <div className="mt-6 space-y-3"> {feedbacks.map((feedback) => 
            ( <FeedbackCard key={feedback.feedbackId} feedback={feedback} 
                approvingId={approvingId} onSelect={(feedback) => 
                    { setSelectedFeedback(feedback); }} onApprove={handleApprove}
                    canApprove={feedback.feedbackByUsersId.microsoftObjectId !== currentMicrosoftObjectId
} /> ))} 
        </div>
      )}
    </div>

    {selectedFeedback && ( <FeedbackDetail feedback={selectedFeedback} 
        onClose={() => setSelectedFeedback(null)}
        onApprove={handleApprove} approvingId={approvingId} /> )}
  </div>
);
}

export default ApprovePage;

