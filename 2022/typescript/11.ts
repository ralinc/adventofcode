import {readFileSync} from 'fs'

type Test = {
  divisor: number
  pass: number
  fail: number
}

type Operator = '*' | '+'

class Operation {
  private readonly operator: Operator
  private readonly operand: number

  constructor(operator: Operator, operand: number) {
    this.operator = operator
    this.operand = operand
  }

  execute(operand: number): number {
    if (this.operator === '*') {
      return operand * (this.operand || operand)
    } else {
      return operand + (this.operand || operand)
    }
  }
}

class Monkey {
  private readonly items: number[]
  private readonly operation: Operation
  private readonly test: Test
  inspections: number

  constructor(items: number[], operation: Operation, test: Test) {
    this.items = items
    this.operation = operation
    this.test = test
    this.inspections = 0
  }

  static create(text: string): Monkey {
    const lines = text.split(/\n/)

    const items = lines[1]
      .split(':')[1]
      .split(',')
      .map(item => Number(item))

    const equation = lines[2].split('=')[1].trim().split(' ')
    const operation = new Operation(equation[1] as Operator, +equation[2])

    const test = {
      divisor: extractNumber(lines[3]),
      pass: extractNumber(lines[4]),
      fail: extractNumber(lines[5])
    }

    return new Monkey(items, operation, test)
  }

  get divisor(): number {
    return this.test.divisor
  }

  takeNextItem(): number {
    return this.items.shift()
  }

  inspect(item: number) {
    this.inspections++
    return this.operation.execute(item)
  }

  decide(worry: number): number {
    return worry % this.test.divisor === 0 ? this.test.pass : this.test.fail
  }

  throw(monkey: Monkey, item: number): void {
    monkey.items.push(item)
  }
}

function parseInput(): Monkey[] {
  return readFileSync('./2022/11.input', 'utf8')
    .split(/\n\n/)
    .map(text => Monkey.create(text))
}

function extractNumber(s: string) {
  return Number(s.match(/\d+/)![0])
}

function first() {
  const monkeys = parseInput()

  const relieve = (worry: number) => Math.floor(worry / 3)

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      for (let item: number; (item = monkey.takeNextItem()); ) {
        let worry = monkey.inspect(item)
        worry = relieve(worry)
        const nextMonkey = monkey.decide(worry)
        monkey.throw(monkeys[nextMonkey], worry)
      }
    }
  }

  const first = monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, e) => a * e)

  return first
}

console.log(first()) // 51075

function second() {
  const monkeys = parseInput()

  const lcd = monkeys.reduce((a, monkey) => a * monkey.divisor, 1)
  const relieve = (worry: number) => worry % lcd

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      for (let item: number; (item = monkey.takeNextItem()); ) {
        let worry = monkey.inspect(item)
        worry = relieve(worry)
        const nextMonkey = monkey.decide(worry)
        monkey.throw(monkeys[nextMonkey], worry)
      }
    }
  }

  const second = monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, e) => a * e)

  return second
}

console.log(second()) // 11741456163
