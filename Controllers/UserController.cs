using Microsoft.AspNetCore.Mvc;
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

}