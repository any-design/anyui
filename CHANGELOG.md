# CHANGELOG

## [0.0.42](https://github.com/any-design/anyui/compare/v0.0.41...v0.0.42) (2023-03-01)

### Bug Fixes

- (textarea) textarea is not included in layout font styles ([c057c84](https://github.com/any-design/anyui/commit/c057c848021cb64803c4fc72e3236891de805838))

### Features

- (checkbox) remove position transform in checked animation ([d41dac4](https://github.com/any-design/anyui/commit/d41dac4a762ac0c092188ff4d10a35e778a30d15))
- (textarea) add placeholder property ([c6b8b9a](https://github.com/any-design/anyui/commit/c6b8b9ab9affc5f6532dfcea79913678735e3cf5))
- (textarea) more accurate height limit and customizable scroll bar styles ([810d7be](https://github.com/any-design/anyui/commit/810d7bea9613c513a39c2604873f1c86665bace2))

## [0.0.41](https://github.com/any-design/anyui/compare/v0.0.40...v0.0.41) (2023-02-22)

### Bug Fixes

- (popper) now popper can be animated with transform ([652d485](https://github.com/any-design/anyui/commit/652d4854e784486ac13af97d4ac5ed234ce42de5))
- (select) fix icon color and animation are not synchronized ([72219e8](https://github.com/any-design/anyui/commit/72219e80ec5e81dba4dcb2292326c21d9a58a338))

### Features

- (button) add depth button type and change the gradient of gradient type to 42deg ([e665175](https://github.com/any-design/anyui/commit/e665175c56ad11b1f5abfcd51b4bc52f4343899d))
- (button) border-radius now will be more harmony with other components ([1489b00](https://github.com/any-design/anyui/commit/1489b00e5386cb396fbd4dfe586fda8bb30f7d4d))
- (button) support "iconPosition" property to set whether icon will be displayed on leading or trailing ([25984f5](https://github.com/any-design/anyui/commit/25984f5332deed4fcc4cc60158beb5dcae3355f1))
- (checkbox) optimize checkbox styles and add default animation when checked ([fb3541a](https://github.com/any-design/anyui/commit/fb3541aee20041b45c0e4ebdc6036ad0f52af66e))
- (popmenu) add default transition ([dd87d4e](https://github.com/any-design/anyui/commit/dd87d4e651b269ef5bc63863fac621b07936f45f))
- (radio) add checked animation for radio ([228478c](https://github.com/any-design/anyui/commit/228478c2cf8a9118ac2ea82a4a7616de65c9396f))
- (theme) extract more vars and fix unused vars issue ([95d1cf1](https://github.com/any-design/anyui/commit/95d1cf13a4010f8301b9050c91dc127fd8ef0a86))
- (theme) font smoothing changed to subpixel-antialiased ([e9f25ec](https://github.com/any-design/anyui/commit/e9f25ecd38630cf7d940c7759a382e29debf06e1))

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
