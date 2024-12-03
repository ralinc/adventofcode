import {readFileSync} from 'fs'

const input = readFileSync('2024/01.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(pair => pair.split(/\s{2}/).map(location => Number(location)))

const left = input.map(loc => loc[0]).sort((a, b) => a - b)
const right = input.map(loc => loc[1]).sort((a, b) => a - b)

const first = left.reduce((a, e, i) => a + Math.abs(e - right[i]), 0)
console.log(first)

const second = left.reduce((a, l) => a + l * right.reduce((a, r) => (r === l ? a + 1 : a), 0), 0)
console.log(second)
