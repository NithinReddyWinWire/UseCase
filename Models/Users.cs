namespace UseCase.Models;

public class Users
{
    public int UserId{get;set;}
    public string EmpID {get;set;}

    public string Name{get;set;}

    public string Email{get;set;}

    public string Password{get;set;}

    public string Role{get;set;}

   public string DeptName{get;set;}

   public ICollection<Projects> ProjectName { get; set; }
    
}