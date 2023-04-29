import {readFileSync} from 'fs'
import _ from 'lodash'

type Position = {
  x: number
  y: number
}

type Sensor = {
  position: Position
  distance: number
}

type Interval = {
  beg: number
  end: number
}

function computeManhattanDistance(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

function computeRowCoverageIntervals(sensors: Sensor[], maxY: number): Interval[] {
  return merge(_.compact(sensors.map(sensor => computeSensorInterval(sensor, maxY))))
}

function computeSensorInterval(sensor: Sensor, maxY: number): Interval | undefined {
  const coverage = sensor.distance - Math.abs(maxY - sensor.position.y)
  if (coverage >= 0) return {beg: sensor.position.x - coverage, end: sensor.position.x + coverage}
}

function merge(intervals: Interval[]): Interval[] {
  return intervals
    .sort((a, b) => a.beg - b.beg)
    .reduce(
      (a, e) => {
        if (_.last(a)!.end >= e.beg - 1) {
          a[a.length - 1] = {beg: _.last(a)!.beg, end: Math.max(_.last(a)!.end, e.end)}
        } else {
          a.push(e)
        }
        return a
      },
      [intervals[0]]
    )
}

const input: Sensor[] = readFileSync('15.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(line => {
    const [sx, sy, bx, by] = line.match(/\d+/g)!.map(a => Number(a))
    const sensorPosition = {x: sx, y: sy}
    const beaconPosition = {x: bx, y: by}
    return {position: sensorPosition, distance: computeManhattanDistance(sensorPosition, beaconPosition)}
  })

const first = computeRowCoverageIntervals(input, 2000000).reduce((a, e) => a + e.end - e.beg, 0)
console.log(first) // 4907780

function findTuningFrequency() {
  for (let y = 0; y <= 4000000; y++) {
    const intervals = computeRowCoverageIntervals(input, y)
    if (intervals.length > 1) return (intervals[0].end + 1) * 4000000 + y
  }
}

const second = findTuningFrequency()
console.log(second) // 13639962836448
