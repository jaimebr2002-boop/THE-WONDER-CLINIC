import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
const replacement = fs.readFileSync('temp.tsx', 'utf8');

const regexToReplace = /\{\/\* SECCIÓN 12: SOBRE NOSOTROS \*\/\}[\s\S]*?<\/section>/;
content = content.replace(regexToReplace, replacement);

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log("Sections fixed.");
