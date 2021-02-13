namespace GradeBook
{
    public class NamedObject
    {
        public NamedObject(string name)
        {
            Name = name;
        }
        // Property with getter and setter, long hand syntax:
        // private string name;
        // public string Name
        // {
        //     get
        //     {
        //         return name;
        //     }
        //     set
        //     {
        //         if (!String.IsNullOrEmpty(value))
        //         {
        //             name = value;
        //         }
        //     }
        // }

        // Property with getter and setter, short hand syntax:
        public string Name { get; set; }

        // getter and setter can have different accessor modifiers
        // public string Name
        // {
        //     get; 
        //     private set;
        // }
    }
}