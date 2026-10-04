using WinReview.Models;
using WinReview.Db;
using WinReview.Repository;
using WinReview.Services;
using WinReview.Dtos;
using WinReview.Services.JwtServices;



public class UserServices (IUserRepository _userRepositoy): IUserServices
{

    public async Task<Users> SyncUserAsync(string objectId,string name,string email,string? role)
    {
        return await _userRepositoy.SyncUserAsync(
            objectId,
            name,
            email,
            role
        );
    }
    public async Task<List<Users>> SearchUsersAsync(string? search)
    {
        return await _userRepositoy.SearchUsersAsync(search);
    }
}
