package main

import (
	"fmt"
	"io"
	"net/http"
)

const url = "http://services.explorecalifornia.org/json/tours.php"

func main() {
	fmt.Println("Network requests")
	client := http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	checkError(err)

	req.Header.Set("User-Agent", "")

	resp, err := client.Do(req)
	checkError(err)
	defer resp.Body.Close()

	fmt.Printf("Response type:%T\n", resp)

	bytes, err := io.ReadAll(resp.Body)
	checkError(err)
	content := string(bytes)
	fmt.Print(content)
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}
