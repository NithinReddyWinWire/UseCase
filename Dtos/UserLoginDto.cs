namespace WinReview.Dtos;
using WinReview.Models;
public class UserLoginDto 
{
    public int UserId { get; set; }
    public string Name { get; set; }

    public string Password { get; set; }
    
}