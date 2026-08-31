using UseCase.Models;
    public class Projects
    {
        public int ProjectId{get;set;}

        public string ProjectCode{get;set;}

        public string ProjectName{get;set;}

        public ICollection<Users> UserName { get; set; }


    }