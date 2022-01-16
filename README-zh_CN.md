# AnyUI

<br>

<div align="center">
<img src="https://github.com/any-design/anyui/blob/main/assets/logo.png?raw=true" width="240">

[English](README.md) | [中文](README-zh_CN.md)

<br>

一款拥有萌系设计风格的 Vue3 前端 UI 组件库

警告：本项目仍然处于快速迭代阶段，我们不完全保证稳定性，请勿用于重要项目！！

</div>

<br>

## 快速开始

<br>

第一步： 使用 npm 或 yarn 引入本项目 `@any-design/anyui` 依赖包

<br>

```bash
# 推荐使用 npm@8
$ npm install @any-design/anyui --save
```

```bash
$ yarn add @any-design/anyui
```

<br>

第二步： 将本库导入你的项目中使用。

<br>

以下是一个最小化示例：

```js
import { createApp } from 'vue';
import AnyUI from '@any-design/anyui';
// 引入默认主题，如果你需要自定义主题，请参考文档做样式引入
import '@any-design/anyui/styles/default.scss';

const app = createApp(App);

app.use(AnyUI);

app.mount('#app');
```

<br>

### 组件演示

<br>

AnyDesign 团队在 Vercel 上搭建了一个组件演示中心，你可以在 Vercel 上体验到 AnyUI 组件的设计。~~ 当然更加完善的组件中心正在积极的开发当中 ~~

<br>

### TypeScript 支持

<br>

本项目基于 TypeScript 开发，提供了完整的 `.d.ts` 定义文件。

<br>

## 社区共建

<br>

### 本地开发

<br>

你可以将本项目 Fork 至你的 GitHub 项目库中，将仓库克隆到本地开发，你也可以使用 GitHub Dev。

将项目克隆至本地开发的步骤如下：

```bash
$ git clone https://github.com/any-design/anyui.git
$ cd anyui
$ npm install
$ npm run dev
```

<br>

### Pull Request

<br>

AnyDesign 团队成员均利用业余时间维护本项目，无论贡献大小，我们都会尽量及时对每一个贡献进行 Review，Review 通过后你的提交就可以直接合入到主干。

我们在 Pull Request 上设置了一些自动化检查，请确保你的代码是符合标准的、可以顺利通过检查。

我们欢迎任何人在任何时间提交你的贡献～

<br>

### 社区讨论与互助

<br>

如果你在使用或者开发中遇到了问题，你可以通过以下途径寻求我们的帮助，我们也鼓励社区成员积极讨论技术、互相帮助解决技术问题。

> 在参与社区讨论之前，我们强烈推荐阅读[《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545)，以助于获取到更有效的帮助。

1. [GitHub Issues](https://github.com/any-design/anyui/issues)
2. Coming soon...

<br>

## 项目演示

<br>

我们已经在Vercel上部署了一个该项目的演示，你可以在那里体验我们的UI组件。

[https://anyui.vercel.app](https://anyui.vercel.app)

<br>

## 许可协议

<br>

AnyUI 项目基于 [MIT LICENSE](LICENSE) 协议开源，使用本项目请遵守该协议。
