<template>
  <a-popper
    ref="popper"
    :placement="placement"
    :offset="offset"
    :hideDelay="hideDelay"
    :appendToBody="appendToBody"
    :transition="transition"
    :zIndex="zIndex"
    :popupClass="popupClass"
    :triggerType="popperTriggerType"
    @popupStatusChanged="handlePopupStatusChanged"
  >
    <span
      v-if="useManualHover"
      class="a-tooltip__trigger"
      @mouseenter="handleTriggerEnter"
      @mouseleave="handleTriggerLeave"
    >
      <slot></slot>
    </span>
    <slot v-else></slot>
    <template #popup>
      <div class="a-tooltip" :style="tooltipStyle">
        <slot name="content">{{ content }}</slot>
      </div>
    </template>
  </a-popper>
</template>

<script lang="ts">
import type { Placement } from '@popperjs/core';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { formatStyleSize } from '../../utils';
import APopper from '../popper';
import type { APopperTriggerType } from '../popper/types';

// A compact tooltip based on popper, with plain text or rich content support.
export default defineComponent({
  name: 'ATooltip',
  components: {
    APopper,
  },
  props: {
    // the text content of the tooltip, can be overridden by the "content" slot
    content: {
      type: String,
      default: '',
    },
    // the placement position of the tooltip, same as the APopper component
    placement: {
      type: String as PropType<Placement>,
      default: 'top',
    },
    // the trigger type of the tooltip
    triggerType: {
      type: String as PropType<Extract<APopperTriggerType, 'click' | 'hover'>>,
      default: 'hover',
    },
    // the tooltip position offset to the trigger element, unit is px
    offset: {
      type: Number,
      default: 8,
    },
    // if true, the tooltip will not show
    disabled: {
      type: Boolean,
      default: false,
    },
    // the max width of the tooltip panel, unit is px
    maxWidth: {
      type: [Number, String],
      default: 260,
    },
    // delay before the tooltip shows on hover, unit is ms
    openDelay: {
      type: Number,
      default: 0,
    },
    // tooltip hide delay when mouse moves out, unit is ms
    hideDelay: {
      type: Number,
      default: 100,
    },
    // the z-index of the tooltip popper
    zIndex: {
      type: Number,
      default: 3000,
    },
    // if true, the tooltip will be appended to body
    appendToBody: {
      type: Boolean,
      default: true,
    },
    // the transition class name
    transition: {
      type: String,
      default: 'a-trans-popmenu',
    },
    // the class applied to the popup
    popupClass: {
      type: String,
    },
  },
  emits: ['visible-change'],
  data() {
    return {
      openTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
      closeTimeout: undefined as ReturnType<typeof setTimeout> | undefined,
    };
  },
  computed: {
    // when an open delay is needed on hover, the popper is driven manually
    useManualHover(): boolean {
      return !this.disabled && this.triggerType === 'hover' && this.openDelay > 0;
    },
    popperTriggerType(): APopperTriggerType {
      if (this.disabled || this.useManualHover) {
        return 'manual';
      }
      return this.triggerType;
    },
    tooltipStyle() {
      return {
        maxWidth: formatStyleSize(this.maxWidth),
      };
    },
  },
  beforeUnmount() {
    this.clearTimers();
  },
  methods: {
    clearTimers() {
      if (this.openTimeout) {
        clearTimeout(this.openTimeout);
        this.openTimeout = undefined;
      }
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = undefined;
      }
    },
    getPopperRef() {
      return this.$refs.popper as InstanceType<typeof APopper> | undefined;
    },
    handleTriggerEnter() {
      this.clearTimers();
      this.openTimeout = setTimeout(() => {
        this.getPopperRef()?.show();
      }, this.openDelay);
    },
    handleTriggerLeave() {
      this.clearTimers();
      this.closeTimeout = setTimeout(() => {
        this.getPopperRef()?.hide();
      }, this.hideDelay);
    },
    handlePopupStatusChanged(visible: boolean) {
      // will be emitted when the tooltip visibility changed
      this.$emit('visible-change', visible);
    },
  },
});
</script>

<style lang="scss">
.a-tooltip {
  box-sizing: border-box;
  width: max-content;
  padding: 6px 12px;
  border-radius: var(--a-radius-sm, 10px);
  font-size: 12.5px;
  line-height: 18px;
  // inverted surface: dark panel on light theme, flips automatically in dark
  // theme since the color variables flip — intentionally no backdrop blur
  background: color-mix(in srgb, var(--text) 92%, transparent);
  color: var(--bg-bright);
  box-shadow: var(--a-shadow-md, 0 4px 10px var(--shadow-5));
  overflow-wrap: break-word;
}

.a-tooltip__trigger {
  height: max-content;
}
</style>
