namespace API.Models
{
    public class ValidationErrorModel
    {
        public string Title { get; set; }

        public int Status { get; set; }

        public string TraceId { get; set; }

        public IDictionary<string, string[]> Errors { get; set; }
    }
}
