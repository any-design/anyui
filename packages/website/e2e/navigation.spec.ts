import { expect, test, type Page } from '@playwright/test';

const ready = async (page: Page) => {
  await expect(page.locator('[data-site-nav]').locator('..')).not.toHaveAttribute('ssr');
  await expect(page.locator('astro-island[component-url*="LangToggle"]')).not.toHaveAttribute(
    'ssr',
  );
};
const noOverflow = async (page: Page) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
};

test('client navigation keeps preferences, preview and current navigation in sync', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/docs/getting-started');
  await ready(page);
  await page.evaluate(() => {
    (window as any).__navigationMarker = 'same-document';
  });
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.getByRole('button', { name: 'Use glass surfaces' }).click();
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.locator('h1:visible')).toHaveText('快速开始');
  await page.locator('.site-header__nav-link[href="/components"]').click();
  await page.waitForURL('**/components');
  await page.locator('.components-sidebar a[href="/components/button"]').click();
  await page.waitForURL('**/components/button');
  await expect(page.locator('html')).toHaveAttribute('theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-anyui-style', 'glass');
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'zh');
  await expect(page.locator('.localized-doc__pane[data-lang="zh"] .preview-frame')).toBeVisible();
  await expect(page.locator('.preview-frame__demo .a-button').first()).toBeVisible();
  await expect(page.locator('.components-sidebar a[aria-current="page"]')).toHaveText('Button');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('.localized-doc__pane[data-lang="en"] .preview-frame')).toBeVisible();
  await page.locator('.site-header__nav-link[href="/docs/getting-started"]').click();
  await page.waitForURL('**/docs/getting-started');
  await expect(page.locator('h1:visible')).toHaveText('Getting Started');
  expect(await page.evaluate(() => (window as any).__navigationMarker)).toBe('same-document');
  expect(errors).toEqual([]);
});

test('window scrolling restores browser history and overview browsing position', async ({
  page,
}) => {
  await page.goto('/components');
  await ready(page);
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(900);
  await page.locator('.components-sidebar a[href="/components/button"]').click();
  await page.waitForURL('**/components/button');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.goBack();
  await page.waitForURL('**/components');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(900);
  await page.goForward();
  await page.waitForURL('**/components/button');
  await page.locator('.components-sidebar a[href="/components"]').click();
  await page.waitForURL('**/components');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(900);
});

test('TOC anchors survive language changes, deep links and back navigation', async ({ page }) => {
  await page.goto('/docs/getting-started#react');
  await ready(page);
  await expect(page.locator('#react')).toBeInViewport();
  await page.locator('.toc a[href="#vue"]').click();
  await expect(page).toHaveURL(/#vue$/);
  await expect(page.locator('#vue')).toBeInViewport();
  await page.goBack();
  await expect(page).toHaveURL(/#react$/);
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await expect(page.locator('.toc__title')).toHaveText('本页目录');
  const vueLink = page.locator('.toc a').filter({ hasText: /^Vue$/ });
  const href = await vueLink.getAttribute('href');
  await vueLink.click();
  const target = page.locator(`[id="${decodeURIComponent(href!.slice(1))}"]`);
  await expect(target).toBeVisible();
  await expect(target).toBeInViewport();
});

test('mobile menu updates between sections, traps focus and closes with Escape', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/docs/getting-started');
  await ready(page);
  await noOverflow(page);
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(menu).toBeFocused();
  await page.locator('.site-header__nav-link[href="/components"]').click();
  await page.waitForURL('**/components');
  await menu.click();
  await expect(
    page.getByRole('dialog').getByRole('link', { name: 'Button', exact: true }),
  ).toBeVisible();
  await page.getByRole('dialog').getByRole('link', { name: 'Button', exact: true }).click();
  await page.waitForURL('**/components/button');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('.mobile-toc')).toBeVisible();
  await page.locator('.mobile-toc summary').click();
  await expect(page.locator('.mobile-toc a').first()).toBeVisible();
  await noOverflow(page);
  const widths = await page.evaluate(() => ({
    body: document.querySelector('.doc-body')!.getBoundingClientRect().width,
    article: document.querySelector('.prose')!.getBoundingClientRect().width,
  }));
  expect(widths.body).toBe(widths.article);
});

test('theme and language still work when storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('Storage blocked', 'SecurityError');
    };
    Storage.prototype.getItem = () => {
      throw new DOMException('Storage blocked', 'SecurityError');
    };
  });
  await page.goto('/docs/getting-started');
  await ready(page);
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await page.locator('.docs-menu a[href="/docs/tokens"]').click();
  await page.waitForURL('**/docs/tokens');
  await expect(page.locator('html')).toHaveAttribute('theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-lang', 'zh');
  await expect(page.getByRole('button', { name: '中文', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('reduced motion and small screens retain readable content and native links', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/docs/getting-started');
  await ready(page);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await noOverflow(page);
  await page.goto('/components/table');
  await ready(page);
  await noOverflow(page);
  await expect(page.locator('table').first()).toBeVisible();
});

test('code copy controls work after a client navigation and language change', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text: string) => {
          (window as any).__copiedCode = text;
        },
      },
    });
  });
  await page.goto('/docs/tokens');
  await ready(page);
  await page.locator('.docs-menu a[href="/docs/getting-started"]').click();
  await page.waitForURL('**/docs/getting-started');
  await page.getByRole('button', { name: '中文', exact: true }).click();
  const copy = page
    .locator('.code-frame:visible')
    .first()
    .getByRole('button', { name: '复制代码' });
  await copy.focus();
  await page.keyboard.press('Enter');
  await expect(copy).toHaveText('已复制');
  expect(await page.evaluate(() => (window as any).__copiedCode)).toBe(
    'pnpm add @any-design/anyui',
  );
});
