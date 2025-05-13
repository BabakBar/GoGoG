package main

import (
	"fmt"
	"io"
	"os"
)

func main() {
	fileName := "./fromString.txt"
	file, err := os.Create(fileName)
	defer file.Close()
	checkError(err)
	length, err := io.WriteString(file, "Hello from Go!")
	fmt.Printf("Wrote a file with %v characters\n", length)
	readFile(fileName)
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func readFile(fileName string) {
	data, err := os.ReadFile(fileName)
	checkError(err)
	fmt.Println("Text read from file:", string(data))
}
