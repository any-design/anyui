# CHANGELOG

## [0.0.40](https://github.com/any-design/anyui/compare/v0.0.39...v0.0.40) (2023-02-21)

### Bug Fixes

- (resolver) add blacklist and fix wrong resolving of style files ([8c62ade](https://github.com/any-design/anyui/commit/8c62adeb738ce5dac21f825aef6b0e25182a75d4))

### Features

- (checkboxGroup) add gap property ([e9f006b](https://github.com/any-design/anyui/commit/e9f006b228dc856a60536f4a143af57eab8054d8))
- (checkboxGroup) export component and fix eslint issue ([a7be5ea](https://github.com/any-design/anyui/commit/a7be5eacfadb4f8ebb79ce2c2efd70ef60c1d77c))
- (input) optimize prefix and postfix icon styles and large style ([64be8b7](https://github.com/any-design/anyui/commit/64be8b7b93f8658a88706015c2e5a9c4e711efc6))
- (popmenu) add cursor style and tweak item background color ([2ec68ec](https://github.com/any-design/anyui/commit/2ec68ecff33ed40443b9959a749fba7b7a213b9d))
- (testground) add checkbox group ([a0a665e](https://github.com/any-design/anyui/commit/a0a665e12c3adb381da3d3820c91416d261518b3))

## Legacy versions

### v0.0.39

- Fix: wrong usage of `watchEffect` in multiple components.

### v0.0.38

- Feat: add `ARadioButtonGroup` component.

- Fix: `ARadioGroup` cannot react right when `modelValue` changed.

- Fix: correct the inner value type in `AInput`.

- Fix: `ATextarea` now support value binding.

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
