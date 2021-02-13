package main

import (
	"fmt"
)

const (
	a = iota // enumerated constant using "built-in counter" iota special symbol
	b        // by default increments by one inside a const block
	c
)

const (
	_ = iota * 10 // _ : ignore zero value to avoid bugs with other zero values
	d             // now this will increment by 10 and start from 10
	e
	f
)

func main() {
	const myConst int = 42 // immutable, but can be shadowed
	fmt.Printf("%v, %T \n", myConst, myConst)

	// const myConst2 float64 = math.Sin(1.57) // const cannot be a return value of a function
	// fmt.Printf("%v, %T \n", myConst2, myConst2)

	var myVar int = 27
	fmt.Printf("%v, %T \n", myConst+myVar, myConst+myVar) // can be mixed with variables in operations

	fmt.Printf("a %v, %T \n", a, a)
	fmt.Printf("b %v, %T \n", b, b)
	fmt.Printf("c %v, %T \n", c, c)
	fmt.Printf("d %v, %T \n", d, d)
	fmt.Printf("e %v, %T \n", e, e)
	fmt.Printf("e %v, %T \n", f, f)
}
