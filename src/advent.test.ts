import { ExecOptionsWithBufferEncoding } from 'child_process'
import {
  calcChecksum,
  calcSpiralNumber,
  countLetters,
  countValidPassphrases,
  directions,
  initialStressTestMatrix,
  isAnagram,
  isValidPassphrase,
  isValidPassphraseAnagram,
  nextStressTestMatrixIncrement,
  solveCaptcha,
  spiralMemoryDistance,
  stressTest,
  StressTestMatrix,
} from './advent'

describe('advent advent', () => {
  // **********************
  // ******* DAY 1 ********
  // **********************
  describe('day 1 - star 1', () => {
    it('should return 0 there are no same consecutive numbers', () => {
      const input = '1234'
      const expected = 0
      const result = solveCaptcha(input)
      expect(result).toEqual(expected)
    })

    it('should return 3', () => {
      const input = '1122'
      const expected = 3
      const result = solveCaptcha(input)
      expect(result).toEqual(expected)
    })

    it('should return 4', () => {
      const input = '1111'
      const expected = 4
      const result = solveCaptcha(input)
      expect(result).toEqual(expected)
    })

    it('should return 9', () => {
      const input = '91212129'
      const expected = 9
      const result = solveCaptcha(input)
      expect(result).toEqual(expected)
    })
  })
  describe('day 1 - star 2', () => {
    it('should return 6', () => {
      const input = '1212'
      const expected = 6
      const result = solveCaptcha(input, input.length / 2)
      expect(result).toEqual(expected)
    })

    it('should return 0', () => {
      const input = '1221'
      const expected = 0
      const result = solveCaptcha(input, input.length / 2)
      expect(result).toEqual(expected)
    })

    it('should return 4', () => {
      const input = '123425'
      const expected = 4
      const result = solveCaptcha(input, input.length / 2)
      expect(result).toEqual(expected)
    })

    it('should return 12', () => {
      const input = '123123'
      const expected = 12
      const result = solveCaptcha(input, input.length / 2)
      expect(result).toEqual(expected)
    })

    it('should return 4', () => {
      const input = '12131415'
      const expected = 4
      const result = solveCaptcha(input, input.length / 2)
      expect(result).toEqual(expected)
    })
  })
  // **********************
  // ******* DAY 2 ********
  // **********************
  describe('day 2 - star 1', () => {
    it('should return 0 if given a number only', () => {
      const input = '123'
      const expected = 0
      const result = calcChecksum(input)
      expect(result).toEqual(expected)
    })

    it('should return the difference between the two numbers if given two numbers', () => {
      const input = '123\t124'
      const expected = 1
      const result = calcChecksum(input)
      expect(result).toEqual(expected)
    })

    it('should return the maximum difference between two numbers', () => {
      const input = '123\t124\t33\t43'
      const expected = 91
      const result = calcChecksum(input)
      expect(result).toEqual(expected)
    })

    it('should add maximum differences of each of two given lines of numbers, (', () => {
      const input = `123\t124\t33\t43
                     123\t124\t33\t43`
      const expected = 182
      const result = calcChecksum(input)
      expect(result).toEqual(expected)
    })

    it('should add maximum differences of each of a lot of given lines of numbers, (', () => {
      const input = `123\t124\t33\t43
                     123\t124\t33\t43
                     1\t2
                     2\t3
                     4\t5
                     6
                     7\t8`
      const expected = 186
      const result = calcChecksum(input)
      expect(result).toEqual(expected)
    })

    it('should solve the example', () => {
      const input = `5\t1\t9\t5
                     7\t5\t3
                     2\t4\t6\t8`
      const expected = 18
      const result = calcChecksum(input)
      expect(result).toEqual(expected)
    })
  })

  describe('day 2 - star 2', () => {
    it('should return the number by which the two evenly divisable numbers in the given row are divesiable by', () => {
      const input = '5\t9\t2\t8'
      const expected = 4
      const result = calcChecksum(input, true)
      expect(result).toEqual(expected)
    })

    it('should return 3', () => {
      const input = '9\t4\t7\t3'
      const expected = 3
      const result = calcChecksum(input, true)
      expect(result).toEqual(expected)
    })

    it('should solve the example', () => {
      const input = `5\t9\t2\t8
                     9\t4\t7\t3
                     3\t8\t6\t5`
      const expected = 9
      const result = calcChecksum(input, true)
      expect(result).toEqual(expected)
    })
  })

  // **********************
  // ******* DAY 3 ********
  // **********************
  describe('day 3 - star 1', () => {
    it('should return 0 if given 1', () => {
      const input = 1
      const expected = 0
      const result = spiralMemoryDistance(input)
      expect(result).toEqual(expected)
    })

    it('should return 3 if given 12', () => {
      const input = 12
      const expected = 3
      const result = spiralMemoryDistance(input)
      expect(result).toEqual(expected)
    })

    it('should return 2 if given 23', () => {
      const input = 23
      const expected = 2
      const result = spiralMemoryDistance(input)
      expect(result).toEqual(expected)
    })

    it('should return 31 if given 1024', () => {
      const input = 1024
      const expected = 31
      const result = spiralMemoryDistance(input)
      expect(result).toEqual(expected)
    })

    describe('calcSpiralNumber()', () => {
      it('should return 0 if given number is 1', () => {
        const input = 1
        const expected = 0
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 1 if given number is 8', () => {
        const input = 8
        const expected = 1
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 2 if given number is 10', () => {
        const input = 10
        const expected = 2
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 1 if given number is 9', () => {
        const input = 9
        const expected = 1
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 3 if given number is 18', () => {
        const input = 28
        const expected = 3
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 3 if given number is 49', () => {
        const input = 49
        const expected = 3
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 4 if given number is 81', () => {
        const input = 49
        const expected = 3
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })

      it('should return 5 if given number is 82', () => {
        const input = 49
        const expected = 3
        const result = calcSpiralNumber(input)
        expect(result).toEqual(expected)
      })
    })
  })

  describe('day 3 - star 2', () => {
    it('should return 2 if given 1', () => {
      const input = 1
      const expected = 2
      const result = stressTest(input)
      expect(result).toEqual(expected)
    })

    it('should return 4 if given 2', () => {
      const input = 2
      const expected = 4
      const result = stressTest(input)
      expect(result).toEqual(expected)
    })

    it('should return 133 if given 122', () => {
      const input = 122
      const expected = 133
      const result = stressTest(input)
      expect(result).toEqual(expected)
    })
  })

  // **********************
  // ******* DAY 4 ********
  // **********************
  describe('day 4 - star 1', () => {
    describe('isValidPassphrase()', () => {
      it('should return true if given a string without whitespace', () => {
        const input = 'aa'
        const expected = true
        const result = isValidPassphrase(input)
        expect(result).toEqual(expected)
      })

      it('should return false if given a string with two same words and whitespace in between', () => {
        const input = 'aa aa'
        const expected = false
        const result = isValidPassphrase(input)
        expect(result).toEqual(expected)
      })

      it('should return true if given a string with two differents words and whitespace in between', () => {
        const input = 'aa bb'
        const expected = true
        const result = isValidPassphrase(input)
        expect(result).toEqual(expected)
      })

      it('should return true if given a string with differents words and whitespace in between', () => {
        const input = 'aa bb cc dd hallo test wow'
        const expected = true
        const result = isValidPassphrase(input)
        expect(result).toEqual(expected)
      })

      it('should return false if given a string with two same words and others', () => {
        const input = 'aa bb cc dd hallo test wow aa'
        const expected = false
        const result = isValidPassphrase(input)
        expect(result).toEqual(expected)
      })
    })

    it('should return 1 if given one valid string', () => {
      const input = `aa bb cc`
      const expected = 1
      const result = countValidPassphrases(input)
      expect(result).toEqual(expected)
    })

    it('should return 2 if given one valid string', () => {
      const input = `aa bb cc
      aa bb cc dd ee`
      const expected = 2
      const result = countValidPassphrases(input)
      expect(result).toEqual(expected)
    })

    it('should return 1 if given one valid string and one invalid', () => {
      const input = `aa bb cc aa
      aa bb cc dd ee`
      const expected = 1
      const result = countValidPassphrases(input)
      expect(result).toEqual(expected)
    })

    it('should return 4 if given 4 valid string and one invalid', () => {
      const input = `aa bb cc
      aa bb  asdf cc dd ee
      aa bb asf wera fasd fcc dd ee
      aa bb cc dd ee ee
      aa bb ads dfesdf cc dd ee`
      const expected = 4
      const result = countValidPassphrases(input)
      expect(result).toEqual(expected)
    })
  })
  describe('day 4 - star 2', () => {
    describe('countLetters()', () => {
      it('should count letters of easy word', () => {
        const input = 'world'
        const expected = { w: 1, o: 1, r: 1, l: 1, d: 1 }
        const result = countLetters(input)
        expect(result).toEqual(expected)
      })
    })
    describe('isAnagram()', () => {
      it('should return false if is not an anagram', () => {
        const input1 = 'abcd'
        const input2 = 'efgh'
        const expected = false
        const result = isAnagram(input1, input2)
        expect(result).toEqual(expected)
      })

      it('should return true if two same words are given', () => {
        const input1 = 'abcd'
        const input2 = 'abcd'
        const expected = true
        const result = isAnagram(input1, input2)
        expect(result).toEqual(expected)
      })

      it('should return false if two words of different length are given', () => {
        const input1 = 'abcd'
        const input2 = 'bcdasfdaa'
        const expected = false
        const result = isAnagram(input1, input2)
        expect(result).toEqual(expected)
      })

      it('should return true if two anagrams are given', () => {
        const input1 = 'abcd'
        const input2 = 'bcda'
        const expected = true
        const result = isAnagram(input1, input2)
        expect(result).toEqual(expected)
      })
    })
    describe('isValidPassphraseAnagram()', () => {
      it('should return false if an anagram is in the string', () => {
        const input = 'abcd ghoiaeh asf f sadfh sgh asfd bcda'
        const expected = false
        const result = isValidPassphraseAnagram(input)
        expect(result).toEqual(expected)
      })

      it('should return true if no anagram is in the string', () => {
        const input = 'abcd ghoiaeh asf f sadfh sgh asfd'
        const expected = true
        const result = isValidPassphraseAnagram(input)
        expect(result).toEqual(expected)
      })

      it('should return true', () => {
        const input = 'iiii oiii ooii oooi oooo'
        const expected = true
        const result = isValidPassphraseAnagram(input)
        expect(result).toEqual(expected)
      })

      it('should return false', () => {
        const input = 'oiii ioii iioi iiio'
        const expected = false
        const result = isValidPassphraseAnagram(input)
        expect(result).toEqual(expected)
      })
    })
    it('should return 1 if given one valid string', () => {
      const input = `aa bb cc`
      const expected = 1
      const result = countValidPassphrases(input, true)
      expect(result).toEqual(expected)
    })

    it('should return 2 if given one valid string', () => {
      const input = `aa bb cc
      aa bb cc dd ee`
      const expected = 2
      const result = countValidPassphrases(input, true)
      expect(result).toEqual(expected)
    })

    it('should return 1 if given one valid string and one invalid', () => {
      const input = `aa bb cc aa
      aa bb cc dd ee`
      const expected = 1
      const result = countValidPassphrases(input, true)
      expect(result).toEqual(expected)
    })

    it('should return 4 if given 4 valid string and one invalid', () => {
      const input = `aa bb cc
      aa bb  asdf cc dd ee
      aa bb asf wera fasd fcc dd ee asdf
      aa bb cc dd ee
      aa bb ads dfesdf cc dd ee`
      const expected = 4
      const result = countValidPassphrases(input, true)
      expect(result).toEqual(expected)
    })

    it('should return 4 if given 4 valid string and last one invalid', () => {
      const input = `aa bb cc
      aa bb  asdf cc dd ee
      aa bb asf wera fasd fcc dd ee
      aa bb cc dd ee
      aa bb ads dfesdf cc dd ee fesddf`
      const expected = 4
      const result = countValidPassphrases(input, true)
      expect(result).toEqual(expected)
    })

    it('should return 3 if given 3 valid string and two invalid', () => {
      const input = `aa bb cc
      aa bb  asdf cc dd ee fsda
      aa bb asf wera fasd fcc dd ee
      aa bb cc dd ee
      aa bb ads dfesdf cc dd ee fesddf`
      const expected = 3
      const result = countValidPassphrases(input, true)
      expect(result).toEqual(expected)
    })
  })
})
