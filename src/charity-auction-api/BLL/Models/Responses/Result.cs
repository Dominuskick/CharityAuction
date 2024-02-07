namespace BLL.Models.Responses
{
    using System.Collections.Generic;
    using System.Linq;

    public class Result<T> where T : class
    {
        public T Data { get; }
        private Result(bool succeeded, T data, string error, ErrorType errorType = ErrorType.General)
        {
            IsSuccess = succeeded;
            Error = error;
            ErrorType = errorType;
            Data = data;
        }

        public bool IsSuccess { get; }

        public ErrorType ErrorType { get; }

        public string Error { get; }

        public static Result<T> Success(T value)
            => new Result<T>(true, value, string.Empty);

        public static Result<T> Failure(string error, ErrorType errorType = ErrorType.General)
            => new Result<T>(false, null, error, errorType);
    }

    public class Result
    {
        private Result(bool succeeded, string error = "", ErrorType errorType = ErrorType.General)
        {
            IsSuccess = succeeded;
            Error = error;
            ErrorType = errorType;
        }

        public bool IsSuccess { get; }

        public ErrorType ErrorType { get; }

        public string Error { get; }

        public static Result Success()
            => new Result(true, string.Empty);

        public static Result Failure(string error, ErrorType errorType = ErrorType.General)
            => new Result(false, error, errorType);
    }
}