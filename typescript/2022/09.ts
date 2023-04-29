import {readFileSync} from 'fs'

class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  move(x: number, y: number): void {
    this.x += x
    this.y += y
  }

  touch(point: Point): void {
    if (this.computeDistance(point) > 1) {
      this.move(Math.sign(point.x - this.x), Math.sign(point.y - this.y))
    }
  }

  toString(): string {
    return [this.x, this.y].join()
  }

  private computeDistance(to: Point): number {
    return Math.max(Math.abs(this.x - to.x), Math.abs(this.y - to.y))
  }
}

type Direction = 'U' | 'R' | 'D' | 'L'
type Step = {x: -1 | 0 | 1; y: -1 | 0 | 1}
type Move = Record<Direction, Step>

function simulate(motions: [Direction, number][], knotCount: number): number {
  const visited = new Set<string>()
  const rope: Point[] = Array.from({length: knotCount}, () => new Point(0, 0))

  const move: Move = {
    U: {x: 0, y: -1},
    R: {x: 1, y: 0},
    D: {x: 0, y: 1},
    L: {x: -1, y: 0}
  }

  for (const motion of motions) {
    const [direction, length] = motion
    const {x, y} = move[direction]

    for (let i = 0; i < length; i++) {
      rope[0].move(x, y)

      for (let j = 1; j < rope.length; j++) {
        rope[j].touch(rope[j - 1])
      }

      visited.add(rope.at(-1)!.toString())
    }
  }

  return visited.size
}

const input = readFileSync('09.input', 'utf8')
  .split(/\n/)
  .slice(0, -1)
  .map(x => x.split(' '))
  .map(([a, b]) => [a, +b]) as [Direction, number][]

const first = simulate(input, 2)
console.log(first)

const second = simulate(input, 10)
console.log(second)
