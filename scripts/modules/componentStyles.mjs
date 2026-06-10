import chalk from 'chalk';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const vueSrcDir = path.resolve(rootDir, './packages/vue/src');

const styleExtractor = /<style lang=.+>([\s\S]+)<\/style>/;

const componentsDir = path.resolve(vueSrcDir, './packages');
const targetDir = path.resolve(rootDir, './styles/components');

const globalVars = fs.readFileSync(path.resolve(vueSrcDir, './styles/global/vars.scss'), {
  encoding: 'utf-8',
});

const appendGlobalVars = (styleContent, appendRealContent) =>
  `
${appendRealContent ? globalVars : "@use '../global/vars.scss' as *;"}

${styleContent}
`.trim();

const collectDirStyles = async (dir) => {
  const dirInfo = await fsp.readdir(dir);
  const results = await Promise.all(
    dirInfo.map(async (fileName) => {
      const filePath = path.resolve(dir, fileName);
      const stat = await fsp.stat(filePath);
      if (stat.isDirectory()) {
        return collectDirStyles(filePath);
      }
      if (fileName.endsWith('.vue')) {
        const content = await fsp.readFile(filePath, { encoding: 'utf-8' });
        const matched = content.match(styleExtractor);
        if (matched?.length >= 2) {
          return {
            name: fileName.replace('.vue', ''),
            content: matched[1],
          };
        }
        console.warn(chalk.yellow('No style code found in ' + fileName));
      }
      return null;
    }),
  );
  return results
    .reduce((res, curr) => (Array.isArray(curr) ? [...res, ...curr] : [...res, curr]), [])
    .filter((item) => !!item);
};

const componentStyleFileName = (componentName) => {
  if (!componentName.startsWith('A') || !componentName[1]) {
    return componentName[0].toLowerCase() + componentName.slice(1);
  }
  return componentName[1].toLowerCase() + componentName.slice(2);
};

export const getComponentStyles = async () => {
  const results = {};
  const compDirInfo = await fsp.readdir(componentsDir);
  await Promise.all(
    compDirInfo.map(async (compName) => {
      const dirPath = path.resolve(componentsDir, compName);
      const stat = await fsp.stat(dirPath);
      if (stat.isDirectory()) {
        results[compName] = await collectDirStyles(dirPath);
      }
    }),
  );

  await fsp.rm(targetDir, { recursive: true, force: true });
  await fsp.mkdir(targetDir, { recursive: true });

  await Promise.all(
    Object.keys(results).map(async (compName) => {
      if (!results[compName]) {
        return;
      }
      return Promise.all(
        results[compName].map(async (styleItem) => {
          const { name, content } = styleItem;
          const formattedName = componentStyleFileName(name);
          const scssPath = path.resolve(targetDir, `./${formattedName}.scss`);
          const cssFilePath = path.resolve(targetDir, `./${formattedName}.css`);

          await fsp.writeFile(scssPath, appendGlobalVars(content.trimStart(), false), {
            encoding: 'utf-8',
          });
          await fsp.writeFile(
            cssFilePath,
            (await sass.compileStringAsync(appendGlobalVars(content, true))).css,
            { encoding: 'utf-8' },
          );
        }),
      );
    }),
  );

  console.log(chalk.green('Component styles have been collected and compiled to CSS.'));
};
