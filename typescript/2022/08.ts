import {readFileSync} from 'fs'

const input: number[][] = readFileSync('08.input', 'utf8')
  .split(/\n/)
  .slice(0, -1)
  .map(x => [...x].map(y => +y))

const xLen = input[0].length
const yLen = input.length

function isVisibleRight(y: number, x: number, v: number): boolean {
  for (let i = x + 1; i < yLen; i++) {
    if (input[y][i] >= v) {
      return false
    }
  }

  return true
}

function isVisibleLeft(y: number, x: number, v: number): boolean {
  for (let i = x - 1; i >= 0; i--) {
    if (input[y][i] >= v) {
      return false
    }
  }

  return true
}

function isVisibleBottom(y: number, x: number, v: number): boolean {
  for (let i = y + 1; i < yLen; i++) {
    if (input[i][x] >= v) {
      return false
    }
  }

  return true
}

function isVisibleTop(y: number, x: number, v: number): boolean {
  for (let i = y - 1; i >= 0; i--) {
    if (input[i][x] >= v) {
      return false
    }
  }

  return true
}

function isVisible(y: number, x: number, v: number): boolean {
  return isVisibleLeft(y, x, v) || isVisibleTop(y, x, v) || isVisibleRight(y, x, v) || isVisibleBottom(y, x, v)
}

let first = 0
for (let i = 0; i < yLen; i++) {
  for (let j = 0; j < yLen; j++) {
    if (isVisible(i, j, input[i][j])) {
      first++
    }
  }
}
console.log(first)

function countRight(y: number, x: number, v: number): number {
  if (x === xLen - 1) {
    return 0
  }

  let count = 0

  for (let i = x + 1; i < yLen; i++) {
    if (input[y][i] < v) {
      count++
    } else {
      return count + 1
    }
  }

  return count
}

function countLeft(y: number, x: number, v: number): number {
  if (x === 0) {
    return 0
  }

  let count = 0

  for (let i = x - 1; i >= 0; i--) {
    if (input[y][i] < v) {
      count++
    } else {
      return count + 1
    }
  }

  return count
}

function countBottom(y: number, x: number, v: number): number {
  if (y === yLen - 1) {
    return 0
  }

  let count = 0

  for (let i = y + 1; i < yLen; i++) {
    if (input[i][x] < v) {
      count++
    } else {
      return count + 1
    }
  }

  return count
}

function countTop(y: number, x: number, v: number): number {
  if (y === 0) {
    return 0
  }

  let count = 0

  for (let i = y - 1; i >= 0; i--) {
    if (input[i][x] < v) {
      count++
    } else {
      return count + 1
    }
  }

  return count
}

function countVisible(y: number, x: number, v: number): number {
  return countLeft(y, x, v) * countTop(y, x, v) * countRight(y, x, v) * countBottom(y, x, v)
}

let second = 0
for (let i = 0; i < yLen; i++) {
  for (let j = 0; j < yLen; j++) {
    const visibleCount = countVisible(i, j, input[i][j])

    if (visibleCount > second) {
      second = visibleCount
    }
  }
}
console.log(second)
