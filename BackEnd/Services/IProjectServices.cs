using WinReview.Dtos;
using WinReview.Models;

namespace WinReview.Services;

public interface IProjectServices
{
    Task<List<Projects>> SearchProjectsAsync(string? search);
}