<script lang="ts">
  import { Accordion, AccordionItem } from '@any-design/anyui-svelte';

  let single = $state<string | number | undefined>(1);
  let multi = $state<Array<string | number>>([1]);
</script>

<div>
  <div class="demo-block">
    <div class="demo-block__label">Single (accordion)</div>
    <div class="demo-row">
      <Accordion bind:modelValue={single} style="flex:1;max-width:420px">
        <AccordionItem value={1} title="What is AnyUI?">
          AnyUI is a cross-framework component library targeting Vue, React and Svelte.
        </AccordionItem>
        <AccordionItem value={2} title="Is it themeable?">
          Yes — every component ships with CSS variables and a token-based theme.
        </AccordionItem>
        <AccordionItem value={3} title="Disabled item" disabled>
          This item cannot be opened.
        </AccordionItem>
      </Accordion>
    </div>
  </div>

  <div class="demo-block">
    <div class="demo-block__label">Multiple</div>
    <div class="demo-row">
      <Accordion bind:modelValue={multi} mode="multiple" round style="flex:1;max-width:420px">
        <AccordionItem value={1} title="First section">
          Several panels can stay open at the same time.
        </AccordionItem>
        <AccordionItem value={2} title="Second section">
          Toggle each independently.
        </AccordionItem>
        <AccordionItem value={3} title="Third section">
          Rounded corners via the round prop.
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</div>