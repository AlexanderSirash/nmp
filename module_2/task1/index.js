import { Transform } from 'stream';

class CustomReverse extends Transform {
  _transform(chunk, enc, cb) {
    this.push([...chunk.toString()].reverse().join(''));
    cb();
  }
}

const reverseNodeInputString = () => {
  process.stdin.pipe(new CustomReverse()).pipe(process.stdout);
};

if (require.main === module) {
  reverseNodeInputString();
} else {
  module.exports = { CustomReverse, reverseNodeInputString };
}
