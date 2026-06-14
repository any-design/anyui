<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basics</div>
      <div class="demo-col">
        <a-slider v-model="value"></a-slider>
        <span>Value: {{ value }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Step</div>
      <div class="demo-col">
        <a-slider v-model="stepValue" :step="10"></a-slider>
        <span>Value: {{ stepValue }} (step 10)</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Range &amp; Width</div>
      <div class="demo-col">
        <a-slider v-model="rangeValue" :min="-50" :max="50" :width="240"></a-slider>
        <span>Value: {{ rangeValue }} (min -50, max 50, width 240)</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">No Tooltip &amp; Disabled</div>
      <div class="demo-col">
        <a-slider v-model="plainValue" :show-tooltip="false"></a-slider>
        <a-slider v-model="disabledValue" disabled></a-slider>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Change Event</div>
      <div class="demo-col">
        <a-slider v-model="eventValue" @change="lastChange = $event"></a-slider>
        <span>Last change: {{ lastChange ?? 'none' }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(30);
const stepValue = ref(40);
const rangeValue = ref(0);
const plainValue = ref(60);
const disabledValue = ref(45);
const eventValue = ref(20);
const lastChange = ref<number | undefined>();
</script>
