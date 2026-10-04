

namespace WinReview.Models;

public class Users
{
    public int UserId{get;set;}

    public string MicrosoftObjectId { get; set; } = null!;

    public string Name{get;set;}

    public string Email{get;set;}

    public string? Role{get;set;}


   public List<ProjectMembers> ? ProjectMemberships {get;set;}

}