using UseCase.Models;
using UseCase.Db;
using UseCase.Repository;
using UseCase.Services;

public class FeedbackService (IFeedbackRepository _feedbackRepositoy ): IFeedbackServices
{
    public async  Task<Feedback> CreateFeedbackAsync(Feedback feedback)
    {
        feedback.CreatedAt = DateTime.Now;

        _feedbackRepositoy.AddAsync(feedback);
        await _feedbackRepositoy.SaveChangesAsync();
        return feedback;

    }

    public async Task<Feedback?> GetFeedbackAsync(int id)
    {
        return  await _feedbackRepositoy.GetAsync(id);
    }
}
