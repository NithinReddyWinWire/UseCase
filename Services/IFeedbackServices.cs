using UseCase.Models;

namespace UseCase.Services;


public interface IFeedbackServices
{
    Task<Feedback> CreateFeedbackAsync(Feedback feedback);
    Task<Feedback?> GetFeedbackAsync(int id);
}