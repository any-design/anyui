# AGradientText 组件文档

这个组件是一个带渐变色文字的 `<span>` 标签。

## 基本用法和示例

使用 `AGradientText` 组件，可以创建一个带有渐变色的文本：

```vue
<template>
  <AGradientText size="20px" primary-color="#FEB692" secondary-color="#EA5455"></AGradientText>
</template>
```

## Props

该组件接受以下 props：

| 属性名          | 类型    | 默认值              | 说明                                                                                              |
| --------------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| gradient        | String  | ''                  | 自定义的渐变色样式，如果该值存在，则直接通过该值渲染背景色，无视其他计算结果                      |
| reverseGradient | Boolean | false               | 是否颠倒主次渐变色                                                                                |
| size            | String  | ''                  | 文字大小                                                                                          |
| primaryColor    | String  | 'var(--primary)'    | 主渐变色，可以是任何合法的 CSS 颜色值，必须是一个可渐变的颜色值                                   |
| secondaryColor  | String  | 'var(--secondary)'  | 次渐变色，可以是任何合法的 CSS 颜色值，必须是一个可渐变的颜色值                                   |
| splitPercent    | Number  | 30                  | 渐变的分界点位置，一个百分比数值。如果参数为 30，则渐变按照由 primaryColor 向 secondaryColor 渐变 |
| styles          | Object  | {...background: ''} | 自定义样式，所有 CSS 属性都可以被绑定到组件上                                                     |

### gradient

类型：String

自定义的渐变色样式。如果该值存在，则直接通过该值渲染背景色，无视其他计算结果。

### reverseGradient

类型：Boolean

控制是否颠倒主次渐变色，默认为 `false`。

### size

类型：String

文本大小。默认值为空字符串。

### primaryColor

类型：String

主要的渐变颜色。默认值为 'var(--primary)'。

### secondaryColor

类型：String

次要的渐变颜色。默认值为 'var(--secondary)'。

### splitPercent

类型：Number

渐变的分界点位置，一个[0,100]之间的整数。如果参数为 30，则渐变按照从 primaryColor 向 secondaryColor 渐变。

```vue
<template>
  <AGradientText :splitPercent="50"></AGradientText>
</template>
```

### styles

类型：Object

自定义样式，所有 CSS 属性都可以被绑定到组件上。默认为空对象。

```vue
<template>
  <AGradientText :styles="{ fontFamily: 'Comic Sans MS', fontWeight: 'normal' }"></AGradientText>
</template>
```

## 计算属性

### gradientStyles

类型：Object

用于计算 background 样式的内部计算属性，不应该被直接访问。如果需要改变组件的背景样式，建议修改 gradient 和其它 CSS 样式。

## Slots

该组件接受 default slot，允许添加其它的 HTML 内容。
