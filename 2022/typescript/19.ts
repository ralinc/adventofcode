import {readFileSync} from 'fs'

type Blueprint = {
  id: number
  oreRobotCost: number
  clayRobotCost: number
  obsidianRobotOreCost: number
  obsidianRobotClayCost: number
  geodeRobotOreCost: number
  geodeRobotObsidianCost: number
}

class State {
  constructor(
    public ore: number,
    public clay: number,
    public obsidian: number,
    public geode: number,
    public oreRobots: number,
    public clayRobots: number,
    public obsidianRobots: number,
    public geodeRobots: number,
    public minutes: number
  ) {}

  static createInitialState(minutes: number) {
    return new State(0, 0, 0, 0, 1, 0, 0, 0, minutes)
  }

  collect() {
    return this.next()
  }

  constructOreRobot(cost: number) {
    return this.next(-cost, 0, 0, 0, 1)
  }

  constructClayRobot(cost: number) {
    return this.next(-cost, 0, 0, 0, 0, 1)
  }

  constructObsidianRobot(oreCost: number, clayCost: number) {
    return this.next(-oreCost, -clayCost, 0, 0, 0, 0, 1)
  }

  constructGeodeRobot(oreCost: number, obsidianCost: number) {
    return this.next(-oreCost, 0, -obsidianCost, 0, 0, 0, 0, 1)
  }

  private next(
    ore = 0,
    clay = 0,
    obsidian = 0,
    geode = 0,
    oreRobots = 0,
    clayRobots = 0,
    obsidianRobots = 0,
    geodeRobots = 0
  ): State {
    return new State(
      this.ore + this.oreRobots + ore,
      this.clay + this.clayRobots + clay,
      this.obsidian + this.obsidianRobots + obsidian,
      this.geode + this.geodeRobots + geode,
      this.oreRobots + oreRobots,
      this.clayRobots + clayRobots,
      this.obsidianRobots + obsidianRobots,
      this.geodeRobots + geodeRobots,
      this.minutes - 1
    )
  }

  get key() {
    return [
      this.ore,
      this.clay,
      this.obsidian,
      this.geode,
      this.oreRobots,
      this.clayRobots,
      this.obsidianRobots,
      this.geodeRobots,
      this.minutes
    ].join(',')
  }
}

function findMaxGeodes(blueprint: Blueprint, minutes: number): number {
  const {
    oreRobotCost,
    clayRobotCost,
    obsidianRobotOreCost,
    obsidianRobotClayCost,
    geodeRobotOreCost,
    geodeRobotObsidianCost
  } = blueprint

  let maxGeodes = 0

  const maxOre = Math.max(oreRobotCost, clayRobotCost, obsidianRobotOreCost, geodeRobotOreCost)
  const maxClay = obsidianRobotClayCost
  const maxObsidian = geodeRobotObsidianCost

  const stack: State[] = [State.createInitialState(minutes)]
  const visited = new Set<string>()

  for (let state; (state = stack.pop()); ) {
    if (state.minutes === 0) {
      maxGeodes = Math.max(maxGeodes, state.geode)
      continue
    }

    state.oreRobots = Math.min(state.oreRobots, maxOre)
    state.clayRobots = Math.min(state.clayRobots, maxClay)
    state.obsidianRobots = Math.min(state.obsidianRobots, maxObsidian)

    state.ore = Math.min(state.ore, state.minutes * maxOre - state.oreRobots * (state.minutes - 1))
    state.clay = Math.min(state.clay, state.minutes * maxClay - state.clayRobots * (state.minutes - 1))
    state.obsidian = Math.min(state.obsidian, state.minutes * maxObsidian - state.obsidianRobots * (state.minutes - 1))

    if (visited.has(state.key)) continue

    visited.add(state.key)

    stack.push(state.collect())

    if (state.ore >= oreRobotCost) {
      stack.push(state.constructOreRobot(oreRobotCost))
    }

    if (state.ore >= clayRobotCost) {
      stack.push(state.constructClayRobot(clayRobotCost))
    }

    if (state.ore >= obsidianRobotOreCost && state.clay >= obsidianRobotClayCost) {
      stack.push(state.constructObsidianRobot(obsidianRobotOreCost, obsidianRobotClayCost))
    }

    if (state.ore >= geodeRobotOreCost && state.obsidian >= geodeRobotObsidianCost) {
      stack.push(state.constructGeodeRobot(geodeRobotOreCost, geodeRobotObsidianCost))
    }
  }

  return maxGeodes
}

const input: Blueprint[] = readFileSync('./2022/19.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(line => [...line.matchAll(/\d+/g)].map(Number))
  .map(a => ({
    id: a[0],
    oreRobotCost: a[1],
    clayRobotCost: a[2],
    obsidianRobotOreCost: a[3],
    obsidianRobotClayCost: a[4],
    geodeRobotOreCost: a[5],
    geodeRobotObsidianCost: a[6]
  }))

const first = input.reduce((a, blueprint) => a + blueprint.id * findMaxGeodes(blueprint, 24), 0)
console.log(first) // 1719

const second = input.slice(0, 3).reduce((a, blueprint) => a * findMaxGeodes(blueprint, 32), 1)
console.log(second) // 19530
