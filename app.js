const Fs = require('fs') 
const axios = require('axios')
require('dotenv').config()

const {getPosition, replaceAll, downloadFile, stringIsAValidUrl, deleteFolder } = require('./helpers')

const outputExtension=process.env.OUTPUT_EXTENSION || "woff2";
const outputPath=process.env.OUTPUT_PATH || "./output/";


deleteFolder(outputPath);

let input = process.env.INPUT || Fs.readFileSync("input.txt").toString();
let outputStyle = input;
if(stringIsAValidUrl(input)){
    var config = {
        method: 'get',
        url: decodeURIComponent(input),
        headers: { 
            //required to also receive comments in response
            'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
        }
      };
      axios(config)
      .then((res) => {
        input=res.data;
        outputStyle = res.data;
        sequentialDownload(input);
      })
      .catch(function (error) {
        console.log(error);
      });
}

function sequentialDownload(input){
    const variation = input.substring(input.indexOf("/*")+2,input.indexOf('*/')).trim();
    const fontName = replaceAll(input.substring(input.indexOf('font-family')+'font-family'.length+2, getPosition(input,';',1)),"'","");
    const fontStyle = input.substring(input.indexOf('font-style')+'font-style'.length+2, getPosition(input,';',2));
    const fontWeight = input.substring(input.indexOf('font-weight')+'font-weight'.length+2, getPosition(input,';',3));
    const urlTag = input.substring(input.indexOf('src: ')+'src: '.length,input.indexOf(' format(\'woff2\');'));
    
    const link = urlTag.substring(urlTag.indexOf('url(')+'url('.length,urlTag.indexOf(')'));

    const fileName=replaceAll(`${fontName}-${fontWeight}-${fontStyle}-${variation}.${outputExtension}`," ","_");

    const target = outputPath + '/fonts/' + `${fileName}`;

    if (!Fs.existsSync(outputPath)){
        Fs.mkdirSync(outputPath);
    }
    if (!Fs.existsSync(outputPath + '/fonts/')){
        Fs.mkdirSync(outputPath + '/fonts/');
    }

    console.log(`Downloading ${link}`);
    downloadFile(link,target).then(()=>{
        if((input.match(/}/g) || []).length==1) {
            outputStyle=outputStyle.replace(link,`<PATH_TO_FOLDER>/${fileName}`)
            console.log("Download completed");
            console.log("Computing styles...")
            Fs.writeFileSync(outputPath+'fonts.css',outputStyle);
            console.log("Styling generated")
            return;
        }
        outputStyle=outputStyle.replace(link,`<PATH_TO_FOLDER>/${fileName}`)
        sequentialDownload(input.substring(input.indexOf("}")+1,input.length))
    });
}

if(!stringIsAValidUrl(input)) sequentialDownload(input);
