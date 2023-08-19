import fs from 'node:fs/promises';

(async () => {
  try {
    const fileDescriptor = await fs.open('save.txt', 'w');
    const writeStream = fileDescriptor.createWriteStream();

    let i = 0;

    const writeToStream = () => {
      while (i < 1_000) {
        const buffer = Buffer.from(` ${i} `, 'utf-8');
        if (!writeStream.write(buffer)) {
          break;
        }
        if (i === 999999) writeStream.end(buffer);
        i++;
      }
    };
    writeToStream();

    writeStream.on('drain', () => {
      writeToStream();
    });

    writeStream.on('finish', () => {
      fileDescriptor.close();
    });
  } catch (error) {
    console.log(error);
    console.log('Error occoure.');
  }
})();
