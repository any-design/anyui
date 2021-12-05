import { defineComponent, Component, h } from 'vue';

export default (icons: Record<string, Component>) =>
  defineComponent({
    components: icons,
    props: {
      name: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      return () => h(icons[props.name]);
    },
  });
