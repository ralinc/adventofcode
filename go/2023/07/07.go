package main

import (
	"bufio"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Hand struct {
	Cards []int
	Kind  int
	Bid   int
}

var (
	ranks = map[rune]int{
		'A': 14,
		'K': 13,
		'Q': 12,
		'J': 11,
		'T': 10,
		'9': 9,
		'8': 8,
		'7': 7,
		'6': 6,
		'5': 5,
		'4': 4,
		'3': 3,
		'2': 2,
	}
)

func main() {
	lines := readLines()

	println(solve1(lines)) // 248113761
	println(solve2(lines)) // 246285222
}

func solve1(lines []string) int {
	hands := makeHands(lines, makeHand1)
	sortHands(hands)
	return sumHands(hands)
}

func solve2(lines []string) int {
	hands := makeHands(lines, makeHand2)
	sortHands(hands)
	return sumHands(hands)
}

func makeHands(lines []string, makeHand func(line string) Hand) []Hand {
	hands := []Hand{}

	for _, line := range lines {
		hands = append(hands, makeHand(line))
	}

	return hands
}

func makeHand1(line string) Hand {
	fields := strings.Fields(line)

	cards := []int{}
	for _, card := range fields[0] {
		cards = append(cards, ranks[card])
	}

	counter := map[int]int{}
	for _, card := range cards {
		counter[card]++
	}

	counts := []int{}
	for _, count := range counter {
		counts = append(counts, count)
	}

	sort.Slice(counts, func(i, j int) bool {
		return counts[i] > counts[j]
	})

	kind := 1
	switch {
	case len(counts) == 1:
		kind = 7
	case len(counts) == 2 && counts[0] == 4:
		kind = 6
	case len(counts) == 2 && counts[0] == 3:
		kind = 5
	case len(counts) == 3 && counts[0] == 3:
		kind = 4
	case len(counts) == 3 && counts[0] == 2:
		kind = 3
	case len(counts) == 4:
		kind = 2
	}

	bid, _ := strconv.Atoi(fields[1])

	return Hand{cards, kind, bid}
}

func makeHand2(line string) Hand {
	fields := strings.Fields(line)

	cards := []int{}
	for _, card := range fields[0] {
		cards = append(cards, ranks[card])
	}

	counter := map[int]int{}
	for _, card := range cards {
		counter[card]++
	}

	counts := []struct{ Card, Count int }{}
	for card, count := range counter {
		counts = append(counts, struct{ Card, Count int }{card, count})
	}

	sort.Slice(counts, func(i, j int) bool {
		return counts[i].Count > counts[j].Count
	})

	jcounter := map[int]int{}
	for _, card := range cards {
		if len(counts) > 1 && card == 11 {
			if counts[0].Card == 11 {
				jcounter[counts[1].Card]++
			} else {
				jcounter[counts[0].Card]++
			}
		} else {
			jcounter[card]++
		}
	}

	jcounts := []int{}
	for _, card := range jcounter {
		jcounts = append(jcounts, card)
	}

	sort.Slice(jcounts, func(i, j int) bool {
		return jcounts[i] > jcounts[j]
	})

	kind := 1
	switch {
	case len(jcounts) == 1:
		kind = 7
	case len(jcounts) == 2 && jcounts[0] == 4:
		kind = 6
	case len(jcounts) == 2 && jcounts[0] == 3:
		kind = 5
	case len(jcounts) == 3 && jcounts[0] == 3:
		kind = 4
	case len(jcounts) == 3 && jcounts[0] == 2:
		kind = 3
	case len(jcounts) == 4:
		kind = 2
	}

	for i := 0; i < len(cards); i++ {
		if cards[i] == 11 {
			cards[i] = 1
		}
	}

	bid, _ := strconv.Atoi(fields[1])

	return Hand{cards, kind, bid}
}

func sortHands(hand []Hand) {
	sort.Slice(hand, func(i, j int) bool {
		a, b := hand[i], hand[j]

		if a.Kind == b.Kind {
			k := 0
			for a.Cards[k] == b.Cards[k] {
				k++
			}

			return a.Cards[k] < b.Cards[k]
		} else {
			return a.Kind < b.Kind
		}
	})
}

func sumHands(hands []Hand) int {
	sum := 0

	for i, hand := range hands {
		sum += (i + 1) * hand.Bid
	}

	return sum
}

func readLines() []string {
	var lines []string

	file, _ := os.Open("input.txt")
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines
}
