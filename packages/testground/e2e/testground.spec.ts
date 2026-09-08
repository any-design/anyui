import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect, test, type Locator, type Page } from '@playwright/test';

type Framework = 'vue' | 'react' | 'svelte';

const frameworks: Framework[] = ['vue', 'react', 'svelte'];
const extensions: Record<Framework, string> = {
  vue: '.vue',
  react: '.tsx',
  svelte: '.svelte',
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testgroundRoot = path.resolve(__dirname, '..');
const demosRoot = path.join(testgroundRoot, 'src/demos');

const titleOf = (id: string) =>
  id.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (char) => char.toUpperCase());

const demoIdsByFramework = Object.fromEntries(
  frameworks.map((framework) => {
    const extension = extensions[framework];
    const ids = readdirSync(path.join(demosRoot, framework))
      .filter((fileName) => fileName.endsWith(extension))
      .map((fileName) => fileName.slice(0, -extension.length))
      .sort();

    return [framework, ids];
  }),
) as Record<Framework, string[]>;

const allDemoIds = [
  ...new Set(frameworks.flatMap((framework) => demoIdsByFramework[framework])),
].sort();

const demoMatrix = allDemoIds.map((id) => ({
  id,
  title: titleOf(id),
  frameworks: frameworks.filter((framework) => demoIdsByFramework[framework].includes(id)),
}));

const componentContracts: Record<string, string[]> = {
  accordion: ['.a-accordion', '.a-accordion-item'],
  alert: ['.a-alert'],
  avatar: ['.a-avatar'],
  button: ['.a-button'],
  card: ['.a-card'],
  chat: ['.a-chat', '.a-virtual-list'],
  checkbox: ['.a-checkbox'],
  clickableText: ['.a-clickable-text'],
  collapse: ['.a-button'],
  confirmModal: ['.a-button'],
  dialog: ['.a-button'],
  drawer: ['.a-button'],
  dropdownMenu: ['.a-button'],
  empty: ['.a-empty'],
  float: ['.a-button'],
  form: ['.a-form', '.a-form-item'],
  gradientText: ['.a-gradient-text'],
  grid: ['.a-grid-col'],
  image: ['.a-image'],
  input: ['.a-input'],
  item: ['.a-item'],
  kbd: ['.a-kbd'],
  layout: ['.a-layout'],
  listMenu: ['.a-list-menu'],
  listView: ['.a-list-view', '.a-list-view-item'],
  loading: ['.a-loading'],
  loadingMask: ['.a-loading-mask-wrapper'],
  masonry: ['.a-masonry'],
  message: ['.a-button'],
  otpInput: ['.a-otp-input'],
  pagination: ['.a-pagination'],
  popper: ['.a-popper__trigger'],
  popup: ['.a-button'],
  popupMenu: ['.a-popper__trigger'],
  progress: ['.a-progress[role="progressbar"]'],
  progressButton: ['.a-progress-button'],
  qrCode: ['.a-qr-code'],
  radio: ['.a-radio'],
  radioButtonGroup: ['.a-radio-button-group', '.a-radio-button'],
  scrollArea: ['.a-scroll-area'],
  select: ['.a-select__wrapper', '.a-select[role="combobox"]'],
  slider: ['.a-slider[role="slider"]'],
  spinner: ['.a-spinner'],
  split: ['.a-split'],
  step: ['.a-step'],
  switch: ['.a-switch[role="switch"]'],
  table: ['.a-table'],
  tabs: ['.a-tabs', '.a-tab[role="tab"]'],
  tag: ['.a-tag'],
  textarea: ['.a-textarea'],
  toast: ['.a-button'],
  tooltip: ['.a-popper__trigger'],
  upload: ['.a-upload'],
  virtualList: ['.a-virtual-list'],
};

const assertNoRuntimeErrors = (page: Page, runtimeErrors: string[]) => {
  expect(runtimeErrors, `runtime errors for ${page.url()}`).toEqual([]);
};

const installRuntimeErrorHooks = (page: Page, runtimeErrors: string[]) => {
  page.on('pageerror', (error) => {
    runtimeErrors.push(`pageerror: ${error.message}`);
  });

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    runtimeErrors.push(`console.error: ${message.text()}`);
  });
};

const openComponent = async (page: Page, id: string) => {
  await page.goto(`./#${id}`);
  await expect(page.getByTestId('testground-root')).toBeVisible();
  await expect(page.getByTestId('demo-grid')).toHaveAttribute('data-component-id', id);
};

