<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Workflow</div>
      <div class="demo-row">
        <a-button round size="small" @click="addCurrentStep(-1)">Prev</a-button>
        <a-button round size="small" @click="addCurrentStep(1)">Next</a-button>
        <span>Current: {{ currentStepLabel }}</span>
      </div>
      <div class="step-preview-shell">
        <div class="step-preview-shell__meta">
          <div class="step-preview-shell__eyebrow">Checkout</div>
          <div class="step-preview-shell__title">{{ currentStepLabel }}</div>
          <div class="step-preview-shell__caption">
            Step {{ Math.min(currentStep, demoSteps.length) }} of {{ demoSteps.length }}
            <template v-if="currentStep > demoSteps.length"> · Done</template>
          </div>
        </div>
        <a-step :steps="demoSteps" :current="currentStep"></a-step>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const currentStep = ref(1);
const demoSteps = ['Cart', 'Shipping', 'Payment', 'Done'];
const currentStepLabel = computed(() => {
  return currentStep.value > demoSteps.length ? 'Completed' : demoSteps[currentStep.value - 1];
});

const addCurrentStep = (v: number) => {
  const res = currentStep.value + v;
  // Allow current to reach length + 1 so every step can be marked completed.
  if (res > demoSteps.length + 1) {
    currentStep.value = demoSteps.length + 1;
    return;
  }
  if (res < 1) {
    currentStep.value = 1;
    return;
  }
  currentStep.value = res;
};
</script>
