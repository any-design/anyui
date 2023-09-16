# Icons

AnyUI has been integrated with `@iconify/vue`, it's recommended to use `iconify` for all the icon usage.

## Offline usage

In some scenarios you might need to use AnyUI in a completely offline environment, icons will be loaded from online API by default with `iconify`, in order to meet the needs of completely offline environment, we provide an additional helper to help you achieve the offlineization of all the icons you need.

For the pre-defined default icons, you can install an additional package named `@any-design/default-icons`, it will load all the default icons as `IconMeta` JSON format, then you can setup them with the `Icon Helper` directly at startup.

```ts
import { setupIcons } from '@any-design/anyui';
import DefaultIcons from '@any-design/default-icons',

setupIcons({
  icons: DefaultIcons,
});
```

For other icons, you can check <https://iconify.design/docs/icons/icon-data.html> to learn how to install and import other icons.

Then you can use the `setupIcons` helper for initialization. We also support initializing an entire icon collection, so you can also choose to use an entire icon collection offline.

## Prefetch

The `setupIcons` method also provides the ability to prefetch icons, you can set a name list to `prefetch` property in `IconSetupOptions`.

## Other settings

For other settings that the helper method have not supported yet, you can directly import `@iconify/vue` and its APIs to achieve your goal.
