<template>
  <div :class="{
    'a-layout': true,
    'a-layout--has-side': hasSide,
  }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';

export default defineComponent({
  setup() {
    const hasSide = ref(false);

    provide('layout', { hasSide });

    return {
      hasSide,
    };
  },
});
</script>


<style lang="scss">
.a-layout {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.a-layout--has-side {
  flex-direction: row;
}
</style>
