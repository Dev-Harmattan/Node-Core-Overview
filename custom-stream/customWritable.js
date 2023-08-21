import { Writable } from 'node:stream';
import fs from 'node:fs';

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writeCounts = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, 'w', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunks, encoding, callback) {
    this.chunks.push(chunks);
    this.chunksSize += chunks.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        } else {
          this.chunks = [];
          this.chunksSize = 0;
          ++this.writeCounts;
          callback();
        }
      });
    } else {
      callback();
    }
  }

  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      callback();
    });
  }

  _destroy(error, callback) {
    console.log('Number of write: ', this.writeCounts);

    if (this.fd) {
      fs.close(this.fd, (err) => {
        if (err) {
          callback(err || error);
        }
      });
    } else {
      callback(error);
    }
  }
}

const myStream = new FileWriteStream({
  highWaterMark: 1800,
  fileName: 'test.txt',
});
myStream.write(Buffer.from('My first write'));
myStream.end(Buffer.from('Final test'));
