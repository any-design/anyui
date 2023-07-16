# ATextarea 组件文档

这个组件是一个文本框。

## 基本用法和示例

使用 `ATextarea` 组件，可以创建一个多行文本框：

```vue
<template>
  <ATextarea v-model="message" />
</template>

<script>
import { ATextarea } from '@any-design/anyui';

export default {
  components: {
    ATextarea,
  },
  data() {
    return {
      message: '',
    };
  },
};
</script>
```

## Props

该组件接受以下 props：

| 属性名           | 类型              | 默认值    | 说明                                                                                                                                                                |
| ---------------- | ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| minRows          | Number            | 3         | 文本框的最小显示行数                                                                                                                                              |
| maxRows          | Number            | 10        | 文本框的最大显示行数                                                                                                                                              |
| readonly         | Boolean           | false     | 是否只读                                                                                                                                                          |
| disabled         | Boolean           | false     | 是否禁用                                                                                                                                                          |
| modelValue       | String            | ''        | 文本框的值，与 Vue 的 `v-model` 绑定                                                                                                                              |
| placeholder      | String            | ''        | 占位符                                                                                                                                                            |
| lineHeight       | Number            | 1.5       | 行高                                                                                                                                                              |
| maxlength        | Number            |           | 最大字符数                                                                                                                                                        |
| minlength        | Number            |           | 最小字符数                                                                                                                                                        |
| autocomplete     | String            | 'off'     | 自动完成                                                                                                                                                          |
| autocorrect      | String            | 'off'     | 自动纠错                                                                                                                                                          |
| spellcheck       | String / Boolean  |           | 是否开启拼写检查，设置为 `false` 可以关闭拼写检查，设置为 `true` 或不传值则开启拼写检查                                                                     |
| wrap             | String            |           | 自动换行属性                                                                                                                                                      |
| disableResizeCorner | Boolean           | false | 是否禁止拉伸角                                                                                                                                                         |
| autoMatchHeight  | Boolean           | false     | 是否自适应高度                                                                                                                                                      |
| borderless       | Boolean           | false     | 是否无边框                                                                                                                                                        |

## Events

该组件会 emit 以下事件：

| 事件名            | 说明                   |
| ----------------- | ---------------------- |
| update:modelValue | 当文本框的值发生变化时 |
| submit            | 当输入 `Enter` 键时触发 |

## Slots

该组件支持以下插槽：

| 插槽名   | 说明                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| before   | 在文本框之前插入元素                                                                                                      |
| after    | 在文本框之后插入元素                                                                                                      |

示例：

```vue
<template>
  <ATextarea placeholder="Write something..." :minRows="5" :maxRows="10">
    <template #before>
      <div>Before</div>
    </template>
    <template #after>
      <div>After</div>
    </template>
  </ATextarea>
</template>
```

## Exposed methods and values

该组件暴露如下方法和值：

| 名称         | 类型       | 说明                          |
| ------------ | ---------- | ----------------------------- |
| storedValue  | ref(String)| 文本框的值                    |
| innerStyles  | computed  | 文本框内部样式                |
| wrapperRef   | ref        | 文本框外层 div 对象           |
| innerRef     | ref        | 文本框内部 textarea 对象     |
| handleInput  | function   | 当文本框的值发生变化时的方法 |
| handleEnterDown | function | 按下 `Enter` 键时的方法      |

示例：

```vue
<template>
  <ATextarea ref="messageTextarea" />
</template>

<script>
import { ATextarea } from '@any-design/anyui';

export default {
  components: {
    ATextarea,
  },
  methods: {
    clearMessage() {
      this.$refs.messageTextarea.storedValue = '';
    },
  },
};
</script>
```