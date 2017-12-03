"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["EAST"] = "EAST";
    Direction["SOUTH"] = "SOUTH";
    Direction["WEST"] = "WEST";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.directions = [
    Direction.EAST,
    Direction.NORTH,
    Direction.WEST,
    Direction.SOUTH,
];
function nextDirection(dir) {
    return exports.directions[(exports.directions.indexOf(dir) + 1) % exports.directions.length];
}
exports.nextDirection = nextDirection;
const directionValueMap = {};
directionValueMap[Direction.NORTH] = [0, 1];
directionValueMap[Direction.EAST] = [1, 0];
directionValueMap[Direction.SOUTH] = [0, -1];
directionValueMap[Direction.WEST] = [-1, 0];
exports.initialStressTestMatrix = {
    matrix: [[1], []],
    lastPosition: [0, 0],
    lastDirection: Direction.SOUTH,
};
function cloneStressTestMatrix(stressTestMatrix) {
    const matrix = stressTestMatrix.matrix.map(row => row.map(value => value));
    const lastPosition = [
        stressTestMatrix.lastPosition[0],
        stressTestMatrix.lastPosition[1],
    ];
    const lastDirection = stressTestMatrix.lastDirection;
    return { matrix, lastPosition, lastDirection };
}
function calcNeighbourSum(matrix, position) {
    const [x, y] = [position[0], position[1]];
    const neighbours = [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y + 1],
        [x - 1, y - 1],
        [x + 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y],
        [x - 1, y],
    ];
    const sum = neighbours.reduce((value, neighbour) => {
        if (!matrix[neighbour[0]]) {
            return value;
        }
        const neighbourVal = matrix[neighbour[0]][neighbour[1]];
        return neighbourVal ? value + neighbourVal : value;
    }, 0);
    return sum;
}
exports.calcNeighbourSum = calcNeighbourSum;
function growWest(stressTestMatrix) {
    let { matrix, lastPosition, lastDirection } = cloneStressTestMatrix(stressTestMatrix);
    matrix.unshift([]);
    lastPosition = [lastPosition[0] + 1, lastPosition[1]];
    return { matrix, lastPosition, lastDirection };
}
function growSouth(stressTestMatrix) {
    let { matrix, lastPosition, lastDirection } = cloneStressTestMatrix(stressTestMatrix);
    matrix = matrix.map(row => {
        row.unshift(null);
        return row;
    });
    lastPosition = [lastPosition[0], lastPosition[1] + 1];
    return { matrix, lastPosition, lastDirection };
}
function growEast(stressTestMatrix) {
    let { matrix, lastPosition, lastDirection } = cloneStressTestMatrix(stressTestMatrix);
    matrix.push([]);
    return { matrix, lastPosition, lastDirection };
}
function growNorth(stressTestMatrix) {
    let { matrix, lastPosition, lastDirection } = cloneStressTestMatrix(stressTestMatrix);
    matrix = matrix.map(row => {
        row.push(null);
        return row;
    });
    return { matrix, lastPosition, lastDirection };
}
function growMatrix(stressTestMatrix) {
    const { matrix, lastPosition, lastDirection } = cloneStressTestMatrix(stressTestMatrix);
    switch (lastDirection) {
        case Direction.WEST:
            return growWest(stressTestMatrix);
        case Direction.SOUTH:
            return growSouth(stressTestMatrix);
        case Direction.EAST:
            return growEast(stressTestMatrix);
        case Direction.NORTH:
            return growNorth(stressTestMatrix);
    }
}
exports.growMatrix = growMatrix;
function nextStressTestMatrixIncrement(stressTestMatrix) {
    let { matrix, lastPosition, lastDirection } = cloneStressTestMatrix(stressTestMatrix);
    const nextDir = directionValueMap[nextDirection(lastDirection)];
    const lastDir = directionValueMap[lastDirection];
    const toCheck = [lastPosition[0] + nextDir[0], lastPosition[1] + nextDir[1]];
    let nextPos;
    if (matrix[toCheck[0]][toCheck[1]]) {
        nextPos = [lastPosition[0] + lastDir[0], lastPosition[1] + lastDir[1]];
        if (nextPos[0] < 0 || nextPos[1] < 0 || !matrix[nextPos[0]]) {
            stressTestMatrix = growMatrix(stressTestMatrix);
            matrix = stressTestMatrix.matrix;
            lastPosition = stressTestMatrix.lastPosition;
            nextPos = [lastPosition[0] + lastDir[0], lastPosition[1] + lastDir[1]];
        }
    }
    else {
        nextPos = toCheck;
        lastDirection = nextDirection(lastDirection);
    }
    const sumNeighbours = calcNeighbourSum(matrix, nextPos);
    matrix[nextPos[0]][nextPos[1]] = sumNeighbours;
    lastPosition = nextPos;
    return { matrix, lastPosition, lastDirection };
}
exports.nextStressTestMatrixIncrement = nextStressTestMatrixIncrement;
//# sourceMappingURL=stressTestMatrix.js.map