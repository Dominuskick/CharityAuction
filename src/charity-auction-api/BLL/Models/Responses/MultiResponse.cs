namespace BLL.Models.Responses
{

    public class MultiResponse<T>
    {
        public MultiResponse(IEnumerable<T> data)
        {
            this.Data = data;
        }

        public IEnumerable<T> Data { get; }
    }
}