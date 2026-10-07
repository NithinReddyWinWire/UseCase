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

    public async Task<Users> SyncUserAsync(string objectId,string name,string email,string? role)
        {
            var user = await _DbContext.Users
                .FirstOrDefaultAsync(u =>
                    u.MicrosoftObjectId == objectId);

            if (user == null)
            {
                user = new Users
                {
                    MicrosoftObjectId = objectId,
                    Name = name,
                    Email = email,
                    Role = role ?? "User"
                };

                _DbContext.Users.Add(user);

                await _DbContext.SaveChangesAsync();

                return user;
            }

            user.Name = name;
            user.Email = email;
            user.Role = role ?? user.Role;

            await _DbContext.SaveChangesAsync();

            return user;
        }

    public async Task<Users?> GetUserByMicrosoftObjectIdAsync(string objectId)
{
    return await _DbContext.Users
        .FirstOrDefaultAsync(u => u.MicrosoftObjectId == objectId);
}

     public async Task<List<Users>> SearchUsersAsync(string? search)
{

    var query = _DbContext.Users.AsQueryable();

    if (!string.IsNullOrWhiteSpace(search))
    {
        query = query.Where(u =>
            u.Name.Contains(search) ||
            u.Email.Contains(search));
    }

    return await query
        .OrderBy(u => u.Name)
        .Take(10)
        .ToListAsync();
}
}