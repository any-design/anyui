import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { prepareHeadings, visibleHeadings, type TocHeading } from '../../scripts/doc-headings';
import { useSiteLang } from './useSiteLang';

export function useToc(props: { auto?: boolean; headings?: TocHeading[] }) {
  const headings = ref<TocHeading[]>([]);
  const active = ref('');
  const { currentLang } = useSiteLang();
  const title = computed(() => (currentLang.value === 'zh' ? '本页目录' : 'On this page'));
  let elements: HTMLElement[] = [];
  let raf = 0;

  const updateActive = () => {
    raf = 0;
    const scroller = document.scrollingElement;
    if (!scroller || !elements.length) return;
    const max = scroller.scrollHeight - window.innerHeight;
    const range = Math.min(window.innerHeight, max);
    const progress = range > 0 ? Math.max(0, (window.scrollY - (max - range)) / range) : 0;
    const trigger = 112 + (window.innerHeight - 112) * Math.min(1, progress);
    let next = elements[0].id;
    for (const element of elements) {
      if (element.getBoundingClientRect().top > trigger) break;
      next = element.id;
    }
    active.value = next;
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(updateActive);
  };
  const scan = () => {
    prepareHeadings(document);
    elements = visibleHeadings();
    headings.value = props.auto
      ? elements.map((el) => ({
          depth: el.tagName === 'H2' ? 2 : 3,
          slug: el.id,
          text: el.textContent || '',
        }))
      : props.headings || [];
    updateActive();
  };

  onMounted(() => {
    scan();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('anyui:lang-applied', scan);
    document.addEventListener('astro:page-load', scan);
  });
  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.removeEventListener('anyui:lang-applied', scan);
    document.removeEventListener('astro:page-load', scan);
  });
  return { headings, active, title };
}
