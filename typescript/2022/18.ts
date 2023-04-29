import {readFileSync} from 'fs'

type Position = [number, number, number]

class Cube {
  readonly x: number
  readonly y: number
  readonly z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  get neighbors(): Cube[] {
    const neighbors = []

    for (const coordinate of [0, 1, 2]) {
      for (const offset of [-1, 1]) {
        neighbors.push(this.project(coordinate, offset))
      }
    }

    return neighbors
  }

  get key(): string {
    return [this.x, this.y, this.z].join(',')
  }

  private project(coordinate: number, offset: number): Cube {
    const projection: Position = [this.x, this.y, this.z]
    projection[coordinate] += offset
    return new Cube(...projection)
  }
}

class Droplet {
  private readonly cubes: Cube[]
  private readonly keys: Set<string>

  constructor(cubes: Cube[]) {
    this.cubes = cubes
    this.keys = new Set<string>(this.cubes.map(cube => cube.key))
  }

  get surfaceArea(): number {
    const isEmpty = (cube: Cube) => !this.keys.has(cube.key)

    return this.cubes.reduce((area, cube) => area + cube.neighbors.filter(isEmpty).length, 0)
  }

  get exteriorSurfaceArea(): number {
    const external = new Set<string>()
    const internal = new Set<string>()

    const isExternal = (cube: Cube): boolean => {
      if (external.has(cube.key)) return true
      if (internal.has(cube.key)) return false

      const visited = new Set<string>()
      const queue: Cube[] = [cube]
      let current: Cube | undefined

      while ((current = queue.shift())) {
        if (!this.keys.has(current.key) && !visited.has(current.key)) {
          visited.add(current.key)

          if (visited.size > 4242) {
            for (const v of visited) external.add(v)

            return true
          }

          queue.push(...current.neighbors)
        }
      }

      for (const v of visited) internal.add(v)

      return false
    }

    return this.cubes.reduce((area, cube) => area + cube.neighbors.filter(isExternal).length, 0)
  }
}

const input: Cube[] = readFileSync('18.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(line => new Cube(...(line.split(',').map(Number) as Position)))

const droplet = new Droplet(input)

const first = droplet.surfaceArea
console.log(first) // 4242

const second = droplet.exteriorSurfaceArea
console.log(second) // 2428
