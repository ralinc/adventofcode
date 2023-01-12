import _ from 'underscore'
import {readFileSync} from 'fs'

const input = readFileSync('./2021/03.input', 'utf8')
  .trim()
  .split(/\n/)
  .map((line: string) => [...line].map(n => Number(n)))

const sums = _.zip(...input).map(num => num.reduce((a, e) => a + e, 0))

const most = sums.map(x => (x > input.length / 2 ? 1 : 0))
const least = most.map(x => (x ? 0 : 1))

const gamma = most.reduce((a: number, e: 0 | 1) => (a << 1) | e, 0)
const epsilon = least.reduce((a: number, e: 0 | 1) => (a << 1) | e, 0)

const first = gamma * epsilon
console.log(first) // 3309596

function calculateRating(input: number[][], determineBitCriteria: (current: number[]) => number, bitIndex = 0): number {
  if (input.length === 1) {
    return input[0].reduce((a, e) => (a << 1) | e, 0)
  }

  const bitCriteria = determineBitCriteria(_.zip(...input)[bitIndex])
  const selected = input.filter(e => e[bitIndex] === bitCriteria)

  return calculateRating(selected, determineBitCriteria, bitIndex + 1)
}

const oxygenRating = calculateRating(input, (current: number[]) =>
  current.reduce((a, e) => a + e, 0) >= current.length / 2 ? 1 : 0
)

const co2Rating = calculateRating(input, (current: number[]): number =>
  current.reduce((a, e) => a + e, 0) < current.length / 2 ? 1 : 0
)

const second = oxygenRating * co2Rating
console.log(second) // 2981085
