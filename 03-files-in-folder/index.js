const path = require("path");
const fs = require('fs');

const pathDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathDir, { withFileTypes: true }, (error, files) => {
    if (error) {
    console.log("Error:", error.message);
    return;
  }

    files.forEach(file => {
      if(file.isFile()){
        const filePath = path.join(pathDir, file.name);

        fs.stat(filePath, (error, stats) => {
          if(error) console.log("Error: ", error.message);

          let size = (Math.floor(stats.size / 1024 * 100 ) / 100).toFixed(2) + " кб"
          console.log(`Имя файла: ${file.name.split(".")[0]}; Расширение файла: ${path.extname(file.name).slice(1)}; Вес файла: ${size}`);
        });
      }
    });

});

