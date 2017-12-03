import { calcChecksum, solveCaptcha } from './advent'

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
})
