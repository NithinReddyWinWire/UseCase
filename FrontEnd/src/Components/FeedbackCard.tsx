import { Check, Eye } from "lucide-react";
import { useMsal } from "@azure/msal-react";

type FeedbackCardProps = {
  feedback: {
    feedbackId: number;
    rating: number;
    comment: string;
    createdAt: string;

    categories: {
      categoryId: number;
      categoryName: string;
      requiresProject: boolean;
    };

    feedbackByUsersId: {
      userId: number;
      name: string;
      email: string;
      role: string;
    };

    feedbackToUsersId: {
      userId: number;
      name: string;
      email: string;
      role: string;
    };
  };

  onSelect: (feedback: FeedbackCardProps["feedback"]) => void;

  onApprove: (feedbackId: number) => void;

  approvingId: number | null;

   canApprove: boolean;
};

export default function FeedbackCard({
  feedback,
  onSelect,
  onApprove,
  approvingId,
  canApprove,
}: FeedbackCardProps) {
  const isApproving = approvingId === feedback.feedbackId;
  const { instance, accounts } = useMsal();

  const account = instance.getActiveAccount() ?? accounts[0];
  const currentMicrosoftObjectId = account?.localAccountId;
  return (
    <div
      onClick={() => onSelect(feedback)}
      className="
        group
        cursor-pointer
        rounded-xl
        border
        border-gray-200
        bg-white
        transition
        hover:border-[#E99A8F] 
        hover:drop-shadow-xl 
        hover:shadow-[#BF230D]/10 
      "
    >
      <div className="flex items-center gap-5 px-5 py-4">

        {/* Users */}
        <div className="w-[240px] shrink-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Feedback
          </p>

          <div className="mt-1 flex items-center gap-2 truncate">
            <span className="truncate text-sm font-semibold text-gray-900">
              {feedback.feedbackByUsersId.name}
            </span>

            <span className="shrink-0 text-gray-400">
              →
            </span>

            <span className="truncate text-sm font-semibold text-gray-900">
              {feedback.feedbackToUsersId.name}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="w-28 shrink-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Category
          </p>

          <p className="mt-1 truncate text-sm text-gray-700">
            {feedback.categories.categoryName}
          </p>
        </div>

        {/* Rating */}
        <div className="w-24 shrink-0">

          <div className="mt-1 flex items-center gap-1.5">

            <span className="text-[4vh]  tracking-tight text-[#ff3c00]">
              {"★".repeat(feedback.rating)}
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Comment
          </p>

          <p className="mt-1 truncate text-sm text-gray-600">
            {feedback.comment}
          </p>
        </div>

        {/* Date */}
        <div className="hidden w-24 shrink-0 xl:block">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Submitted
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {new Date(feedback.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* View */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(feedback);
          }}
          className="
            hidden
            shrink-0
            items-center
            gap-1
            rounded-md
            px-2
            py-1
            text-xs
            font-medium
            text-gray-500
            transition
            hover:bg-gray-100
            hover:text-gray-900
            group-hover:flex
          "
        >
          <Eye size={14} />
          View
        </button>

        {/* Approve */}
        {canApprove && (

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onApprove(feedback.feedbackId);
          }}
          disabled={isApproving}
          className="
            inline-flex
            h-9
            shrink-0
            items-center
            gap-1.5
            rounded-lg
            bg-green-600
            px-3.5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-green-700
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            focus:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Check size={15} strokeWidth={2.5} />

          {isApproving ? "Approving..." : "Approve"}
        </button>
        )}
      </div>
    </div>
  );
}
