package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	rucksacks := read()

	fmt.Println(first(rucksacks))  // 7763
	fmt.Println(second(rucksacks)) // 2569
}

func read() []string {
	input, _ := os.ReadFile("2022/03.input")
	return strings.Split(strings.Trim(string(input), "\n"), "\n")
}

func first(rucksacks []string) int {
	sum := 0

	for _, r := range rucksacks {
		sum += convert(find(r[:len(r)/2], r[len(r)/2:]))
	}

	return sum
}

func second(rucksacks []string) int {
	sum := 0

	for i := 0; i < len(rucksacks); i += 3 {
		sum += convert(find(rucksacks[i], rucksacks[i+1], rucksacks[i+2]))
	}

	return sum
}

func find(rucksacks ...string) rune {
	count := len(rucksacks)
	seen := make([]map[rune]bool, count)

	for i := 1; i < count; i++ {
		seen[i] = make(map[rune]bool)
		for _, item := range rucksacks[i] {
			seen[i][item] = true
		}
	}

	for _, item := range rucksacks[0] {
		for i := 1; i < count; i++ {
			if !seen[i][item] {
				break
			}
			if i == count-1 {
				return item
			}
		}
	}

	panic("404")
}

func convert(item rune) int {
	if item >= 97 && item <= 122 {
		return int(item) - 96
	} else {
		return int(item) - 38
	}
}
