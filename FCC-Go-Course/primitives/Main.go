package main

import (
	"fmt"
)

func main() {
	// Boolean data
	var n bool = true
	fmt.Printf("%v, %T \n", n, n)

	n1 := 1 == 1
	n2 := 1 == 2
	fmt.Printf("%v, %T \n", n1, n1)
	fmt.Printf("%v, %T \n", n2, n2)

	var n3 bool // default zero value is false
	fmt.Printf("%v, %T \n", n3, n3)

	// Integers
	// signed: int8, int16, int32 (default), int64
	// unsigned: uint8, uint16, uint32
	// arithmetic operations: types must be the same on both size, but conversion is possible
	var i1 int32 = 12
	var i2 int8 = 3
	// fmt.Println(i1 + i2)     // not working
	fmt.Println(i1 + int32(i2)) // not working

	// Floating point numbers
	// float32, float64 (default)
	f := 3.14
	f = 13.7e72
	f = 2.1E14
	fmt.Printf("%v, %T \n", f, f)

	// Complex numbers
	// complex64, complex128
	var c complex64 = 1 + 2i
	fmt.Printf("%v, %T \n", c, c)
	fmt.Printf("%v, %T \n", real(c), real(c))
	fmt.Printf("%v, %T \n", imag(c), imag(c))

	var c1 complex128 = complex(5, 12) // create a complex number from two float numbers
	fmt.Printf("%v, %T \n", c1, c1)

	// Text data types
	// String: any UTF-8 character (actually an array of bytes)
	s := "this is a string"
	fmt.Printf("%v, %T \n", s, s)
	fmt.Printf("%v, %T \n", s[2], s[2])                 // gives the byte value of letter "i"
	fmt.Printf("%v, %T \n", string(s[2]), string(s[2])) // gives back the letter "i"
	b := []byte(s)                                      // convert to byte array
	fmt.Printf("%v, %T \n", b, b)

	// Rune: any UTF-32 character
	var r rune = 'a'              // notice single quotes!
	fmt.Printf("%v, %T \n", r, r) // comes as an int32 value for the character

}
