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
    </div>
    <a-split margin="14"></a-split>
    <div class="testground-footer">
      <Logo class="logo" />
      <span class="text">Any Design</span>
      <a href="https://github.com/any-design/anyui" target="_blank"
        ><GitHubIcon class="github"
      /></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonSection from './sections/button.vue';
import ClickableTextSection from './sections/clickableText.vue';
import GradientTextSection from './sections/gradientText.vue';
import InputSection from './sections/input.vue';
import CardSection from './sections/card.vue';
import SplitSection from './sections/split.vue';
import FloatSection from './sections/float.vue';
import StepSection from './sections/step.vue';
import UploadSection from './sections/upload.vue';
import ImageSection from './sections/image.vue';
import PopperSection from './sections/popper.vue';
import PopMenuSection from './sections/popmenu.vue';
import FormSection from './sections/form.vue';
import MessageSection from './sections/message.vue';
import Logo from './icon/Logo.vue';
import GitHubIcon from './icon/GitHub.vue';

export default defineComponent({
  components: {
    ButtonSection,
    ClickableTextSection,
    GradientTextSection,
    InputSection,
    CardSection,
    SplitSection,
    FloatSection,
    StepSection,
    UploadSection,
    ImageSection,
    PopperSection,
    PopMenuSection,
    FormSection,
    MessageSection,
    Logo,
    GitHubIcon,
  },
});
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
      * {
        margin-right: 18px;
      }
      *:last-child {
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
      transition: 100ms;
    }
    .github:hover {
      opacity: 0.35;
    }
  }
}
</style>
