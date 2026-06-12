<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Steps</div>
      <div class="demo-row">
        <a-button round size="small" @click="addCurrentStep(-1)">Prev</a-button>
        <a-button round size="small" @click="addCurrentStep(1)">Next</a-button>
      </div>
      <div class="demo-col" style="margin-top: 14px">
        <a-step :steps="4" :current="currentStep"></a-step>
        <a-step :steps="demoSteps" :current="currentStep"></a-step>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentStep = ref(1);
const demoSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const addCurrentStep = (v: number) => {
  const res = currentStep.value + v;
  if (res > 4) {
    currentStep.value = 4;
    return;
  }
  if (res < 1) {
    currentStep.value = 1;
    return;
  }
  currentStep.value = res;
};
</script>
