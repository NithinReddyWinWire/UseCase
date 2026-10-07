using WinReview.Models;

namespace WinReview.Repository;

public interface IUserRepository
{
    Task<Users> SyncUserAsync(string objectId,string name,string email,string? role);

    Task<Users?> GetUserByMicrosoftObjectIdAsync(string objectId);
    
     Task<List<Users>> SearchUsersAsync(string? search);
}