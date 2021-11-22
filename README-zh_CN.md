# AnyUI

<img src="https://github.com/any-design/anyui/blob/main/assets/logo.png?raw=true" width="240" align="center">

[English](README.md) | [中文](README-zh_CN.md)

AnyUI 是一款拥有萌系设计风格的 Vue3 前端 UI 组件库，衍生于 AnyMoeNFT 项目，主要面向 C 端。

警告：本项目仍然处于快速迭代阶段，我们不完全保证稳定性，请勿用于重要项目！！

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

以下是一个最小化示例：

```js
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// 引入默认主题，如果您需要自定义主题，请参考文档做样式引入
import '@any-design/anyui/styles/default.scss';

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

### TypeScript 支持

本项目基于 TypeScript 开发，提供了完整的`.d.ts`定义文件。

---
## Contributing
## AnyUI社区共建

<br/>

### AnyUI开发以及二次开发

您可以将本项目 Fork 至你的 GitHub 项目库中，将仓库克隆到本地开发，您也可以使用 GitHub Dev。

将项目克隆至本地开发的步骤如下：

```bash
$ git clone git@github.com:any-design/anyui.git
$ cd anyui
$ npm install
$ npm start
```

<br/>

### Pull Request

AnyDesign 团队成员均利用业余时间维护本项目，我们会关注每一个 PR，无论贡献大小，我们会尽量及时对您的贡献进行 Review，Review通过后您的提交将被合入我们的库中。
我们欢迎任何人在任何时间提交您的贡献～

<br/>

### 社区互助

如果你在使用或者开发中遇到了问题，你可以在以下途径寻求到我们的帮助，我们也鼓励社区成员之间进行互助。

> 在此之前，我们强烈推荐阅读[《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545)，以助于获取到更有效的帮助。

1. [GitHub Issues](https://github.com/any-design/anyui/issues)
2. Coming soon


---
## License
## 开源许可协议

AnyUI 项目基于 [MIT](LICENSE) 开源协议开源，使用本项目请遵守该开源协议使用。
