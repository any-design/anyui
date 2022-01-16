<template>
  <div
    :class="{
      'a-form': true,
      'a-form--inline': layout === 'inline',
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ValidateSchema, { Rules } from 'async-validator';
import { Rule, ValidateError } from 'async-validator/dist-types/interface';
import { formatStyleSize } from '../../utils';
import formEventEmitterFactory from './bus';

export default defineComponent({
  name: 'AForm',
  props: {
    modelValue: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    layout: {
      type: String,
      default: 'default',
    },
    labelWidth: {
      type: [String, Number],
      default: '20%',
    },
  },
  setup(props, { expose }) {
    const formData = props.modelValue as Record<string, unknown>;
    // exposed data
    const emitter = formEventEmitterFactory();

    const handleValidatePassed = (field?: string) => {
      if (!props.rules) {
        return;
      }
      if (field) {
        emitter.emit('setValid', {
          field,
          message: '',
          isValid: true,
        });
        return;
      }
      Object.keys(props.rules).forEach((key: string) => {
        emitter.emit('setValid', {
          field: key,
          message: '',
          isValid: true,
        });
      });
    };

    const handleValidateErrors = (errors: unknown) => {
      const validateErrs = errors as ValidateError[];
      validateErrs.forEach((error) => {
        emitter.emit('setValid', {
          field: error.field,
          message: error.message,
          isValid: false,
        });
      });
    };

    // exposed methods
    const validate = async () => {
      if (!props.rules || !Object.keys(props.rules).length) {
        console.warn('[AnyUI][Form] Form has no rules.');
        return true;
      }
      const validator = new ValidateSchema(props.rules as Rules);
      try {
        await validator.validate(formData);
        handleValidatePassed();
        return true;
      } catch ({ errors }) {
        handleValidateErrors(errors);
        return false;
      }
    };
    const validateField = async (field: string) => {
      if (!props.rules || !Object.keys(props.rules).length) {
        console.warn('[AnyUI][Form] Form has no rules.');
        return true;
      }
      const rule = props.rules[field] as Rule | undefined;
      if (!rule) {
        console.warn(`[AnyUI][Form] Form has no rule for validating field ${field}.`);
        return true;
      }
      const validator = new ValidateSchema({
        field: rule,
      });
      try {
        await validator.validate(formData);
        handleValidatePassed(field);
        return true;
      } catch ({ errors }) {
        handleValidateErrors(errors);
        return false;
      }
    };
    const clearField = async (field: string) => {
      emitter.emit('clear', {
        type: 'specific',
        field,
      });
    };
    const clearFields = async () => {
      emitter.emit('clear', {
        type: 'all',
      });
    };
    const clearValidation = async (field?: string) => {
      handleValidatePassed(field);
    };

    const exposed = {
      emitter,
      formattedLabelWidth: formatStyleSize(props.labelWidth),
      validate,
      validateField,
      clearField,
      clearFields,
      clearValidation,
    };

    expose(exposed);

    return exposed;
  },
});
</script>

<style lang="scss">
.a-form {
  width: 100%;
  position: relative;
}
.a-form--inline {
  width: 100%;
  display: flex;
  .a-form-item {
    margin-bottom: 0;
    margin-right: 12px;
    flex: 1;
    &-inner {
      &__label {
        margin-right: 12px;
      }
    }
  }
  .a-form-item:last-child {
    margin-right: 0;
  }
}
</style>
