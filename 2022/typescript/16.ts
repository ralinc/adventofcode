import {readFileSync} from 'fs'

type ValveID = string
type Valve = {id: ValveID; rate: number; tunnels: ValveID[]}
type ValveMap = Record<ValveID, Valve>

class Graph {
  private readonly valves: ValveMap
  private readonly cache: Record<string, number>

  constructor(valves: ValveMap) {
    this.valves = valves
    this.cache = {}
  }

  findMaxPressure(valve: Valve, minutes: number, opened: Set<ValveID>, others: 0 | 1): number {
    if (minutes === 0) {
      if (others) {
        return this.findMaxPressure(this.valves['AA'], 26, opened, 0)
      } else {
        return 0
      }
    }

    const key = this.computeCacheKey(valve, minutes, opened, others)

    if (this.cache[key] >= 0) {
      return this.cache[key]
    }

    let maxPressure = 0

    if (valve.rate && !opened.has(valve.id)) {
      maxPressure = Math.max(
        maxPressure,
        (minutes - 1) * valve.rate + this.findMaxPressure(valve, minutes - 1, new Set([...opened, valve.id]), others)
      )
    }

    for (const tunnel of valve.tunnels) {
      maxPressure = Math.max(maxPressure, this.findMaxPressure(this.valves[tunnel], minutes - 1, opened, others))
    }

    this.cache[key] = maxPressure

    return maxPressure
  }

  private computeCacheKey(valve: Valve, minutes: number, opened: Set<ValveID>, others: 0 | 1): string {
    return `${valve.id}${minutes}${[...opened].sort().join('')}${others}`
  }
}

const valves: ValveMap = readFileSync('./2022/16.input', 'utf8')
  .trim()
  .split(/\n/)
  .reduce((valves: ValveMap, line: string) => {
    const match = /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)/.exec(line)
    const id = match![1]
    const rate = Number(match![2])
    const tunnels = match![3].split(', ')
    valves[id] = {id, rate, tunnels}
    return valves
  }, {})

const graph = new Graph(valves)

const first = graph.findMaxPressure(valves['AA'], 30, new Set(), 0)
console.log(first)

const second = graph.findMaxPressure(valves['AA'], 26, new Set(), 1)
console.log(second)
