import {readFileSync} from 'fs'

type Name = string
type Job = Expression | number
type Operation = '+' | '-' | '*' | '/'
type Expression = [Name, Operation, Name]
type Monkeys = {[key: Name]: Job}

const OPERATIONS = {
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b
}

function yell(name: Name): number {
  const job = monkeys[name]

  if (typeof job === 'number') {
    return job
  } else {
    const [left, operation, right] = job
    return OPERATIONS[operation](yell(left), yell(right))
  }
}

function guessYell(name: Name, guess: number): number {
  if (name === 'humn') {
    return guess
  }

  const job = monkeys[name]

  if (typeof job === 'number') {
    return job
  } else {
    const [left, operation, right] = job
    return OPERATIONS[operation](guessYell(left, guess), guessYell(right, guess))
  }
}

function guessHumanYell() {
  const rootLeftName: Name = (monkeys['root'] as Expression)[0]
  const rootRightName: Name = (monkeys['root'] as Expression)[2]
  const rootRightYell = yell(rootRightName)

  let beg = 0
  let end = Number.MAX_SAFE_INTEGER

  while (beg < end) {
    const guess = Math.floor((beg + end) / 2)
    const rootLeftYell = guessYell(rootLeftName, guess)
    const diff = rootRightYell - rootLeftYell

    if (diff === 0) {
      return guess
    } else if (diff < 0) {
      beg = guess
    } else {
      end = guess
    }
  }
}

const monkeys: Monkeys = readFileSync('2022/21.input', 'utf8')
  .trim()
  .split(/\n/)
  .map(line => line.split(/: /))
  .reduce((monkeys: Monkeys, [name, job]) => {
    monkeys[name] = Number.isInteger(parseInt(job, 10)) ? Number(job) : (job.split(/ /) as Expression)
    return monkeys
  }, {})

const first = yell('root')
console.log(first) // 170237589447588

const second = guessHumanYell()
console.log(second) // 3712643961892
