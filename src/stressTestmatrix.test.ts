import {
  calcNeighbourSum,
  Direction,
  growMatrix,
  initialStressTestMatrix,
  nextDirection,
  nextStressTestMatrixIncrement,
  StressTestMatrix,
} from './stressTestMatrix'

describe('stressTestMatrix', () => {
  describe('nextDirection()', () => {
    it('should return NORTH when EAST was given', () => {
      const input = Direction.EAST
      const expected = Direction.NORTH
      const result = nextDirection(input)
      expect(result).toEqual(expected)
    })

    it('should return WEST when NORTH was given', () => {
      const input = Direction.NORTH
      const expected = Direction.WEST
      const result = nextDirection(input)
      expect(result).toEqual(expected)
    })

    it('should return SOUTH when WEST was given', () => {
      const input = Direction.WEST
      const expected = Direction.SOUTH
      const result = nextDirection(input)
      expect(result).toEqual(expected)
    })

    it('should return EAST when SOUTH was given', () => {
      const input = Direction.SOUTH
      const expected = Direction.EAST
      const result = nextDirection(input)
      expect(result).toEqual(expected)
    })
  })

  describe('calcNeighbourSum', () => {
    it('should return 2', () => {
      const inputMatrix = [[1, 1]]
      const inputPosition = [1, 1]
      const expected = 2
      const result = calcNeighbourSum(inputMatrix, inputPosition)
      expect(result).toEqual(expected)
    })

    it('should return 4', () => {
      // prettier-ignore
      const inputMatrix = [
        [null, 2],
        [1,    1]
      ]
      const inputPosition = [0, 0]
      const expected = 4
      const result = calcNeighbourSum(inputMatrix, inputPosition)
      expect(result).toEqual(expected)
    })

    it('should return 100', () => {
      // prettier-ignore
      const inputMatrix = [
        [  3,    3, null ],
        [ 80, null,    2 ],
        [  1,   10,    1 ],
      ]
      const inputPosition = [1, 1]
      const expected = 100
      const result = calcNeighbourSum(inputMatrix, inputPosition)
      expect(result).toEqual(expected)
    })

    it('should return 100', () => {
      // prettier-ignore
      const inputMatrix = [
        [ 100,  3,    3, null ],
        [ 100, 80,   10,    2 ],
        [  34,  1,   10,    1 ],
        [  34,  1,   10,    1 ],
      ]
      const inputPosition = [1, 2]
      const expected = 100
      const result = calcNeighbourSum(inputMatrix, inputPosition)
      expect(result).toEqual(expected)
    })
  })

  describe('growMatrix()', () => {
    it('should grow the matrix in direction NORTH', () => {
      const input: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [   5,    4,    2 ],
          [   10,   1,    1 ],
          [   11,  23,   25 ],
        ],
        lastSet: [2, 2],
        lastDirection: Direction.NORTH,
      }
      const expected: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [   5,    4,    2, null ],
          [   10,   1,    1, null ],
          [   11,  23,   25, null ],
        ],
        lastSet: [2, 2],
        lastDirection: Direction.NORTH,
      }
      const result = growMatrix(input)
      expect(result).toEqual(expected)
    })

    it('should grow the matrix in direction EAST', () => {
      const input: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [ 5,    4,    2],
          [ 10,   1,    1],
        ],
        lastSet: [1, 0],
        lastDirection: Direction.EAST,
      }
      const expected: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [ 5,    4,    2],
          [ 10,   1,    1],
          []
        ],
        lastSet: [1, 0],
        lastDirection: Direction.EAST,
      }
      const result = growMatrix(input)
      expect(result).toEqual(expected)
    })

    it('should grow the matrix in direction SOUTH', () => {
      const input: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [ 142,  133,  122, 59 ],
          [   5,    4,    2, 57 ],
          [   10,   1,    1, 54 ],
          [   11,  23,   25, 26 ],
        ],
        lastSet: [0, 0],
        lastDirection: Direction.SOUTH,
      }
      const expected: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [ null, 142, 133,  122, 59 ],
          [ null,   5,   4,    2, 57 ],
          [ null,  10,   1,    1, 54 ],
          [ null,  11,  23,   25, 26 ],
        ],
        lastSet: [0, 1],
        lastDirection: Direction.SOUTH,
      }
      const result = growMatrix(input)
      expect(result).toEqual(expected)
    })

    it('should grow the matrix in direction WEST', () => {
      const input: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [ 5,    4,    2, 57 ],
          [ 10,   1,    1, 54 ],
          [ 11,  23,   25, 26 ],
        ],
        lastSet: [0, 3],
        lastDirection: Direction.WEST,
      }
      const expected: StressTestMatrix = {
        //prettier-ignore
        matrix: [
          [],
          [    5,    4,    2, 57  ],
          [   10,    1,    1, 54  ],
          [   11,   23,   25, 26  ],
        ],
        lastSet: [1, 3],
        lastDirection: Direction.WEST,
      }
      const result = growMatrix(input)
      expect(result).toEqual(expected)
    })
  })

  describe('setNextStressTestValue()', () => {
    it('should return first increment if given the initial matirx', () => {
      const input = initialStressTestMatrix
      const expected: StressTestMatrix = {
        matrix: [[1], [1]],
        lastSet: [1, 0],
        lastDirection: Direction.EAST,
      }
      const result = nextStressTestMatrixIncrement(input)
      expect(result).toEqual(expected)
    })

    it('should return second increment if given the second matrix', () => {
      const input: StressTestMatrix = {
        matrix: [[1], [1]],
        lastSet: [1, 0],
        lastDirection: Direction.EAST,
      }
      const expected: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ 1       ],
            [ 1,  2   ]
          ],
        lastSet: [1, 1],
        lastDirection: Direction.NORTH,
      }
      const result = nextStressTestMatrixIncrement(input)
      expect(result).toEqual(expected)
    })

    it('should handle third increment correctly', () => {
      const input: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ 1       ],
            [ 1,  2   ]
          ],
        lastSet: [1, 1],
        lastDirection: Direction.NORTH,
      }
      const expected: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ 1,  4 ],
            [ 1,  2 ]
          ],
        lastSet: [0, 1],
        lastDirection: Direction.WEST,
      }
      const result = nextStressTestMatrixIncrement(input)
      expect(result).toEqual(expected)
    })

    it('should handle frst three increments correctly', () => {
      const input = initialStressTestMatrix
      const expected: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ 1,  4 ],
            [ 1,  2 ]
          ],
        lastSet: [0, 1],
        lastDirection: Direction.WEST,
      }
      const result = nextStressTestMatrixIncrement(
        nextStressTestMatrixIncrement(nextStressTestMatrixIncrement(input)),
      )
      expect(result).toEqual(expected)
    })

    it('should build next increment correctly', () => {
      const input: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ 11, 10,  5, 142 ],
            [ 23,  1,  4, 133 ],
            [ 25,  1,  2, 122 ],
            [ 26, 54, 57, 59  ]
          ],
        lastSet: [0, 3],
        lastDirection: Direction.WEST,
      }
      const expected: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ undefined, undefined, undefined, 147],
            [ 11, 10,  5, 142 ],
            [ 23,  1,  4, 133 ],
            [ 25,  1,  2, 122 ],
            [ 26, 54, 57, 59  ]
          ],
        lastSet: [0, 3],
        lastDirection: Direction.WEST,
      }
      const result = nextStressTestMatrixIncrement(input)
      expect(result).toEqual(expected)
    })

    it('should south movement correctly', () => {
      const input: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ undefined, undefined, 304, 147],
            [ 11, 10,  5, 142 ],
            [ 23,  1,  4, 133 ],
            [ 25,  1,  2, 122 ],
            [ 26, 54, 57, 59  ]
          ],
        lastSet: [0, 2],
        lastDirection: Direction.SOUTH,
      }
      const expected: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ undefined, 330, 304, 147],
            [ 11, 10,  5, 142 ],
            [ 23,  1,  4, 133 ],
            [ 25,  1,  2, 122 ],
            [ 26, 54, 57, 59  ]
          ],
        lastSet: [0, 1],
        lastDirection: Direction.SOUTH,
      }
      const result = nextStressTestMatrixIncrement(input)
      expect(result).toEqual(expected)
    })

    it('should handle chaining next increments correctly', () => {
      const input: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ 11, 10,  5, 142 ],
            [ 23,  1,  4, 133 ],
            [ 25,  1,  2, 122 ],
            [ 26, 54, 57, 59  ]
          ],
        lastSet: [0, 3],
        lastDirection: Direction.WEST,
      }
      const expected: StressTestMatrix = {
        // prettier-ignore
        matrix: [
            [ undefined, 330, 304, 147],
            [ 11, 10,  5, 142 ],
            [ 23,  1,  4, 133 ],
            [ 25,  1,  2, 122 ],
            [ 26, 54, 57, 59  ]
          ],
        lastSet: [0, 1],
        lastDirection: Direction.SOUTH,
      }
      let partResult = nextStressTestMatrixIncrement(input)
      partResult = nextStressTestMatrixIncrement(partResult)
      const result = nextStressTestMatrixIncrement(partResult)
      expect(result).toEqual(expected)
    })
  })
})
