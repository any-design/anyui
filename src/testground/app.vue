<template>
  <div class="testground">
    <div class="testground-title">
      <span>AnyUI Component TestGround</span>
    </div>
    <div class="testground-content">
      <ButtonSection />
      <ClickableTextSection />
      <GradientTextSection />
      <InputSection />
      <SelectSection />
      <RadioSection />
      <RadioButtonGroupSection />
      <CheckboxSection />
      <CardSection />
      <SplitSection />
      <FloatSection />
      <StepSection />
      <UploadSection />
      <ImageSection />
      <PopperSection />
      <PopMenuSection />
      <FormSection />
      <MessageSection />
      <LayoutSection />
      <ListMenuSection />
      <TagSection />
      <TextareaSection />
      <CollapseSection />
      <LoadingSection />
      <SpinnerSection />
      <DrawerSection />
      <PaginationSection />
      <VirtualListSection />
      <ChatSection />
      <MasonrySection />
    </div>
    <a-split margin="14"></a-split>
    <div class="testground-footer">
      <Logo class="logo" />
      <span class="text"
        >Any Design <span class="text" style="margin-left: 12px">v{{ version }}</span></span
      >

      <a href="https://github.com/any-design/anyui" target="_blank">
        <Icon class="github" icon="mdi:github" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { Icon } from '@iconify/vue';

import { version } from '../../package.json';

const ButtonSection = defineAsyncComponent(() => import('./sections/button.vue'));
const ClickableTextSection = defineAsyncComponent(() => import('./sections/clickableText.vue'));
const GradientTextSection = defineAsyncComponent(() => import('./sections/gradientText.vue'));
const InputSection = defineAsyncComponent(() => import('./sections/input.vue'));
const SelectSection = defineAsyncComponent(() => import('./sections/select.vue'));
const RadioSection = defineAsyncComponent(() => import('./sections/radio.vue'));
const RadioButtonGroupSection = defineAsyncComponent(
  () => import('./sections/radioButtonGroup.vue'),
);
const CheckboxSection = defineAsyncComponent(() => import('./sections/checkbox.vue'));
const CardSection = defineAsyncComponent(() => import('./sections/card.vue'));
const SplitSection = defineAsyncComponent(() => import('./sections/split.vue'));
const FloatSection = defineAsyncComponent(() => import('./sections/float.vue'));
const StepSection = defineAsyncComponent(() => import('./sections/step.vue'));
const UploadSection = defineAsyncComponent(() => import('./sections/upload.vue'));
const ImageSection = defineAsyncComponent(() => import('./sections/image.vue'));
const PaginationSection = defineAsyncComponent(() => import('./sections/pagination.vue'));
const PopperSection = defineAsyncComponent(() => import('./sections/popper.vue'));
const PopMenuSection = defineAsyncComponent(() => import('./sections/popmenu.vue'));
const FormSection = defineAsyncComponent(() => import('./sections/form.vue'));
const MessageSection = defineAsyncComponent(() => import('./sections/message.vue'));
const LayoutSection = defineAsyncComponent(() => import('./sections/layout.vue'));
const ListMenuSection = defineAsyncComponent(() => import('./sections/listMenu.vue'));
const TagSection = defineAsyncComponent(() => import('./sections/tag.vue'));
const TextareaSection = defineAsyncComponent(() => import('./sections/textarea.vue'));
const CollapseSection = defineAsyncComponent(() => import('./sections/collapse.vue'));
const LoadingSection = defineAsyncComponent(() => import('./sections/loading.vue'));
const DrawerSection = defineAsyncComponent(() => import('./sections/drawer.vue'));
const SpinnerSection = defineAsyncComponent(() => import('./sections/spinner.vue'));
const MasonrySection = defineAsyncComponent(() => import('./sections/masonry.vue'));
const VirtualListSection = defineAsyncComponent(() => import('./sections/virtualList.vue'));
const ChatSection = defineAsyncComponent(() => import('./sections/chat.vue'));
const Logo = defineAsyncComponent(() => import('./icon/Logo.vue'));
</script>

<style lang="scss">
.testground {
  width: 100vw;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  user-select: none;

  &-title {
    height: 72px;
    line-height: 72px;
    font-size: 28px;
    letter-spacing: 0.05rem;
    font-weight: 600;
  }

  &-content {
    &-title {
      font-weight: 600;
      font-size: 18px;
      margin: 8px 0 12px 0;
    }

    &__item {
      margin-bottom: 24px;
    }

    .testground-flex {
      display: flex;

      > * {
        margin-right: 18px;
      }

      > *:last-child {
        margin-right: 0;
      }
    }
  }

  &-footer {
    display: flex;
    padding-bottom: 16px;
    align-items: center;
    user-select: none;

    .logo {
      width: 26px;
      height: 26px;
      margin-right: 12px;

      path {
        fill: var(--text-secondary);
      }
    }

    .text {
      color: var(--text-secondary);
      opacity: 0.8;
      flex: 1;
      font-size: 14px;
    }

    .github {
      opacity: 0.2;
      transition: 100ms;
      width: 24px;
      height: 24px;
    }

    .github:hover {
      opacity: 0.35;
    }
  }
}
</style>
