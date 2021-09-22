const fs = require('fs');
const path = require('path');

const readFile = (filePath) => {
  try {
    const result = fs.readFileSync(filePath);
    return result;
  } catch (e) {
    console.log(`Get file failed at ${filePath}: `, e);
    return null;
  }
};

const mkDirByPathSync = (targetDir, opts) => {
  const isRelativeToScript = opts && opts.isRelativeToScript;
  const { sep } = path;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
};

module.exports = { readFile, mkDirByPathSync };
