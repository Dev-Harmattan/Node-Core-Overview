import fs from 'node:fs/promises';
import { pipeline } from 'node:stream';
import Zlib from 'node:zlib';

// (async () => {
//   try {
//     const fileSourceHandler = await fs.open('text-source.txt', 'r');
//     const fileDestinationHandler = await fs.open('text-copy.txt', 'w');

//     let readBytes = -1;

//     while (readBytes !== 0) {
//       const readResult = await fileSourceHandler.read();
//       readBytes = readResult.bytesRead;

//       if (readBytes !== 16384) {
//         const indexNotFilled = readResult.buffer.indexOf(0);
//         const newBuffer = Buffer.alloc(indexNotFilled);
//         readResult.buffer.copy(newBuffer, 0, 0, indexNotFilled);
//         fileDestinationHandler.write(newBuffer);
//       } else {
//         fileDestinationHandler.write(readResult.buffer);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();

// It's advisable to use pipeline instead of pile in production because its generators forwarding errors and properly cleaning up and provide a callback when the pipeline is complete.

(async () => {
  // try {
  //   const srcFile = await fs.open('text-source.txt', 'r');
  //   const destFile = await fs.open('text-copy.txt.gz', 'w');

  //   const zl = Zlib.createGzip();
  //   const readStream = srcFile.createReadStream();
  //   const writeStream = destFile.createWriteStream();

  //   readStream.pipe(zl).pipe(writeStream);

  //   readStream.on('end', () => {
  //     console.log('READ END');
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  const srcFile = await fs.open('text-source.txt', 'r');
  const destFile = await fs.open('text-copy.txt', 'w');
  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();
  pipeline(readStream, writeStream, (err) => {
    if (err) {
      console.log(err);
    }
  });
})();
