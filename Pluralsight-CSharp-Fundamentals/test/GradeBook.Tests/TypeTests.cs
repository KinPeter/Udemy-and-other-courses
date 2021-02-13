using System;
using Xunit;

namespace GradeBook.Tests
{
    public class TypeTests
    {
        [Fact]
        public void CSharpIsPassByValue()
        {
            InMemoryBook book1 = GetBook("Book 1");
            GetBookSetName(book1, "New name");

            Assert.Equal("Book 1", book1.Name);
        }

        private void GetBookSetName(InMemoryBook inMemoryBook, string name)
        {
            inMemoryBook = new InMemoryBook(name);
            inMemoryBook.Name = name;
        }


        [Fact]
        public void CSharpCanPassByReference()
        {
            InMemoryBook book1 = GetBook("Book 1");
            GetBookSetNameByRef(ref book1, "New name");

            Assert.Equal("New name", book1.Name);
        }

        private void GetBookSetNameByRef(ref InMemoryBook inMemoryBook, string name)
        {
            inMemoryBook = new InMemoryBook(name);
            inMemoryBook.Name = name;
        }


        [Fact]
        public void ValueTypesAlsoPassedByValue()
        {
            int x = GetInt();
            SetInt(x);
            // SetInt doesn't change the value of X as the value is passed and copied
            Assert.Equal(3, x);

            SetIntByRef(ref x);
            // Here it's passed by reference, so it changes
            Assert.Equal(42, x);
        }

        private int GetInt()
        {
            return 3;
        }

        private void SetInt(int x)
        {
            x = 42;
        }

        private void SetIntByRef(ref int x)
        {
            x = 42;
        }


        [Fact]
        public void CanSetNameFromReference()
        {
            InMemoryBook book1 = GetBook("Book 1");
            SetName(book1, "New name");

            Assert.Equal("New name", book1.Name);
        }

        private void SetName(InMemoryBook inMemoryBook, string name)
        {
            inMemoryBook.Name = name;
        }


        [Fact]
        public void GetBookReturnsDifferentObjects()
        {
            InMemoryBook book1 = GetBook("Book 1");
            InMemoryBook book2 = GetBook("Book 2");

            Assert.Equal("Book 1", book1.Name);
            Assert.Equal("Book 2", book2.Name);

            Assert.NotSame(book1, book2);
            Assert.False(Object.ReferenceEquals(book1, book2));
        }

        [Fact]
        public void TwoVarsCanReferenceSameObject()
        {
            InMemoryBook book1 = GetBook("Book 1");
            InMemoryBook book2 = book1;

            Assert.Equal("Book 1", book1.Name);
            Assert.Equal("Book 1", book2.Name);

            // Same: point to the same object
            Assert.Same(book1, book2);
            Assert.True(Object.ReferenceEquals(book1, book2));
        }

        private InMemoryBook GetBook(string name)
        {
            return new InMemoryBook(name);
        }


        [Fact]
        public void StringsBehaveLikeValueTypes()
        {
            string name = "Peter";
            string upper = MakeUpperCase(name);

            Assert.Equal("Peter", name);
            Assert.Equal("PETER", upper);
        }

        private string MakeUpperCase(string param)
        {
            return param.ToUpper();
        }
    }
}