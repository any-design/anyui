# @any-design/anyui Virtual List Component

The **Virtual List Component** is a blazing fast component for scrolling through lists with a large number of items. This component is based on a binary indexed tree to search the scroll top. It provides excellent performance and is suitable for rendering a large amount of data. 

One of its key features is that it measures the suitable item height automatically, which makes it unnecessary for you to set the item height getter. This component supports dynamic item height by default and also features an optional scroll buffer for rendering more number of items. 

## Basic Usage

You can import the **Virtual List Component** by adding the following line of code to your Vue file.

```javascript
import AVirtualList from '@any-design/anyui/dist/es/components/AVirtualList';
```

After importing the component, you can use it in your template by including the following code:

```vue
<AVirtualList :items="yourItems" :estimatedItemHeight="35">
  
  <!-- Use this slot to define the template of item in the list -->
  <template v-slot="{ item }">
    <div>{{ item.title }}</div>
  </template>

</AVirtualList>
```

In the above code, the `yourItems` array is the data list which will be rendered in the virtual list. You can also set an estimated value for the item height to optimize performance.

## Props

### items

The data list which will be rendered in the virtual list. This is required and will be passed to the `AVirtualListItem` component. Each item in the list should have a unique id.

```typescript
items?: RawVirtualListItem<unknown>[];
```

### buffer

The scroll buffer of the list which is used for rendering more items. This property accepts a number in px. The larger the number, the more items will be rendered.

```typescript
buffer?: number;
```

### estimatedItemHeight

If you already know the proper height of your item, you can skip the height measurement by setting this value. This is an optional property and is measured automatically by default.

```typescript
estimatedItemHeight?: number;
```

### enableDeepWatch

If true, the component will watch the items deeply. This is an optional Boolean property and is false by default.

```typescript
enableDeepWatch?: boolean;
```

### firstScreenThreshold

How many elements will be used for height measurement. This is an optional property and is ten by default.

```typescript
firstScreenThreshold?: number;
```

### reuseNodes

If true, the DOM node will be reused to avoid frequent DOM node creation and removing. This is an optional Boolean property and is true by default.

```typescript
reuseNodes?: boolean;
```

### keyType

The key type of the item which will affect the refreshing. It can be  `batch`  (the index of render batch),  `screen`  (a series indexes based on the screen height and the items count),  `both`  (use both of previous two indexes),  `none`  (use none of previous indexes, just use the natural index of the item). This is an optional string property and is `none`  by default.

```typescript
keyType?: 'batch' | 'screen' | 'both' | 'none';
```

### Events

The **Virtual List Component** emits two types of events:

- `init-height`: This event is emitted when the initialized height of an item is measured.
- `update-height`: This event is emitted when the height of an item is updated.

These events are useful when your item height varies depending on the provided data.

### Exposed Methods

The **Virtual List Component** exposes the following method:

#### refresh

This method refreshes the display items in the list.

```typescript
refresh(): void;
```

#### scrollToBottom

This method scrolls down the list to the bottom of the container.

```typescript
scrollToBottom(): void;
```

### Exposed Values

The **Virtual List Component** doesn't have any exposed values.