using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WinReview.Models;
using WinReview.Services;
using System.Security.Claims;
using WinReview.Dtos;

namespace WinReview.Controllers;



[ApiController]
[Route("Feedback/[controller]")]

public class FeedbackController (IFeedbackServices services) : ControllerBase
{
    [Authorize]
    [HttpPost("Write")]
    public async Task<IActionResult> WriteFeedback(FeedbackDto dets)
    {
    
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.FindFirst(ClaimTypes.Name)?.Value;

        if (userId == null)
            return Unauthorized();


        var feedback = new Feedback
        {
            FeedbackToUser = dets.FeedbackToUser,
            CategoryId = dets.CategoryId,
            Rating = dets.Rating,
            Comment = dets.Comment,
            FeedbackByUser = int.Parse(userId),
            CreatedAt = DateTime.Now,
            FeedbackStatus = "Pending"
        };

      
        await services.CreateFeedbackAsync(feedback);
        return Ok($"Review done by {userName} on {dets.FeedbackToUser}");
        
    }
    
    [Authorize]
    [HttpGet("Show")]
    public async Task<IActionResult> GetFeedbackById([FromQuery] int id )
    {
        var result = await services.GetFeedbackAsync(id);
        return Ok(result);
    }

    [Authorize]
    [HttpPut("Update")]

    public async Task<IActionResult> UpdateFeedback(int id, UpdateFeedbackDto dto)
    {
        var updated = await services.UpdateFeedbackAsync(id,dto);

        if (!updated)
        {
            return NotFound("feedback not Found");
        }

        return Ok("feedback Updated Successfully");
    }
}