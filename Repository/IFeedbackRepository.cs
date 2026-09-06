using WinReview.Models;

namespace WinReview.Repository;

public interface IFeedbackRepository
{
    void Add(Feedback feedback);

    Task<Feedback?> GetAsync(int id);
    Task SaveChangesAsync();
}