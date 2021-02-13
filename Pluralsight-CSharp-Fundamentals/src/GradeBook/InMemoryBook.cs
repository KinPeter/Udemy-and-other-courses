using System;
using System.Collections.Generic;

namespace GradeBook
{
    public delegate void GradeAddedDelegate(object sender, EventArgs args);

    public class InMemoryBook : Book
    {
        private List<double> grades;

        // readonly can be initialized or set in the constructor
        private readonly string category;
        // const can only be initialized with a value
        public const string CATEGORY = "science";
        
        public InMemoryBook(string name) : base(name)
        {
            category = "science";
            this.grades = new List<double>();
        }

        public InMemoryBook(string name, double[] grades) : base(name)
        {
            this.grades = new List<double>(grades);
        }
        
        public override void AddGrade(double grade)
        {
            if (grade <= 100 && grade >= 0)
            {
                grades.Add(grade);
                if (GradeAdded != null)
                {
                    GradeAdded(this, new EventArgs());
                }
            }
            else
            {
                throw new ArgumentException($"Invalid {nameof(grade)}");
            }
        }

        public void AddGrade(char letter)
        {
            switch (letter)
            {
                case 'A':
                    AddGrade(90);
                    break;
                case 'B':
                    AddGrade(80);
                    break;
                case 'C':
                    AddGrade(70);
                    break;
                case 'D':
                    AddGrade(60);
                    break;
                default:
                    AddGrade(0);
                    break;
            }
        }

        public override event GradeAddedDelegate GradeAdded;

        public override Statistics GetStatistics()
        {
            Statistics result = new Statistics();
            foreach (double grade in grades)
            {
                result.Add(grade);
            }

            return result;
        }

    }
}