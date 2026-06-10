<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Step</p>
    <div style="display: flex; margin-bottom: 20px">
      <a-button round size="small" style="margin-right: 8px" @click="addCurrentStep(-1)"
        >Prev</a-button
      >
      <a-button round size="small" @click="addCurrentStep(1)">Next</a-button>
    </div>
    <div style="margin-bottom: 24px">
      <a-step :steps="4" :current="currentStep"></a-step>
    </div>
    <div>
      <a-step :steps="demoSteps" :current="currentStep"></a-step>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const currentStep = ref(1);
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
    return {
      currentStep,
      demoSteps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
      addCurrentStep,
    };
  },
});
</script>
