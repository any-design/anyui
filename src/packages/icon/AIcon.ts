import { AvailableIconType } from 'src/types';
import { defineComponent, Component, h, PropType } from 'vue';

export default (icons: Record<AvailableIconType, Component>) =>
  defineComponent({
    components: icons,
    props: {
      name: {
        type: String as PropType<AvailableIconType>,
        required: true,
      },
    },
    setup(props) {
      return () => h(icons[props.name]);
    },
  });
