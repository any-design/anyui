<template>
  <div class="testground-content__item">
    <p class="testground-content-title">Form</p>
    <div class="testground-flex">
      <a-form ref="form" v-model="formData" :rules="rules">
        <a-form-item prop="text" label="Label">
          <a-input v-model="formData.text"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="submit">Submit</a-button>
        </a-form-item>
      </a-form>
      <a-form ref="inlineForm" v-model="inlineFormData" layout="inline" :rules="rules">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Form } from '../../index';

export default defineComponent({
  data() {
    return {
      formData: {
        text: '',
      },
      inlineFormData: {
        text1: '',
        text2: '',
      },
      rules: {
        text: [
          {
            required: true,
            message: 'Please input text',
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      (this.$refs.form as InstanceType<typeof Form> | undefined)?.validate();
    },
    clear() {
      (this.$refs.inlineForm as InstanceType<typeof Form> | undefined)?.clearFields();
    },
  },
});
</script>
