package main

import (
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile("06.input")
	lines := strings.Split(strings.Trim(string(input), "\n"), "\n")

	println(solve1(lines)) // 1155175
	println(solve2(lines)) // 35961505
}

func solve1(lines []string) int {
	times, distances := parse1(lines)

	p := 1

	for i := 0; i < len(times); i++ {
		p *= solve(times[i], distances[i])
	}

	return p
}

func solve2(lines []string) int {
	time, distance := parse2(lines)

	return solve(time, distance)
}

func solve(time, distance int) int {
	d := math.Sqrt(float64(time*time - 4*distance))
	a := math.Floor((float64(time) - d) / 2)
	b := math.Ceil((float64(time) + d) / 2)

	return int(b) - int(a) - 1
}

func parse1(lines []string) ([]int, []int) {
	a := make([][]int, 2)

	for i, line := range lines {
		for _, w := range strings.Fields(line)[1:] {
			n, _ := strconv.Atoi(w)
			a[i] = append(a[i], n)
		}
	}

	return a[0], a[1]
}

func parse2(lines []string) (int, int) {
	a := make([]int, 2)

	for i, line := range lines {
		a[i], _ = strconv.Atoi(strings.Split(strings.ReplaceAll(line, " ", ""), ":")[1])
	}

	return a[0], a[1]
}
