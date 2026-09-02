using Microsoft.AspNetCore.Mvc;
using WinReview.Models;
using WinReview.Services;

namespace WinReview.Controllers;



[ApiController]
[Route("Feedback/[controller]")]

public class FeedbackController (IFeedbackServices services) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> WriteFeedback(Feedback feedback)
    {
    
        var result = await services.CreateFeedbackAsync(feedback);
        return Ok(result);
    }

    [HttpGet("search")]
    // [Route("{id:int}")]
    public async Task<IActionResult> GetFeedbackById([FromQuery] int id )
    {
        var result = await services.GetFeedbackAsync(id);
        return Ok(result);
    }
}