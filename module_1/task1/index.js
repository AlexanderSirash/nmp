import {Transform} from 'stream'

class Reverse extends Transform {
	constructor() {
		super();
	}

	_transform(chunk, enc, cb) {
		this.push([...chunk.toString()].reverse().join(''));
		cb();
	}
}

process.stdin.pipe(new Reverse()).pipe(process.stdout)


