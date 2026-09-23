using WinReview.Models;
    public class Projects
    {
        public int ProjectId{get;set;}

        public string ProjectCode{get;set;}

        public string ProjectName{get;set;}


        public List<ProjectMembers> Members {get;set;}
    }