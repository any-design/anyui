<template>
  <div>
    <div class="demo-row popper-demo-row">
      <a-popper placement="top">
        <template #popup>
          <div class="popper-card">
            <strong>Hover panel</strong>
            <p>A small floating panel above.</p>
          </div>
        </template>
        <a-button>Hover</a-button>
      </a-popper>

      <a-popper placement="bottom" trigger-type="click">
        <template #popup>
          <div class="popper-card">
            <strong>Click panel</strong>
            <p>Click outside to dismiss this.</p>
          </div>
        </template>
        <a-button type="primary">Click</a-button>
      </a-popper>

      <a-popper placement="bottom-start" trigger-type="contextmenu">
        <template #popup>
          <div class="popper-card">
            <strong>Context panel</strong>
            <p>Right-click outside, then trigger it again.</p>
          </div>
        </template>
        <a-button type="secondary">Right click</a-button>
      </a-popper>

      <a-popper ref="manualPopper" placement="right" trigger-type="manual">
        <template #popup>
          <div class="popper-card">
            <strong>Manual panel</strong>
            <p>Open can be fired repeatedly.</p>
            <a-button size="small" type="secondary" @click="manualPopper?.hide()">Close</a-button>
          </div>
        </template>
        <a-button @click="openManual">Open</a-button>
      </a-popper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';

const manualPopper = ref<{ show: () => void; hide: () => void }>();

const openManual = async () => {
  manualPopper.value?.hide();
  await nextTick();
  manualPopper.value?.show();
};
</script>

<style lang="scss" scoped>
.popper-demo-row {
  gap: 12px 14px;
}

.popper-card {
  padding: 12px 16px;
  border-radius: var(--a-radius, 14px);
  background: var(--a-surface, var(--bg-bright));
  border: 1px solid var(--line);
  box-shadow: var(--a-shadow-md, 0 4px 10px var(--shadow-5), 0 12px 28px -8px var(--shadow-10));
  color: var(--text);
  font-size: 13px;
  line-height: 1.5;
  max-width: 240px;

  strong {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 700;
  }

  p {
    margin: 0 0 10px;
    color: var(--text-secondary, var(--text));

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
