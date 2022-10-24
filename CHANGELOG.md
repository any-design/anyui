# CHANGELOG

## Alpha

### v0.0.38

- Feat: add `ARadioButtonGroup` component.

- Fix: `ARadioGroup` cannot react right when `modelValue` changed.

### v0.0.37

- Breaking change: `ALoading` now has been divided into two components, the spinner type now divided and renamed as `ASpinner`.

- Feat: enlarge the `border-radius` of the input components, added more interactive styles.

- Feat: tweak the shadow styles of the input components and `ATag`.

- Feat: add `ATextarea` component.

### v0.0.36

- Feat (Masonry): configurable target which the scroll event handler will attach to.

- Feat (Masonry): configurable scroll throttle time.

- Feat (Masonry): avoid outdated data set to display.

### v0.0.35

- Feat: configurable debounce time for scroll events.

- Feat: add throttle to screen width changed event to make experience more smooth.

- Fix: `fit` property not work when the `col` property is not set on `AMasonry`.

- Fix: broken render process of `AMasonry`.

### v0.0.34

- Fix: refuse to resolve `Array` and `ArrayBuffer` in the resolver.

### v0.0.33

- Feat: export `PositionItem` type in the `AMasonry` component.

### v0.0.32

- Fix: wrong spelling in the `AMasonry` component.

### v0.0.31

- Fix: `splitPercent` in `AGradientText` now will work properly, this change may make the existed component behaviour different.

### v0.0.30

- Feat: `AGradientText` will use primary and secondary colors in the CSS vars first.

### v0.0.29

- Breaking change: `AGradientText` now will render from primary color to secondary color.

- Breaking change: gradient type `AButton` now will render from primary color to secondary color.

### v0.0.28

- Breaking change: To fit the `unplugin-vue-components`, the original `PopMenu` now renamed as `PopupMenu`, which is consistent with the defined component name.

- feat: add `resolver` package to support `unplugin-vue-components`.
