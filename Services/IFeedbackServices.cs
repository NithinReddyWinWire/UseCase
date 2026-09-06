using WinReview.Dtos;
using WinReview.Models;


namespace WinReview.Services;



public interface IFeedbackServices
{
     Task CreateFeedbackAsync(Feedback feedback);
    Task <ShowFeedbackDto?> GetFeedbackAsync(int id);
    Task<bool> UpdateFeedbackAsync(int id, UpdateFeedbackDto dto);
}