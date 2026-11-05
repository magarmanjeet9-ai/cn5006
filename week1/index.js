const readline = require('node:readline');
const { stdin, stdout } = require('node:process');

async function main() {
  const prompt = readline.createInterface({ input: stdin, output: stdout });

  try {
    console.log('Starting');
    const answers = [];
    stdout.write('Enter your name: ');

    for await (const answer of prompt) {
      answers.push(answer);
      if (answers.length === 1) {
        console.log(`Hello, ${answer}`);
        stdout.write('Enter a number: ');
      }
      if (answers.length === 2) {
        break;
      }
    }

    if (answers.length < 2) {
      console.error('Please provide both a name and a number.');
      process.exitCode = 1;
      return;
    }

    const numberInput = answers[1];
    const number = Number(numberInput.trim());

    if (numberInput.trim() === '' || !Number.isFinite(number)) {
      console.error('Please enter a valid number.');
      process.exitCode = 1;
    } else if (number > 0) {
      console.log('The number is positive');
    } else if (number === 0) {
      console.log('The number is zero');
    } else {
      console.log('The number is negative');
    }
  } finally {
    prompt.close();
  }
}

main();