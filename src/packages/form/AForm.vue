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
import type { Rules } from 'async-validator';
import ValidateSchema from 'async-validator';
import type { Rule, ValidateError } from 'async-validator/dist-types/interface';
import {
  defineComponent,
  computed,
  provide,
  onBeforeMount,
  onBeforeUnmount,
  unref,
} from 'vue';
import type {
  PropType} from 'vue';

import { formatStyleSize } from '../../utils';

import formEventEmitterFactory from './bus';
import type { FormRuleItem } from './types';

export default defineComponent({
  name: 'AForm',
  props: {
    // form values which will be bound to this component
    modelValue: {
      type: Object as PropType<Record<string, any>>,
    },
    // a validation rules which can be used in async-validator
    rules: {
      type: Object as PropType<Record<string, FormRuleItem[]>>,
    },
    // layout type of the component, can be 'default' or 'inline'
    layout: {
      type: String as PropType<'default' | 'inline'>,
      default: 'default',
    },
    // the width of the label. can be percentage or number.
    labelWidth: {
      type: [String, Number],
      default: '20%',
    },
  },
  setup(props, { expose }) {
    const formData = computed(() => props.modelValue);

    // for form items
    provide(
      'formRules',
      computed(() => {
        if (!props.rules) {
          return {};
        }
        const res: Record<string, FormRuleItem[]> = {};
        Object.keys(props.rules).forEach((key) => {
          res[key] = props.rules![key].map((item) => {
            if (item.triggerType) {
              return item;
            }
            // use 'change' as triggerType by default
            return {
              ...item,
              triggerType: 'change',
            };
          });
        });
        return res;
      }),
    );

    // exposed data
    const emitter = formEventEmitterFactory();

    // styles
    const formattedLabelWidth = computed(() => formatStyleSize(props.labelWidth));

    const handleValidatePassed = (field?: string) => {
      if (!props.rules) {
        return;
      }

      // set specific field when specified
      if (field) {
        emitter.emit('setValid', {
          field,
          message: '',
          isValid: true,
        });
        return;
      }

      // set all
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

    const validate = async () => {
      if (!props.rules || !Object.keys(props.rules).length) {
        console.warn('[AnyUI][Form] Form has no rules.');
        return true;
      }
      const values = unref(formData);
      if (!values) {
        throw new Error('Invalid form values.');
      }
      const validator = new ValidateSchema(props.rules as Rules);
      try {
        await validator.validate(values);
        handleValidatePassed();
        return true;
      } catch ({ errors }: any) {
        handleValidateErrors(errors);
        return false;
      }
    };
    const validateField = async (field: string) => {
      if (!props.rules || !Object.keys(props.rules).length) {
        console.warn('[AnyUI][Form] Form has no rules.');
        return true;
      }
      const values = unref(formData);
      if (!values) {
        throw new Error('Invalid form values.');
      }
      const rule = props.rules[field] as Rule | undefined;
      if (!rule) {
        console.warn(`[AnyUI][Form] Form has no rule for validating field ${field}.`);
        return true;
      }
      const validator = new ValidateSchema({
        [field]: rule,
      });
      try {
        await validator.validate(values);
        handleValidatePassed(field);
        return true;
      } catch ({ errors }: any) {
        handleValidateErrors(errors);
        return false;
      }
    };

    const clearField = async (field: string) => {
      emitter.emit('clear', {
        type: 'specific',
        field,
      });
      clearValidation(field);
    };
    const clearFields = async () => {
      emitter.emit('clear', {
        type: 'all',
      });
      clearValidation();
    };
    const clearValidation = async (field?: string) => {
      handleValidatePassed(field);
    };

    onBeforeMount(() => {
      emitter.on('revalidateField', validateField);
    });

    onBeforeUnmount(() => {
      emitter.off('revalidateField', validateField);
    });

    // exposed methods and values
    const exposed = {
      // the event bus of the form.
      emitter,
      // the formatted label width of the form.
      formattedLabelWidth,
      // a method to validate all the form items by rules.
      validate,
      // a method to validate a single form item by rule.
      validateField,
      // a method to clear the value of some form item.
      clearField,
      // a method to clear all the values.
      clearFields,
      // a method to clear the validation states.
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
