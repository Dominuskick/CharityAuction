namespace BLL.Models.Responses
{ 
    public enum ErrorType
    {
        General,
        TokenExpired,
        AccountNotConfirmed,
        Unauthorized,
    }
}