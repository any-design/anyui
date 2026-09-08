<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">Implicit values &amp; kept state</div>
      <a-tabs class="implicit-tabs" @change="implicitTab = $event">
        <template #tab>
          <a-tab disabled>Unavailable</a-tab>
          <a-tab>First</a-tab>
          <a-tab>Second</a-tab>
          <a-tab disabled>Disabled last</a-tab>
        </template>
        <a-tab-panel>Unavailable panel</a-tab-panel>
        <a-tab-panel keep-alive><a-input placeholder="Your note stays here" /></a-tab-panel>
        <a-tab-panel lazy><p>Second implicit panel</p><a-input placeholder="Mounted on first visit" /></a-tab-panel>
        <a-tab-panel>Disabled panel</a-tab-panel>
      </a-tabs>
      <span>Last selected index: {{ implicitTab ?? 'none' }}</span>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Default</div>
      <div class="demo-row">
        <a-tabs v-model="defaultTab" style="flex: 1">
          <template #tab>
            <a-tab :value="1">Profile</a-tab>
            <a-tab :value="2">Settings</a-tab>
            <a-tab :value="3" disabled>Disabled</a-tab>
          </template>
          <a-tab-panel :value="1">
            <p>Profile content — edit your account info here.</p>
          </a-tab-panel>
          <a-tab-panel :value="2">
            <p>Settings content — tweak your preferences.</p>
          </a-tab-panel>
          <a-tab-panel :value="3">
            <p>This panel is unreachable because the tab is disabled.</p>
          </a-tab-panel>
        </a-tabs>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-block__label">Card</div>
      <div class="demo-row">
        <a-tabs v-model="card" type="card" style="flex: 1">
          <template #tab>
            <a-tab :value="1">Overview</a-tab>
            <a-tab :value="2">Activity</a-tab>
          </template>
          <a-tab-panel :value="1"><p>Overview panel.</p></a-tab-panel>
          <a-tab-panel :value="2"><p>Activity feed.</p></a-tab-panel>
        </a-tabs>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-block__label">Sizes</div>
      <div class="demo-col">
        <a-tabs v-model="sized" size="small">
          <template #tab>
            <a-tab :value="1">S</a-tab>
            <a-tab :value="2">M</a-tab>
          </template>
          <a-tab-panel :value="1"><p>small</p></a-tab-panel>
          <a-tab-panel :value="2"><p>small-2</p></a-tab-panel>
        </a-tabs>
        <a-tabs v-model="sized" size="large">
          <template #tab>
            <a-tab :value="1">L</a-tab>
            <a-tab :value="2">M</a-tab>
          </template>
          <a-tab-panel :value="1"><p>large</p></a-tab-panel>
          <a-tab-panel :value="2"><p>large-2</p></a-tab-panel>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const defaultTab = ref(1);
const card = ref(1);
const sized = ref(1);
const implicitTab = ref<string | number>();
</script>
