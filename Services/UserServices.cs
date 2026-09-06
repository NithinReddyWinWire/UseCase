using WinReview.Models;
using WinReview.Db;
using WinReview.Repository;
using WinReview.Services;
using WinReview.Dtos;
using WinReview.Services.JwtServices;


public class UserServices (IUserRepository _userRepositoy, AppDbContext _context, JwtServices _jwtService): IUserServices
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

    public  string? UserLogin(UserLoginDto RequestUser)
    {
       var user = _context.Users.FirstOrDefault(u=> u.Name == RequestUser.Name);

       if (user == null)
        {
             throw new Exception("USER NOT FOUND");
        }

       if (!BCrypt.Net.BCrypt.Verify(RequestUser.Password, user.Password))
        {
            return null;
        }

       var token = _jwtService.GenerateToken(
        user.UserId.ToString(),
        user.Name
        );

        return token;
        
    }
}
