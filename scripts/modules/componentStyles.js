const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const fsp = require('fs/promises');
const sass = require('sass');

const styleExtractor = /<style lang=.+>([\s\S]+)<\/style>/;

const componentsDir = path.resolve(__dirname, '../../src/packages');
const targetDir = path.resolve(__dirname, '../../styles/components');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const globalVars = fs.readFileSync(path.resolve(__dirname, '../../src/styles/global/vars.scss'), {
  encoding: 'utf-8',
});

const appendGlobalVars = (styleContent, appendRealContent) =>
  `
${appendRealContent ? globalVars : "@import '../global/vars.scss';"}

${styleContent}
`.trim();

const collectDirStyles = async (dir) => {
  // read package dir
  const dirInfo = await fsp.readdir(dir);
  // collect all vue components
  const results = await Promise.all(
    dirInfo.map(async (fileName) => {
      const filePath = path.resolve(dir, fileName);
      const stat = await fsp.stat(filePath);
      if (stat.isDirectory()) {
        // deeply collect, might be an array
        return await collectDirStyles(filePath);
      } else if (fileName.endsWith('.vue')) {
        // extract scss style code
        const content = await fsp.readFile(filePath, { encoding: 'utf-8' });
        const matched = content.match(styleExtractor);
        if (matched.length >= 2) {
          return {
            name: fileName.replace('.vue', ''),
            content: matched[1],
          };
        } else {
          console.warn(chalk.yellow('No style code found in ' + fileName));
        }
      }
      return null;
    }),
  );
  return results
    .reduce((res, curr) => (Array.isArray(curr) ? [...res, ...curr] : [...res, curr]), [])
    .filter((item) => !!item);
};

const getComponentStyles = async () => {
  const results = {};
  const compDirInfo = await fsp.readdir(componentsDir);
  await Promise.all(
    compDirInfo.map(async (compName) => {
      const dirPath = path.resolve(componentsDir, compName);
      results[compName] = await collectDirStyles(dirPath);
    }),
  );
  // remove previous build
  if (fs.existsSync(targetDir)) {
    await fsp.rm(targetDir, { recursive: true, force: true });
    await fsp.mkdir(targetDir, { recursive: true });
  }
  // compile scss
  await Promise.all(
    Object.keys(results).map(async (compName) => {
      if (!results[compName]) {
        return;
      }
      // results array can contain mulitple file content, should compile them all.
      return await Promise.all(
        results[compName].map(async (styleItem) => {
          const { name, content } = styleItem;
          const formattedName = name[1].toLowerCase() + name.slice(2);

          const scssPath = path.resolve(targetDir, `./${formattedName}.scss`);
          if (fs.existsSync(scssPath)) {
            console.error(chalk.red('Component style file already exists:', scssPath));
          }

          const cssFilePath = path.resolve(targetDir, `./${formattedName}.css`);
          if (fs.existsSync(cssFilePath)) {
            console.error(chalk.red('Component style file already exists:', scssPath));
          }

          await fsp.writeFile(scssPath, appendGlobalVars(content.trimStart(), false), {
            encoding: 'utf-8',
          });
          await fsp.writeFile(
            cssFilePath,
            (
              await sass.compileStringAsync(appendGlobalVars(content, true))
            ).css,
            { encoding: 'utf-8' },
          );
        }),
      );
    }),
  );

  console.log(chalk.green('Component styles has been collected and compiled to CSS.'));
};

module.exports = getComponentStyles;
