import * as fs from 'fs';

let day = 1;
//let input :string  = fs.readFileSync(`input/day${day}/day${day}-example.txt`, 'utf-8');
let input :string  = fs.readFileSync(`input/day${day}/day${day}-example2.txt`, 'utf-8');

// let input: string = fs.readFileSync(`input/day${day}/day${day}.txt`, 'utf-8');

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

interface wordDigit {digit: string, word: string}
let replaceWordsWithDigits = (line: string): string => {
  let digitMappings: wordDigit[] = [
    {digit: "1", word: "one"},
    {digit: "2", word: "two"},
    {digit: "3", word: "three"},
    {digit: "4", word: "four"},
    {digit: "5", word: "five"},
    {digit: "6", word: "six"},
    {digit: "7", word: "seven"},
    {digit: "8", word: "eight"},
    {digit: "9", word: "nine"}];

  return digitMappings.reduce((line: string, combi: wordDigit) => 
    line.replaceAll(combi.word, combi.digit), line);
}

// part1
let part1 = (input: string[]): number =>
    input.map(compLineValue)
    .reduce((a, b) => a + b);

let part2 = (input: string[]): number => {
  return part1(input.map(replaceWordsWithDigits))
};

// results
let parsed = parse(input);
console.log(`Part1: ${part1(parsed)}`);
console.log(`Part2: ${part2(parsed)}`);
