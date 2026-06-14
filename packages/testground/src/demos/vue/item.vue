<template>
  <div>
    <div class="demo-block">
      <div class="demo-block__label">List inside a card</div>
      <div class="demo-row">
        <a-card width="380" clean>
          <a-item
            title="Enable notifications"
            description="Get notified when someone mentions you in a thread."
            clickable
            @click="handleClick('notifications')"
          >
            <template #media>
              <Icon icon="uil:bell" />
            </template>
            <template #actions>
              <a-tag size="small">New</a-tag>
            </template>
          </a-item>
          <a-item
            title="Sync across devices"
            description="Your preferences follow you on every device, even offline. Changes are merged automatically when you reconnect."
            clickable
            @click="handleClick('sync')"
          >
            <template #media>
              <Icon icon="uil:sync" />
            </template>
            <template #actions>
              <a-button size="small">Configure</a-button>
            </template>
          </a-item>
          <a-item
            title="Danger zone"
            description="This item is disabled and cannot be interacted with."
            clickable
            disabled
          >
            <template #media>
              <Icon icon="uil:shield-exclamation" />
            </template>
          </a-item>
        </a-card>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Outline variant &amp; link</div>
      <div class="demo-col" style="max-width: 380px">
        <a-item
          variant="outline"
          title="Open the documentation"
          description="Renders as an anchor element when href is provided."
          href="https://github.com/any-design/anyui"
          clickable
        >
          <template #media>
            <Icon icon="uil:book-open" />
          </template>
          <template #actions>
            <Icon icon="uil:angle-right-b" />
          </template>
        </a-item>
        <a-item variant="outline" size="small" title="Small outline item" clickable>
          <template #media>
            <Icon icon="uil:setting" />
          </template>
        </a-item>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Custom content (default slot)</div>
      <div class="demo-row">
        <a-item variant="outline">
          <span>
            Anything can live here — the default slot overrides the title and description area.
          </span>
        </a-item>
      </div>
    </div>
    <div class="demo-block">
      <div class="demo-block__label">Last clicked</div>
      <div class="demo-row">
        <span>{{ lastClicked || '(none)' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const lastClicked = ref('');

const handleClick = (id: string) => {
  lastClicked.value = id;
};
</script>
