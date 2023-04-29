import {readFileSync} from 'fs'
import _ from 'underscore'

const input = readFileSync('03.input', 'utf8').trim().split(/\n/)

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const priority: Record<string, number> = [...alphabet].reduce((a, e, i) => ({...a, [e]: i + 1}), {})

const first = input
  .map(sack => _.intersection([...sack.slice(0, sack.length / 2)], [...sack.slice(sack.length / 2)])[0])
  .reduce((prio, item) => prio + priority[item], 0)
console.log(first) // 7763

const second = _.chunk(input, 3)
  .map(([sack1, sack2, sack3]) => _.intersection([...sack1], [...sack2], [...sack3])[0])
  .reduce((prio, item) => prio + priority[item], 0)
console.log(second) // 2569
