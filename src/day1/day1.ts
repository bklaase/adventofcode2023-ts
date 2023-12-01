import * as fs from 'fs';

let day = 1;
//let input :string  = fs.readFileSync(`input/day${day}/day${day}-example.txt', 'utf-8');
let input: string = fs.readFileSync(`input/day${day}/day${day}.txt`, 'utf-8');

// parse
let parse = (input: string): string[] => {
  let output = input.split('\n');
  output.pop();
  return output;
}

// solutions
interface lineValues { firstDigit: number, lastDigit: number };

let getDigitsInLine = (line: string): lineValues => {
  let firstDigitChar = [...line].find(Number);
  let lastDigitChar = [...line].findLast(Number);

  let digitChar = (c: string | undefined): number => c ? Number(c) : 0;

  return {
    firstDigit: digitChar(firstDigitChar),
    lastDigit: digitChar(lastDigitChar)
  }
}
let compLineValue = (line: string): number => {
  let { firstDigit, lastDigit } = getDigitsInLine(line);
  return Number("" + firstDigit + lastDigit);
}

// part1
let part1 = (input: string[]): number =>
    input.map(compLineValue)
    .reduce((a, b) => a + b);

// results
console.log(`Part1: ${part1(parse(input))}`);
