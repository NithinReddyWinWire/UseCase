using WinReview.Models;

namespace WinReview.Repository;

public interface IUserRepository
{
    void AddUserAsync(Users User);

    Task SaveChangesAsync();

     Task<List<Users>> SearchUsersAsync(string? search);
}