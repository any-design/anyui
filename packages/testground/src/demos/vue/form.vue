<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Basic</div>
      <div class="demo-row">
        <a-form ref="formRef" v-model="formData" :rules="rules">
          <a-form-item prop="text" label="Label">
            <a-input v-model="formData.text"></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="submit">Submit</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Inline</div>
      <div class="demo-row">
        <a-form ref="inlineFormRef" v-model="inlineFormData" layout="inline" :rules="rules">
          <a-form-item prop="text1" label="Label">
            <a-input v-model="inlineFormData.text1"></a-input>
          </a-form-item>
          <a-form-item prop="text2" label="Label">
            <a-input v-model="inlineFormData.text2"></a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" fill @click="clear">Clear</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Form } from '@any-design/anyui-vue';

const formRef = ref<InstanceType<typeof Form>>();
const inlineFormRef = ref<InstanceType<typeof Form>>();

const formData = ref({
  text: '',
});

const inlineFormData = ref({
  text1: '',
  text2: '',
});

const rules = {
  text: [
    {
      required: true,
      message: 'Please input text',
    },
  ],
};

const submit = () => {
  formRef.value?.validate();
};

const clear = () => {
  inlineFormRef.value?.clearFields();
};
</script>
