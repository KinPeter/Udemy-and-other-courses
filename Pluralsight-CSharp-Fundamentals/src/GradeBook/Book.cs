using System;

namespace GradeBook
{
    public abstract class Book : NamedObject, IBook
    {
        protected Book(string name) : base(name) { }

        public abstract void AddGrade(double grade);
        public abstract Statistics GetStatistics();

        public void ShowStatistics()
        {
            Statistics result = GetStatistics();
            Console.WriteLine($"The lowest grade is {result.Low}");
            Console.WriteLine($"The highest grade is {result.High}");
            Console.WriteLine($"The average grade is {result.Average:N1}");
            Console.WriteLine($"The average letter grade is {result.Letter}");
        }

        public abstract event GradeAddedDelegate GradeAdded;
    }
}