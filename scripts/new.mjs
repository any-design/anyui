import ejs from 'ejs';
import inquirer from 'inquirer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.resolve(__dirname, './templates');
const packagesTarget = path.resolve(__dirname, '../packages/vue/src/packages');
const testgroundPath = path.resolve(__dirname, '../packages/vue/src/testground/sections');
const vueIndexPath = path.resolve(__dirname, '../packages/vue/src/index.ts');
const frameworkGeneratorPath = path.resolve(__dirname, './generate-framework-packages.mjs');

const collectTemplates = () => {
  const templates = {};
  const templatesDir = fs.readdirSync(templateDir);
  templatesDir.forEach((template) => {
    const targetPath = path.resolve(templateDir, template);
    const templateName = template.split('.')[0];
    templates[templateName] = fs.readFileSync(targetPath, 'utf8');
  });
  return templates;
};

const templates = collectTemplates();

const prompt = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Please input the new component name: ',
    },
  ]);

const renderTemplates = (componentName) => {
  const rendered = {};
  Object.keys(templates).forEach((templateName) => {
    rendered[templateName] = ejs.render(templates[templateName], {
      componentName,
    });
  });
  return rendered;
};

const assertValidComponentName = (componentName) => {
  if (!/^A[A-Z][A-Za-z0-9]*$/.test(componentName)) {
    throw new Error('Component name must start with A and use PascalCase, for example AButton.');
  }
};

const writeNewFile = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    throw new Error(`Refusing to overwrite existing file: ${filePath}`);
  }
  fs.writeFileSync(filePath, content, { encoding: 'utf-8' });
};

const insertUniqueBefore = (content, marker, insertion) => {
  if (content.includes(insertion.trim())) {
    return content;
  }
  return content.replace(marker, `${insertion}${marker}`);
};

const insertUniqueAfter = (content, marker, insertion) => {
  if (content.includes(insertion.trim())) {
    return content;
  }
  return content.replace(marker, `${marker}${insertion}`);
};

const updateVueIndex = ({ componentName, exportName, packageFolderName }) => {
  let content = fs.readFileSync(vueIndexPath, 'utf8');
  content = insertUniqueBefore(
    content,
    'import Layout, { Header, Content, Footer, Side } from \'./packages/layout\';',
    `import ${exportName} from './packages/${packageFolderName}';\n`,
  );
  content = insertUniqueAfter(content, 'const defaultComponentList = [\n', `  ${exportName},\n`);
  content = insertUniqueAfter(content, 'export {\n', `  ${exportName},\n  ${exportName} as ${componentName},\n`);
  fs.writeFileSync(vueIndexPath, content, { encoding: 'utf-8' });
};

const updateFrameworkGenerator = ({ exportName }) => {
  let content = fs.readFileSync(frameworkGeneratorPath, 'utf8');
  const manifestEntry = `  '${exportName}',\n`;
  content = insertUniqueBefore(content, '];\n\nconst kebab', manifestEntry);

  const reactComponent = `
export const ${exportName} = forwardRef<HTMLDivElement, AnyUIReactProps>(function ${exportName}(_props, _ref) {
  throw new Error('[AnyUI][React] ${exportName} has not been implemented yet. Port it from the Vue source before releasing.');
});

`;
  content = insertUniqueBefore(content, 'export const buildInstaller = (componentList: React.ComponentType<any>[]) => componentList;\n', reactComponent);
  fs.writeFileSync(frameworkGeneratorPath, content, { encoding: 'utf-8' });
};

const createComponent = async () => {
  const { componentName } = await prompt();
  if (!componentName) {
    throw new Error('Component name is required.');
  }
  assertValidComponentName(componentName);
  const rendered = renderTemplates(componentName);
  const exportName = componentName.slice(1);
  let packageFolderName = exportName;
  packageFolderName = packageFolderName[0].toLowerCase() + packageFolderName.slice(1);
  const packageFolderPath = path.resolve(packagesTarget, `./${packageFolderName}`);
  if (!fs.existsSync(packageFolderPath)) {
    fs.mkdirSync(packageFolderPath, { recursive: true });
  }
  writeNewFile(path.resolve(packageFolderPath, `./${componentName}.vue`), rendered.component);
  writeNewFile(path.resolve(packageFolderPath, './index.ts'), rendered.index);
  writeNewFile(path.resolve(testgroundPath, `./${packageFolderName}.vue`), rendered.testground);
  updateVueIndex({ componentName, exportName, packageFolderName });
  updateFrameworkGenerator({ exportName });
  console.log(`Created ${componentName}. Run pnpm run generate after porting the React/Svelte implementation if needed.`);
};

await createComponent();
