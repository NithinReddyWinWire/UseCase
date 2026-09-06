namespace WinReview.Dtos;
using WinReview.Models;


public class FeedbackDto
{
    public int FeedbackToUser { get; set; }
    public int CategoryId {get;set;}
    public int Rating{get;set;}

    public string Comment{get;set;}
}

public class ShowFeedbackDto
{
    public int FeedbackId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public string? CategoryName { get; set; }
    public string? FeedbackByUserName { get; set; }
    public string? FeedbackToUserName { get; set; }
    public string? FeedbackStatus { get; set; }
}