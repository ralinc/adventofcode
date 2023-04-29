import {readFileSync} from 'fs'
import {join} from 'path'

class File {
  protected _size: number

  constructor(size = 0) {
    this._size = size
  }

  get size(): number {
    return this._size
  }
}

class Directory extends File {
  readonly path: string
  readonly parent: Directory | null
  private readonly children: File[]

  constructor(path: string, parent: Directory | null = null) {
    super()
    this.path = path
    this.parent = parent
    this.children = []
  }

  addChild(file: File): void {
    this.children.push(file)
    this._size = 0
  }

  get size(): number {
    return this._size || (this._size = this.children.reduce((size, child) => size + child.size, 0))
  }
}

const input = readFileSync('07.input', 'utf8').trim().split(/\n/)

const directories: Record<string, Directory> = {}
const root = new Directory('/')

let current: Directory | null = null

for (const line of input) {
  if (line[0] === '$') {
    const [, cmd, arg] = line.split(' ')

    if (cmd === 'cd') {
      switch (arg) {
        case '/':
          current = root
          break
        case '..':
          current = current!.parent
          break
        default:
          current = directories[join(current!.path, arg)]
          break
      }
    }
  } else {
    const [sizeOrDir, name] = line.split(' ')

    if (sizeOrDir === 'dir') {
      const directory = new Directory(join(current!.path, name), current)
      current!.addChild(directory)
      directories[directory.path] = directory
    } else {
      current!.addChild(new File(+sizeOrDir))
    }
  }
}

const first = Object.values(directories).reduce(
  (totalSize, directory) => (directory.size <= 100000 ? totalSize + directory.size : totalSize),
  0
)

console.log(first) // 1743217

const totalSpace = 70000000
const neededSpace = 30000000
const usedSpace = root.size
const freeSpace = totalSpace - usedSpace

const second = Object.values(directories).reduce(
  (smallest, directory) =>
    freeSpace + directory.size >= neededSpace && directory.size < smallest ? directory.size : smallest,
  usedSpace
)

console.log(second) // 8319096
