const path = require('path');
const fs =  require('fs');
const { copyFile, constants } =  require('fs').promises;

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

async function copyFolder(){
  const createDir = await fs.promises.mkdir(destFolder, { recursive: true }, error => {
    if(error){
      console.log("Error:", error.message)
    }
  });

  fs.readdir(destFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    files.forEach(file => {
      if(file.isFile()){
        fs.unlink(path.join(destFolder, file.name), error => {
          if (error) {
            console.error("Error:", error.message);
          }
        })
      }
    });
  });

  fs.readdir(srcFolder, { withFileTypes: true }, (error, files) => {
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    files.forEach(file => {
      if(file.isFile()){
        copyItem(file.name)
      }
    });
  });
}

async function copyItem(fileName){
  try {
    await copyFile(path.join(srcFolder, fileName), path.join(destFolder, fileName));
  } catch (err) {
    console.error(err.message);
  }
}

copyFolder();