import path from 'path';
import fs from 'fs/promises';
import csv from 'csvtojson';

const csvFilePath = 'csv/test.csv';
const csvToTxtFilePath = 'cvsToTxt.txt';

const buildFilePath = filePath => path.join(__dirname, filePath);

const checkAndParseTxtFileToCsv = async (csvFilePath, csvToTxtFilePath) => {
  const fullCsvFilePath = buildFilePath(csvFilePath);
  const fullCsvToTxtFilePath = buildFilePath(csvToTxtFilePath);

  await unlinkFileIfExist(fullCsvToTxtFilePath, () => parseCsv(fullCsvFilePath, fullCsvToTxtFilePath));
  parseCsv(fullCsvFilePath, fullCsvToTxtFilePath);

};

const unlinkFileIfExist = async (filePath, cb) => {
  try {
    const csvToTxtFileStat = await fs.stat(filePath);
    if (!csvToTxtFileStat.isFile()) {
      return;
    }

    await fs.unlink(filePath);

  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.log(e);

      return;
    }
    if (cb) {
      cb();
    }
  }
};

const parseCsv = (csvFilePath, fullCsvToTxtFilePath) => csv().fromFile(csvFilePath)
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
.on('done', (e) => {
  if (e) {
    console.log(e);
  }
  console.log('csv file has been parsed successfully');
});

checkAndParseTxtFileToCsv(csvFilePath, csvToTxtFilePath);
