namespace WinReview.Models;


public class Feedback
{
    public int FeedbackId{get;set;}

    public int Rating{get;set;}

    public string Comment{get;set;}

    public DateTime CreatedAt{get;set;}

   public int? ProjectId{get;set;}

   public Projects? Project { get; set; } // navigation property

   public int CategoryId {get;set;}
   public ReviewCategories? Categories{get;set;}

   public int FeedbackByUser {get;set;}

   public Users? FeedbackByUsersId{get;set;}

   public int FeedbackToUser{get;set;}

   public Users? FeedbackToUsersId{get;set;}


   public string? FeedbackStatus{get;set;} // its status

   public int? ApprovedByUser{get;set;} //tells who approved the feedback
    public Users? ApprovedByUserId{get;set;}

   public DateTime? ReviewdAt {get;set;} //tells when the feedback got approved




}

