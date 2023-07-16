# @any-design/anyui - AMessageQueue

The @any-design/anyui AMessageQueue Vue3 component provides a notification message queue where multiple messages can be displayed in a queue. This component utilizes AMessage component to display the messages. 

## Basic Usage

```vue
<template>
  <a-message-queue />
</template>

<script>
import AMessageQueue from '@any-design/anyui/AMessageQueue.vue';

export default {
  components: {
    AMessageQueue,
  },
};
</script>
```

## Props

The following props can be used to customize the behaviour of the component:

| Prop    | Description | Type     | Default |
| ------- | ------------| -------- | ------- |
| zIndex  | The z-index value of the message container | Number   | -1      |

Example:

```vue
<template>
  <a-message-queue :zIndex="100" />
</template>

<script>
import AMessageQueue from '@any-design/anyui/AMessageQueue.vue';

export default {
  components: {
    AMessageQueue,
  },
};
</script>
```

## Events

The AMessageQueue component can emit one event:

| Event    | Description |
| ------- | ------------|
| cleared  | This event gets emitted when all messages in the queue clears |


Example:

```vue
<template>
  <a-message-queue @cleared="onCleared" />
</template>

<script>
import AMessageQueue from '@any-design/anyui/AMessageQueue.vue';

export default {
  components: {
    AMessageQueue,
  },
  methods: {
    onCleared() {
      console.log("All messages cleared from queue");
    }
  },
};
</script>
```

## Methods

The AMessageQueue component has the following exposed methods:

| Method    | Description |
| ------- | ------------|
| addMessage  | This method takes in a message object and adds the message to the message queue. The message object should have the following properties:<br><ul><li>type (String): The type of message. Accepted values are success, info, warning, and error.</li><li>content (String): The content of the message.</li><li>duration (Number): The duration for which the message should be displayed before getting removed from queue. If no duration is provided, the message will be displayed until manually closed by the user.</li><li>icon (String): An icon to be displayed alongside the message.</li><li>showIcon (Boolean): A flag indicating whether the icon should be displayed or not.</li><li>round (Boolean): A flag indicating whether the message should have rounded corners or not.</li></ul>  |

Example:

```vue
<template>
  <a-message-queue ref="messageQueue" />
</template>

<script>
import AMessageQueue from '@any-design/anyui/AMessageQueue.vue';

export default {
  components: {
    AMessageQueue,
  },
  mounted() {
    const queue = this.$refs.messageQueue;
    queue.addMessage({
      type: 'success',
      content: 'This is a success message',
      duration: 5000,
      round: true,
      showIcon: true,
      icon: 'info',
    });
  },
};
</script>
```