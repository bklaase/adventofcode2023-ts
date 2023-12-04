import * as fs from 'fs';

const day = 2;
// const input: string = fs.readFileSync(`input/day${day}/day${day}-example.txt`, 'utf-8');

const input: string = fs.readFileSync(`input/day${day}/day${day}.txt`, 'utf-8');

// parse
// -----

interface IGame { id: number, hands: IHand[] }
interface IHand { [color: string]: number }

const parse = (input: string): IGame[] => {
    const output = input.split('\n');
    output.pop();

    const parseInputLine = (line: string): IGame => {
        const gameRgx = /Game (?<id>\d+): (?<hands>.*)$/
        const lineMatch = line.match(gameRgx);
        const gameId = Number(lineMatch?.groups?.id);
        const game: IGame = { id: gameId, hands: [] };

        // parse the hands
        const hands = lineMatch!.groups!.hands!.split("; ")
        const parseHand = (handStr: string): IHand => {
            const handRgx = /(?<amount>\d+ )(?<color>red|green|blue)/g
            const hand: IHand = { red: 0, green: 0, blue: 0 };
            const handMatches = handStr.matchAll(handRgx);
            for (const handMatch of handMatches) {
                const color = handMatch!.groups!.color;
                const amount = handMatch!.groups!.amount;
                hand[color] = Number(amount);
            }
            return hand;
        }
        game.hands = hands.map(parseHand);
        return game;
    }
    return output.map(parseInputLine);

}

// solve
// -----

// trivial

// Assemble parts
// --------------
const part1 = (input: IGame[]): number =>
    input.filter(g => g.hands.every(h =>
        h.red <= 12 && h.green <= 13 && h.blue <= 14))
        .reduce((sum, g) => sum += g.id, 0);


const part2 = (input: IGame[]): number => {
    const minimums = input.map((g): IHand => {
        const minRed = g.hands.reduce((cur, h) => Math.max(cur, h.red), 0);
        const minGreen = g.hands.reduce((cur, h) => Math.max(cur, h.green), 0);
        const minBlue = g.hands.reduce((cur, h) => Math.max(cur, h.blue), 0);
        return { red: minRed, green: minGreen, blue: minBlue };
    });
    const powers = minimums.map(m => m.red * m.green * m.blue);

    return powers.reduce((sum, p) => sum + p, 0);
}


// print results
// -------------
const parsed = parse(input);
console.log(`Part1: ${part1(parsed)}`);
console.log(`Part2: ${part2(parsed)}`);
