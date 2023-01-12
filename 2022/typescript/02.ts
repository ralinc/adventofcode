import {readFileSync} from 'fs'

enum Move {
  Rock,
  Paper,
  Scissors
}

enum Outcome {
  Lose,
  Draw,
  Win
}

const input = readFileSync('./2022/02.input', 'utf8')
  .split(/\n/)
  .slice(0, -1)
  .map(x => {
    const [a, b] = x.split(/\s/)
    return [a.charCodeAt(0) - 'A'.charCodeAt(0), b.charCodeAt(0) - 'X'.charCodeAt(0)]
  })

function play(a: Move, b: Move): Outcome {
  if (a === b) {
    return Outcome.Draw
  } else if ((a + 1) % 3 === b) {
    return Outcome.Win
  } else {
    return Outcome.Lose
  }
}

const first = input.map(([a, b]) => play(a, b) * 3 + b + 1).reduce((a, e) => a + e)
console.log(first)

function move(a: Move, outcome: Outcome): Move {
  switch (outcome) {
    case Outcome.Win:
      return (a + 1) % 3
    case Outcome.Draw:
      return a
    case Outcome.Lose:
      return (a + 2) % 3
  }
}

const second = input.map(([a, outcome]) => move(a, outcome) + 1 + outcome * 3).reduce((a, e) => a + e)
console.log(second)
