using System;

namespace GradeBook
{
    public class Statistics
    {
        public double Low;
        public double High;
        public double Sum;
        public int Count;
        
        public double Average
        {
            get
            {
                return Sum / Count;
            }
        }

        public char Letter
        {
            get
            {
                switch (Average)
                {
                    case var d when d >= 90:
                        return 'A';
                    case var d when d >= 80:
                        return 'B';
                    case var d when d >= 70:
                        return 'C';
                    case var d when d >= 60:
                        return 'D';
                    default:
                        return 'F';
                }
            }
        }

        public Statistics()
        {
            Count = 0;
            Sum = 0.0;
            Low = double.MaxValue;
            High = double.MinValue;
        }

        public void Add(double number)
        {
            Sum += number;
            Count++;
            Low = Math.Min(number, Low);
            High = Math.Max(number, High);
        }
        
    }
}