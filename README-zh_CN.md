# AnyUI

<img src="https://github.com/any-design/anyui/blob/main/assets/logo.png?raw=true" width="240" align="center">

[English](README.md) | [中文](README-CN.md)

AnyUI是一款基于可爱理念设计的Vue3前端UI组件库，衍生于AnyMoe项目中。

警告：本项目因基于AnyMoe项目开发进度开发，所以仍然处于开发中，暂时并非完整前端UI库，重要项目工程请谨慎使用！！！

---

## How to use
## 快速开始

第一步：使用 npm 或 yarn 引入本项目 `@any-design/anyui` 依赖包

```bash
$ npm install @any-design/anyui --save
```

```bash
$ yarn add @any-design/anyui
```

第二步：将本库导入你的项目中使用。

示例：

```js
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// Don't forget to import the style file
import '@any-design/anyui/styles/default.scss';

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

### TypeScript

本项目基于TypeScript开发，提供了完整的`.d.ts`定义文件。

---
## Contributing
## AnyUI社区共建

<br/>

### AnyUI开发以及二次开发

你可以将本项目Fork至你的GitHub项目库中，然后下载到本地开发或使用GitHub Dev开发。也可直接将项目Git至本地开发，步骤如下：

```bash
$ git clone git@github.com:any-design/anyui.git
$ cd anyui
$ npm install
$ npm start
```

<br/>

### Pull Request

AnyDesign团队会关注每一条pull request提交，无论贡献大小，我们在空闲时期会及时的review以及合并你的贡献。我们随时欢迎你的PR提交。

<br/>

### 社区互助

如果你在使用或者开发中遇到了问题，你可以在以下途径寻求到我们的帮助，我们也鼓励社区成员之间进行互助。

> 在此之前，我们强烈推荐阅读[《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545)，以助于获取到更有效的帮助。

1. [GitHub Issues](https://github.com/any-design/anyui/issues)
2. Come soon


---

## License
## 开源许可协议

AnyUI项目基于[MIT](LICENSE)开源协议开源，使用本项目请遵守该开源协议使用。
