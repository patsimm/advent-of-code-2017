import {
  initialStressTestMatrix,
  nextStressTestMatrixIncrement,
  StressTestMatrix,
} from './stressTestMatrix'
import inputs from './input'
import { currentId } from 'async_hooks'

// **********************
// ****** HELPERS *******
// **********************

function stringToNumberArray(input: string): number[] {
  const chars: number[] = new Array(input.length)
  for (let i = 0; i < input.length; i++) {
    chars[i] = parseInt(input.charAt(i))
  }
  return chars
}

function max(numbers: number[]): number {
  return numbers.reduce((value, next) => (next > value ? next : value))
}

function min(numbers: number[]): number {
  return numbers.reduce((value, next) => (next < value ? next : value))
}

// **********************
// ******* DAY 1 ********
// **********************

export function solveCaptcha(input: string, offset: number = 1): number {
  const chars = stringToNumberArray(input)
  return chars.reduce((solution, value, index) => {
    return chars[(index + offset) % chars.length] === value
      ? solution + value
      : solution
  }, 0)
}

export function day1_1() {
  console.log('*** DAY 1 - Star #1')
  const input = inputs.day1
  const result = solveCaptcha(input)
  console.log('Result: ' + result)
}

export function day1_2() {
  console.log('*** DAY 1 - Star #2')
  const input = inputs.day1
  const result = solveCaptcha(input, input.length / 2)
  console.log('Result: ' + result)
}

// **********************
// ******* DAY 2 ********
// **********************

function maxDiffInRow(row: string) {
  const numbers = row.split('\t').map(value => parseInt(value))
  const minMax = numbers.reduce(
    (value, next) => {
      if (next < value[0]) {
        value[0] = next
      }
      if (next > value[1]) {
        value[1] = next
      }
      return value
    },
    [9999, 0],
  )
  return minMax[1] - minMax[0]
}

function evenlyDivisableInRow(row: string): number {
  const numbers = row.split('\t').map(value => parseInt(value))
  let divisor = 0
  numbers.forEach(number_i => {
    numbers.forEach(number_j => {
      const minMax = [min([number_i, number_j]), max([number_i, number_j])]
      if (minMax[0] !== minMax[1] && minMax[1] % minMax[0] === 0) {
        divisor = minMax[1] / minMax[0]
      }
    })
  })
  return divisor
}

export function calcChecksum(input: string, evenly: boolean = false) {
  const splitted = input.split('\n')
  return splitted.reduce((value, next) => {
    return value + (evenly ? evenlyDivisableInRow(next) : maxDiffInRow(next))
  }, 0)
}

export function day2_1() {
  console.log('*** DAY 2 - Star #1')
  const input = inputs.day2
  const result = calcChecksum(input)
  console.log('Result: ' + result)
}

export function day2_2() {
  console.log('*** DAY 2 - Star #2')
  const input = inputs.day2
  const result = calcChecksum(input, true)
  console.log('Result: ' + result)
}

// **********************
// ******* DAY 3 ********
// **********************

export function calcSpiralNumber(input: number): number {
  if (input <= 1) {
    return 0
  }
  return Math.floor((Math.sqrt(input - 1) - 1) / 2) + 1
}

export function spiralMemoryDistance(input: number): number {
  const spiralNumber = calcSpiralNumber(input)
  if (spiralNumber === 0) {
    return 0
  }
  const maxNumberInSpiral = Math.pow(2 * spiralNumber + 1, 2)
  const differenceFromMax = maxNumberInSpiral - input

  const offsetX = Math.abs(
    differenceFromMax % (2 * spiralNumber) - spiralNumber,
  )
  return spiralNumber + offsetX
}

export function stressTest(input: number): number {
  let stressTestMatrix = initialStressTestMatrix
  let value: number
  do {
    stressTestMatrix = nextStressTestMatrixIncrement(stressTestMatrix)
    const { matrix, lastPosition, lastDirection } = stressTestMatrix
    value = matrix[lastPosition[0]][lastPosition[1]]
  } while (value <= input)
  return value
}

export function day3_1() {
  console.log('*** DAY 3 - Star #1')
  const input = inputs.day3
  const result = spiralMemoryDistance(input)
  console.log('Result: ' + result)
}

export function day3_2() {
  console.log('*** DAY 3 - Star #2')
  const input = inputs.day3
  const result = stressTest(input)
  console.log('Result: ' + result)
}

// **********************
// ******* DAY 4 ********
// **********************

export function isValidPassphrase(phrase: string): boolean {
  const words = phrase.split(' ')
  for (let i = 0; i < words.length; i++) {
    const currentWord = words.pop()
    if (words.indexOf(currentWord) != -1) {
      return false
    }
    words.unshift(currentWord)
  }
  return true
}

export function countValidPassphrases(input: string, anagram = false): number {
  const phrases = input.split('\n').map(phrase => phrase.trim())
  return phrases.reduce((count, phrase) => {
    if (anagram) {
      return isValidPassphraseAnagram(phrase) ? count + 1 : count
    }
    return isValidPassphrase(phrase) ? count + 1 : count
  }, 0)
}

export function countLetters(word: string): { [key: string]: number } {
  const letterCount: { [key: string]: number } = {}
  for (let i = 0; i < word.length; i++) {
    const letter = word.charAt(i)
    if (!letterCount[letter]) {
      letterCount[letter] = 1
    } else {
      letterCount[letter] += 1
    }
  }
  return letterCount
}

export function isAnagram(word1: string, word2: string): boolean {
  if (word1.length != word2.length) {
    return false
  }
  const word1Count = countLetters(word1)
  const word2Count = countLetters(word2)
  const differs = Object.keys(word1Count).some(
    element => word1Count[element] != word2Count[element],
  )
  return !differs
}

export function isValidPassphraseAnagram(phrase: string): boolean {
  const words = phrase.split(' ')
  for (let i = 0; i < words.length; i++) {
    const currentWord = words.pop()
    if (words.some(word => isAnagram(currentWord, word))) {
      return false
    }
    words.unshift(currentWord)
  }
  return true
}

export function day4_1() {
  console.log('*** DAY 4 - Star #1')
  const input = inputs.day4
  const result = countValidPassphrases(input)
  console.log('Result: ' + result)
}

export function day4_2() {
  console.log('*** DAY 4 - Star #2')
  const input = inputs.day4
  const result = countValidPassphrases(input, true)
  console.log('Result: ' + result)
}
