<template>
  <div
    ref="upload"
    :class="{
      'a-upload': true,
      'a-upload--clickable': clickable,
    }"
    @click="handleUploadClick"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <slot v-if="showDefault"></slot>
    <slot v-if="dragging" name="dragging"></slot>
    <slot v-if="compStatus === 'uploading'" name="uploading"></slot>
    <slot v-if="compStatus === 'error'" name="error"></slot>
    <slot v-if="compStatus === 'success'" name="success"></slot>
    <input ref="fileInput" type="file" hidden />
  </div>
</template>

<script lang="ts">
// This component itself doesn't trigger or handle any upload operation.
// It's just a template and supports exposing dropped files to its parent.
import { defineComponent, PropType } from 'vue';
import type { UploadStatus } from './types';

export default defineComponent({
  name: 'AUpload',
  props: {
    // the upload status of the uploader, can be 'default', 'uploading', 'error', 'success'.
    status: {
      type: String as PropType<UploadStatus>,
      default: '',
    },
    // if true, the uploader will be clickable
    clickable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['upload'],
  data() {
    return {
      dragging: false,
      compStatus: 'default',
    };
  },
  computed: {
    showDefault() {
      return (this.compStatus === 'default' || !this.compStatus) && !this.dragging;
    },
  },
  watch: {
    status(val) {
      this.compStatus = val;
    },
  },
  mounted() {
    const files = this.$refs.fileInput as HTMLElement;
    files.addEventListener('change', this.handleFileChanged);
  },
  methods: {
    handleDragEnter(e: DragEvent) {
      this.dragging = true;
      e.preventDefault();
    },
    handleDragOver(e: DragEvent) {
      e.preventDefault();
    },
    handleDragLeave(e: DragEvent) {
      const currentTarget = e.currentTarget as HTMLElement;
      if (currentTarget?.contains(e.relatedTarget as HTMLElement)) {
        return;
      }
      this.dragging = false;
    },
    handleDrop(e: DragEvent) {
      if (!e.dataTransfer) {
        return;
      }
      const files = e.dataTransfer.files;
      if (files?.length) {
        // will be emitted when a file is chosen by user or be dropped in the uploader by user.
        this.$emit('upload', files[0]);
      }
      this.dragging = false;
      e.preventDefault();
      e.stopPropagation();
    },
    handleUploadClick() {
      if (!this.clickable) {
        return;
      }
      (this.$refs.fileInput as HTMLElement | undefined)?.click();
    },
    handleFileChanged(e: Event) {
      this.$emit('upload', (e.target as any)?.files?.[0]);
    },
  },
});
</script>

<style lang="scss">
.a-upload {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  filter: drop-shadow(2px 2px 4px var(--shadow-10));
  border: 2px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.a-upload--clickable {
  cursor: pointer;
}
</style>
