package main

import (
	"fmt"
	"time"
)

func main() {

	weekday := time.Now().Weekday()
	fmt.Printf("Today is %v\n", weekday)

	dayNumber := int(weekday)
	fmt.Printf("The day as a number is %v\n", dayNumber)

	var result string
	
	switch dayNumber = 0; dayNumber {
	case 1:
		result = "It's a Monday!"
	case 2:
		result = "It's a Tuesday!"
	case 3:
		result = "It's a Wednesday!"
	case 4:
		result = "It's a Thursday!"
	case 5:
		result = "It's a Friday!"
	default: 
		result = "It's the weekend!"
	}
	fmt.Println(result)
	
	x := 0
	switch {
	case x < 0:
		result = "Less than zero"
		fallthrough
	case x == 0:
		result = "Equals zero"
		fallthrough
	default:
		result = "Greater than zero"
	}
	fmt.Println(result)
}
