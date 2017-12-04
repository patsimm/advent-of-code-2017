"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stressTestMatrix_1 = require("./stressTestMatrix");
const input_1 = require("./input");
function stringToNumberArray(input) {
    const chars = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        chars[i] = parseInt(input.charAt(i));
    }
    return chars;
}
function max(numbers) {
    return numbers.reduce((value, next) => (next > value ? next : value));
}
function min(numbers) {
    return numbers.reduce((value, next) => (next < value ? next : value));
}
function solveCaptcha(input, offset = 1) {
    const chars = stringToNumberArray(input);
    return chars.reduce((solution, value, index) => {
        return chars[(index + offset) % chars.length] === value
            ? solution + value
            : solution;
    }, 0);
}
exports.solveCaptcha = solveCaptcha;
function day1_1() {
    console.log('*** DAY 1 - Star #1');
    const input = input_1.default.day1;
    const result = solveCaptcha(input);
    console.log('Result: ' + result);
}
exports.day1_1 = day1_1;
function day1_2() {
    console.log('*** DAY 1 - Star #2');
    const input = input_1.default.day1;
    const result = solveCaptcha(input, input.length / 2);
    console.log('Result: ' + result);
}
exports.day1_2 = day1_2;
function maxDiffInRow(row) {
    const numbers = row.split('\t').map(value => parseInt(value));
    const minMax = numbers.reduce((value, next) => {
        if (next < value[0]) {
            value[0] = next;
        }
        if (next > value[1]) {
            value[1] = next;
        }
        return value;
    }, [9999, 0]);
    return minMax[1] - minMax[0];
}
function evenlyDivisableInRow(row) {
    const numbers = row.split('\t').map(value => parseInt(value));
    let divisor = 0;
    numbers.forEach(number_i => {
        numbers.forEach(number_j => {
            const minMax = [min([number_i, number_j]), max([number_i, number_j])];
            if (minMax[0] !== minMax[1] && minMax[1] % minMax[0] === 0) {
                divisor = minMax[1] / minMax[0];
            }
        });
    });
    return divisor;
}
function calcChecksum(input, evenly = false) {
    const splitted = input.split('\n');
    return splitted.reduce((value, next) => {
        return value + (evenly ? evenlyDivisableInRow(next) : maxDiffInRow(next));
    }, 0);
}
exports.calcChecksum = calcChecksum;
function day2_1() {
    console.log('*** DAY 2 - Star #1');
    const input = input_1.default.day2;
    const result = calcChecksum(input);
    console.log('Result: ' + result);
}
exports.day2_1 = day2_1;
function day2_2() {
    console.log('*** DAY 2 - Star #2');
    const input = input_1.default.day2;
    const result = calcChecksum(input, true);
    console.log('Result: ' + result);
}
exports.day2_2 = day2_2;
function calcSpiralNumber(input) {
    if (input <= 1) {
        return 0;
    }
    return Math.floor((Math.sqrt(input - 1) - 1) / 2) + 1;
}
exports.calcSpiralNumber = calcSpiralNumber;
function spiralMemoryDistance(input) {
    const spiralNumber = calcSpiralNumber(input);
    if (spiralNumber === 0) {
        return 0;
    }
    const maxNumberInSpiral = Math.pow(2 * spiralNumber + 1, 2);
    const differenceFromMax = maxNumberInSpiral - input;
    const offsetX = Math.abs(differenceFromMax % (2 * spiralNumber) - spiralNumber);
    return spiralNumber + offsetX;
}
exports.spiralMemoryDistance = spiralMemoryDistance;
function stressTest(input) {
    let stressTestMatrix = stressTestMatrix_1.initialStressTestMatrix;
    let value;
    do {
        stressTestMatrix = stressTestMatrix_1.nextStressTestMatrixIncrement(stressTestMatrix);
        const { matrix, lastPosition, lastDirection } = stressTestMatrix;
        value = matrix[lastPosition[0]][lastPosition[1]];
    } while (value <= input);
    return value;
}
exports.stressTest = stressTest;
function day3_1() {
    console.log('*** DAY 3 - Star #1');
    const input = input_1.default.day3;
    const result = spiralMemoryDistance(input);
    console.log('Result: ' + result);
}
exports.day3_1 = day3_1;
function day3_2() {
    console.log('*** DAY 3 - Star #2');
    const input = input_1.default.day3;
    const result = stressTest(input);
    console.log('Result: ' + result);
}
exports.day3_2 = day3_2;
function isValidPassphrase(phrase) {
    const words = phrase.split(' ');
    for (let i = 0; i < words.length; i++) {
        const currentWord = words.pop();
        if (words.indexOf(currentWord) != -1) {
            return false;
        }
        words.unshift(currentWord);
    }
    return true;
}
exports.isValidPassphrase = isValidPassphrase;
function countValidPassphrases(input, anagram = false) {
    const phrases = input.split('\n').map(phrase => phrase.trim());
    return phrases.reduce((count, phrase) => {
        if (anagram) {
            return isValidPassphraseAnagram(phrase) ? count + 1 : count;
        }
        return isValidPassphrase(phrase) ? count + 1 : count;
    }, 0);
}
exports.countValidPassphrases = countValidPassphrases;
function countLetters(word) {
    const letterCount = {};
    for (let i = 0; i < word.length; i++) {
        const letter = word.charAt(i);
        if (!letterCount[letter]) {
            letterCount[letter] = 1;
        }
        else {
            letterCount[letter] += 1;
        }
    }
    return letterCount;
}
exports.countLetters = countLetters;
function isAnagram(word1, word2) {
    if (word1.length != word2.length) {
        return false;
    }
    const word1Count = countLetters(word1);
    const word2Count = countLetters(word2);
    const differs = Object.keys(word1Count).some(element => word1Count[element] != word2Count[element]);
    return !differs;
}
exports.isAnagram = isAnagram;
function isValidPassphraseAnagram(phrase) {
    const words = phrase.split(' ');
    for (let i = 0; i < words.length; i++) {
        const currentWord = words.pop();
        if (words.some(word => isAnagram(currentWord, word))) {
            return false;
        }
        words.unshift(currentWord);
    }
    return true;
}
exports.isValidPassphraseAnagram = isValidPassphraseAnagram;
function day4_1() {
    console.log('*** DAY 4 - Star #1');
    const input = input_1.default.day4;
    const result = countValidPassphrases(input);
    console.log('Result: ' + result);
}
exports.day4_1 = day4_1;
function day4_2() {
    console.log('*** DAY 4 - Star #2');
    const input = input_1.default.day4;
    const result = countValidPassphrases(input, true);
    console.log('Result: ' + result);
}
exports.day4_2 = day4_2;
//# sourceMappingURL=advent.js.map