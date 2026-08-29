using UseCase.Models;

namespace UseCase.Repository;

public interface IFeedbackRepository
{
    void AddAsync(Feedback feedback);

    Task<Feedback?> GetAsync(int id);
    Task SaveChangesAsync();
}