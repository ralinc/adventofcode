import {readFileSync} from 'fs'

const input: number[][] = readFileSync('./2022/01.input', 'utf8')
  .split(/\n\n/)
  .map(chunk => chunk.split(/\n/).map(line => Number(line)))

const calories: number[] = input.map(a => a.reduce((a, e) => a + e)).sort((a, b) => b - a)

const first = calories[0]
console.log(first)

const second = calories.slice(0, 3).reduce((a, e) => a + e)
console.log(second)
