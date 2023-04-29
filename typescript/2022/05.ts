import {readFileSync} from 'fs'
import _ from 'lodash'

const input = readFileSync('05.input', 'utf8').split(/\n\n/)

const starting: string[][] = Array.from(Array(9), () => [])

input[0]
  .split(/\n/)
  .slice(0, -1)
  .reverse()
  .forEach(e => {
    for (let i = 0; i < 9; i++) {
      const crate = e[i * 4 + 1]
      if (crate !== ' ') {
        starting[i].push(crate)
      }
    }
  })

const firstStacks: string[][] = _.cloneDeep(starting)

const procedure = input[1]
  .split(/\n/)
  .slice(0, -1)
  .map(step => [...step.matchAll(/\d+/g)])
  .map(step => [Number(step[0][0]), Number(step[1][0]) - 1, Number(step[2][0]) - 1])

for (const [count, from, to] of procedure) {
  for (let i = 0; i < count; i++) {
    firstStacks[to].push(firstStacks[from].pop() as string)
  }
}

const first = firstStacks.reduce((a, e) => a + e.at(-1), '')
console.log(first) // ZRLJGSCTR

const secondStacks = _.cloneDeep(starting)

for (const [count, from, to] of procedure) {
  const start = secondStacks[from].length - count
  const crates = secondStacks[from].splice(start, count)
  secondStacks[to].push(...crates)
}

const second = secondStacks.reduce((a, e) => a + e.at(-1), '')
console.log(second) // PRTTGRFPB
