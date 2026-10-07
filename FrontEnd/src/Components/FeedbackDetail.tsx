import { Check, X } from "lucide-react";

type FeedbackDetailProps = {
  feedback: {
    feedbackId: number;
    rating: number;
    comment: string;
    createdAt: string;

    projectId: number | null;

    project: {
      projectId: number;
      projectName: string;
    } | null;

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

    feedbackStatus: string;

    approvedByUser: number | null;

    approvedByUserId: {
      userId: number;
      name: string;
      email: string;
      role: string;
    } | null;

    reviewdAt: string | null;
  };

  onClose: () => void;
  onApprove: (feedbackId: number) => void;
  approvingId: number | null;
};

export default function FeedbackDetail({
  feedback,
  onClose,
  onApprove,
  approvingId,
}: FeedbackDetailProps) {
  const isApproving = approvingId === feedback.feedbackId;


return (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-[DM_Sans]"
        onClick={onClose}
    >
        <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <div>
            <h2 className="font-[Fraunces] text-2xl font-semibold tracking-tight text-gray-900">
                Feedback Details
            </h2>

            <p className="mt-1 text-xs text-gray-500">
                Feedback #{feedback.feedbackId}
            </p>
            </div>

            
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                From
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                {feedback.feedbackByUsersId.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                {feedback.feedbackByUsersId.email}
                </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                To
                </p>

                <p className="mt-2 text-sm font-semibold text-gray-900">
                {feedback.feedbackToUsersId.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                {feedback.feedbackToUsersId.email}
                </p>
            </div>
            </div>

            {/* Category / Rating / Date */}
            <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-gray-50 px-5 py-4">
            {/* Category */}
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Category
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                {feedback.categories.categoryName}
                </p>
            </div>

            {/* Rating */}
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Rating
                </p>

                <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-[5vh] leading-none ${
                        star <= feedback.rating
                            ? "text-[#ff3c00]"
                            : "text-[#8ea3a3]"
                        }`}
                    >
                        ★
                    </span>
                    ))}
                </div>

                </div>
            </div>

            {/* Date */}
            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Submitted
                </p>

                <p className="mt-1 text-sm text-gray-700">
                {new Date(
                    feedback.createdAt
                ).toLocaleDateString()}
                </p>
            </div>
            </div>

            {/* Project */}
            {feedback.project && (
            <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Project
                </p>

                <div className="mt-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                    {feedback.project.projectName}
                </p>
                </div>
            </div>
            )}

            {/* Comment */}
            <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Comment
            </p>

            <div className="mt-2 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {feedback.comment}
                </p>
            </div>
            </div>

            {/* Status */}
            <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Status
            </p>

            <span className="mt-2 inline-flex rounded-full bg-[#F7EFD9] px-3 py-1 text-xs font-semibold text-[#8A6418]">
                {feedback.feedbackStatus}
            </span>
            </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
            type="button"
            onClick={onClose}
            className="
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-black
                hover:text-white
            "
            >
            Close
            </button>

            <button
            type="button"
            onClick={() =>
                onApprove(feedback.feedbackId)
            }
            disabled={isApproving}
            className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-green-600
                px-4
                py-2
                text-sm
                font-medium
                text-white
                shadow-sm
                transition
                hover:bg-[#18563F]
                focus:outline-none
                focus:ring-2
                focus:ring-[#1F6B4F]
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
            >
            <Check size={16} strokeWidth={2.5} />

            {isApproving ? "Approving..." : "Approve"}
            </button>
        </div>
        </div>
    </div>
);

}

