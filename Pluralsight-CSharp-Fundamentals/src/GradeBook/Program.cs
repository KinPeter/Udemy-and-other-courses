using System;
using System.Collections.Generic;

namespace GradeBook
{
    class Program
    {
        private static void Main(string[] args)
        {
            CreateInMemoryBook();
            // CreateDiskBook();

            // Book book = new Book("Book 1");
            // book.AddGrade(89.1);
            // book.AddGrade(104.3); // invalid value!
            //
            // double[] numbers = {12.3, 13.4, 14.5};
            // Book book2 = new Book("Book 2", numbers);
            //
            // book2.ShowStatistics();


            // LearningTheSyntaxSection(args);
        }

        private static void CreateInMemoryBook()
        {
            InMemoryBook inMemoryBook = new InMemoryBook("My book");

            inMemoryBook.GradeAdded += OnGradeAdded;
            
            EnterGrades(inMemoryBook);

            inMemoryBook.ShowStatistics();
        }

        private static void CreateDiskBook()
        {
            DiskBook diskBook = new DiskBook("My disk book");

            diskBook.GradeAdded += OnGradeAdded;
            
            EnterGrades(diskBook);
            
            diskBook.ShowStatistics();
        }

        private static void EnterGrades(IBook book)
        {
            Console.WriteLine("Please add grades, or enter 'Q' to finish.");
            while (true)
            {
                string input = Console.ReadLine();
                if (input == "q" || input == "Q")
                {
                    break;
                }

                try
                {
                    double grade = double.Parse(input);
                    book.AddGrade(grade);
                }
                catch (ArgumentException e)
                {
                    Console.WriteLine(e.Message);
                }
                catch (FormatException e)
                {
                    Console.WriteLine($"Invalid input: {input}");
                }
            }
        }

        private static void OnGradeAdded(object sender, EventArgs e)
        {
            Console.WriteLine("Grade added."); 
        }

        // private static void LearningTheSyntaxSection(string[] args)
        // {
        //     Console.WriteLine(args.Length > 0 ? $"Hello {args[0]}!" : "Hello!");
        //
        //     // Variable declarations
        //     double x = 12.3;
        //     var y = 32.1;
        //     var result = x + y;
        //
        //     Console.WriteLine(result);
        //
        //     // Array declarations
        //     var numbers = new double[3];
        //     numbers[0] = 12.3;
        //     numbers[1] = 13.4;
        //     numbers[2] = 14.5;
        //
        //     double[] easierNumbers = {12.3, 13.4, 14.5};
        //     var varNumbers = new[] {12.3, 13.4, 14.5};
        //
        //     var sumResult = 0.0;
        //
        //     foreach (double number in numbers)
        //     {
        //         sumResult += number;
        //     }
        //
        //     Console.WriteLine($"Sum of array numbers: {sumResult}");
        //
        //     // Collections - Lists
        //     var grades = new List<double>();
        //     // List<double> grades = new List<double>();
        //     grades.Add(56.1);
        //
        //     var initializedGrades = new List<double>() {12.3, 13.4, 14.5};
        //     initializedGrades.Add(32.1);
        //
        //     var average = 0.0;
        //
        //     foreach (double number in initializedGrades)
        //     {
        //         average += number;
        //     }
        //
        //     average /= initializedGrades.Count;
        //
        //     // Formatting float to 1 decimal
        //     Console.WriteLine($"Average of grades: {average:N1}");
        // }
    }
}