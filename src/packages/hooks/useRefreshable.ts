import { computed, ComputedRef, ref } from 'vue';

export function useRefreshable<T>(getter: () => T): {
  getter: () => T;
  refresh: () => void;
} {
  const refreshKey = ref(0);

  return {
    getter() {
      refreshKey.value++;
      return getter();
    },
    refresh() {
      refreshKey.value++;
    },
  };
}

export function useRefreshableComputed<T>(getter: () => T): {
  computed: ComputedRef<T>;
  refresh: () => void;
} {
  const refreshable = useRefreshable(getter);
  return {
    computed: computed(() => refreshable.getter()),
    refresh: refreshable.refresh,
  };
}
