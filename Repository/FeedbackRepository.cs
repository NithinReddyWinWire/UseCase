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


    public async Task<List<Feedback>> GetFeedbackForUserAsync(int userId,CancellationToken ct)
    {
        return await _DbContext.Feedbacks
            .Include(f => f.Project)
            .Include(f => f.Categories)
            .Include(f => f.FeedbackByUsersId)
            .Include(f => f.FeedbackToUsersId)
            .Include(f => f.ApprovedByUserId)
            .Where(f => f.FeedbackToUser == userId)
            .ToListAsync(ct);
    }
    public void Add(Feedback feedback)
    {
         _DbContext.Feedbacks.Add(feedback);
    }

    public async Task<Feedback?> GetAsync(int id,CancellationToken Ct)
    {
        return await _DbContext.Feedbacks
        .Include(f => f.Project)
        .Include(f => f.Categories)
        .Include(f => f.FeedbackByUsersId)
        .Include(f => f.FeedbackToUsersId)
        .Include(f => f.ApprovedByUserId)
        .FirstOrDefaultAsync(f => f.FeedbackId == id,Ct);
    }

    public async Task UpdateAsync(Feedback feedback)
    {
        _DbContext.Feedbacks.Update(feedback);
        await _DbContext.SaveChangesAsync();
    }

    public void Delete(Feedback feedback)
    {
        _DbContext.Feedbacks.Remove(feedback);
    }

    public async Task SaveChangesAsync()
    {
        await _DbContext.SaveChangesAsync();
    }



}