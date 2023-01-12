import {readFileSync} from 'fs'

class Square {
  readonly x: number
  readonly y: number
  readonly letter: string
  readonly elevation: number
  distance: number

  constructor(x: number, y: number, letter: string) {
    this.x = x
    this.y = y
    this.letter = letter
    this.elevation = this.computeElevation()
    this.distance = 0
  }

  private computeElevation(): number {
    switch (this.letter) {
      case 'S':
        return 0
      case 'E':
        return 'z'.charCodeAt(0) - 'a'.charCodeAt(0)
      default:
        return this.letter.charCodeAt(0) - 'a'.charCodeAt(0)
    }
  }
}

class Grid {
  private readonly grid: Square[][]

  constructor(heightmap: string[][]) {
    this.grid = heightmap.map((line, y) => line.map((letter, x) => new Square(x, y, letter)))
  }

  findFewestStepsUp() {
    const start = this.find('S')
    const end = this.find('E')

    this.reset()
    start.distance = 0

    const queue: Square[] = [start]

    let v: Square
    while ((v = queue.shift() as Square)) {
      for (const w of this.getAdjacentEdges(v)) {
        if (!w.distance && v.elevation + 1 >= w.elevation) {
          w.distance = v.distance + 1
          queue.push(w)
        }
      }
    }

    return end.distance
  }

  findFewestStepsDown() {
    const start = this.find('E')
    const ends = [...this.findAll('a')]

    this.reset()
    start.distance = 0

    const queue: Square[] = [start]

    let v: Square
    while ((v = queue.shift() as Square)) {
      for (const w of this.getAdjacentEdges(v)) {
        if (!w.distance && w.elevation + 1 >= v.elevation) {
          w.distance = v.distance + 1
          queue.push(w)
        }
      }
    }

    return Math.min(...ends.filter(square => square.distance).map(square => square.distance))
  }

  getAdjacentEdges(square: Square): Square[] {
    const height = this.grid.length
    const width = this.grid[0].length

    return [
      {x: square.x, y: square.y - 1},
      {x: square.x + 1, y: square.y},
      {x: square.x, y: square.y + 1},
      {x: square.x - 1, y: square.y}
    ]
      .filter(({x, y}) => x >= 0 && x < width && y >= 0 && y < height)
      .map(({x, y}) => this.grid[y][x])
  }

  find(letter: string): Square {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x].letter === letter) {
          return this.grid[y][x]
        }
      }
    }

    throw new Error()
  }

  findAll(letter: string): Square[] {
    const found = []

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x].letter === letter) {
          found.push(this.grid[y][x])
        }
      }
    }

    return found
  }

  reset() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        this.grid[y][x].distance = 0
      }
    }
  }
}

const input: string[][] = readFileSync('./2022/12.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(line => [...line])

const grid = new Grid(input)

const first = grid.findFewestStepsUp()
console.log(first) // 481

const second = grid.findFewestStepsDown()
console.log(second) // 480
