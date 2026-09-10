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
            throw new KeyNotFoundException("feedback does not exist");
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


   public async Task<List<ShowMyFeedbackDto>> GetFeedbackForUserAsync(int userId, CancellationToken ct)
    {
        var feedbacks = await _feedbackRepositoy.GetFeedbackForUserAsync(userId, ct);

        if(feedbacks == null)
        {
            throw new KeyNotFoundException("feedback does not exist");
        }

        return feedbacks.Select(f => new ShowMyFeedbackDto
            {
                Rating = f.Rating,
                Comment = f.Comment,
                CreatedAt = f.CreatedAt,
                CategoryName = f.Categories?.CategoryName,
                FeedbackByUserName = f.FeedbackByUsersId?.Name
            }).ToList();
    }

    public async Task<bool> UpdateFeedbackAsync(int id, UpdateFeedbackDto dto,CancellationToken Ct)
{
    var feedback = await _feedbackRepositoy.GetAsync(id,Ct);

    if (feedback == null)
        {
            throw new KeyNotFoundException("Feedback does not exist");
        }

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
            throw new KeyNotFoundException("Feedback not found");
        }

        _feedbackRepositoy.Delete(feedback);

        await _feedbackRepositoy.SaveChangesAsync();

        return "Deleted Successfully";
    }

    public async Task<string> ApproveFeedback(int feedbackId,int adminId,CancellationToken ct)
    {
        var feedback = await _feedbackRepositoy.GetAsync(feedbackId, ct);

        if (feedback == null)
        {
            throw new KeyNotFoundException("Feedback Not Found. Cannot Be approved!");
        }

        feedback.FeedbackStatus = "Approved";
        feedback.ApprovedByUser = adminId;
        feedback.ReviewdAt = DateTime.Now;

        await _feedbackRepositoy.UpdateAsync(feedback);

        return "Feedback approved successfully";
    }
}
