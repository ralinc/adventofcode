import {readFileSync} from 'fs'

class Piece {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get key(): string {
    return [this.x, this.y].join(',')
  }
}

class Rock {
  pieces: Piece[]

  constructor(pieces: Piece[]) {
    this.pieces = pieces
  }

  project(x: number, y = 0): Rock {
    return new Rock(this.pieces.map(piece => new Piece(piece.x + x, piece.y + y)))
  }

  move(x: JetMove): void {
    if (x === JetMove.Right && this.pieces.some(piece => piece.x === 6)) return
    if (x === JetMove.Left && this.pieces.some(piece => piece.x === 0)) return

    this.pieces.forEach(piece => (piece.x += x))
  }

  fall() {
    this.pieces.forEach(piece => piece.y--)
  }

  get maxY() {
    return Math.max(...this.pieces.map(piece => piece.y))
  }
}

class Tower {
  private formation: Set<string>
  height: number

  constructor() {
    this.formation = Tower.createFloor(7)
    this.height = 0
  }

  collides(rock: Rock): boolean {
    return rock.pieces.some(piece => this.formation.has(piece.key))
  }

  land(rock: Rock) {
    rock.pieces.reduce((a, e) => a.add(e.key), this.formation)
    this.height = Math.max(this.height, rock.maxY)
  }

  isLanding(rock: Rock): boolean {
    return this.collides(rock.project(0, -1))
  }

  private static createFloor(width: number) {
    return new Set<string>(Array.from({length: width}, (_, x) => new Piece(x, 0).key))
  }
}

class Cache {
  private readonly cache: Record<string, [number, number]>

  constructor() {
    this.cache = {}
  }

  read(rockType: number, jetIndex: number): [number, number] {
    const key = this.computeKey(rockType, jetIndex)
    return this.cache[key]
  }

  store(rockType: number, jetIndex: number, value: [number, number]): void {
    const key = this.computeKey(rockType, jetIndex)
    this.cache[key] = value
  }

  private computeKey(rockType: number, jetIndex: number): string {
    return [rockType, jetIndex].join(',')
  }
}

enum JetPattern {
  Left = '<',
  Right = '>'
}

enum JetMove {
  Left = -1,
  Right = 1
}

function getNextRock(rockIndex: number, y: number): Rock {
  const rockType = (rockIndex % 5) as 0 | 1 | 2 | 3 | 4

  return new Rock(
    {
      0: [
        [2, y],
        [3, y],
        [4, y],
        [5, y]
      ],
      1: [
        [3, y + 2],
        [2, y + 1],
        [3, y + 1],
        [4, y + 1],
        [3, y]
      ],
      2: [
        [2, y],
        [3, y],
        [4, y],
        [4, y + 1],
        [4, y + 2]
      ],
      3: [
        [2, y],
        [2, y + 1],
        [2, y + 2],
        [2, y + 3]
      ],
      4: [
        [2, y + 1],
        [2, y],
        [3, y + 1],
        [3, y]
      ]
    }[rockType].map(([x, y]) => new Piece(x, y))
  )
}

function simulate(jets: JetMove[], rockCount: number): number {
  const GAP = 3
  const tower = new Tower()
  const cache = new Cache()
  let computedHeight = 0

  for (let rockIndex = 0, jetIndex = 0; rockIndex < rockCount; rockIndex++) {
    const rock = getNextRock(rockIndex, tower.height + GAP + 1)

    while (true) {
      const jet = jets[jetIndex]

      jetIndex = (jetIndex + 1) % jets.length

      if (!tower.collides(rock.project(jet))) {
        rock.move(jet)
      }

      if (tower.isLanding(rock)) {
        tower.land(rock)

        if (rockIndex >= 10000) {
          const cachedValue = cache.read(rockIndex % 5, jetIndex)

          if (cachedValue) {
            const [cachedRockIndex, cachedTowerHeight] = cachedValue

            const cycleRockCount = rockIndex - cachedRockIndex
            const cycles = Math.floor((rockCount - rockIndex) / cycleRockCount)
            rockIndex += cycles * cycleRockCount

            const cycleTowerHeight = tower.height - cachedTowerHeight
            computedHeight += cycles * cycleTowerHeight
          } else {
            cache.store(rockIndex % 5, jetIndex, [rockIndex, tower.height])
          }
        }

        break
      }

      rock.fall()
    }
  }

  return tower.height + computedHeight
}

const jets: JetMove[] = [...readFileSync('./2022/17.input', 'utf8').trim()].map(jet =>
  jet === JetPattern.Left ? JetMove.Left : JetMove.Right
)

const first = simulate(jets, 2022)
console.log(first) // 3111

const second = simulate(jets, 1000000000000)
console.log(second) // 1526744186042
