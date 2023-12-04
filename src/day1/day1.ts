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

let compLineValuePart2 = (line: string): number => {
    let digitMappings: { [word: string]: string } =
        {
            "one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
            "six": "6", "seven": "7", "eight": "8", "nine": "9"
        }

    let wordrgx = /one|two|three|four|five|six|seven|eight|nine/
    let dititrgx = /1|2|3|4|5|6|7|8|9/
    let combinedRgx = RegExp(wordrgx.source + '|' + dititrgx.source);

    // first value. simply the first match
    let match = line.match(combinedRgx)?.[0];
    if (match?.match(wordrgx)) //if a word, replace with corresponding digit
        match = digitMappings[match];

    // second value. apply reverse to reverse
    let revLine = [...line].reverse().join('');
    let revCombinedRgx = RegExp([...combinedRgx.source].reverse().join(''));

    let revMatch2 = revLine.match(revCombinedRgx)?.[0];
    let match2 = revMatch2?.split('').reverse().join('');

    // now same trick as before
    if (match2?.match(wordrgx)) //if a word, replace with corresponding digit
        match2 = digitMappings[match2];

    // make into value
    return Number("" + match + match2);
}

// Assemble parts
// --------------
let part1 = (input: string[]): number =>
    input.map(compLineValue)
         .reduce((a, b) => a + b);

let part2 = (input: string[]): number =>
    input.map(compLineValuePart2)
         .reduce((a, b) => a + b);


// print results
// -------------
let parsed = parse(input);
console.log(`Part1: ${part1(parsed)}`);
console.log(`Part2: ${part2(parsed)}`);
