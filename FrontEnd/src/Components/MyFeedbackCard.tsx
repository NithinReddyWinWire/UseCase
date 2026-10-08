type MyFeedbackCardProps = {
  feedback: {
    rating: number;
    comment: string;
    createdAt: string;
    categoryName: string | null;
    feedbackByUserName: string | null;
  };
};

function MyFeedbackCard({ feedback }: MyFeedbackCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-dm-sans text-xs font-medium uppercase tracking-wide text-[#999999]">
            From
          </p>

          <p className="mt-1 font-dm-sans text-base font-semibold text-[#111111]">
            {feedback.feedbackByUserName}
          </p>
        </div>

        {/* Rating */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-lg leading-none ${
                star <= feedback.rating
                  ? "text-[#D9A441]"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mt-5">
        <span className="inline-flex rounded-full bg-[#F2F6FA] px-3 py-1 font-dm-sans text-xs font-semibold text-[#24558F]">
          {feedback.categoryName}
        </span>
      </div>

      {/* Comment */}
      <p className="mt-5 font-dm-sans text-sm leading-6 text-[#444444]">
        {feedback.comment}
      </p>

      {/* Date */}
      <div className="mt-5 border-t border-[#F0F0F0] pt-4">
        <p className="font-dm-sans text-xs text-[#999999]">
          {new Date(feedback.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default MyFeedbackCard;