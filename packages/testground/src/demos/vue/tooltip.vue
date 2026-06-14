<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Placements (hover trigger)</div>
      <div class="demo-row">
        <a-tooltip content="Tooltip on top" placement="top">
          <a-button>Top</a-button>
        </a-tooltip>
        <a-tooltip content="Tooltip on bottom" placement="bottom">
          <a-button>Bottom</a-button>
        </a-tooltip>
        <a-tooltip content="Tooltip on the left" placement="left">
          <a-button>Left</a-button>
        </a-tooltip>
        <a-tooltip content="Tooltip on the right" placement="right">
          <a-button>Right</a-button>
        </a-tooltip>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Click trigger &amp; states</div>
      <div class="demo-row">
        <a-tooltip
          content="You clicked the trigger"
          triggerType="click"
          @visible-change="handleVisibleChange"
        >
          <a-button type="primary">Click Me</a-button>
        </a-tooltip>
        <a-tooltip content="You will never see me" disabled>
          <a-button>Disabled Tooltip</a-button>
        </a-tooltip>
        <a-tooltip content="Shows after 500ms" :openDelay="500">
          <a-button>Open Delay (500ms)</a-button>
        </a-tooltip>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Rich content &amp; max width</div>
      <div class="demo-row">
        <a-tooltip placement="bottom" :maxWidth="220">
          <a-button>Rich Content</a-button>
          <template #content>
            <strong>Pro tip</strong><br />
            Use the <em>content</em> slot for rich tooltips, long text wraps at the configured max
            width.
          </template>
        </a-tooltip>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Visible state</div>
      <div class="demo-row">
        <span>{{ visible ? 'visible' : 'hidden' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const handleVisibleChange = (value: boolean) => {
  visible.value = value;
};
</script>
