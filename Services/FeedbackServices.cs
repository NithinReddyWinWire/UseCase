using WinReview.Models;
using WinReview.Db;
using WinReview.Repository;
using WinReview.Services;
using WinReview.Dtos;

public class FeedbackService (IFeedbackRepository _feedbackRepositoy ): IFeedbackServices
{
    public async  Task<FeedbackDto> CreateFeedbackAsync(Feedback feedback)
    {
        feedback.CreatedAt = DateTime.Now;
        _feedbackRepositoy.AddAsync(feedback);
        await _feedbackRepositoy.SaveChangesAsync();
        FeedbackDto dtoo = new FeedbackDto()
        {
            FeedbackId = feedback.FeedbackId,
            Rating= feedback.Rating,
            Comment = feedback.Comment,
            CreatedAt=feedback.CreatedAt
        };
        return dtoo;

    }

    public async Task<Feedback?> GetFeedbackAsync(int id)
    {
        return  await _feedbackRepositoy.GetAsync(id);
    }
}
