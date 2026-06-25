# 图标

AnyUI 已经集成 `@iconify/vue`，推荐所有图标都通过 Iconify 使用。

## 离线使用

在完全离线的环境中，默认从在线 API 加载图标的方式可能不适用。AnyUI 提供了额外的初始化 helper，方便你把所需图标离线化。

对于组件内置的默认图标，可以安装 `@any-design/default-icons`。它会以 `IconMeta` JSON 格式提供所有默认图标，然后在启动时交给 `Icon Helper`：

```ts
import { setupIcons } from '@any-design/anyui/vue';
import DefaultIcons from '@any-design/default-icons',

setupIcons({
  icons: DefaultIcons,
});
```

如果需要其他图标，可以参考 <https://iconify.design/docs/icons/icon-data.html> 学习如何安装并导入图标数据。

之后同样可以通过 `setupIcons` 完成初始化。它也支持一次性初始化整个图标集合，因此你可以按项目需要选择完整离线某个 collection。

## 预取

`setupIcons` 方法还支持预取图标。你可以在 `IconSetupOptions` 的 `prefetch` 字段里传入图标名称列表。

## 其他设置

如果 helper 暂时没有覆盖某些高级设置，可以直接导入 `@iconify/vue` 及其 API 来完成。
