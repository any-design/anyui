# AnyUI

<br>

<div align="center">
<img src="./assets/logo.png" width="240">

[English](README.md) | [中文](README-zh_CN.md)

This is a cute UI components library for Vue 3.

IMPORTANT: This project is still working in progress.

</div>

<br>

## How to use

Step 1: Install the `@any-design/anyui` package.

```bash
# Suggested to use npm@8
npm install @any-design/anyui
```

<br>

```bash
$ yarn add @any-design/anyui
```

Step 2: Import the library into your project.

<br>

This is a minimal example:

```js
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// Don't forget to import the style file
import '@any-design/anyui/styles/default.scss';

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

<br>

### TypeScript Support

<br>

This project is written in TypeScript,provides a built-in Typescript definition file.

<br>

## Contributing

<br>

### Code development

<br>

You can fork this project to your GitHub project repository,and clone the repository to your local machine.Of coures,you can also  use GitHub Dev.

Git clone instructions:

```bash
$ git clone https://github.com/any-design/anyui.git
$ cd anyui
$ npm install
$ npm run dev
```

<br>

### Pull requests

<br>

AnyDesign team members use our spare time to develop this project,we will review any contribution,and merge it into the main branch.

We have set up a CI pipeline line to ensure your codes are followed our code standard, you must pass the check to merge your code into the main branch.

We welcome pull requests from anyone.

<br>

### Need help?

<br>

if you have any questions,please contact us.We also encourage the community members to help each other.

> Before you start contributing,please read the [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html)，to make sure you can get the best answer.

1. [GitHub Issues](https://github.com/any-design/anyui/issues)
2. Coming soon...

<br>

## Testground

We've deployed a testground, where you can explore all of our UI components.

[https://anyui-testground.pwp.app](https://anyui-testground.pwp.app)

## License

AnyUI Project is based on [MIT LICENSE](LICENSE) open source,please follow the MIT LICENSE to use this project.
