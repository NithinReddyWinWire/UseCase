using WinReview.Dtos;
using WinReview.Models;


namespace WinReview.Services;



public interface IUserServices
{

    Task<Users> SyncUserAsync(string objectId,string name,string email,string? role);

    Task<Users?> GetUserByMicrosoftObjectIdAsync(string objectId);
    Task<List<Users>> SearchUsersAsync(string? search);
}