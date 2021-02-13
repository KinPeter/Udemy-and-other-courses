using Xunit;

namespace GradeBook.Tests
{
    public delegate string WriteLogDelegate(string logMessage);

    public class DelegateTests
    {
        private int count = 0;

        [Fact]
        public void WriteLogDelegateCanPointToMethod()
        {
            //WriteLogDelegate log = new WriteLogDelegate(ReturnMessage);
            WriteLogDelegate log = ReturnMessage;
            log += ReturnMessage;
            log += ReturnAnOtherMessage;

            string result = log("Hello!");

            Assert.Equal(3, count);
        }

        private string ReturnAnOtherMessage(string message)
        {
            count++;
            return message.ToLower();
        }
        private string ReturnMessage(string message)
        {
            count++;
            return message;
        }
    }
}