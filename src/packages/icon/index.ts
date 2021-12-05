import { AnyUIInstallOptions } from '../../types';
import { App } from 'vue';
import AIconFactory from './AIcon';

export default {
  install(app: App, options: AnyUIInstallOptions) {
    app.component('AIcon', AIconFactory(options.icons));
  },
};
