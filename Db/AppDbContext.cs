using Microsoft.EntityFrameworkCore;
using WinReview.Models;

namespace WinReview.Db;

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
    // Keys 
    modelBuilder.Entity<Users>().HasKey(u => u.UserId);
    modelBuilder.Entity<Projects>().HasKey(p => p.ProjectId);
    modelBuilder.Entity<ReviewCategories>().HasKey(c => c.CategoryId);
    modelBuilder.Entity<Feedback>().HasKey(f => f.FeedbackId);
    modelBuilder.Entity<ProjectMembers>().HasKey(pm => new { pm.ProjectId, pm.UserId }); // composite key
 
    //  ProjectMembers relations 
    modelBuilder.Entity<ProjectMembers>()
        .HasOne(pm => pm.Project)
        .WithMany(p => p.Members)
        .HasForeignKey(pm => pm.ProjectId)
        .OnDelete(DeleteBehavior.Cascade); // deleting a project clears its memberships
 
    modelBuilder.Entity<ProjectMembers>()
        .HasOne(pm => pm.User)
        .WithMany(u => u.ProjectMemberships)
        .HasForeignKey(pm => pm.UserId)
        .OnDelete(DeleteBehavior.Restrict); // don't cascade-delete memberships if a user is deleted
 
    // Feedback relations 
    modelBuilder.Entity<Feedback>()
        .HasOne(f => f.Project)
        .WithMany()
        .HasForeignKey(f => f.ProjectId)
        .OnDelete(DeleteBehavior.Restrict); // nullable FK — fine as Restrict
 
    modelBuilder.Entity<Feedback>()
        .HasOne(f => f.Categories)
        .WithMany()
        .HasForeignKey(f => f.CategoryId)
        .OnDelete(DeleteBehavior.Restrict);
 
    modelBuilder.Entity<Feedback>()
        .HasOne(f => f.FeedbackByUsersId)
        .WithMany()
        .HasForeignKey(f => f.FeedbackByUser)
        .OnDelete(DeleteBehavior.Restrict);
 
    modelBuilder.Entity<Feedback>()
        .HasOne(f => f.FeedbackToUsersId)
        .WithMany()
        .HasForeignKey(f => f.FeedbackToUser)
        .OnDelete(DeleteBehavior.Restrict);
 
    modelBuilder.Entity<Feedback>()
        .HasOne(f => f.ApprovedByUserId)
        .WithMany()
        .HasForeignKey(f => f.ApprovedByUser)
        .OnDelete(DeleteBehavior.Restrict);
 
    //To set Default Value of FeedbackStatus
    modelBuilder.Entity<Feedback>().Property(f => f.FeedbackStatus).HasDefaultValue("Pending");

    //Uniques fields
    modelBuilder.Entity<Users>().HasIndex(u => u.Email).IsUnique();
    modelBuilder.Entity<Users>().HasIndex(u => u.EmpID).IsUnique();
    modelBuilder.Entity<ReviewCategories>().HasIndex(c => c.CategoryName).IsUnique();
 
    // Check constraints 
    modelBuilder.Entity<Feedback>().ToTable(t => t.HasCheckConstraint(
        "CK_Feedback_Rating", "[Rating] >= 1 AND [Rating] <= 5"));
 
    modelBuilder.Entity<Feedback>().ToTable(t => t.HasCheckConstraint(
        "CK_Feedback_Status", "[FeedbackStatus] IN ('Pending','Approved','Declined')"));
 
    modelBuilder.Entity<Feedback>().ToTable(t => t.HasCheckConstraint(
        "CK_Feedback_NoSelfReview", "[FeedbackByUser] <> [FeedbackToUser]"));
 
    // Seed the lookup table 
    modelBuilder.Entity<ReviewCategories>().HasData(
        new ReviewCategories { CategoryId = 1, CategoryName = "Project",   RequiresProject = true },
        new ReviewCategories { CategoryId = 2, CategoryName = "Yearly",    RequiresProject = false },
        new ReviewCategories { CategoryId = 3, CategoryName = "Exit",      RequiresProject = false },
        new ReviewCategories { CategoryId = 4, CategoryName = "Entry",     RequiresProject = false },
        new ReviewCategories { CategoryId = 5, CategoryName = "Quarterly", RequiresProject = false }
    );
}
}