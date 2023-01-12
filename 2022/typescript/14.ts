import {readFileSync} from 'fs'
import _ from 'lodash'

enum Tile {
  Air = '.',
  Rock = '#',
  Sand = 'o'
}

type Grid = Tile[][]
type Point = {x: number; y: number}
type Line = Point[]
type Scan = Line[]

function createGrid(scan: Scan): Grid {
  const [width, height] = _.flatten(scan).reduce(([ax, ay], {x, y}) => [Math.max(ax, x), Math.max(ay, y)], [0, 0])
  const grid: Grid = Array.from({length: height + 1}, () => Array.from({length: width + 100}, () => Tile.Air))

  for (const path of scan) {
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i]
      const to = path[i + 1]

      for (let j = 0; j <= Math.abs(from.y - to.y); j++) {
        grid[from.y + j * Math.sign(to.y - from.y)][from.x] = Tile.Rock
      }

      for (let j = 0; j <= Math.abs(from.x - to.x); j++) {
        grid[from.y][from.x + j * Math.sign(to.x - from.x)] = Tile.Rock
      }
    }
  }

  return grid
}

function createGridWithFloor(scan: Scan): Grid {
  const grid = createGrid(scan)

  grid[grid.length] = Array.from({length: grid[0].length + 100}, () => Tile.Air)
  grid[grid.length] = Array.from({length: grid[0].length + 100}, () => Tile.Rock)

  return grid
}

function simulateFallingSand(grid: Grid) {
  let sand = 0

  while (dropSand(grid)) {
    sand++
  }

  return sand
}

function dropSand(grid: Grid): boolean {
  const isTileBlocked = (x: number, y: number): boolean => grid[y][x] !== Tile.Air
  const isBottomTileBlocked = (p: Point): boolean => isTileBlocked(p.x, p.y + 1)
  const isLeftBottomTileBlocked = (p: Point): boolean => isTileBlocked(p.x - 1, p.y + 1)
  const isRightBottomTileBlocked = (p: Point): boolean => isTileBlocked(p.x + 1, p.y + 1)

  const sand = {x: 500, y: 0}

  if (grid[sand.y][sand.x] === Tile.Sand) {
    return false
  }

  while (sand.y < grid.length - 1) {
    if (isBottomTileBlocked(sand)) {
      if (isLeftBottomTileBlocked(sand) && isRightBottomTileBlocked(sand)) {
        grid[sand.y][sand.x] = Tile.Sand
        return true
      } else if (!isLeftBottomTileBlocked(sand)) {
        sand.x--
      } else {
        sand.x++
      }
    }

    sand.y++
  }

  return false
}

const scan: Scan = readFileSync('./2022/14.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(path =>
    path.split(' -> ').map(point => {
      const [x, y] = point.split(',')
      return {x: Number(x), y: Number(y)}
    })
  )

const first = simulateFallingSand(createGrid(scan))
console.log(first) // 1330

const second = simulateFallingSand(createGridWithFloor(scan))
console.log(second) // 26139
