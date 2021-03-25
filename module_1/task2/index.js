import path from 'path';
import csv from 'csvtojson';
import fs from 'fs/promises';

const csvFilePath = path.join(__dirname, 'csv/test.csv');
const csvToTxtFilePath = path.join(__dirname, 'cvsToTxt.txt');

const checkTxtFile = async () => {
  try {
    const csvFile = await fs.stat(csvToTxtFilePath);
    if (csvFile.isFile()) {
      await fs.unlink(csvToTxtFilePath);
      parseCsv();
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      parseCsv();
    } else {
      console.log(e);
    }
  }
};

const parseCsv = () => csv().fromFile(csvFilePath)
.on('data', async (data) => {
  const jsonStr = data.toString();
  try {
    await fs.appendFile(csvToTxtFilePath, jsonStr, 'utf8');
    console.log('txt file has been updated');
  } catch (e) {
    console.log(e);
  }
}).on('error', (err) => {
  console.log(err);
}).on('done', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('csv file has been parsed successfully');
});

checkTxtFile();
