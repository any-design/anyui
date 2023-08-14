const chalk = require('chalk');
const path = require('path');
const fsp = require('fs/promises');
const fs = require('fs-extra');
const sass = require('sass');
const getComponentStyles = require('./modules/componentStyles');

const projectDistDir = path.resolve(process.cwd(), './lib/');
const cssFilePath = path.resolve(projectDistDir, './style.css');
const scssFilesPath = path.resolve(process.cwd(), './src/styles');
const faviconFile = path.resolve(projectDistDir, './favicon.png');
const stylesPath = path.resolve(process.cwd(), './styles');

console.log(chalk.cyan('AnyUI after building script is starting...'));

if (fs.existsSync(cssFilePath)) {
  fs.moveSync(cssFilePath, path.resolve(stylesPath, './components.scss'));
  fs.copySync(
    path.resolve(stylesPath, './components.scss'),
    path.resolve(stylesPath, './components.css'),
  );
  console.log(chalk.green('Useless style files generated by vite has been removed.'));
}

if (fs.existsSync(faviconFile)) {
  fs.rmSync(faviconFile);
  console.log(chalk.green('Useless icon files generated by vite has been removed.'));
}

fs.copySync(path.resolve(scssFilesPath), stylesPath);
console.log(chalk.green('Styles has been copied to the lib folder.'));

// modify the index.scss
const indexScssPath = path.resolve(stylesPath, './index.scss');
if (fs.existsSync(indexScssPath)) {
  const indexScssContent = fs.readFileSync(indexScssPath, { encoding: 'utf-8' });
  fs.writeFileSync(
    indexScssPath,
    indexScssContent.replace('// components inject', "@import './components.scss';"),
    {
      encoding: 'utf-8',
    },
  );
  console.log(chalk.green('Main style file has been injected.'));
}

const compileToCss = async (filePaths) => {
  await Promise.all(
    filePaths.map(async (file) => {
      if (!fs.existsSync(file)) {
        return;
      }
      const target = file.replace('.scss', '.css');
      await fsp.writeFile(target, (await sass.compileAsync(file)).css, { encoding: 'utf-8' });
    }),
  );
  console.log(chalk.green('Basic style files has been compiled.'));
};

const collectDirScss = (dirName) => {
  const actualDirPath = path.resolve(stylesPath, dirName);
  if (!fs.existsSync(actualDirPath) || !fs.statSync(actualDirPath).isDirectory()) {
    return [];
  }
  const dirInfo = fs.readdirSync(actualDirPath);
  return dirInfo
    .filter((file) => file.endsWith('.scss'))
    .map((fileName) => `./${dirName}/${fileName}`);
};

// compile scss to css
compileToCss(
  ['./index.scss', './responsive.scss']
    .concat(
      // compile scss in sub folders
      ['basic', 'responsive'].reduce((res, dirName) => {
        return res.concat(collectDirScss(dirName));
      }, []),
    )
    .map((p) => path.resolve(stylesPath, p)),
);

// compile components scss files
getComponentStyles();
