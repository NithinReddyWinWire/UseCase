using WinReview.Dtos;
using WinReview.Models;


namespace WinReview.Services;



public interface IUserServices
{
    Task<UserSignUpDto> UserSigninAsync(Users Users);

}