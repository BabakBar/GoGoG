package main

import (
	"fmt"
)

func main() {
	dog := Dog{"Poodle", "Woof"}
	fmt.Printf("The %v says %v!\n", dog.Breed, dog.Sound)
}

type Dog struct {
   Breed string
   Sound string
}
