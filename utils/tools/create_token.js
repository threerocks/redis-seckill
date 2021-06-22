const fs = require('fs');
const { promises: fsPromises, constants }  = fs;


const file = 'tokens.txt';
const prefix = 'accesstoken_';
let str = '';
for (let i = 1; i <= 2000; i++) {
  str += prefix + i + '\r\n';
}

const run = async function() {
  try {
    await fsPromises.access(file, constants.F_OK);
    console.log('file exists');
    fsPromises.unlink(file);
  } catch {
    console.error('file does not exist');
  }
  fsPromises.writeFile(file, str);
  console.log('写入文件成功');
}

run();