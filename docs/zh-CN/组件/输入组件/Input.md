# Input 输入框组件

输入框组件是一个输入框，可以输入文本、数字、密码等，可设置圆角、前置图标、后置图标、大小、禁用、只读等。

## 基本用法

### 输入框属性

AnyUI Input 输入框组件有以下属性：

- `placeholder`：输入框占位文本
- `Round`:是否圆角，可选值为 `true` 。
- `size`:输入框大小，可选值为 `large` 。
- `disabled`:是否禁用，可选值为 `true` 。
- `readonly`:是否只读，可选值为 `true` 。

### 基本输入框

最基本的 AnyUI Input 输入框组件，可以通过以下方式使用：

```vuejs
<a-input></a-input>
```

### 圆角输入框

圆角 AnyUI Input 输入框组件，可以通过以下方式使用：

```vuejs
<a-input round></a-input>
```

### 输入框大小

输入框大小 AnyUI Input 输入框组件，可以通过设置 `size` 属性为 `large`，来设置输入框为大输入框：

```vuejs
<a-input size="large"></a-input>
```

### 禁用输入框

禁用 AnyUI Input 输入框组件，可以通过设置 `:disabled` 属性为 `true`，来设置禁用输入框：

```vuejs
<a-input :disable="true"></a-input>
```

### 只读输入框

只读 AnyUI Input 输入框组件，可以通过设置 `:readonly` 属性为 `true`，来设置只读输入框：

```vuejs
<a-input :readonly="true"></a-input>
```

### 输入框前置图标和后置图标

AnyUI Input 输入框组件，可以通过设置 `v-slot:prefix` 属性为 `true`，来设置输入框前置图标：

```vue
<a-input placeholder="With Icon">
  <template v-slot:prefix>
    <icon icon="ri:search-2-line" />
  </template>
</a-input>
```

同理，可以通过设置 `v-slot:postfix` 属性为 `true`，来设置输入框后置图标：

```vue
<a-input placeholder="With Icon">
  <template v-slot:postfix>
    <icon icon="ri:search-2-line" />
  </template>
</a-input>
```
