using UseCase.Db;
using UseCase.Models;
using Microsoft.EntityFrameworkCore;
using UseCase.Repository;


public class FeedbackRepository : IFeedbackRepository
{
    private readonly AppDbContext _DbContext;

   public FeedbackRepository(AppDbContext DbContext)
    {
        _DbContext = DbContext;
    }

    public void AddAsync(Feedback feedback)
    {
         _DbContext.Feedbacks.Add(feedback);
    }

    public async Task<Feedback?> GetAsync(int id)
    {
        return await _DbContext.Feedbacks.FirstOrDefaultAsync(f => f.FeedbackId == id);
    }
    public async Task SaveChangesAsync()
    {
        await _DbContext.SaveChangesAsync();
    }
}