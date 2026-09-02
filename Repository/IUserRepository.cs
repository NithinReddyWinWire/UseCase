using WinReview.Models;

namespace WinReview.Repository;

public interface IUserRepository
{
    void AddUserAsync(Users User);

    Task SaveChangesAsync();
}