import path from 'path';
import csv from 'csvtojson';
import fs from 'fs/promises';

const buildFilePath = filePath => path.join(__dirname, filePath);

const csvFilePath = 'csv/test.csv';
const csvToTxtFilePath = 'cvsToTxt.txt';

const fullCsvFilePath = buildFilePath(csvFilePath);
const fullCsvToTxtFilePath = buildFilePath(csvToTxtFilePath);

const checkTxtFile = async () => {
  try {
    const csvFile = await fs.stat(fullCsvToTxtFilePath);
    if (csvFile.isFile()) {
      await fs.unlink(fullCsvToTxtFilePath);
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

const parseCsv = () => csv().fromFile(fullCsvFilePath)
.on('data', async (data) => {
  const jsonStr = data.toString();
  try {
    await fs.appendFile(fullCsvToTxtFilePath, jsonStr, 'utf8');
    console.log('txt file has been updated');
  } catch (e) {
    console.log(e);
  }
})
.on('error', (err) => {
  console.log(err);
})
.on('done', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('csv file has been parsed successfully');
});

checkTxtFile();
