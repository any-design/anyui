<template>
  <div class="testground">
    <div class="testground-title">
      <span>AnyUI Component TestGround</span>
    </div>
    <div class="testground-content">
      <div class="testground-content__item">
        <p class="testground-content-title">Button</p>
        <div class="testground-flex">
          <a-button>Default</a-button>
          <a-button type="primary">Primary</a-button>
          <a-button type="primary" round>Round</a-button>
          <a-button type="primary" round anim>Anim</a-button>
          <a-button size="large" round>Large</a-button>
          <a-button size="small" round>Small</a-button>
          <a-button type="primary" round :disabled="true">Disabled</a-button>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Clickable Text</p>
        <div class="testground-flex">
          <a-clickable-text>Default</a-clickable-text>
          <a-clickable-text type="primary">Primary</a-clickable-text>
          <a-clickable-text type="secondary">Secondary</a-clickable-text>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Gradient Text</p>
        <div class="testground-flex">
          <a-gradient-text size="24px">Default</a-gradient-text>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Input</p>
        <div class="testground-flex">
          <a-input placeholder="Default"></a-input>
          <a-input placeholder="Round" round></a-input>
          <a-input placeholder="With Icon">
            <template v-slot:prefix>
              <SearchIcon />
            </template>
          </a-input>
          <a-input placeholder="Large" size="large"></a-input>
          <a-input placeholder="Disabled" :disabled="true"></a-input>
          <a-input v-model="readOnlyText" placeholder="Read Only" :readonly="true"></a-input>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Card</p>
        <div class="testground-flex">
          <a-card>
            <p>No Header</p>
          </a-card>
          <a-card title="Title">
            <p>With header</p>
          </a-card>
          <a-card>
            <p>With footer</p>
            <template v-slot:footer>
              <p>This is a footer</p>
            </template>
          </a-card>
          <a-card title="Title">
            <p>With header and footer</p>
            <template v-slot:footer>
              <p>This is a footer</p>
            </template>
          </a-card>
          <a-card clean>
            <p>This is a clean card</p>
            <template v-slot:footer>
              <p>This is a footer</p>
            </template>
          </a-card>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Split</p>
        <div class="testground-flex">
          <a-split></a-split>
          <a-split height="4px" round></a-split>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Float</p>
        <div class="testground-flex">
          <a-button type="primary" @click="() => (floatVisible = true)">Show</a-button>
          <a-float v-model:visible="floatVisible">
            <p>This is a float.</p>
          </a-float>
        </div>
      </div>
      <div class="testground-content__item">
        <p class="testground-content-title">Step</p>
        <div style="display: flex; margin-bottom: 20px">
          <a-button round size="small" style="margin-right: 8px" @click="addCurrentStep(-1)"
            >Prev</a-button
          >
          <a-button round size="small" @click="addCurrentStep(1)">Next</a-button>
        </div>
        <div style="margin-bottom: 24px">
          <a-step :steps="4" :current="currentStep"></a-step>
        </div>
        <div>
          <a-step :steps="demoSteps" :current="currentStep"></a-step>
        </div>
      </div>
    </div>
    <div class="testground-content__item">
      <p class="testground-content-title">Upload</p>
      <div style="display: flex; margin-bottom: 20px">
        <a-button
          round
          size="small"
          style="margin-right: 8px"
          @click="updateUploadStatus('uploading')"
          >Uploading</a-button
        >
        <a-button round size="small" style="margin-right: 8px" @click="updateUploadStatus('error')"
          >Error</a-button
        >
        <a-button
          round
          size="small"
          style="margin-right: 8px"
          @click="updateUploadStatus('success')"
          >Success</a-button
        >
      </div>
      <div style="width: 200px; height: 200px">
        <a-upload :status="uploadStatus">
          <span>Default</span>
          <template v-slot:dragging>
            <span>Dragging</span>
          </template>
          <template v-slot:uploading>
            <span>Uploading</span>
          </template>
          <template v-slot:error>
            <span>Error</span>
          </template>
          <template v-slot:success>
            <span>Success</span>
          </template>
        </a-upload>
      </div>
    </div>
    <div class="testground-content__item">
      <p class="testground-content-title">Image</p>
      <div class="textground-flex">
        <a-image
          src="https://avatars.githubusercontent.com/u/93182835?s=200&v=4"
          width="200"
          height="200"
        >
          <template v-slot:loading><span>Loading</span></template>
          <template v-slot:error><span>Error</span></template>
        </a-image>
      </div>
    </div>
    <div class="testground-content__item">
      <p class="testground-content-title">Popper</p>
      <div class="textground-flex">
        <a-popper>
          <template v-slot:popup>
            <span>popup</span>
          </template>
          <span>trigger</span>
        </a-popper>
      </div>
    </div>
    <div class="testground-content__item">
      <p class="testground-content-title">PopMenu</p>
      <div class="textground-flex">
        <a-popup-menu :items="['Item 1', 'Item 2', 'Item 3', 'Item 4']">
          <span>trigger</span>
        </a-popup-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchIcon from './icon/Search.vue';
export default defineComponent({
  components: {
    SearchIcon,
  },
  data() {
    return {
      readOnlyText: 'This is a read only input',
      floatVisible: false,
      currentStep: 1,
      demoSteps: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
      uploadStatus: '',
    };
  },
  methods: {
    addCurrentStep(v: number) {
      const res = this.currentStep + v;
      if (res > 4) {
        this.currentStep = 4;
        return;
      }
      if (res < 1) {
        this.currentStep = 1;
        return;
      }
      this.currentStep = res;
    },
    updateUploadStatus(status: string) {
      this.uploadStatus = status;
    },
  },
});
</script>


<style lang="scss" scoped>
.testground {
  width: 100vw;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  user-select: none;
  &-title {
    height: 56px;
    line-height: 56px;
    font-size: 24px;
    letter-spacing: 0.05rem;
    font-weight: 600;
  }
  &-content {
    &-title {
      font-weight: 600;
      font-size: 18px;
      margin: 12px 0;
    }
    &:deep(.testgroud-content-title) {
      margin-bottom: 16px;
    }
    &__item {
      margin-bottom: 24px;
    }
  }
  &:deep(.testground-flex) {
    display: flex;
    * {
      margin-right: 18px;
    }
    *:last-child {
      margin-right: 0;
    }
  }
}
</style>
