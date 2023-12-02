package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var CUBES = map[string]int{"red": 12, "green": 13, "blue": 14}
var RE = regexp.MustCompile("[;,] ")

func main() {
	input, _ := os.ReadFile("../../../input/2023/02.input")
	games := strings.Split(strings.Trim(string(input), "\n"), "\n")

	fmt.Println(solve1(games)) // 2679
	fmt.Println(solve2(games)) // 77607
}

func solve1(games []string) int {
	sum := 0

	for _, game := range games {
		gameSets := strings.Split(game, ": ")
		gameId, _ := strconv.Atoi(strings.Split(gameSets[0], " ")[1])
		hands := RE.Split(strings.Split(game, ": ")[1], -1)

		sum += gameId
		for _, hand := range hands {
			countColor := strings.Split(hand, " ")
			count, _ := strconv.Atoi(countColor[0])
			color := countColor[1]

			if count > CUBES[color] {
				sum -= gameId
				break
			}
		}
	}

	return sum
}

func solve2(games []string) int {
	sum := 0

	for _, game := range games {
		counter := map[string]int{"red": 0, "green": 0, "blue": 0}
		hands := RE.Split(strings.Split(game, ": ")[1], -1)

		for _, hand := range hands {
			countColor := strings.Split(hand, " ")
			count, _ := strconv.Atoi(countColor[0])
			color := countColor[1]

			if count > counter[color] {
				counter[color] = count
			}
		}

		sum += counter["red"] * counter["green"] * counter["blue"]
	}

	return sum
}
