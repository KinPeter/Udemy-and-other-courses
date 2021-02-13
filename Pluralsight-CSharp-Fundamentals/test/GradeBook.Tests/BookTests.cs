using System;
using Xunit;

namespace GradeBook.Tests
{
    public class BookTests
    {
        [Fact]
        public void BookCalculatesStatistics()
        {
            // arrange
            InMemoryBook inMemoryBook = new InMemoryBook("");
            inMemoryBook.AddGrade(89.1);
            inMemoryBook.AddGrade(90.5);
            inMemoryBook.AddGrade(77.3);

            // act
            Statistics result = inMemoryBook.GetStatistics();

            // assert
            Assert.Equal(85.6, result.Average, 1);
            Assert.Equal(90.5, result.High, 1);
            Assert.Equal(77.3, result.Low, 1);
            Assert.Equal('B', result.Letter);
        }

        // [Fact]
        // public void Test1()
        // {
        //     // arrange
        //     const int x = 5;
        //     const int y = 2;
        //     const int expected = 7;
        //
        //     // act
        //     const int actual = x + y;
        //
        //     // assert
        //     Assert.Equal(expected, actual);
        // }
    }
}