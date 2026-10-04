using WinReview.Dtos;
using WinReview.Models;

namespace WinReview.Repository;

public interface IProjectRepository
{
     Task<List<Projects>> SearchProjectsAsync(string? search);
}