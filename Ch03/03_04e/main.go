package main

import (
	"fmt"
	"sort"
)

func main() {
	// This is a slice
	// var colors = []string{"Red", "Green", "Blue"}
	var colors = make([]string, 0, 3)
	colors = append(colors, "Red", "Green", "Blue")
	fmt.Println(colors)
	colors = append(colors, "Purple", "Fuschia")
	fmt.Println(colors)
	
	colors = remove(colors, 1)
	fmt.Println(colors)
	
	sort.Strings(colors)
	fmt.Println(colors)
}

func remove(slice []string, i int) []string {
	return append(slice[:i], slice[i+1:]...)
}
