using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WinReview.Dtos;
using WinReview.Models;
using WinReview.Services;


namespace WinReview.Controllers;



[ApiController]
[Route("apiAuth/[controller]")]

public class UserController (IUserServices services) : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> UserSignin(Users user)
    {
    
        var result = await services.UserSigninAsync(user);
        return Ok(result);
    }

    [HttpPost("Login")]

    public async Task<IActionResult> UserLogin(UserLoginDto user)
    {
        var result = services.UserLogin(user);
        return Ok(new { result });
    }

    [Authorize]
    [HttpGet("Hello User")]
    public IActionResult Hello()
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;

        return Ok(new {message = $"hello {username}"});
    }

}