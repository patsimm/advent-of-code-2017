"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let inputs = require('../src/input.json');
function stringToNumberArray(input) {
    const chars = new Array(input.length);
    for (let i = 0; i < input.length; i++) {
        chars[i] = parseInt(input.charAt(i));
    }
    return chars;
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
    console.log('### DAY 1 - Exercise 1');
    const input = inputs.day1_1;
    const result = solveCaptcha(input);
    console.log('Result: ' + result);
}
function day1_2() {
    console.log('### DAY 1 - Exercise 2');
    const input = inputs.day1_2;
    const result = solveCaptcha(input, input.length / 2);
    console.log('Result: ' + result);
}
day1_1();
day1_2();
//# sourceMappingURL=advent.js.map