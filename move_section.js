import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\s*{\/\* SECCIÓN 12: SOBRE NOSOTROS \*\/\}[\s\S]*?<\/section>\s*/;
const match = content.match(regex);
if (match) {
  content = content.replace(regex, '\n\n');
  const replaceStr = '\n\n' + match[0] + '\n      {/* SECCIÓN 4: QUÉ ES WONDER */}';
  content = content.replace(/\s*{\/\* SECCIÓN 4: QUÉ ES WONDER \*\/\}/, replaceStr);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Success");
} else {
  console.log("Not found");
}
