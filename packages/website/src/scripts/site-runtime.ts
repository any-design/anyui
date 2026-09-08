import { prepareHeadings } from './doc-headings';

function applyLanguage(doc: Document, lang: string) {
  const target = lang === 'zh' ? 'zh' : 'en';
  doc.documentElement.lang = target === 'zh' ? 'zh-CN' : 'en';
  doc.documentElement.dataset.lang = target;
  doc.querySelectorAll<HTMLElement>('.localized-doc').forEach((wrapper) => {
    wrapper.dataset.lang = target;
    const preview = wrapper.querySelector('.component-previews');
    const pane = wrapper.querySelector(`:scope > .localized-doc__pane[data-lang="${target}"]`);
    const intro = pane?.querySelector('h1 + p') || pane?.querySelector('p');
    if (preview && intro && intro.nextElementSibling !== preview) {
      intro.insertAdjacentElement('afterend', preview);
    }
  });
  prepareHeadings(doc);
}

function labelCopyButtons() {
  const zh = document.documentElement.dataset.lang === 'zh';
  document.querySelectorAll<HTMLButtonElement>('.code-frame__copy').forEach((button) => {
    button.textContent = zh ? '复制' : 'Copy';
    button.setAttribute('aria-label', zh ? '复制代码' : 'Copy code');
  });
}

function prepareCodeBlocks(doc: Document) {
  doc.querySelectorAll<HTMLPreElement>('pre.astro-code').forEach((pre) => {
    if (pre.parentElement?.classList.contains('code-frame')) return;
    const frame = doc.createElement('div');
    frame.className = 'code-frame';
    pre.before(frame);
    frame.append(pre);
    if (pre.dataset.language && pre.dataset.language !== 'plaintext') {
      const badge = doc.createElement('span');
      badge.className = 'code-frame__lang';
      badge.textContent = pre.dataset.language;
      frame.append(badge);
    }
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'code-frame__copy';
    button.textContent = doc.documentElement.dataset.lang === 'zh' ? '复制' : 'Copy';
    button.setAttribute('aria-live', 'polite');
    frame.append(button);
  });
}

// Delegate once: detached pages don't retain copy handlers or timers.
document.addEventListener('click', async (event) => {
  const button = (event.target as Element)?.closest<HTMLButtonElement>('.code-frame__copy');
  if (!button) return;
  const code = button.parentElement?.querySelector('pre')?.textContent || '';
  const zh = document.documentElement.dataset.lang === 'zh';
  let copied = false;
  try {
    await navigator.clipboard.writeText(code);
    copied = true;
  } catch {
    const helper = document.createElement('textarea');
    helper.value = code;
    helper.style.cssText = 'position:fixed;inset:0;opacity:0;pointer-events:none';
    document.body.append(helper);
    helper.select();
    try {
      copied = document.execCommand('copy');
    } catch {}
    helper.remove();
    button.focus({ preventScroll: true });
  }
  button.textContent = copied ? (zh ? '已复制' : 'Copied!') : zh ? '复制失败' : 'Copy failed';
  window.setTimeout(() => {
    if (button.isConnected) labelCopyButtons();
  }, 1400);
});

document.addEventListener('astro:before-swap', (event) => {
  // Copy live state before paint, including when storage is unavailable.
  for (const attribute of ['theme', 'data-anyui-style', 'lang', 'data-lang']) {
    const value = document.documentElement.getAttribute(attribute);
    if (value === null) event.newDocument.documentElement.removeAttribute(attribute);
    else event.newDocument.documentElement.setAttribute(attribute, value);
  }
  applyLanguage(event.newDocument, document.documentElement.dataset.lang || 'en');
  prepareCodeBlocks(event.newDocument);
});

window.addEventListener('anyui:lang-change', (event) => {
  applyLanguage(document, (event as CustomEvent).detail);
  labelCopyButtons();
  window.dispatchEvent(
    new CustomEvent('anyui:lang-applied', { detail: document.documentElement.dataset.lang }),
  );
});

function initPage() {
  applyLanguage(document, document.documentElement.dataset.lang || 'en');
  prepareCodeBlocks(document);
  labelCopyButtons();
  window.dispatchEvent(
    new CustomEvent('anyui:lang-applied', { detail: document.documentElement.dataset.lang }),
  );
}

document.addEventListener('astro:page-load', initPage);
initPage();

// The overview is a browsing index: remember its place when returning via a
// link. All history traversal and hash navigation stay with Astro's router.
let overviewPosition = 0;
let restoreOverview = false;
document.addEventListener('astro:before-preparation', (event) => {
  if (event.from.pathname.replace(/\/$/, '') === '/components') overviewPosition = window.scrollY;
  restoreOverview =
    event.navigationType !== 'traverse' &&
    !event.to.hash &&
    event.to.pathname.replace(/\/$/, '') === '/components';
});
document.addEventListener('astro:page-load', () => {
  if (restoreOverview) window.scrollTo({ top: overviewPosition, behavior: 'instant' });
  restoreOverview = false;
});
