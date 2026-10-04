using WinReview.Db;
using WinReview.Models;
using Microsoft.EntityFrameworkCore;
using WinReview.Repository;


public class ProjectRepository : IProjectRepository 
{
    private readonly AppDbContext _DbContext;

     public ProjectRepository(AppDbContext DbContext)
    {
        _DbContext = DbContext;
    }
    
    public async Task<List<Projects>> SearchProjectsAsync(string? search)
    {
        var query = _DbContext.Projects.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p =>
                p.ProjectName.Contains(search));
        }

        return await query
            .Take(10)
            .ToListAsync();
    }

}