<script lang="ts">
  import { setContext, untrack } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { ATabsSize, ATabsPosition, ATabsType } from '../types';

  import type { TabsContext, TabRegistration } from './tabs-context';

  let {
    modelValue = $bindable(undefined),
    type = 'default' as ATabsType,
    size = 'default' as ATabsSize,
    position = 'top' as ATabsPosition,
    autoSelect = true,
    class: className = '',
    children = undefined,
    onUpdateModelValue = undefined,
    onChange = undefined,
    ...rest
  } = $props();

  const id = $props.id();
  let tabCounter = 0;
  let panelCounter = 0;
  let tabs = $state.raw<TabRegistration[]>([]);
  let panels = $state.raw<Array<{ token: symbol; render: Snippet }>>([]);
  // Resolve on demand so registrations made while rendering children are also
  // visible during SSR, where derived declarations do not rerun.
  const getFirstValue = () => tabs.find((tab) => !tab.disabled())?.value();
  const getSelected = () => modelValue ?? (autoSelect ? getFirstValue() : undefined);
  const getFocusValue = () =>
    tabs.some((tab) => !tab.disabled() && tab.value() === getSelected()) ? getSelected() : getFirstValue();

  setContext<TabsContext>('anyui:tabs', {
    nextTabIndex: () => tabCounter++,
    nextPanelIndex: () => panelCounter++,
    getSelected,
    getFocusValue,
    tabId: (value) => `${id}-tab-${typeof value}-${encodeURIComponent(String(value))}`,
    panelId: (value) => `${id}-panel-${typeof value}-${encodeURIComponent(String(value))}`,
    select: (value) => {
      modelValue = value;
      onUpdateModelValue?.(value);
      onChange?.(value);
    },
    registerTab: (tab) => {
      untrack(() => {
        tabs = [...tabs, tab];
      });
      return () =>
        untrack(() => {
          tabs = tabs.filter((entry) => entry !== tab);
        });
    },
    registerPanel: (render) => {
      const token = Symbol();
      untrack(() => {
        panels = [...panels, { token, render }];
      });
      return () =>
        untrack(() => {
          panels = panels.filter((entry) => entry.token !== token);
        });
    },
  });

  const rootClass = $derived(
    'a-tabs a-tabs--' +
      type +
      (size !== 'default' ? ' a-tabs--' + size : '') +
      (position !== 'top' ? ' a-tabs--' + position : '') +
      (className ? ' ' + className : ''),
  );
</script>

<div {...rest} class={rootClass}>
  <div class="a-tabs__bar" role="tablist" aria-orientation="horizontal">
    {@render children?.()}
  </div>
  <div class="a-tabs__content">
    {#each panels as panel (panel.token)}
      {@render panel.render()}
    {/each}
  </div>
</div>
