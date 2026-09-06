using WinReview.Db;
using WinReview.Models;
using Microsoft.EntityFrameworkCore;
using WinReview.Repository;


public class FeedbackRepository : IFeedbackRepository
{
    private readonly AppDbContext _DbContext;

   public FeedbackRepository(AppDbContext DbContext)
    {
        _DbContext = DbContext;
    }

    public void Add(Feedback feedback)
    {
         _DbContext.Feedbacks.Add(feedback);
    }

    public async Task<Feedback?> GetAsync(int id)
    {
        return await _DbContext.Feedbacks
        .Include(f => f.Project)
        .Include(f => f.Categories)
        .Include(f => f.FeedbackByUsersId)
        .Include(f => f.FeedbackToUsersId)
        .Include(f => f.ApprovedByUserId)
        .FirstOrDefaultAsync(f => f.FeedbackId == id);
    }
    public async Task SaveChangesAsync()
    {
        await _DbContext.SaveChangesAsync();
    }
}