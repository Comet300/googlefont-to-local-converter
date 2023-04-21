**How to download google fonts locally:**
---------------------------------------------------

1. Enter in input.txt the google the contents of the font url having the following format:
```
    /* cyrillic-ext */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 100;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrEz0dL-vwnYh2eg.woff2) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 100;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrEzQdL-vwnYh2eg.woff2) format('woff2');
      unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
```

Aleternatively we can use the **INPUT** param to specify the URL directly, without needing to create the input.txt file.

2. run 'npm start'

Useful details:
- output folder is cleared at the beggining of every execution of app.js
- fonts.scss needs to have replaced '<PATH_TO_FOLDER>' with the actual relative path to the font files.

Params:
  - OUTPUT_EXTENSION: define the extension the fonts have. This needs to match the actual file extension, or a compatible format. 
  **Default: "woff2".**
  - OUTPUT_PATH: define the output location of the fonts and the css file. **Default: "./output/".**
  - INPUT: the URL of the remote font.

Example: OUTPUT_EXTENSION='woff2' OUTPUT_PATH='./output/' INPUT='https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700&family=Ubuntu:ital,wght@0,400;0,700;1,300&display=swap;' npm start