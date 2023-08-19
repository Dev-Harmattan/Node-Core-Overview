import fs from 'node:fs/promises';

(async () => {
  try {
    const readFileHandler = await fs.open('source.txt', 'r');
    const writeFileHandler = await fs.open('destination.txt', 'w');

    const readStream = readFileHandler.createReadStream({
      highWaterMark: 64 * 1024,
    });
    const writeStream = writeFileHandler.createWriteStream();
    let split;
    readStream.on('data', (chunk) => {
      // Convert the buffer to a string before splitting
      const dataStr = chunk.toString('utf8');

      // split the string by double space to array
      const numbers = dataStr.split('  ');

      if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
        if (split) {
          numbers[0] = numbers[0].trim() + split.trim();
        }
      }

      if (
        Number(numbers[numbers.length - 2]) + 1 !==
        Number(numbers[numbers.length - 1])
      ) {
        split = numbers.pop();
      }

      // Filter the numbers and write the even number to the stream
      numbers.forEach((num) => {
        if (Number(num) && Number(num) % 2 === 0) {
          if (!writeStream.write(' ' + Number(num) + ' ')) {
            readStream.pause();
          }
        }
      });
    });

    writeStream.on('drain', () => {
      readStream.resume();
    });

    readStream.on('end', () => {
      writeStream.end();
      readFileHandler.close();
    });
  } catch (error) {
    console.log(error);
  }
})();
