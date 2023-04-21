const Fs = require('fs')  
const Https = require('https')
const URL = require("url").URL;
const path = require("path");

const stringIsAValidUrl = (s) => {
  try {
    new URL(s);
    return true;
  } catch (err) {
    return false;
  }
};

function deleteFolder(directory){
  Fs.rmSync(directory, { recursive: true, force: true });
}

async function downloadFile (url, targetFile) {  
    return await new Promise((resolve, reject) => {
      Https.get(url, response => {
        const code = response.statusCode || 0
  
        if (code >= 400) {
          return reject(new Error(response.statusMessage))
        }
  
        // handle redirects
        if (code > 300 && code < 400 && !!response.headers.location) {
          return downloadFile(response.headers.location, targetFile)
        }
  
        // save the file to disk
        const fileWriter = Fs
          .createWriteStream(targetFile)
          .on('finish', () => {
            resolve({})
          })
  
        response.pipe(fileWriter)
      }).on('error', error => {
        reject(error)
      })
    })
  }

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

function replaceAll(str, find, replace) {
return str.replace(new RegExp(find, 'g'), replace);
}

module.exports.downloadFile = downloadFile;
module.exports.getPosition = getPosition;
module.exports.replaceAll = replaceAll;
module.exports.stringIsAValidUrl = stringIsAValidUrl;
module.exports.deleteFolder = deleteFolder;