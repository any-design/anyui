# 设计令牌

AnyUI 的视觉语言围绕“可爱、清爽、现代”展开，并通过一组 CSS 自定义属性承载。每个组件都会读取这些变量并提供回退值，因此你可以通过覆盖少量变量来全局换肤，也可以只在某个子树内局部换肤。

所有令牌都定义在 `packages/vue/src/styles/theme/tokens.scss` 中，并随 `@any-design/anyui/styles/index.css`（或 `theme.css`）一起发布。

## 圆角尺度

饱满的圆角是 AnyUI 可爱感的基础。

| Token | 默认值 | 常见用途 |
| --- | --- | --- |
| `--a-radius-xs` | `6px` | 小型指示器、滑动高亮 |
| `--a-radius-sm` | `10px` | 输入框、菜单项、小控件 |
| `--a-radius` | `14px` | 按钮、消息、下拉面板 |
| `--a-radius-lg` | `18px` | 大按钮、抽屉 |
| `--a-radius-xl` | `22px` | 卡片、面板 |
| `--a-radius-full` | `999px` | 胶囊、圆点、圆形控件 |

## 动效

| Token | 默认值 | 用途 |
| --- | --- | --- |
| `--anim-duration` | `200ms` | 标准过渡 |
| `--anim-duration-quick` | `120ms` | hover / press 反馈 |
| `--anim-duration-slow` | `320ms` | 弹入动画 |
| `--a-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 按压与弹入时的轻微回弹 |
| `--a-ease-soft` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | 聚焦与颜色变化的柔和缓动 |

## 阴影

AnyUI 的阴影柔和、扩散，不制造尖锐边缘。每一层阴影都基于主题中的 `--shadow-*` alpha 色，因此会自动适配暗色模式。

| Token | 用途 |
| --- | --- |
| `--a-shadow-xs` | 行内元素，例如 tag、checkbox |
| `--a-shadow-sm` | 按钮、抬起的输入框 |
| `--a-shadow-md` | 卡片、下拉框、消息 |
| `--a-shadow-lg` | 浮层、悬浮卡片 |

彩色填充（例如 primary 按钮和彩色消息）还会使用同色系阴影；当你替换主题色时，这些阴影会自动跟随。

## 聚焦环

`--a-focus-ring` 的默认值是 `0 0 0 3px var(--primary-18)`，会应用在输入框和文本域的聚焦状态上。

## 表面抽象层

这些令牌驱动可选的 [liquid glass 风格](#liquid-glass)。组件不会硬编码表面样式，而是读取：

| Token | 默认值 | 含义 |
| --- | --- | --- |
| `--a-surface` | `var(--bg-bright)` | 抬起表面背景，例如按钮、卡片、菜单 |
| `--a-surface-input` | `var(--bg-semi-light)` | 表单字段背景 |
| `--a-surface-border-color` | `transparent` | 表面的 1px 边线 |
| `--a-surface-backdrop` | `none` | `backdrop-filter` 值 |
| `--a-surface-highlight` | `0 0 #0000` | 内侧高光，也就是第一层 box-shadow |

## 菜单项状态

菜单与列表中的 hover / selected 状态（popup menu、select dropdown、list menu）读取另一组抽象令牌。它们默认不定义，每个组件会回退到自己的经典样式；只有 liquid glass 主题会设置它们，把选中项变成带高光边缘的磨砂胶囊。

| Token | Glass 行为 |
| --- | --- |
| `--a-item-hover-bg` | hover 时的半透明白色覆盖 |
| `--a-item-selected-bg` | 磨砂胶囊背景 |
| `--a-item-selected-gradient` | 设置为 `none`，禁用经典渐变 |
| `--a-item-selected-color` | 选中文本颜色 |
| `--a-item-selected-text-shadow` | glass 下设置为 `none` |
| `--a-item-selected-highlight` | 内侧高光边缘 |
| `--a-item-selected-shadow` | 抬起选中项的柔和阴影 |

## Liquid glass

全局启用：

```html
<html data-anyui-style="glass">
```

也可以局部启用：

```html
<div class="a-glass">...</div>
```

Glass 主题只覆盖上面的表面令牌（使用 `color-mix()` 叠加主题色，并附带 `backdrop-filter`），所以它可以和任何自定义主题、暗色模式一起组合。被传送到 `<body>` 的浮层元素（popper、message、select dropdown）只有在全局模式下才会继承该风格。

## 覆盖令牌

令牌就是普通 CSS 自定义属性。只要在 AnyUI 样式之后覆盖即可：

```css
:root {
  /* 更圆的转角和更快的按压反馈 */
  --a-radius: 16px;
  --a-radius-xl: 26px;
  --anim-duration-quick: 100ms;
}
```

如果需要通过 SCSS 主题色生成 `--primary-*` / `--shadow-*` 等颜色变量，请继续阅读 [主题定制](./customization.md)。
