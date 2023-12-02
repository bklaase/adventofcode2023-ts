import * as fs from 'fs';

let day = 1;
//let input :string  = fs.readFileSync(`input/day${day}/day${day}-example.txt`, 'utf-8');
// let input :string  = fs.readFileSync(`input/day${day}/day${day}-example2.txt`, 'utf-8');

let input: string = fs.readFileSync(`input/day${day}/day${day}.txt`, 'utf-8');

// parse
// -----
let parse = (input: string): string[] => {
  let output = input.split('\n');
  output.pop();
  return output;
}

// solve
// -----
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

let replaceWordsWithDigits = (line: string): string => {
  let digitMappings: {[word: string]: string} =
      {"one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
       "six": "6", "seven": "7", "eight": "8", "nine": "9"}

  let wordrgx = /one|two|three|four|five|six|seven|eight|nine/
  let match: RegExpMatchArray | null = line.match(wordrgx);
  while(match) {
    const matchedWord = match?.[0];
    line = line.replace(matchedWord, digitMappings[matchedWord])
    
    match = line.match(wordrgx);
  }
  return line
}

// Assemble parts
// --------------
let part1 = (input: string[]): number =>
    input.map(compLineValue)
    .reduce((a, b) => a + b);

let part2 = (input: string[]): number => 
 part1(input.map(replaceWordsWithDigits))


// print results
// -------------
let parsed = parse(input);
console.log(`Part1: ${part1(parsed)}`);
console.log(`Part2: ${part2(parsed)}`);
