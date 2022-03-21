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

const collectDirStyles = async (dir) => {
  const dirInfo = await fsp.readdir(dir);
  const results = await Promise.all(
    dirInfo.map(async (fileName) => {
      const filePath = path.resolve(dir, fileName);
      const stat = await fsp.stat(filePath);
      if (stat.isDirectory()) {
        return await collectDirStyles(filePath);
      } else if (fileName.endsWith('.vue')) {
        const content = await fsp.readFile(filePath, { encoding: 'utf-8' });
        const matched = content.match(styleExtractor);
        if (matched) {
          return matched[1];
        }
      }
      return null;
    }),
  );
  return results.filter((item) => !!item).join('\n');
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
  await Promise.all(
    Object.keys(results).map(async (compName) => {
      if (!results[compName]) {
        return;
      }
      await fsp.writeFile(
        path.resolve(targetDir, `./${compName}.scss`),
        results[compName].trimStart(),
        { encoding: 'utf-8' },
      );
      await fsp.writeFile(
        path.resolve(targetDir, `./${compName}.css`),
        (
          await sass.compileStringAsync(results[compName])
        ).css,
        { encoding: 'utf-8' },
      );
    }),
  );
  console.log(chalk.green('Component styles has been collected and compiled to CSS.'));
  // compile scss
};

module.exports = getComponentStyles;
