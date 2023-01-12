package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile("2022/01.input")
	chunks := strings.Split(strings.Trim(string(input), "\n"), "\n\n")

	calories := make([]int, len(chunks))
	for i, lines := range chunks {
		for _, line := range strings.Split(lines, "\n") {
			calorie, _ := strconv.Atoi(line)
			calories[i] += calorie
		}
	}

	sort.Sort(sort.Reverse(sort.IntSlice(calories)))

	first := calories[0]
	fmt.Println(first) // 68775

	second := calories[0] + calories[1] + calories[2]
	fmt.Println(second) // 202585
}
