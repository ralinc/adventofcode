package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type Number struct {
	y     int
	xBeg  int
	xEnd  int
	value int
}

type Symbol struct {
	y     int
	x     int
	value rune
}

var (
	reNumber = regexp.MustCompile(`\d+`)
	reSymbol = regexp.MustCompile(`[^0-9.]`)
)

func main() {
	input, _ := os.ReadFile("../../../input/2023/03.input")
	lines := strings.Split(strings.Trim(string(input), "\n"), "\n")

	numbers := []Number{}
	symbols := []Symbol{}

	for i, line := range lines {
		for _, m := range reNumber.FindAllStringIndex(line, -1) {
			v, _ := strconv.Atoi(line[m[0]:m[1]])
			number := Number{y: i, xBeg: m[0], xEnd: m[1], value: v}
			numbers = append(numbers, number)
		}

		for _, m := range reSymbol.FindAllStringIndex(line, -1) {
			symbol := Symbol{y: i, x: m[0], value: rune(line[m[0]])}
			symbols = append(symbols, symbol)
		}
	}

	fmt.Println(solve1(numbers, symbols)) // 537832
	fmt.Println(solve2(numbers, symbols)) // 81939900
}

func solve1(numbers []Number, symbols []Symbol) int {
	sum := 0

	for _, n := range numbers {
		for _, s := range symbols {
			if adjacent(n, s) {
				sum += n.value
			}
		}
	}

	return sum
}

func solve2(numbers []Number, symbols []Symbol) int {
	sum := 0

	for _, s := range symbols {
		if s.value != '*' {
			continue
		}

		gears := []Number{}
		for _, n := range numbers {
			if adjacent(n, s) {
				gears = append(gears, n)

				if len(gears) == 2 {
					sum += gears[0].value * gears[1].value
					break
				}
			}
		}
	}

	return sum
}

func adjacent(n Number, s Symbol) bool {
	xb := n.xBeg - 1
	xe := n.xEnd
	yb := n.y - 1
	ye := n.y + 1

	return s.x >= xb && s.x <= xe && s.y >= yb && s.y <= ye
}
