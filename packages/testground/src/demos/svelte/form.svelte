<script lang="ts">
  import { Button, Form, FormItem, Input } from '@any-design/anyui-svelte';
  import type { FormRuleItem } from '@any-design/anyui-svelte';

  let formRef = $state<{ validate?: () => Promise<boolean>; clearFields?: () => Promise<void> }>();

  const formData: Record<string, unknown> = $state({
    name: '',
    email: '',
  });

  const rules: Record<string, FormRuleItem[]> = {
    name: [{ required: true, message: 'Please input name' }],
    email: [{ required: true, message: 'Please input email', triggerType: 'blur' }],
  };

  let result = $state('');

  const submit = async () => {
    const valid = await formRef?.validate?.();
    result = valid ? 'Form is valid' : 'Form is invalid';
  };

  const clear = () => {
    formRef?.clearFields?.();
    result = '';
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Form with Validation</div>
    <div class="demo-col">
      <Form bind:this={formRef} modelValue={formData} {rules} labelWidth={64}>
        <FormItem prop="name" label="Name">
          <Input placeholder="Validates on change" onChange={(value: string) => (formData.name = value)} />
        </FormItem>
        <FormItem prop="email" label="Email">
          <Input placeholder="Validates on blur" onChange={(value: string) => (formData.email = value)} />
        </FormItem>
        <FormItem>
          <div class="demo-row">
            <Button type="primary" onClick={submit}>Submit</Button>
            <Button onClick={clear}>Clear</Button>
          </div>
        </FormItem>
      </Form>
      {#if result}<span>{result}</span>{/if}
    </div>
  </div>
</div>
