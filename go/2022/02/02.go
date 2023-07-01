package main

import (
	"fmt"
	"os"
	"strings"
)

const (
	Lose int = iota
	Draw
	Win
)

func play(a int, b int) int {
	if a == b {
		return Draw
	} else if ((a + 1) % 3) == b {
		return Win
	} else {
		return Lose
	}
}

func move(a int, outcome int) int {
	if outcome == Draw {
		return int(a)
	} else if outcome == Win {
		return (a + 1) % 3
	} else {
		return (a + 2) % 3
	}
}

func main() {
	input, _ := os.ReadFile("../input/2022/02.input")
	lines := strings.Split(strings.Trim(string(input), "\n"), "\n")

	games := make([][2]int, len(lines))
	for i, line := range lines {
		columns := strings.Split(line, " ")
		games[i] = [2]int{int(columns[0][0] - 65), int(columns[1][0] - 88)}
	}

	score := 0
	for _, game := range games {
		score += (game[1] + 1) + (play(game[0], game[1]) * 3)
	}

	fmt.Println(score) // 12586

	score = 0
	for _, game := range games {
		score += (move(game[0], game[1]) + 1) + (game[1] * 3)
	}

	fmt.Println(score) // 13193
}
