const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');

const inputPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist', 'bundle.css');


fs.readdir(inputPath, { withFileTypes: true },  (error, files) => {
  if(error){
    console.log("Error:", error.message);
    return;
  }

  fs.unlink(outputPath, error => {
    if (error) {}
  })

  files.forEach(file => {
    if(file.isFile() && path.extname(file.name) === ".css"){
      const input = fs.createReadStream(path.join(inputPath, file.name), 'utf-8');
      const output = fs.createWriteStream(outputPath, { flags: 'a' });

      const transformStream = new Transform({
        transform(chunk, encoding, callback) {
          this.push(chunk);
          callback();
        }
      });

      input.pipe(transformStream).pipe(output);

      input.on('error', (error) => {
        console.log("Error:", error.message);
      });

    }
  });
})



