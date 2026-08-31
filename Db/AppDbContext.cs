using Microsoft.EntityFrameworkCore;
using UseCase.Models;

namespace UseCase.Db;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    //Dbset is a datatype in efCore it represents a collection/table 
    public DbSet<Users> Users{get;set;}

    public DbSet<Projects> Projects{get;set;}

    public DbSet<Feedback> Feedbacks {get;set;}

    //efCore.dbContext has this method already and its set to procted.  
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        //primary key
        modelBuilder.Entity<Users>().HasKey(pk => pk.UserId);
        modelBuilder.Entity<Feedback>().HasKey(pk => pk.FeedbackId);
        modelBuilder.Entity<Projects>().HasKey(pk => pk.ProjectId);

        //relations
        modelBuilder.Entity<Feedback>().HasOne(f=>f.Project).WithMany().HasForeignKey(f=>f.ProjectId);
        modelBuilder.Entity<Feedback>().HasOne(f=>f.FeedbackByUsersId).WithMany().HasForeignKey(f=>f.FeedbackByUser).OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<Feedback>().HasOne(f=>f.FeedbackToUsersId).WithMany().HasForeignKey(f=>f.FeedbackToUser).OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<Feedback>().HasOne(f=>f.ApprovedByUserId).WithMany().HasForeignKey(f=>f.ApprovedByUser).OnDelete(DeleteBehavior.NoAction);
        modelBuilder.Entity<Projects>().HasMany(p => p.UserName).WithMany(u => u.ProjectName);
        modelBuilder.Entity<Feedback>().Property(f => f.FeedbackStatus).HasDefaultValue("Pending");

        //constraints
        modelBuilder.Entity<Feedback>().ToTable(n => n.HasCheckConstraint("Feedback Rating Limit", "[Rating] >= 1 AND [Rating] <= 5"));
        modelBuilder.Entity<Feedback>().ToTable(n => n.HasCheckConstraint("Feedback Status", "[FeedbackStatus] IN ('Pending','Approved','Declined')"));
    }
}