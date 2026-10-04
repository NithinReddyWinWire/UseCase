using WinReview.Models;
using WinReview.Db;
using WinReview.Repository;
using WinReview.Services;
using WinReview.Dtos;
using WinReview.Services.JwtServices;



public class ProjectServices (IProjectRepository _projectRepository): IProjectServices
{
    
    public async Task<List<Projects>> SearchProjectsAsync(string? search)
    {
        return await _projectRepository.SearchProjectsAsync(search);
    }
}