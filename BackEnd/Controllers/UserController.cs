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

    [Authorize]
    [HttpGet("claims")]
    public IActionResult GetClaims()
    {
        var claims = User.Claims.Select(c => new
        {
            c.Type,
            c.Value
        });

        return Ok(claims);
    }

    [Authorize]
    [HttpPost("Sync")]
    public async Task<IActionResult> SyncUser()
    {
        var objectId = User.FindFirst(
            "http://schemas.microsoft.com/identity/claims/objectidentifier"
        )?.Value;

        var name = User.FindFirst("name")?.Value;

        var email = User.FindFirst(
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn"
        )?.Value;

        var role = User.FindFirst(
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        )?.Value;

        if (string.IsNullOrWhiteSpace(objectId))
        {
            return Unauthorized();
        }

        if (string.IsNullOrWhiteSpace(name) ||
            string.IsNullOrWhiteSpace(email))
        {
            return BadRequest("Required user claims are missing.");
        }

        var result = await services.SyncUserAsync(
            objectId,
            name,
            email,
            role
        );

        return Ok(result);
    }



    [HttpGet("Hello-User")]
    public IActionResult Hello()
    {
        var username = User.FindFirst(ClaimTypes.Name)?.Value;

        return Ok(new {message = $"hello {username}"});
    }

    


    [HttpGet("Search-Users")]
    public async Task<IActionResult> SearchUsers(String? search)
    {
        var users = await services.SearchUsersAsync(search);

        var result = users.Select(u => new UserSearchDto
        {
            UserId = u.UserId,
            Name = u.Name,
            Email = u.Email
        });

        return Ok(result);
    }

}