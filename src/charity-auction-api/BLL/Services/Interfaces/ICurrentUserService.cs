namespace BLL.Services.Implemantation
{
    public interface ICurrentUserService
    {
        bool IsAuthenticated { get; }
        string UserId { get; }
    }
}