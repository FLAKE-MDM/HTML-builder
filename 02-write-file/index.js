const fs = require('fs');
const path = require('path');

const {stdin} = process;
const pathFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathFile);

console.log('Привет! Введите текст который нужно добавить в файл.');

stdin.on('data', chunk => {
  if(chunk.toString().trim() === 'exit'){
    console.log('Досвидания!');
    process.exit();
  }
  output.write(chunk);
  console.log('Текст добавлен. Для выхода введите "exit" или нажмите "ctrl + c"')
})

process.on('SIGINT', () => {
  console.log('Досвидания!');
  process.exit();
})