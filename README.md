# AnyUI

<div align="center">
<img src="https://github.com/any-design/anyui/blob/main/assets/logo.png?raw=true" width="240">

[English](README.md) | [中文](README-zh_CN.md)

</div>

<br>

This is a cute UI components library for Vue 3.

IMPORTANT: This project is still working in progress.

<br>

## How to use

Step 1: Install the `@any-design/anyui` package.

```bash
npm install @any-design/anyui
```

Step 2: Import the library into your project.

```js
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// Don't forget to import the style file
import '@any-design/anyui/styles/default.scss';

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

## License

MIT
