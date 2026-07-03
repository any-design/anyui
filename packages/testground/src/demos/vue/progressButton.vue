<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">ProgressButton</div>
      <div class="demo-row">
        <a-progress-button :value="value">Downloading… {{ Math.round(value) }}%</a-progress-button>
        <a-progress-button :value="value" type="solid">Solid {{ Math.round(value) }}%</a-progress-button>
        <a-button type="primary" @click="toggle">{{ running ? 'Pause' : 'Play' }}</a-button>
      </div>
      <div class="demo-row">
        <a-progress-button :value="55" type="solid" status="success" round>Solid success</a-progress-button>
        <a-progress-button :value="65" striped active>Stripes</a-progress-button>
        <a-progress-button :value="40" disabled>Disabled</a-progress-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const value = ref(0);
const running = ref(true);
let timer: ReturnType<typeof setInterval> | undefined;

const tick = () => {
  value.value = (value.value + 2) % 101;
};

const toggle = () => {
  if (running.value) {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  } else {
    timer = setInterval(tick, 120);
  }
  running.value = !running.value;
};

timer = setInterval(tick, 120);

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>