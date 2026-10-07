using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WinReview.Models;
using WinReview.Services;
using System.Security.Claims;
using WinReview.Dtos;

namespace WinReview.Controllers;


[ApiController]
[Route("Feedback/[controller]")]

public class FeedbackController (IFeedbackServices services , IUserServices userServices) : ControllerBase
{
   
    [Authorize]
    [HttpPost("Write")]
    public async Task<IActionResult> WriteFeedback(FeedbackDto dets)
    {
        var objectId = User.FindFirst(
            "http://schemas.microsoft.com/identity/claims/objectidentifier"
        )?.Value;

        if (string.IsNullOrWhiteSpace(objectId))
            return Unauthorized();

        var user = await userServices.GetUserByMicrosoftObjectIdAsync(objectId);

        if (user == null)
            return Unauthorized();

        var feedback = new Feedback
        {
            FeedbackToUser = dets.FeedbackToUser,
            CategoryId = dets.CategoryId,
            Rating = dets.Rating,
            Comment = dets.Comment,
            FeedbackByUser = user.UserId,
            CreatedAt = DateTime.Now,
            FeedbackStatus = "Pending"
        };

        await services.CreateFeedbackAsync(feedback);

        return Ok();
    }
    
    
    [HttpGet("Show")]
    public async Task<IActionResult> GetFeedbackById([FromQuery] int id, CancellationToken Ct )
    {
        var result = await services.GetFeedbackAsync(id, Ct);
        return Ok(result);
    }


    
    [HttpGet("My-Feedback")]
    public async Task<IActionResult> GetMyFeedback(CancellationToken ct, string userId )
        {

            if (userId == null)
            {
                return Unauthorized();
            }

            var result = await services.GetFeedbackForUserAsync(int.Parse(userId), ct);

            return Ok(result);
        }

    [Authorize(Policy = "AdminOnly")]
    [HttpPut("Approve-Feedback")]
    public async Task<IActionResult> ApproveFeedback(int id,CancellationToken ct)
    {
        var objectId = User.FindFirst(
            "http://schemas.microsoft.com/identity/claims/objectidentifier"
        )?.Value;

        if (string.IsNullOrWhiteSpace(objectId))
        {
            return Unauthorized();
        }

        var admin = await userServices.GetUserByMicrosoftObjectIdAsync(objectId);

        if (admin == null)
        {
            return Unauthorized();
        }

        var result = await services.ApproveFeedback(
            id,
            admin.UserId,
            ct
        );

        return Ok(result);
    }

    [Authorize]
    [HttpGet("Pending-Feedback")]
    public async Task<IActionResult> GetPendingFeedback(
        CancellationToken ct)
    {
        var result = await services.GetPendingFeedbackAsync(ct);

        return Ok(result);
    }


    [Authorize]
    [HttpPut("Update")]

    public async Task<IActionResult> UpdateFeedback(int id, UpdateFeedbackDto dto,CancellationToken Ct)
    {
        var updated = await services.UpdateFeedbackAsync(id,dto,Ct);

        if (!updated)
        {
            return NotFound("feedback not Found");
        }

        return Ok("feedback Updated Successfully");
    }

    [Authorize]
    [HttpDelete("Delete")]
     public async Task<IActionResult> DeleteFeedback(int id,CancellationToken Ct)
    {
        var result = await services.DeleteFeedbackAsync(id,Ct);

        return Ok(result);
    }

}