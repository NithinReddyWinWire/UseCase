using WinReview.Models;

public class ProjectMembers
{
    public int ProjectId { get; set; }
    public Projects? Project { get; set; }
 
    public int UserId { get; set; }
    public Users? User { get; set; }
 
    public string? RoleOnProject { get; set; }
    public DateTime? JoinedAt { get; set; }
}