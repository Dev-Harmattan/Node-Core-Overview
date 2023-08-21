import { Readable } from 'node:stream';
import fs from 'node:fs';

class FileReadStream extends Readable {
  constructor({ highWaterMark, filename }) {
    super({ highWaterMark });
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
    fs.open('source.txt', (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  _read(size) {
    const buffer = Buffer.alloc(size);
    fs.read(this.fd, buffer, 0, size, null, (err, byteRead) => {
      if (err) this.destroy(err);
      // null is to indicate the end of read.
      this.push(byteRead > 0 ? buffer.subarray(0, byteRead) : null);
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, (err) => {
        if (err) return callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}

const myStream = new FileReadStream({
  filename: 'source.txt',
});

myStream.on('data', (chunks) => {
  console.log(chunks.toString('utf-8'));
});
