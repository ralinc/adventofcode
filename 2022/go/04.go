package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile("2022/04.input")
	assignments := strings.Split(strings.Trim(string(input), "\n"), "\n")

	var first, second int

	for _, assignment := range assignments {
		elfs := strings.Split(assignment, ",")

		elf1 := strings.Split(elfs[0], "-")
		elf2 := strings.Split(elfs[1], "-")

		e1b, _ := strconv.Atoi(elf1[0])
		e1e, _ := strconv.Atoi(elf1[1])
		e2b, _ := strconv.Atoi(elf2[0])
		e2e, _ := strconv.Atoi(elf2[1])

		if (e1b >= e2b && e1e <= e2e) || (e2b >= e1b && e2e <= e1e) {
			first++
		}

		if e1e >= e2b && e2e >= e1b {
			second++
		}
	}

	fmt.Println(first)  // 456
	fmt.Println(second) // 808
}
