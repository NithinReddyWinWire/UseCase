using WinReview.Models;
using WinReview.Dtos;

namespace WinReview.Services;



public interface IFeedbackServices
{
    Task<FeedbackDto> CreateFeedbackAsync(Feedback feedback);
    Task<Feedback?> GetFeedbackAsync(int id);
}