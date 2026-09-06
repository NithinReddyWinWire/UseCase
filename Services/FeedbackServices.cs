using WinReview.Models;
using WinReview.Db;
using WinReview.Repository;
using WinReview.Services;
using WinReview.Dtos;

public class FeedbackService (IFeedbackRepository _feedbackRepositoy ): IFeedbackServices
{
    public async Task CreateFeedbackAsync(Feedback feedback)
    {
        
        _feedbackRepositoy.Add(feedback);
        await _feedbackRepositoy.SaveChangesAsync();
    }

    public async Task<ShowFeedbackDto?> GetFeedbackAsync(int id)

    {
        var FeedbackResponce =   await _feedbackRepositoy.GetAsync(id);

        if(FeedbackResponce == null)
        {
            return null;
        }

        return new ShowFeedbackDto
        {
            FeedbackId = FeedbackResponce.FeedbackId,
            Rating = FeedbackResponce.Rating,
            Comment = FeedbackResponce.Comment,
            CreatedAt = FeedbackResponce.CreatedAt,

            CategoryName = FeedbackResponce.Categories?.CategoryName,

            FeedbackByUserName = FeedbackResponce.FeedbackByUsersId?.Name,

            FeedbackToUserName = FeedbackResponce.FeedbackToUsersId?.Name,

            FeedbackStatus = FeedbackResponce.FeedbackStatus
    };

        
    }

    public async Task<bool> UpdateFeedbackAsync(int id, UpdateFeedbackDto dto)
{
    var feedback = await _feedbackRepositoy.GetAsync(id);

    if (feedback == null)
        return false;

    feedback.Rating = dto.Rating;
    feedback.Comment = dto.Comment;

    await _feedbackRepositoy.UpdateAsync(feedback);

    return true;
}
}
