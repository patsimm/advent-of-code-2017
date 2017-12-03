import { solveCaptcha } from './advent'

describe('advent advent', () => {
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
})
