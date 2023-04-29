package main

import (
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	println(rearrange(false)) // ZRLJGSCTR
	println(rearrange(true))  // PRTTGRFPB
}

func rearrange(isNewCrane bool) string {
	stacks, instructions := parseInput()

	for _, instruction := range instructions {
		count := instruction[0]
		from := instruction[1] - 1
		to := instruction[2] - 1
		total := len(stacks[from])
		start := total - count

		if isNewCrane {
			reverse(stacks[from], start, total)
		}

		for i := 0; i < count; i++ {
			stacks[to] = append(stacks[to], stacks[from][total-i-1])
		}

		stacks[from] = stacks[from][:start]
	}

	tops := make([]byte, len(stacks))

	for i, stack := range stacks {
		tops[i] = stack[len(stack)-1]
	}

	return string(tops)
}

func parseInput() ([][]byte, [][]int) {
	input, _ := os.ReadFile("05.input")
	parts := strings.Split(strings.Trim(string(input), "\n"), "\n\n")
	starting := strings.Split(parts[0], "\n")
	procedure := strings.Split(parts[1], "\n")

	stacksCount := len(starting[0])/4 + 1
	stacks := make([][]byte, stacksCount)
	for i := 0; i < stacksCount; i++ {
		for j := 0; j < len(starting)-1; j++ {
			crate := starting[j][i*4+1]
			if crate != 32 {
				stacks[i] = append(stacks[i], crate)
			}
		}
		reverse(stacks[i], 0, len(stacks[i]))
	}

	re := regexp.MustCompile(`\d+`)
	instructions := make([][]int, len(procedure))
	for i, step := range procedure {
		nums := re.FindAllString(step, -1)
		instruction := make([]int, 3)
		for j := 0; j < 3; j++ {
			instruction[j], _ = strconv.Atoi(nums[j])
		}
		instructions[i] = instruction
	}

	return stacks, instructions
}

func reverse(a []byte, beg int, end int) {
	for i, j := beg, end-1; i < j; i, j = i+1, j-1 {
		a[i], a[j] = a[j], a[i]
	}
}
