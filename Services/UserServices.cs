using WinReview.Models;
using WinReview.Db;
using WinReview.Repository;
using WinReview.Services;
using WinReview.Dtos;

public class UserServices (IUserRepository _userRepositoy ): IUserServices
{
    public async  Task<UserSignUpDto> UserSigninAsync (Users User)
    {

        string hashPassword = BCrypt.Net.BCrypt.HashPassword(User.Password);
        User.Password = hashPassword;
        _userRepositoy.AddUserAsync(User);
        await _userRepositoy.SaveChangesAsync();

         UserSignUpDto dtoo = new UserSignUpDto()
        {
            EmpID = User.EmpID,
            Name= User.Name,
            Email = User.Email,
            Password=hashPassword
        };

        return dtoo;

    }

    
}
