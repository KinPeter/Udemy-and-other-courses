package main

import (
	"fmt"
	"strconv"
)

// package scope declarations (lower case)
var g float32 = 32.2
var s = "foo"

// I - globally exported visible variable (first letter upper case)
var I int = 42

// group declaration (only sematically grouped here, no connection)
var (
	actorName    string = "Elisabeth Sladen"
	companion    string = "Sarah Jane Smith"
	doctorNumber int    = 3
	season       int    = 11
)

var (
	counter int = 0
)

func main() {
	// function / block scope
	var i int // standard declaration
	i = 42    // initializing

	var j int = 27 // declare and initialize

	k := 99.1 // shorthand declaration with type infering

	fmt.Printf("%v, %T \n", i, i) // %v value, %T type
	fmt.Printf("%v, %T \n", j, j)
	fmt.Printf("%v, %T \n", k, k)
	fmt.Printf("%v, %T \n", g, g)
	fmt.Printf("%v, %T \n", s, s)

	f := float32(i) // type conversion
	fmt.Printf("%v, %T \n", f, f)

	s1 := string(i)
	fmt.Printf("%v, %T - not what expected? \n", s1, s1)

	s2 := strconv.Itoa(i)
	fmt.Printf("%v, %T - works fine! \n", s2, s2)

}
