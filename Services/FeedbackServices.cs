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

    public async Task<ShowFeedbackDto?> GetFeedbackAsync(int id,CancellationToken Ct)

    {
        var FeedbackResponce =   await _feedbackRepositoy.GetAsync(id,Ct);

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

    public async Task<bool> UpdateFeedbackAsync(int id, UpdateFeedbackDto dto,CancellationToken Ct)
{
    var feedback = await _feedbackRepositoy.GetAsync(id,Ct);

    if (feedback == null)
        return false;

    feedback.Rating = dto.Rating;
    feedback.Comment = dto.Comment;

    await _feedbackRepositoy.UpdateAsync(feedback);

    return true;
}

    public async Task<string> DeleteFeedbackAsync(int id,CancellationToken Ct)
    {
        var feedback = await _feedbackRepositoy.GetAsync(id,Ct);

        if(feedback == null)
        {
            return "Feedback Not Found";
        }

        _feedbackRepositoy.Delete(feedback);

        await _feedbackRepositoy.SaveChangesAsync();

        return "Deleted Successfully";
    }

}
