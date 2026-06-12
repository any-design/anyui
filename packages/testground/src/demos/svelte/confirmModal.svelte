<script lang="ts">
  import { Button, ConfirmModal, confirmModal } from '@any-design/anyui-svelte';
  import type { ConfirmModalType } from '@any-design/anyui-svelte';

  let result = $state<boolean | null>(null);
  let modalVisible = $state(false);
  let applying = $state(false);

  const ask = async (type: ConfirmModalType) => {
    result = await confirmModal({
      title: type === 'danger' ? 'Delete item' : 'Save changes',
      content:
        type === 'danger'
          ? 'The item will be permanently deleted.'
          : 'Your changes will be saved to the cloud.',
      confirmText: type === 'danger' ? 'Delete' : 'Save',
      type,
    });
  };

  const onApply = () => {
    applying = true;
    setTimeout(() => {
      applying = false;
      modalVisible = false;
      result = true;
    }, 1500);
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Imperative helper</div>
    <div class="demo-row">
      <Button type="primary" onClick={() => ask('primary')}>Confirm</Button>
      <Button type="danger" onClick={() => ask('danger')}>Danger confirm</Button>
      <span>Result: {result === null ? 'none' : result}</span>
    </div>
  </div>
  <div class="demo-block">
    <div class="demo-block__label">Component with loading</div>
    <div class="demo-row">
      <Button onClick={() => (modalVisible = true)}>Open modal</Button>
      <ConfirmModal
        bind:modelValue={modalVisible}
        title="Apply changes"
        content="Applying will restart the service. Continue?"
        confirmText="Apply"
        loading={applying}
        closeOnConfirm={false}
        onConfirm={onApply}
        onCancel={() => (result = false)}
      />
    </div>
  </div>
</div>
