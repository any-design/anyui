# Theme Customization

AnyUI now supports theme customization, this function will provide a convenient way for you to modify the theme color set, achieve a visual effect that is more consistent with your core design and other components.

## How to use

Theme customization is only available when you're using `.scss` style files, all the `.css` files are pre-compiled with the preset default theme colors, they will no longer be allowed to be customized.

### Override theme vars

Before modify the SCSS vars, you need to modify the imports of the styles.

1. Create a custom theme style file, for example, you can create a `anyui.scss` in `src/styles` like this:

```scss
// Here's the override vars
// ....

// Import the basic style file
@import '@any-design/anyui/styles/index.scss';
```

If you want to import styles on demand, you need to modify the `@any-design/anyui/styles/index.scss` to `@any-design/anyui/styles/theme.scss`.

2. Import the custom file to your project entry, for example, a `src/main.ts` file:

```ts
import { createApp } from 'vue';
// other imports
// ...
import './styles/anyui.scss';
```

As you finished these steps, the imports should be ready, then you can override all the theme vars in `src/styles/anyui.scss`.

All the overrides should be defined before the original AnyUI style file import.

And be aware that you can only import and modify the variables in a SCSS file, if you import the AnyUI SCSS file in your project entry (like `src/main.ts`), your overrides will never work.

## Theme variables

We provided bunch of variables for you to modify, including all the basic colors, and the colors generated after computed.

### Global vars

#### Responsive styles

`__anyui__enable-responsive-styles__`: `boolean`

Set `__anyui__enable-responsive-styles__` to `false` can disable the generation of all responsive styles.

#### Layout

We have these variables for you to control the layout:

```scss
$main-font: 'Quicksand'; // the main font family which will be used for all text
$anim-duration: 200ms; // general duration for anims
$scroll-width: 8px; // custom scrollbar width
```

We recommend to modify it by CSS vars, all the global vars have a corresponding CSS var.

### Colors

We have multiple SCSS maps about color definition, you can make your own theme through these maps.

#### Theme colors

For the light theme, the map named `colors`.

You can find all the default values below, and you can override any value in it with a pre-defined map named `colors`, if you want to override some color, then you can just define a same key with the value you like to the `colors` map, the map will be merged with the default one.

```scss
$default-colors: (
  primary: rgba(15, 111, 239, 90),
  secondary: rgba(17, 205, 239, 90),
  bg: #fbfbfc,
  bg-readonly: #f2f3f4,
  bg-disabled: #dadadc,
  text: #202426,
  text-secondary: #909293,
  text-disabled: #a0a1a4,
  text-placeholder: #aeaeae,
  text-btn: #fdfdfe,
  text-white: #fafbfd,
  icon-fill: #a6a8a9,
  scrollbar: #c0c2c3,
  success: rgb(96, 211, 50),
  warn: rgb(243, 189, 41),
  danger: rgb(231, 63, 51),
  info: rgb(47, 124, 224),
  border: #cecdd0,

  line: #eff2f3,
  shadow: #001220,
  shadow-w: #fff,
);
```

Also, because we're using "merging" operation, you can define some other variables here, our theme system will also generate a corresponding dark color by our computing methods.

For modify dark colors only, you can define another color map named `dark-colors`, it will be merged to the final dark color map.

#### Static colors

Same as the theme colors, we have a color set map named `static-colors`, all the colors in this map WILL NOT change in dark mode, it will be consistent.

Here's the definition:

```scss
$default-static-colors: (
  mask: rgba(0, 0, 0, 0.8),
);
```

#### Alpha list

We provide a bunch of extended theme colors with different alpha value. To generate these colors, we designed an alpha list.

If you want to generate a series of color variables of a theme color with different alpha values, you can define a map called `alphas`, and use the theme color name as key, with a list of alpha values as the paired value.

Here's the default definition for reference:

```scss
$default-alphas: (
  primary: 100 85 80 75 70 60 40 30 20 18 12 10 8 6 4,
  secondary: 90 80 70 60 40 30 20,
  success: 80 60,
  warn: 80 60,
  danger: 80 60,
  error: 80 60,
  info: 80 60,
  shadow: 2 4 5 6 8 10 12 18 20 24 25 30 36 40,
  shadow-w: 10 20 24,
);
```

If you want to add some alpha value or generate colors for other theme colors, you can override it with a pre-defined map named `alphas`, it will be merged to the default settings and be proceeded with the computing methods.

#### Lightness adjustment

SCSS has an ability to adjust the lightness of colors, we provided a lightness adjustment definition map to make things way more convenient.

If you want to adjust the lightness of a theme color, you can define nested maps like this:

```scss
$default-lightness-adjustments: (
  primary: (
    l-6: 6%,
    d-4: -4%,
  ),
  bg: (
    bright: 4.5%,
    light: 2.5%,
    semi-light: 1.5%,
    alter: -0.625%,
    semi-dark: -1.5%,
    darker: -3%,
  ),
  border: (
    lighter: 6%,
    light: 4%,
    semi-light: 2%,
    semi-dark: -2.5%,
    dark: -4.75%,
    darker: -6%,
  ),
);
```

The final map name is `lightness-adjustments`, you can override the default values or add something your own to it with a pre-defined map with the same name as the final.

### Dark Mode

Generally, dark mode should be associated with a CSS class or an attribute on the root element, for different web apps, the method to enable the dark mode might be different.

To make things more flexible, we provide SCSS vars named `enable-prefer-query` and `dark-theme-selector`.

```SCSS
$enable-prefer-query: true !default;
$dark-theme-selector: 'html[theme="dark"]' !default;
```

If the `enable-prefer-query` is `true`, the generated styles will be included with the `@media (prefers-color-scheme: dark)` query, you can disable it by overriding it to `false`.

For the `dark-theme-selector`, by default we will enable the dark mode of all AnyUI components when `theme` attribute on the html element equals `dark`, you can change it to anything you want, like in the VitePress, you can override it with `.dark` selector.
