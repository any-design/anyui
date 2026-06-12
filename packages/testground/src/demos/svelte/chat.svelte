<script lang="ts">
  import { Button, Chat } from '@any-design/anyui-svelte';
  import type { AChatMessage } from '@any-design/anyui-svelte';

  let counter = 0;

  let messages: AChatMessage[] = $state([
    { id: 'm1', content: 'AnyUI is a fantastic cute UI library.', role: 'target' },
    { id: 'm2', content: 'Now it also works in Svelte!', role: 'self' },
    { id: 'm3', content: 'Nice, let me try it out.', role: 'target' },
  ]);

  const composeContent = (lines: number) => {
    let content = '';
    for (let i = 0; i < lines; i += 1) {
      content += `${content ? '\n' : ''}Random content #${counter}-${i}`;
    }
    return content;
  };

  const addMessage = () => {
    counter += 1;
    messages = [
      ...messages,
      {
        id: `m_${counter}_${Date.now()}`,
        content: composeContent(Math.floor(Math.random() * 4) + 1),
        role: Math.random() > 0.5 ? 'self' : 'target',
      },
    ];
  };
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Chat</div>
    <div class="demo-col">
      <div class="chat-container" style="height: 280px; width: 100%;">
        <Chat {messages} />
      </div>
      <div class="demo-row">
        <Button type="primary" size="small" onClick={addMessage}>Add Message</Button>
      </div>
    </div>
  </div>
</div>
