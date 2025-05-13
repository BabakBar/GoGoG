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

}
