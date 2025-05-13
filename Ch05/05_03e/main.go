package main

import (
	"fmt"
	"time"
)

func main() {
	go say("Hello from the Goroutine")
	println("Hello from Main")
	time.Sleep(2 * time.Second)
	println("All done")
}

func say(message string) {
	time.Sleep(1 * time.Second)
	fmt.Println(message)
}
