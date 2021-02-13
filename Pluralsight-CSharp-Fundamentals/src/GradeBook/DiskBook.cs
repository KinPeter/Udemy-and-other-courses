using System;
using System.IO;

namespace GradeBook
{
    public class DiskBook : Book
    {
        public DiskBook(string name) : base(name) { }

        public override void AddGrade(double grade)
        {
            if (grade <= 100 && grade >= 0)
            {
                using (StreamWriter writer = File.AppendText($"{Name}.txt"))
                {
                    writer.WriteLine(grade);
                    if (GradeAdded != null)
                    {
                        GradeAdded(this, new EventArgs());
                    }
                }
            }
            else
            {
                throw new ArgumentException($"Invalid {nameof(grade)}");
            }
        }

        public override Statistics GetStatistics()
        {
            Statistics result = new Statistics();

            using (StreamReader reader = File.OpenText($"{Name}.txt"))
            {
                string line = reader.ReadLine();
                while (line != null)
                {
                    double number = double.Parse(line);
                    result.Add(number);
                    line = reader.ReadLine();
                }
            }

            return result;
        }

        public override event GradeAddedDelegate GradeAdded;
    }
}