const { log } = require('console');
const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'text.txt')
const readStrem = fs.createReadStream(pathFile, 'utf-8');
let data = "";
readStrem.on('data', chank => data += chank);
readStrem.on('end', () => log(data));
readStrem.on('error', (error) => log('Error', error.message));
