package main

import "fmt"

func main() {

	// colors := []string{"Red", "Green", "Blue"}
	// for i := 0; i < len(colors); i++ {
	// 	println(colors[i])
	// }

	// for i := range colors {
	// 	println(colors[i])
	// }

	// for _, color := range colors {
	// 	println(color)
	// }

	// states := make(map[string]string)
	// states["WA"] = "Washington"
	// states["OR"] = "Oregon"
	// states["CA"] = "California"
	// for state, _ := range states {
	// 	println(states[state])
	// }

	value := 0
	sum := 0
	for value < 5 {
		sum += value
		fmt.Printf("Value: %v\n", value)
		fmt.Printf("Sum: %v\n", sum)
		value++
	}

	sum = 1
	for sum < 1000 {
		sum += sum
		if sum > 200 {
			goto theEnd
		}
	}
	theEnd : println("end of program")
	fmt.Printf("Sum: %v\n", sum)

}
