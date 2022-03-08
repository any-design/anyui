# Button 按钮组件

按钮组件一个最基本的组件，用于执行一个点击操作。可设置颜色、大小、圆角、禁用等。

---

## 基本用法

### 按钮属性

AnyUI Button 按钮组件有以下属性：

- `type`:按钮类型，可选值为 `primary`。
- `round`:是否圆角，可选值为 `true`。
- `anim`:是否开启动画，可选值为 `true`。
- `size`:按钮大小，可选值为 `small`、`large`。
- `disabled`:是否禁用，可选值为 `true`。
- `icon`:图标属性

### 基本按钮

最基本的 AnyUI Button 按钮组件，可以通过以下方式使用：

```vue
<a-button>按钮</a-button>
```

### 主按钮

主按钮 AnyUI Primary Button 按钮组件，可以通过设置 `type` 属性为 `primary`，来设置为主按钮：

```vue
<a-button type="primary">主按钮</a-button>
```

### 圆角按钮

圆角按钮 AnyUI Round Button 按钮组件，可以通过设置 `round` 属性为 `true`，来设置为圆角按钮：

方法一（推荐）：

```vue
<a-button round>圆角按钮</a-button>
```

方法二：

```vue
<a-button round="true">圆角按钮</a-button>
```

### 动画按钮

动画按钮 AnyUI Anim Button 按钮组件，可以通过设置 `anim` 属性为 `true`，来设置为动画按钮：

方法一（推荐）：

```vue
<a-button anim>动画按钮</a-button>
```

方法二：

```vue
<a-button anim="true">动画按钮</a-button>
```

### 按钮大小

按钮大小 AnyUI Size Button 按钮组件，可以通过设置 `size` 属性为 `small` 或 `large`，来设置为小按钮或大按钮：

```vue
<a-button size="small">小按钮</a-button>
<a-button size="large">大按钮</a-button>
```

### 禁用按钮

禁用按钮 AnyUI Disa-bled Button 按钮组件，可以通过设置 `:disabled` 属性为 `true`，来设置为禁用按钮：

方法一（推荐）：

```vue
<a-button disabled>禁用按钮</a-button>
```

方法二：

```vue
<a-button :disabled="true">禁用按钮</a-button>
```

### 图标按钮

图标按钮 AnyUI Icon Button 按钮组件，可以通过设置 `icon` 属性为图标类名，来设置为图标按钮：

```vue
<a-button icon="icon-search">图标按钮</a-button>
```
