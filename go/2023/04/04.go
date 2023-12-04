package main

import (
	"os"
	"regexp"
	"strings"
)

var (
	reNumber = regexp.MustCompile(`\d+`)
)

func main() {
	input, _ := os.ReadFile("04.input")
	lines := strings.Split(strings.Trim(string(input), "\n"), "\n")

	println(solve1(lines)) // 22488
	println(solve2(lines)) // 7013204
}

func solve1(lines []string) int {
	sum := 0

	for _, line := range lines {
		count := countWinningNumbers(line)

		if count > 0 {
			sum += (1 << (count - 1))
		}
	}

	return sum
}

func solve2(lines []string) int {
	sum := 0
	cards := map[int]int{}

	for i, line := range lines {
		cards[i]++

		count := countWinningNumbers(line)

		for j := 1; j <= count; j++ {
			cards[i+j] += cards[i]
		}
	}

	for _, v := range cards {
		sum += v
	}

	return sum
}

func countWinningNumbers(line string) int {
	count := 0
	numbers := map[string]int{}

	winning, mine := parseLine(line)

	for _, n := range reNumber.FindAllString(winning, -1) {
		numbers[n] = 1
	}

	for _, n := range reNumber.FindAllString(mine, -1) {
		numbers[n]++
	}

	for _, v := range numbers {
		if v > 1 {
			count++
		}
	}

	return count
}

func parseLine(line string) (string, string) {
	parts := strings.Split(strings.Split(line, ":")[1], "|")

	return parts[0], parts[1]
}
