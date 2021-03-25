import path from 'path';
import csv from 'csvtojson';
import fs from 'fs';

const csvFilePath = path.join(__dirname, 'csv/test.csv');
const csvToTxtFilePath = path.join(__dirname, 'cvsToTxt.txt');

const checkTxtFile = () => fs.stat(csvToTxtFilePath, (err, stats) => {
	if (err) {
		if (err.code === 'ENOENT') return parseCsv();
		return console.log(err);
	}
	if (stats.isFile()) {
		fs.unlink(csvToTxtFilePath, (err) => {
			if (err) return console.log(err);
			return parseCsv();
		});
	}
});


const parseCsv = () => csv().fromFile(csvFilePath)
.on('data', (data) => {
	const jsonStr = data.toString('utf8');
	fs.appendFile(csvToTxtFilePath, jsonStr, 'utf8', err => {
		if (err) return console.log(err);
		console.log('txt file has been updated');
	});
})
.on('error', (err) => {
	console.log(err);
})
.on('done', (err) => {
	if (err) return err;
	console.log('csv file has been parsed successfully');
});


checkTxtFile();
