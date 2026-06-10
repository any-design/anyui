<script lang="ts">
  import { setContext } from 'svelte';
  import { get, writable } from 'svelte/store';
  import ValidateSchema from 'async-validator';
  import type { Rules } from 'async-validator';
  import type { FormRuleItem } from '../types';
  export let modelValue: Record<string, unknown> = {};
  export let rules: Record<string, FormRuleItem[]> = {};
  export let layout = 'default';
  export let labelWidth: string | number = '20%';
  export let className = '';
  export { className as class };
  const validation = writable<Record<string, { isValid: boolean; message: string }>>({});
  const clearSignals = writable<Record<string, number>>({});
  const clearAllSignal = writable(0);
  const normalizedRules = () => {
    const result: Record<string, FormRuleItem[]> = {};
    Object.entries(rules ?? {}).forEach(([field, fieldRules]) => {
      const rawRules = Array.isArray(fieldRules) ? fieldRules : [fieldRules as FormRuleItem];
      result[field] = rawRules.map((rule) => (rule.triggerType ? rule : { ...rule, triggerType: 'change' }));
    });
    return result;
  };
  const markFieldsValid = (field?: string) => {
    const fields = field ? [field] : Object.keys(normalizedRules());
    validation.update((current) => {
      const next = { ...current };
      fields.forEach((item) => {
        next[item] = { isValid: true, message: '' };
      });
      return next;
    });
  };
  const markErrors = (errors: Array<{ field?: string; message?: string }> = []) => {
    validation.update((current) => {
      const next = { ...current };
      errors.forEach((error) => {
        if (!error.field) return;
        next[error.field] = { isValid: false, message: error.message || error.field + ' is invalid' };
      });
      return next;
    });
  };
  const context = {
    get modelValue() {
      return modelValue;
    },
    get rules() {
      return normalizedRules();
    },
    get labelWidth() {
      return labelWidth;
    },
    validation,
    clearSignals,
    clearAllSignal,
    validateField,
    clearField,
  };
  setContext('anyui-form', context);
  export async function validate() {
    const currentRules = normalizedRules();
    if (!Object.keys(currentRules).length) {
      console.warn('[AnyUI][Form] Form has no rules.');
      return true;
    }
    if (!modelValue) {
      throw new Error('Invalid form values.');
    }
    const validator = new ValidateSchema(currentRules as Rules);
    try {
      await validator.validate(modelValue);
      markFieldsValid();
      return true;
    } catch (error: any) {
      markErrors(error?.errors);
      return false;
    }
  }
  export async function validateField(field: string) {
    const currentRules = normalizedRules();
    if (!Object.keys(currentRules).length) {
      console.warn('[AnyUI][Form] Form has no rules.');
      return true;
    }
    if (!modelValue) {
      throw new Error('Invalid form values.');
    }
    const rule = currentRules[field];
    if (!rule) {
      console.warn('[AnyUI][Form] Form has no rule for validating field ' + field + '.');
      return true;
    }
    const validator = new ValidateSchema({ [field]: rule } as Rules);
    try {
      await validator.validate(modelValue);
      markFieldsValid(field);
      return true;
    } catch (error: any) {
      markErrors(error?.errors);
      return false;
    }
  }
  export async function clearField(field: string) {
    clearSignals.update((current) => ({ ...current, [field]: (current[field] ?? 0) + 1 }));
    await clearValidation(field);
  }
  export async function clearFields() {
    clearAllSignal.update((current) => current + 1);
    await clearValidation();
  }
  export async function clearValidation(field?: string) {
    markFieldsValid(field);
  }
</script>

<div class="a-form {layout === 'inline' ? 'a-form--inline' : ''} {className}">
  <slot />
</div>
