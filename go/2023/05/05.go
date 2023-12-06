package main

import (
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

var (
	reNumber = regexp.MustCompile(`\d+`)
	cache    = make(map[int]int)
)

func main() {
	input, _ := os.ReadFile("05.input")
	blocks := strings.Split(strings.Trim(string(input), "\n"), "\n\n")

	println(solve1(blocks)) // 175622908
	println(solve2(blocks)) // 5200543
}

func solve1(blocks []string) int {
	seeds := parseSeeds(blocks[0])
	maps := parseMaps(blocks[1:])

	lowest := math.MaxInt

	for _, seed := range seeds {
		loc := findLocation(seed, maps)

		if lowest > loc {
			lowest = loc
		}
	}

	return lowest
}

func solve2(blocks []string) int {
	seeds := parseSeeds(blocks[0])
	maps := parseMaps(blocks[1:])

	lowest := math.MaxInt

	for i := 0; i < len(seeds); i += 2 {
		for j := seeds[i]; j < seeds[i]+seeds[i+1]; j++ {
			loc := findLocation(j, maps)

			if lowest > loc {
				lowest = loc
			}
		}
	}

	return lowest
}

func parseSeeds(line string) []int {
	var seeds []int

	for _, seed := range reNumber.FindAllString(line, -1) {
		n, _ := strconv.Atoi(seed)
		seeds = append(seeds, n)
	}

	return seeds
}

func parseMaps(maps []string) [][][]int {
	a := [][][]int{}

	for _, m := range maps {
		ranges := strings.Split(m, "\n")[1:]

		b := [][]int{}

		for _, r := range ranges {
			rr := strings.Split(r, " ")

			d, _ := strconv.Atoi(rr[0])
			s, _ := strconv.Atoi(rr[1])
			w, _ := strconv.Atoi(rr[2])

			b = append(b, []int{d, s, w})
		}

		a = append(a, b)
	}

	return a
}

func findLocation(seed int, maps [][][]int) int {
	if loc, ok := cache[seed]; ok {
		return loc
	}

	loc := seed

	for _, a := range maps {
		for _, b := range a {
			d := b[0]
			s := b[1]
			w := b[2]

			if loc >= s && loc < s+w {
				loc = d + loc - s
				break
			}
		}
	}

	cache[seed] = loc

	return loc
}
