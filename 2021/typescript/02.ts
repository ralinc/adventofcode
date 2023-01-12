import {readFileSync} from 'fs'

type Direction = 'forward' | 'down' | 'up'
type Move = [Direction, number]

type Value = 'forward' | 'depth' | 'aim'
type Position = Record<Value, number>

const input: Move[] = readFileSync('./2021/02.input', 'utf8')
  .split(/\n/)
  .map((line: string): string[] => line.split(/\s/))
  .map((move: string[]): Move => [move[0] as Direction, Number(move[1])])

const firstPosition = input.reduce(
  (position, move): Position => {
    const [direction, units] = move

    switch (direction) {
      case 'forward':
        position.forward += units
        break
      case 'down':
        position.depth += units
        break
      case 'up':
        position.depth -= units
        break
    }

    return position
  },
  {forward: 0, depth: 0, aim: 0}
)

const first = firstPosition.forward * firstPosition.depth
console.log(first) // 1990000

const secondPosition = input.reduce(
  (position, move): Position => {
    const [direction, units] = move

    switch (direction) {
      case 'forward':
        position.forward += units
        position.depth += position.aim * units
        break
      case 'down':
        position.aim += units
        break
      case 'up':
        position.aim -= units
        break
    }

    return position
  },
  {forward: 0, depth: 0, aim: 0}
)

const second = secondPosition.forward * secondPosition.depth
console.log(second) // 1975421260