const panelBody = (page: Page, framework: Framework) =>
  page.getByTestId(`framework-panel-body-${framework}`);

const isFrameworkEnabled = async (page: Page, framework: Framework) =>
  (await page.getByTestId(`framework-toggle-${framework}`).getAttribute('data-enabled')) === 'true';

const showOnlyFramework = async (page: Page, targetFramework: Framework) => {
  for (const framework of frameworks) {
    const enabled = await isFrameworkEnabled(page, framework);

    if (framework === targetFramework && !enabled) {
      await page.getByTestId(`framework-toggle-${framework}`).click();
    }

    if (framework !== targetFramework && enabled) {
      await page.getByTestId(`framework-toggle-${framework}`).click();
    }
  }

  await expect(page.getByTestId(`framework-panel-${targetFramework}`)).toBeVisible();

  for (const framework of frameworks) {
    if (framework !== targetFramework) {
      await expect(page.getByTestId(`framework-panel-${framework}`)).toHaveCount(0);
    }
  }
};

const openFrameworkComponent = async (page: Page, id: string, framework: Framework) => {
  await openComponent(page, id);
  await showOnlyFramework(page, framework);

  const body = panelBody(page, framework);
  await expect(body).toBeVisible();
  return body;
};

test('virtual list measures dynamic rows, clears and unmounts safely', async ({ page }) => {
  const runtimeErrors: string[] = [];
  installRuntimeErrorHooks(page, runtimeErrors);
  page.on('console', (message) => {
    if (message.type() === 'warning' && message.text().includes('inject()')) runtimeErrors.push(message.text());
  });
  const body = await openFrameworkComponent(page, 'virtualList', 'vue');
  const list = body.locator('.a-virtual-list');
  const rows = list.locator('.a-virtual-list__item');
  await expect(rows.first()).toBeVisible();
  await expect.poll(() => rows.count()).toBeGreaterThan(10);
  expect(await rows.count()).toBeLessThan(100);
  const inner = list.locator('.a-virtual-list__inner');
  const expectedHeight = await inner.evaluate((node) => (node as HTMLElement).offsetHeight + 120);
  await body.getByRole('button', { name: 'Resize first row', exact: true }).click();
  await expect.poll(() => inner.evaluate((node) => (node as HTMLElement).offsetHeight)).toBe(expectedHeight);
  await list.evaluate((node) => { node.scrollTop = 40000; });
  await expect.poll(() => rows.first().getAttribute('data-index')).not.toBe('0');
  expect(await rows.count()).toBeLessThan(100);

  await list.evaluate((node) => { node.scrollTop = 0; });
  await body.getByRole('button', { name: 'Reverse list', exact: true }).click();
  await expect(rows.first()).toHaveAttribute('data-id', '9999');
  await body.getByRole('button', { name: 'Clear list', exact: true }).click();
  await expect(rows).toHaveCount(0);
  await expect(inner).toHaveCSS('height', '0px');
  await body.getByRole('button', { name: 'Reset list', exact: true }).click();
  await expect(rows.first()).toBeVisible();
  await list.evaluate((node) => { node.scrollTop = 80000; });
  await page.locator('[data-testid="component-nav-item"][data-component-id="button"]').click();
  await expect(page.getByTestId('demo-grid')).toHaveAttribute('data-component-id', 'button');
  await expect(body.getByRole('button', { name: 'Count clicks', exact: true })).toBeVisible();
  assertNoRuntimeErrors(page, runtimeErrors);
});

const buttonWithText = (root: Locator, text: string) =>
  root.locator('.a-button').filter({ hasText: text }).first();

const checkedState = (locator: Locator) =>
  locator.evaluate(
    (element) =>
      element.classList.contains('a-checkbox--checked') ||
      element.classList.contains('a-radio--checked') ||
      element.classList.contains('a-radio-button--selected') ||
      element.classList.contains('a-switch--checked') ||
      element.getAttribute('aria-checked') === 'true',
  );

