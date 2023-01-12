import {readFileSync} from 'fs'

const assignments = readFileSync('2022/04.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(elfs => elfs.split(',').map(elf => elf.split('-').map(Number)))

const first = assignments.filter(
  ([[e1b, e1e], [e2b, e2e]]) => (e1b >= e2b && e1e <= e2e) || (e2b >= e1b && e2e <= e1e)
).length
console.log(first)

const second = assignments.filter(([[e1b, e1e], [e2b, e2e]]) => e1e >= e2b && e2e >= e1b).length
console.log(second)
