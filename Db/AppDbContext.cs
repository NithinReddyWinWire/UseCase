using Microsoft.EntityFrameworkCore;
using UseCase.Models;

namespace UseCase.Db;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Feedback> Feedbacks {get;set;}
}