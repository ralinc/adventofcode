import {readFileSync} from 'fs'

const input = readFileSync('./2021/01.input', 'utf8')
  .split(/\n/)
  .map(x => Number(x))

const first = input.reduce((n, e, i, a) => (a[i + 1] > e ? n + 1 : n), 0)
console.log(first)

const second = input.map((e, i, a) => e + a[i + 1] + a[i + 2], 0).reduce((n, e, i, a) => (a[i + 1] > e ? n + 1 : n), 0)
console.log(second)
