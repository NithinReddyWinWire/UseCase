using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WinReview.Models;
using WinReview.Services;
using System.Security.Claims;
using WinReview.Dtos;

namespace WinReview.Controllers;



[ApiController]
[Route("[controller]")]

public class ProjectsController (IProjectServices services) : ControllerBase
{
   
    [HttpGet("Search-Projects")]
    public async Task<IActionResult> SearchUsers(String? search)
    {
        var projects = await services.SearchProjectsAsync(search);

        var result = projects.Select(u => new ProjectDto
        {
            ProjectId = u.ProjectId,
            ProjectName = u.ProjectName
        });

        return Ok(result);
    }

}