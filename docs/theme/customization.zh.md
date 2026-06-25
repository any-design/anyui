# 主题定制

AnyUI 支持在构建阶段定制主题色。你可以替换主色、背景、文本、边框、阴影等基础色，让组件视觉更贴近自己的产品设计。

## 使用方式

主题定制只适用于 `.scss` 样式入口。发布包里的 `.css` 文件已经按默认主题预编译，不能再参与 SCSS 变量合并。

### 覆盖主题变量

在覆盖 SCSS 变量前，需要调整样式引入方式。

1. 创建一个自定义主题样式文件，例如在 `src/styles` 中创建 `anyui.scss`：

```scss
// 在这里覆盖变量
// ....

// 再引入 AnyUI 基础样式
@use '@any-design/anyui/styles/index.scss' as *;
```

如果你希望按需引入样式，可以把 `@any-design/anyui/styles/index.scss` 换成 `@any-design/anyui/styles/theme.scss`。

2. 在项目入口里引入这个自定义文件，例如 `src/main.ts`：

```ts
import { createApp } from 'vue';
// other imports
// ...
import './styles/anyui.scss';
```

完成后，就可以在 `src/styles/anyui.scss` 中覆盖主题变量。

所有覆盖都必须写在 AnyUI 原始样式 import 之前。如果你直接在项目入口（例如 `src/main.ts`）里引入 AnyUI 的 SCSS 文件，覆盖变量不会生效。

## 主题变量

AnyUI 提供了多组可配置变量，包含基础颜色与计算后的扩展颜色。

### 全局变量

#### 响应式样式

`$anyui-enable-responsive-styles`: `boolean`

把 `$anyui-enable-responsive-styles` 设置为 `false` 可以关闭所有响应式样式生成。

#### 布局

可以通过这些变量控制全局布局与动效：

```scss
$main-font: 'Quicksand'; // 所有文本使用的主字体
$anim-duration: 200ms; // 通用动画时长
$scroll-width: 8px; // 自定义滚动条宽度
```

我们更推荐通过 CSS 变量覆盖这些值；全局 SCSS 变量都会生成对应的 CSS 变量。

### 颜色

颜色定义基于多个 SCSS map。你可以通过覆盖这些 map 来生成自己的主题。

#### 主题色

浅色主题的颜色 map 名为 `colors`。

默认值如下。如果要覆盖某个颜色，只需要定义同名 key，AnyUI 会把你的 map 与默认 map 合并。

```scss
$default-colors: (
  primary: rgba(15, 111, 239, 90),
  secondary: rgba(17, 205, 239, 90),
  bg: #fbfbfc,
  bg-readonly: #f2f3f4,
  bg-disabled: #dadadc,
  text: #202426,
  text-secondary: #909293,
  text-disabled: #a0a1a4,
  text-placeholder: #aeaeae,
  text-btn: #fdfdfe,
  text-white: #fafbfd,
  icon-fill: #a6a8a9,
  scrollbar: #c0c2c3,
  success: rgb(96, 211, 50),
  warn: rgb(243, 189, 41),
  danger: rgb(231, 63, 51),
  info: rgb(47, 124, 224),
  border: #cecdd0,

  line: #eff2f3,
  shadow: #001220,
  shadow-w: #fff,
);
```

由于合并逻辑会保留额外 key，你也可以在这里增加自己的颜色变量，主题系统会用相同的计算方式为它们生成暗色版本。

如果只想修改暗色模式的颜色，可以定义 `dark-colors` map。它会被合并到最终的暗色颜色表中。

#### 静态颜色

静态颜色 map 名为 `static-colors`。这些颜色不会随暗色模式变化，会始终保持一致。

默认定义如下：

```scss
$default-static-colors: (
  mask: rgba(0, 0, 0, 0.8),
);
```

#### Alpha 列表

AnyUI 会为主题色生成一系列不同透明度的扩展变量。透明度列表由 `alphas` map 控制。

如果你想为某个主题色生成更多透明度变量，可以用主题色名称作为 key，并提供一组 alpha 值：

```scss
$default-alphas: (
  primary: 100 85 80 75 70 60 40 30 20 18 12 10 8 6 4,
  secondary: 90 80 70 60 40 30 20,
  success: 80 60,
  warn: 80 60,
  danger: 80 60,
  error: 80 60,
  info: 80 60,
  shadow: 2 4 5 6 8 10 12 18 20 24 25 30 36 40,
  shadow-w: 10 20 24,
);
```

定义同名 `alphas` map 后，AnyUI 会把它与默认值合并。

#### 亮度调整

SCSS 可以调整颜色亮度。AnyUI 通过 `lightness-adjustments` map 让这件事更可控。

如果想调整某个主题色的亮度，可以定义嵌套 map：

```scss
$default-lightness-adjustments: (
  primary: (
    l-6: 6%,
    d-4: -4%,
  ),
  bg: (
    bright: 4.5%,
    light: 2.5%,
    semi-light: 1.5%,
    alter: -0.625%,
    semi-dark: -1.5%,
    darker: -3%,
  ),
  border: (
    lighter: 6%,
    light: 4%,
    semi-light: 2%,
    semi-dark: -2.5%,
    dark: -4.75%,
    darker: -6%,
  ),
);
```

最终 map 名为 `lightness-adjustments`。你可以覆盖默认项，也可以增加自己的亮度档位。

### 暗色模式

暗色模式通常绑定在根节点 class 或 attribute 上。为了适配不同项目，AnyUI 提供了两个 SCSS 变量：

```scss
$enable-prefer-query: true !default;
$dark-theme-selector: 'html[theme="dark"]' !default;
```

当 `enable-prefer-query` 为 `true` 时，生成的样式会包含 `@media (prefers-color-scheme: dark)`。如果你只想手动控制暗色模式，可以把它设为 `false`。

`dark-theme-selector` 默认使用 `html[theme="dark"]` 开启暗色主题。你可以把它改成项目需要的选择器，例如 VitePress 常见的 `.dark`。
