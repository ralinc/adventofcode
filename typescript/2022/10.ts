import {readFileSync} from 'fs'

type Instruction = 'addx' | 'noop'
type Pixel = '#' | '.'

const signals: number[] = []
let registerX = 1
let cycles = 0

enum Display {
  Height = 6,
  Width = 40
}

const pixel = {x: 0, y: 0}
const display: Pixel[][] = Array.from({length: Display.Height}, () => [])

const input = readFileSync('10.input', 'utf8')
  .split(/\n/)
  .slice(0, -1)
  .map(x => x.split(' '))
  .map(([a, b]) => [a, +b]) as [Instruction, number][]

for (const cycle of input) {
  const [instruction, value] = cycle
  const isAdd = instruction === 'addx'
  const instructionCycles = isAdd ? 2 : 1

  for (let i = 0; i < instructionCycles; i++) {
    cycles++

    if ((cycles - 20) % 40 === 0) {
      signals.push(registerX * cycles)
    }

    const isSpritePixelDrawn = Math.abs(pixel.x - registerX) < 2
    display[pixel.y].push(isSpritePixelDrawn ? '#' : '.')

    pixel.x++

    if (pixel.x === Display.Width) {
      pixel.x = 0
      pixel.y++
    }
  }

  if (isAdd) {
    registerX += value
  }
}

const first = signals.reduce((a, e) => a + e)
console.log(first)

const second = display.reduce((a, e) => `${a}${e.join('')}\n`, '')
console.log(second)
