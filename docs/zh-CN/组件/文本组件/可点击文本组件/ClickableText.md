# ClickableText 可点击文本组件

可点击文本组件是一个可以点击的文本组件，可以设置点击事件，可设置为主要文本和次要文本。

## 基本用法

### 可点击文本属性

- `type`: 按钮类型，可选值为 `primary`、`secondary`，默认为 `default`。

### 可点击文本

最基本的 AnyUI ClickText 可点击文本组件，可以通过以下方式使用：

```vue
<a-click-text>可点击文本</a-click-text>
```

### 主要点击文本

AnyUI ClickText 可点击文本组件可以设置主要点击文本，可以通过设置 `type` 属性为 `primary` 来创建主要点击文本：

```vue
<a-clickable-text type="primary">主要点击文本</a-clickable-text>
```

### 次要点击文本

AnyUI ClickText 可点击文本组件可以设置次要点击文本，可以通过设置 `type` 属性为 `secondary` 来创建次要点击文本：

```vue
<a-clickable-text type="secondary">次要点击文本</a-clickable-text>
```
