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
}