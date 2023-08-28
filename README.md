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

<br>

Step 1: Install the `@any-design/anyui` package.

```bash
# Suggested to use npm@8
$ npm install @any-design/anyui
```

<br>

```bash
$ yarn add @any-design/anyui
```

<br>

Step 2: Import the library into your project.

<br>

This is a minimal example:

```js
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// DON'T forget to import the style file
import '@any-design/anyui/styles/index.css'; // or '@any-design/anyui/styles/index.scss'

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

<br>

### Import on demand

<br>

We've added support for `unplugin-vue-components`, it's easily to enable "Importing on demand" on your project.

To enable this feature, you need to do the following steps:

<br>

Step 1: Install `unplugin-vue-components` and `unplugin-auto-import`.

```bash
npm i unplugin-vue-components unplugin-auto-import -D
```

<br>

Step 2: Import the resolver to your project configuration.

```ts
import { AnyUIResolver } from '@any-design/anyui/lib/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AnyUIResolver()],
    }),
    Components({
      resolvers: [AnyUIResolver()],
    }),
  ],
});
```

<br>

Step 3: Directly using components in the template:

```vue
<template>
  <div class="container">
    <a-button type="primary">Button</a-button>
  </div>
</template>
```

The related component and styles will be imported automatically.

<br>

Step 4 (Optional): Import styles on demand:

In the main file you imported `@any-design/anyui`, replace `@any-design/anyui/style/index.css` to `@any-design/anyui/style/theme.css`.

```ts
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// Modify the following line:
import '@any-design/anyui/styles/theme.css'; // or '@any-design/anyui/styles/theme.scss'

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

### Custom Theme

See [Theme Customization](./docs/theme/customization.md) for more details.

### TypeScript Support

<br>

This project is written in TypeScript, providing a built-in Typescript definition file.

<br>

## Contributing

<br>

### Code development

<br>

You can fork this project to your GitHub project repository, and clone the repository to your local machine. Of coures, you can also use GitHub Dev.

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

AnyDesign team members use our spare time to develop this project, we will review any contribution, and merge it into the main branch.

We have set up a CI pipeline to ensure that your code meets our prefer code standards, you have to pass the tests to merge your code into the main branch.

Welcome pull requests from anyone.

<br>

### Need help?

<br>

If you have any questions, please contact us. We also encourage the community members to help each other.

> Before you start contributing, please read the [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html), to make sure you can get the best answer.

1. [GitHub Issues](https://github.com/any-design/anyui/issues)
2. Coming soon...

<br>

## Documentation

You can find all the documents under the `docs` folder.

All the documents was generated by `gpt-3.5-turbo-16k`.

<br>

> **⚠ We do not guarentee the accuracy of the documents as this time, they're for reference only. We will We will gradually verify and modify the documents in the future.**

<br>

## Testground

We've deployed a testground, where you can explore all of our UI components.

[https://anyui-testground.pwp.app](https://anyui-testground.pwp.app)

## License

[MIT](LICENSE)
