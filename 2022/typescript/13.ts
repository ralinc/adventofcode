import {readFileSync} from 'fs'
import _ from 'lodash'

type Packet = number | number[]

const input = readFileSync('./2022/13.input', 'utf8')
  .trim()
  .split(/\n\n/)
  .map(pair => pair.split(/\n/).map(packet => JSON.parse(packet)))

function compare(left: Packet, right: Packet): number {
  if (left === undefined) return -1
  if (right === undefined) return 1
  if (typeof left === 'number' && typeof right === 'number') return left - right
  if (typeof left === 'number') left = [left]
  if (typeof right === 'number') right = [right]

  for (const [a, b] of _.zip(left, right)) {
    const k = compare(a as number, b as Packet)
    if (k) return k
  }

  return left.length - right.length
}

const first = input.reduce((a, [left, right], i) => a + (compare(left, right) < 0 ? i + 1 : 0), 0)
console.log(first) // 6272

const dividers = [[[2]], [[6]]]
const sorted = _.flatten(input).concat(dividers).sort(compare)

const second = dividers.reduce((a, e) => a * (sorted.indexOf(e) + 1), 1)
console.log(second) // 22288
