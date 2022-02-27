# AnyUI

<br>

<div align="center">
<img src="https://github.com/any-design/anyui/blob/main/assets/logo.png?raw=true" width="240">

<br>

一款拥有萌系设计风格的 Vue3 前端 UI 组件库

</div>

<br>

## 特性

<br>

- 萌系风格设计，组件设计语言统一
- 开箱即用的前端 Vue 组件库 
- 快速迭代，支持最新的 Vue 3.0
- 本项目基于 TypeScript 开发，提供了完整的 `.d.ts` 定义文件
- 组件细节深度定制，支持自定义主题

<br>

## 版本

<br>

当前发行版本：

<br>

## 安装

<br>

### 使用 npm 或 yarn 安装

#### npm

```bash
# 推荐使用 npm@8
$ npm install @any-design/anyui --save
```
<br>

#### yarn

```bash
$ yarn add @any-design/anyui
```

<br>

### 快速上手

<br>

你可以使用 Webpack5 或者 Vite 来快速上手，推荐使用 Vite。

以下是一个简单 AnyUI 组件在 Vite 中的配置：

**main.js**

```js
import { createApp } from "vue";
import AnyUI from "@any-design/anyui";
import App from "./app.vue";
//引入默认主题，如果你需要自定义主题，请参考文档做样式引入
import "@any-design/anyui/styles/default.scss";

const app = createApp(App);

app.use(AnyUI);

app.mount("#app");
```

## 环境兼容性

<br>

### 支持浏览器

<br>

- 暂不兼容 IE
- Chrome 版本支持：
- Edge 版本支持：
- Firefox 版本支持：

<br>

### 其他环境支持

<br>

- 支持 Electron

