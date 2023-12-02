# notes bij day1

## part1
trivial

## part2:
gotcha 1: (zie: 1e par2 commit). als je eerst alle 'one's replaced. en dan pas de 'two's, etc.
ga je in een vreemde volgorde. Een regex matcher voorkomt dat. immers stel je hebt een string die begint met
"twone..", wordt "tw1", dus je mist de 1e "two"

gotcha 2: stel de hele string is "twone" en je gaat replacen met regex.
krijg je eerst "2ne". als je dan geen matches meer hebt, ga je 1e digit zoeken = 2. en laatste = 2.
maar dat is uiteraart fout. vanaf rechts gezien, is de digit die je als eerste tegenkomt: one = 1.


Dus wat dan wel doen?
Weer een example string "twone". first digit = two = 2. last is one = 1.
we moeten stoppen met replacen. En simpelweg een 1e, en een laatste "vinden".

1e is triviaal: match op regex 1|2|3..|9|one|two|..|nine|
als dan de match van de uitgeschreven variant is. omzetten naar een cijfer.

laatste match vinden is lastiger.
eerdere matches, mogen namelijk niet karakters "consumeren" zoals bij regex matching gebruikelijk is.
qua performance zou een oplossing met negative lookahead goed werken, maar dan is het tedious om van de match
weer een heel woord te maken.

bijv /on(?=e)|tw(?=o)|etc/ dan slikt het vinden van 'two' alleen de 'tw' karakters in. waardoor 'one' nog als 'on' wordt gevonden.

alternatief. weldegelijk matchen op de woorden, maar dan simpelweg, hermatchen op de substring 1 karakter verder.
de laatste match, is dan de laatste 'digit' in de interpretatie van de puzzel.

uiteindelijke oplossing: reverse de matches EN de input string. pak 1e match. reverse terug.

# original instructions: --- Day 1: Trebuchet?! ---

Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

The first half of this puzzle is complete! It provides one gold star: *
## --- Part Two ---

Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?
