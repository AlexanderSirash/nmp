import { Transform } from 'stream';

class Reverse extends Transform {
  _transform(chunk, enc, cb) {
    this.push([...chunk.toString()].reverse().join(''));
    cb();
  }
}

process.stdin.pipe(new Reverse()).pipe(process.stdout);
