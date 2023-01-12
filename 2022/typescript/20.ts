import {readFileSync} from 'fs'
import _ from 'lodash'

type IndexedValue = {index: number; value: number}

class Deque<T> {
  protected readonly list: T[]

  constructor(list: T[]) {
    this.list = list
  }

  append(item: T): void {
    this.list.push(item)
  }

  popleft(): T {
    return this.list.shift()!
  }

  rotate(n: number): void {
    for (let i = 0; i < n; i++) {
      this.append(this.popleft())
    }
  }

  get size(): number {
    return this.list.length
  }
}

class IndexedValueDeque extends Deque<IndexedValue> {
  findIndex(i: number) {
    return _.findIndex(this.list, ({index}) => index === i)
  }

  get values() {
    return this.list.map(item => item.value)
  }
}

class EncryptedFile {
  private readonly mixed: IndexedValueDeque

  constructor(content: number[], decryptionKey: number) {
    this.mixed = new IndexedValueDeque(content.map(n => n * decryptionKey).map((value, index) => ({index, value})))
  }

  decrypt(mixCount: number): number[] {
    for (let i = 0; i < mixCount; i++) {
      this.mix()
    }

    return this.mixed.values
  }

  private mix(): void {
    for (let originalIndex = 0; originalIndex < this.mixed.size; originalIndex++) {
      const mixedIndex = this.mixed.findIndex(originalIndex)
      this.mixed.rotate(mixedIndex)

      const {index, value} = this.mixed.popleft()

      const count = this.modulo(value, this.mixed.size)
      this.mixed.rotate(count)

      this.mixed.append({index, value})
    }
  }

  private modulo(a: number, b: number): number {
    return a - b * Math.floor(a / b)
  }
}

function sumGroveCoordinates(fileContent: number[], decryptionKey: number, mixCount: number): number {
  const encryptedFile = new EncryptedFile(fileContent, decryptionKey)
  const decryptedFile = encryptedFile.decrypt(mixCount)

  const zeroMixedIndex = decryptedFile.indexOf(0)

  return [1000, 2000, 3000].reduce((sum, coordinate) => {
    const groveCoordinateIndex = (zeroMixedIndex + coordinate) % decryptedFile.length
    return sum + decryptedFile[groveCoordinateIndex]
  }, 0)
}

const input: number[] = readFileSync('2022/20.input', 'utf8').trim().split(/\n/).map(Number)

const first = sumGroveCoordinates(input, 1, 1)
console.log(first) // 19559

const second = sumGroveCoordinates(input, 811589153, 10)
console.log(second) // 912226207972
