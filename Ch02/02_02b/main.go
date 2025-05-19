package main

import (
	"fmt"
)

func main() {

	str1 := "The quick red fox"
	str2 := "jumped over"
	str3 := "the lazy brown dog."
	aNumber := 42

	fmt.Println(str1, str2, str3)
	stringLength, err := fmt.Println("The numero is", aNumber)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Println("String length:", stringLength)
	}

	fmt.Printf("The numero is %v\n", aNumber)
}
