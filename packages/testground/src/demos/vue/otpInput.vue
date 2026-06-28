<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">6-digit Code</div>
      <div class="demo-col">
        <a-otp-input v-model="code" @complete="completed = $event"></a-otp-input>
        <span>Value: {{ code || 'empty' }}</span>
        <span>Completed: {{ completed || 'not yet' }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">4-digit Masked</div>
      <div class="demo-col">
        <a-otp-input v-model="pin" :length="4" masked></a-otp-input>
        <span>Value: {{ pin || 'empty' }}</span>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Sizes</div>
      <div class="demo-row">
        <a-otp-input model-value="12" :length="4" size="small"></a-otp-input>
        <a-otp-input model-value="123" :length="4"></a-otp-input>
        <a-otp-input model-value="1234" :length="4" size="large"></a-otp-input>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Disabled</div>
      <div class="demo-row">
        <a-otp-input model-value="12" :length="4" disabled></a-otp-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const code = ref('');
const completed = ref('');
const pin = ref('');
</script>
