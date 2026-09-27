using WinReview.Db;
using WinReview.Models;
using Microsoft.EntityFrameworkCore;
using WinReview.Repository;


public class UserRepository : IUserRepository 
{
    private readonly AppDbContext _DbContext;

   public UserRepository (AppDbContext DbContext)
    {
        _DbContext = DbContext;
    }

    public void AddUserAsync(Users User)
    {
         _DbContext.Users.Add(User);
    }

    public async Task SaveChangesAsync()
    {
        await _DbContext.SaveChangesAsync();
    }


     public async Task<List<Users>> SearchUsersAsync(string? search)
    {
        var query = _DbContext.Users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(u =>
                u.Name.Contains(search) ||
                u.EmpID.Contains(search) ||
                u.Email.Contains(search));
        }

        return await query
            .Take(10)
            .ToListAsync();
    }
}