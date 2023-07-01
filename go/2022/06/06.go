package main

import "os"

func main() {
	input, _ := os.ReadFile("../input/2022/06.input")

	println(findMarkerIndex(input, 4))  // 1080
	println(findMarkerIndex(input, 14)) // 3645
}

func findMarkerIndex(input []byte, n int) int {
	for i := 0; i < len(input)-n; i++ {
		marker := make(map[byte]bool)

		for j := 0; j < n; j++ {
			marker[input[i+j]] = true
		}

		if len(marker) == n {
			return i + n
		}
	}

	panic("no marker")
}
