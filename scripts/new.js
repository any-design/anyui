const inquirer = require('inquirer');
const ejs = require('ejs');
const path = require('node:path');
const fs = require('node:fs');

const TEMPLATE_DIR = path.resolve(__dirname, './templates');
const PACKAGES_TARGET = path.resolve(__dirname, '../src/packages/');
const TESTGROUND_PATH = path.resolve(__dirname, '../src/testground/sections');

const collectTemplates = () => {
  const templates = {};
  const templatesDir = fs.readdirSync(TEMPLATE_DIR);
  templatesDir.forEach((template) => {
    const targetPath = path.resolve(TEMPLATE_DIR, template);
    const templateName = template.split('.')[0];
    templates[templateName] = fs.readFileSync(targetPath, 'utf8');
  });
  return templates;
};

const TEMPLATES = collectTemplates();

const prompt = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Please input the new componet name: ',
    },
  ]);

const renderTemplates = (componentName) => {
  const rendered = {};
  Object.keys(TEMPLATES).forEach((templateName) => {
    rendered[templateName] = ejs.render(TEMPLATES[templateName], {
      componentName,
    });
  });
  return rendered;
};

const createComponent = async () => {
  const { componentName } = await prompt();
  if (!componentName) {
    throw new Error('Component name is required.');
  }
  const rendered = renderTemplates(componentName);
  // create package folder
  let packageFolderName = componentName.slice(1);
  packageFolderName = packageFolderName[0].toLowerCase() + packageFolderName.slice(1);
  const packageFolderPath = path.resolve(PACKAGES_TARGET, `./${packageFolderName}`);
  if (!fs.existsSync(packageFolderPath)) {
    fs.mkdirSync(packageFolderPath, { recursive: true });
  }
  // create files
  const componentFilePath = path.resolve(packageFolderPath, `./${componentName}.vue`);
  const scriptFilePath = path.resolve(packageFolderPath, `./index.ts`);
  fs.writeFileSync(componentFilePath, rendered.component, { encoding: 'utf-8' });
  fs.writeFileSync(scriptFilePath, rendered.index, { encoding: 'utf-8' });
  // create testground files
  const testgroundPath = path.resolve(TESTGROUND_PATH, `./${packageFolderName}.vue`);
  fs.writeFileSync(testgroundPath, rendered.testground, { encoding: 'utf-8' });
};

createComponent();
