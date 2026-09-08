namespace WinReview.Dtos;
using WinReview.Models;
public class UserLoginDto 
{
    public string Name { get; set; }

    public string Password { get; set; }
    
}

public class UserSignUpDto
{
     public string EmpID {get;set;}

    public string Name{get;set;}

    public string Email{get;set;}

    public string Password{get;set;}
}