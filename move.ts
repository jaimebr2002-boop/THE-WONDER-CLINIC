import * as fs from 'fs';

const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// The section
const sectionRegex = /\s*{\/\* SECCIÓN 12: SOBRE NOSOTROS \*\/\}[\s\S]*?<\/section>\s*/;

const match = content.match(sectionRegex);
if (!match) {
  console.error("Match not found");
  process.exit(1);
}

const sectionContent = match[0];
// Remove it
content = content.replace(sectionRegex, '\n\n');

// Insert it before SECCIÓN 4
content = content.replace(/\s*{\/\* SECCIÓN 4: QUÉ ES WONDER \*\/\}/, '\n' + sectionContent + '\n      {/* SECCIÓN 4: QUÉ ES WONDER */}');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Success");
