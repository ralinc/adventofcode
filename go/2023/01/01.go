package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	input, _ := os.ReadFile("../input/2023/01.input")
	lines := strings.Split(string(input), "\n")

	fmt.Println(solve1(lines)) // 53921
	fmt.Println(solve2(lines)) // 54676
}

func solve1(lines []string) int {
	var sum int

	for _, line := range lines {
		var first, last rune

		for _, rune := range line {
			if unicode.IsDigit(rune) {
				if first == 0 {
					first, last = rune, rune
				} else {
					last = rune
				}
			}
		}

		calibrationValue, _ := strconv.Atoi(string([]rune{first, last}))

		sum += calibrationValue
	}

	return sum
}

func solve2(lines []string) int {
	words := map[string]rune{
		"one":   '1',
		"two":   '2',
		"three": '3',
		"four":  '4',
		"five":  '5',
		"six":   '6',
		"seven": '7',
		"eight": '8',
		"nine":  '9',
	}

	var sum int

	for _, line := range lines {
		var first, last rune

		for i := 0; i < len(line); i++ {
			ch := rune(line[i])

			if unicode.IsDigit(ch) {
				if first == 0 {
					first, last = ch, ch
				} else {
					last = ch
				}
			} else {
				for word, digit := range words {
					if strings.HasPrefix(line[i:], word) {
						if first == 0 {
							first, last = digit, digit
						} else {
							last = digit
						}

						i += len(word) - 2
						break
					}
				}
			}
		}

		calibrationValue, _ := strconv.Atoi(string([]rune{first, last}))

		sum += calibrationValue
	}

	return sum
}
