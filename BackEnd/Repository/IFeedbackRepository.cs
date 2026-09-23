using WinReview.Models;

namespace WinReview.Repository;

public interface IFeedbackRepository
{
    void Add(Feedback feedback);

    Task<Feedback?> GetAsync(int id,CancellationToken Ct);

    Task<List<Feedback>> GetFeedbackForUserAsync(int userId,CancellationToken ct);
    Task SaveChangesAsync();

    void Delete(Feedback feedback);

    Task UpdateAsync(Feedback feedback);
}