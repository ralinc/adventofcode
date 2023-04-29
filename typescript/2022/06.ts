import {readFileSync} from 'fs'
import _ from 'lodash'

const START_OF_PACKET_MARKER = 4
const START_OF_MESSAGE_MARKER = 14

type Marker = typeof START_OF_PACKET_MARKER | typeof START_OF_MESSAGE_MARKER

const input = readFileSync('06.input', 'utf8').trim()

function detect(datastream: string, marker: Marker): number {
  const sequences = [...datastream].map((_e, i, a) => a.slice(i, i + marker))

  const position = _.findIndex(sequences, e => e.reduce((a, e) => a.add(e), new Set()).size === marker)

  return position + marker
}

const first = detect(input, START_OF_PACKET_MARKER)
console.log(first)

const second = detect(input, START_OF_MESSAGE_MARKER)
console.log(second)