test.describe('AnyUI testground e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try {
        if (!sessionStorage.getItem('anyui-testground-prefs-reset')) {
          localStorage.removeItem('anyui-testground-prefs');
          sessionStorage.setItem('anyui-testground-prefs-reset', 'true');
        }
      } catch {
        // Ignore storage access errors from non-app documents.
      }
    });
  });

  test('component contract registry covers every demo id', () => {
    expect(Object.keys(componentContracts).sort()).toEqual(allDemoIds);
  });

  test('shell selects components and persists local view toggles', async ({ page }) => {
    const runtimeErrors: string[] = [];
    installRuntimeErrorHooks(page, runtimeErrors);

    await page.goto('./#button');

    await expect(page.getByTestId('testground-root')).toBeVisible();
    await expect(page.getByTestId('demo-grid')).toHaveAttribute('data-component-id', 'button');
    await expect(page.getByTestId('selected-title')).toHaveText('Button');
    await expect(
      page.locator('[data-testid="component-nav-item"][data-component-id="button"]'),
    ).toHaveClass(/tg-sidebar__item--active/);

    await page.getByTestId('theme-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('theme', 'dark');
    await expect(page.getByTestId('theme-toggle')).toHaveAttribute('data-enabled', 'true');

    await page.getByTestId('glass-toggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-anyui-style', 'glass');
    await expect(page.getByTestId('glass-toggle')).toHaveAttribute('data-enabled', 'true');

    await page.getByTestId('framework-toggle-react').click();
    await expect(page.getByTestId('framework-toggle-react')).toHaveAttribute(
      'data-enabled',
      'false',
    );
    await expect(page.getByTestId('framework-panel-react')).toHaveCount(0);
    await expect(page.getByTestId('framework-panel-vue')).toBeVisible();
    await expect(page.getByTestId('framework-panel-svelte')).toBeVisible();

    await page.locator('[data-testid="component-nav-item"][data-component-id="input"]').click();
    await expect(page).toHaveURL(/#input$/);
    await expect(page.getByTestId('demo-grid')).toHaveAttribute('data-component-id', 'input');
    await expect(page.getByTestId('selected-title')).toHaveText('Input');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('theme', 'dark');
    await expect(page.locator('html')).toHaveAttribute('data-anyui-style', 'glass');
    await expect(page.getByTestId('framework-toggle-react')).toHaveAttribute(
      'data-enabled',
      'false',
    );

    assertNoRuntimeErrors(page, runtimeErrors);
  });

  for (const entry of demoMatrix) {
    test(`${entry.id} renders expected framework demos`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      await page.goto(`./#${entry.id}`);

      await expect(page.getByTestId('testground-root')).toBeVisible();
      await expect(page.getByTestId('selected-title')).toHaveText(entry.title);
      await expect(page.getByTestId('demo-grid')).toHaveAttribute('data-component-id', entry.id);
      await expect(page.getByText('No Vue demo for this component yet')).toHaveCount(0);
      await expect(page.getByText('No React demo for this component yet')).toHaveCount(0);
      await expect(page.getByText('No Svelte demo for this component yet')).toHaveCount(0);

      for (const framework of frameworks) {
        const panel = page.getByTestId(`framework-panel-${framework}`);

        if (!entry.frameworks.includes(framework)) {
          await expect(panel).toHaveCount(0);
          continue;
        }

        await test.step(`${entry.id} ${framework} demo is mounted`, async () => {
          await expect(panel).toBeVisible();
          await expect(panel).toHaveAttribute('data-framework', framework);
          await expect(panel).toHaveAttribute('data-component-id', entry.id);

          const body = page.getByTestId(`framework-panel-body-${framework}`);
          await expect(body).toBeVisible();
          await expect(body.locator(':scope .demo-block, :scope .demo-row').first()).toBeVisible();
          await expect(body.locator(':scope *')).not.toHaveCount(0);

          for (const selector of componentContracts[entry.id]) {
            await expect(
              body.locator(selector).first(),
              `${entry.id} ${framework} ${selector}`,
            ).toBeVisible();
          }
        });
      }

      assertNoRuntimeErrors(page, runtimeErrors);
    });
  }

  for (const framework of frameworks) {
    test(`switch toggles checked state in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'switch', framework);
      const control = body.locator('.a-switch').first();

      await expect(control).toHaveAttribute('aria-checked', 'true');
      await expect(body.getByText(/Enabled:\s*true/)).toBeVisible();

      await control.click();

      await expect(control).toHaveAttribute('aria-checked', 'false');
      await expect(body.getByText(/Enabled:\s*false/)).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`checkbox toggles checked state in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'checkbox', framework);
      const checkbox = body.locator('.a-checkbox').first();
      const initial = await checkedState(checkbox);

      await checkbox.click();

      await expect.poll(() => checkedState(checkbox)).toBe(!initial);
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`accordion opens another item in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'accordion', framework);
      const item = body
        .locator('.a-accordion-item')
        .filter({ hasText: 'Is it themeable?' })
        .first();

      await item.locator('.a-accordion-item__header').click();

      await expect(item).toHaveClass(/a-accordion-item--expanded/);
      await expect(item.getByText(/token-based theme/)).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`button keyboard activation and blocked states in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);
      const body = await openFrameworkComponent(page, 'button', framework);
      const button = body.getByRole('button', { name: 'Count clicks', exact: true });
      await button.focus();
      await expect(button).toBeFocused();
      await button.press('Enter');
      await expect(body.getByText('Clicks: 1', { exact: true })).toBeVisible();
      await button.dispatchEvent('keydown', { key: 'Enter', repeat: true });
      await expect(body.getByText('Clicks: 1', { exact: true })).toBeVisible();
      const scrollTop = await page.evaluate(() => document.scrollingElement?.scrollTop);
      await page.keyboard.down('Space');
      await expect(body.getByText('Clicks: 1', { exact: true })).toBeVisible();
      await page.keyboard.up('Space');
      await expect(body.getByText('Clicks: 2', { exact: true })).toBeVisible();
      expect(await page.evaluate(() => document.scrollingElement?.scrollTop)).toBe(scrollTop);
      await expect(button).toHaveCSS('outline-style', 'none');
      expect(await button.evaluate((node) => getComputedStyle(node).boxShadow)).not.toBe('none');

      for (const label of ['Disabled counter', 'Loading counter']) {
        const blocked = buttonWithText(body, label);
        await expect(blocked).toHaveAttribute('tabindex', '-1');
        await expect(blocked).toHaveAttribute('aria-disabled', 'true');
        await blocked.dispatchEvent('click');
        await blocked.dispatchEvent('keydown', { key: 'Enter' });
        await blocked.dispatchEvent('keyup', { key: ' ' });
      }
      await expect(buttonWithText(body, 'Loading counter')).toHaveAttribute('aria-busy', 'true');
      await expect(body.getByText('Clicks: 2', { exact: true })).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`implicit tabs preserve state and skip disabled tabs in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);
      const body = await openFrameworkComponent(page, 'tabs', framework);
      const tabs = body.locator('.implicit-tabs');
      const first = tabs.getByRole('tab', { name: 'First', exact: true });
      const second = tabs.getByRole('tab', { name: 'Second', exact: true });
      await expect(first).toHaveAttribute('aria-selected', 'true');
      await expect(tabs.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);
      await expect(tabs.getByPlaceholder('Mounted on first visit')).toHaveCount(0);
      await tabs.getByPlaceholder('Your note stays here').fill('Keep my note');
      await first.focus();
      await first.press('ArrowRight');
      await expect(second).toBeFocused();
      await expect(second).toHaveAttribute('aria-selected', 'true');
      await expect(body.getByText('Last selected index: 2')).toBeVisible();
      await expect(tabs.getByPlaceholder('Your note stays here')).toBeHidden();
      const panel = tabs.getByRole('tabpanel');
      await expect(panel).toHaveText('Second implicit panel');
      await tabs.getByPlaceholder('Mounted on first visit').fill('Lazy note');
      await expect(panel).toHaveCSS('opacity', '1');
      await expect(panel).toHaveAttribute('id', (await second.getAttribute('aria-controls'))!);
      await expect(panel).toHaveAttribute('aria-labelledby', (await second.getAttribute('id'))!);
      expect(await panel.evaluate((node) => node.closest('[role="tablist"]') === null)).toBe(true);
      const barBox = await tabs.getByRole('tablist').boundingBox();
      const panelBox = await panel.boundingBox();
      expect(panelBox!.y).toBeGreaterThanOrEqual(barBox!.y + barBox!.height);

      await second.press('ArrowRight');
      await expect(first).toBeFocused();
      await expect(tabs.getByPlaceholder('Your note stays here')).toHaveValue('Keep my note');
      await first.press('End');
      await expect(second).toBeFocused();
      await expect(tabs.getByPlaceholder('Mounted on first visit')).toHaveValue('Lazy note');
      await second.press('Home');
      await expect(first).toBeFocused();
      await first.press('ArrowLeft');
      await expect(second).toBeFocused();
      await expect(tabs.getByRole('tab', { name: 'Unavailable', exact: true })).toHaveAttribute('aria-selected', 'false');
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`tabs activate matching panel in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'tabs', framework);
      const settingsTab = body.getByRole('tab', { name: 'Settings' }).first();

      await settingsTab.click();

      await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
      await expect(body.getByText(/Settings content/)).toBeVisible();
      await expect(body.getByText(/Settings content/).locator('..')).toHaveCSS('opacity', '1');
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`select picks a single option in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'select', framework);
      const select = body.locator('.a-select').first();

      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await select.click();
      await expect(select).toHaveAttribute('aria-expanded', 'true');

      await page.getByRole('option', { name: 'Item 2' }).first().click();

      await expect(select).toHaveAttribute('aria-expanded', 'false');
      await expect(body.getByText('Selected: 2')).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`pagination moves to the next page in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'pagination', framework);
      const pagination = body.locator('.a-pagination').first();
      const selectedPage = pagination.locator('.a-pagination__page--selected').first();

      await expect(selectedPage).toContainText('1');
      await pagination.locator('.a-pagination__next').click();

      await expect(selectedPage).toContainText('2');
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`input and textarea accept typed text in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const inputBody = await openFrameworkComponent(page, 'input', framework);
      const input = inputBody.locator('.a-input__inner').first();

      await input.fill('AnyUI local e2e');
      await expect(input).toHaveValue('AnyUI local e2e');

      const textareaBody = await openFrameworkComponent(page, 'textarea', framework);
      const textarea = textareaBody.locator('.a-textarea__inner').first();

      await textarea.fill('Textarea coverage');
      await expect(textarea).toHaveValue('Textarea coverage');
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`otp input emits value and completion in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'otpInput', framework);
      const otp = body.locator('.a-otp-input').first();

      await otp.click();
      await page.keyboard.type('123456');

      await expect(body.getByText('Value: 123456')).toBeVisible();
      await expect(body.getByText('Completed: 123456')).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`dialog opens and closes in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'dialog', framework);

      await buttonWithText(body, 'Basic').click();

      const dialog = page.locator('.a-dialog').filter({ hasText: 'Delete workspace' }).first();
      await expect(dialog).toBeVisible();

      await dialog.locator('.a-dialog__close').click();

      await expect(dialog).toBeHidden();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`drawer opens a dismissible panel in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'drawer', framework);

      await buttonWithText(body, 'Default').click();

      const drawer = page.locator('.a-drawer__body').filter({ hasText: 'Drawer' }).first();
      await expect(drawer).toBeVisible();

      await buttonWithText(drawer, 'Close').click();

      await expect(drawer).toBeHidden();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`popup opens and closes in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'popup', framework);

      await buttonWithText(body, 'Open popup').click();

      const popup = page.locator('.a-popup').filter({ hasText: 'bare popup panel' }).first();
      await expect(popup).toBeVisible();

      await buttonWithText(popup, 'Close').click();

      await expect(popup).toBeHidden();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`dropdown menu emits enabled item command in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'dropdownMenu', framework);

      await buttonWithText(body, 'Open Menu').click();

      const menu = page.locator('.a-dropdown-menu').first();
      await expect(menu).toBeVisible();
      await menu.getByText('Duplicate').click();

      await expect(body.getByText('duplicate (Duplicate)')).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`message and toast services render feedback in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const messageBody = await openFrameworkComponent(page, 'message', framework);

      await buttonWithText(messageBody, 'Info').click();

      await expect(page.locator('.a-message').filter({ hasText: 'info' }).first()).toBeVisible();

      const toastBody = await openFrameworkComponent(page, 'toast', framework);

      await buttonWithText(toastBody, 'Sticky').click();

      await expect(page.locator('.a-toast').first()).toBeVisible();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`confirm modal opens with expected actions in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'confirmModal', framework);

      await buttonWithText(body, 'click me').click();

      const dialog = page.locator('.a-dialog').filter({ hasText: 'Save changes' }).first();
      await expect(dialog).toBeVisible();
      await expect(dialog.getByText('Your changes will be saved to the cloud.')).toBeVisible();

      await buttonWithText(dialog, 'Save').click();

      await expect(dialog).toBeHidden();
      assertNoRuntimeErrors(page, runtimeErrors);
    });

    test(`loading mask toggles over content in ${framework}`, async ({ page }) => {
      const runtimeErrors: string[] = [];
      installRuntimeErrorHooks(page, runtimeErrors);

      const body = await openFrameworkComponent(page, 'loadingMask', framework);

      await buttonWithText(body, 'Start loading').click();

      await expect(
        body.locator('.a-loading-mask').filter({ hasText: 'Loading...' }).first(),
      ).toBeVisible();

      await buttonWithText(body, 'Stop loading').click();

      await expect(
        body.locator('.a-loading-mask').filter({ hasText: 'Loading...' }).first(),
      ).toBeHidden();
      assertNoRuntimeErrors(page, runtimeErrors);
    });
  }
});
