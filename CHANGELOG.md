# CHANGELOG

## [0.1.4](https://github.com/any-design/anyui/compare/v0.1.3...v0.1.4) (2023-09-17)

### Bug Fixes

- (tag) wrong class name apply condition ([e3a92c4](https://github.com/any-design/anyui/commit/e3a92c4568a4cc62e7cf51be5b9e500a8aa29935))

### Features

- (popper) allow mutex by group ([2629746](https://github.com/any-design/anyui/commit/2629746dd74b6705e97760db974942fa51080a10))

## [0.1.3](https://github.com/any-design/anyui/compare/v0.1.2...v0.1.3) (2023-09-17)

### Bug Fixes

- (tag) now the style will be reactive ([97f44e0](https://github.com/any-design/anyui/commit/97f44e065c9836c1aedbe35b13a7d019bb4b983f))

### Features

- (tag) allow CSS var background color ([82d10c6](https://github.com/any-design/anyui/commit/82d10c6d3c3174f45e9fdb9652b1df636d1af850))

## [0.1.2](https://github.com/any-design/anyui/compare/v0.1.1...v0.1.2) (2023-09-17)

### Features

- (popper) support contextmenu trigger ([8f30709](https://github.com/any-design/anyui/commit/8f30709bc1a6bfaee10ec8954d62a35923263ddf))

## [0.1.1](https://github.com/any-design/anyui/compare/v0.1.0...v0.1.1) (2023-09-16)

### Bug Fixes

- (card) style now will be reactive ([2e082ee](https://github.com/any-design/anyui/commit/2e082eed0980a5e8ead841f7ab02e5ad9798be08))
- (form) labelWidth now will be reactive ([69effea](https://github.com/any-design/anyui/commit/69effeabd0477a6fd76edb5534bb0282db1c1c4d))
- (image) src now is reactive and the image will not be loaded again when intersecting ([7669b26](https://github.com/any-design/anyui/commit/7669b265fc03db534522311c707dfa845fac2773))
- (input) wrapper style now will be reactive ([0bcde57](https://github.com/any-design/anyui/commit/0bcde577b0808f51f2585f4af8a12c702fd71043))
- (split) now the style will be reactive ([3cf399a](https://github.com/any-design/anyui/commit/3cf399a272839f8ca3589c6c9da9fdd8e447a94a))
- (step) now the steps will be reactive ([3f06bce](https://github.com/any-design/anyui/commit/3f06bceaeb5f1f0992a5c8ecad15914a86f4ba9b))
- (theme) build error ([99ebc99](https://github.com/any-design/anyui/commit/99ebc99acdec93c0fe8ce7d7cd5b807c76583387))

### Features

- (helper) add icon setup helper ([fa0ad6b](https://github.com/any-design/anyui/commit/fa0ad6b49c052f8091ef9e6906ef95e74c9b8c87))
- (helper) support array style icon meta ([829c14b](https://github.com/any-design/anyui/commit/829c14b5c1307af3aaf3739ca80998157d8e13d3))
- (testground) add multiple line text generation ([b4b00fe](https://github.com/any-design/anyui/commit/b4b00fe27d17bba1001abad74c7bed7998e890ee))

## [0.1.0](https://github.com/any-design/anyui/compare/v0.0.56...v0.1.0) (2023-08-14)

- ⚠ (theme) BREAKING: add support to dark theme and theme customization in a easy way. See [migration document](./docs/migration/v0.0.56 - v0.1.0.md) for more details.

- ⚠ (theme) BREAKING: remove responsive style file.

## [0.0.56](https://github.com/any-design/anyui/compare/v0.0.55...v0.0.56) (2023-08-10)

### Bug Fixes

- virtual list scroll not work issue ([3c42670](https://github.com/any-design/anyui/commit/3c42670c9070a3f94c1ce8a86ceb901c660e006a))

## [0.0.55](https://github.com/any-design/anyui/compare/v0.0.53...v0.0.55) (2023-07-16)

### Breaking

- (lottie) remove lottie package, will be replaced with a standalone one.

## [0.0.54](https://github.com/any-design/anyui/compare/v0.0.52...v0.0.54) (2023-07-10)

### Bug Fixes

- (chat) scroll bottom sometimes will not work correctly ([7b44e85](https://github.com/any-design/anyui/commit/7b44e857cd7b72d792219f8aff6736e049fba213))

## [0.0.53](https://github.com/any-design/anyui/compare/v0.0.52...v0.0.53) (2023-07-07)

### Features

- (virtual-list) optimize scroll performance ([b0df975](https://github.com/any-design/anyui/commit/b0df975c454dde09c60454ab92d3958ec06630a8))

## [0.0.52](https://github.com/any-design/anyui/compare/v0.0.51...v0.0.52) (2023-04-12)

### Bug Fixes

- (virtual-list) use expand op in watcher ([4cef724](https://github.com/any-design/anyui/commit/4cef724e3df8c5ef7155aaca0607ae08dad38201))

### Features

- (chat) add enableDeepWatch property ([9301325](https://github.com/any-design/anyui/commit/93013253628ed39710bf7704b2d9491949ee6339))

## [0.0.51](https://github.com/any-design/anyui/compare/0.0.49...0.0.51) (2023-04-12)

### Bug Fixes

- (popper) wrong watcher usage ([abfe634](https://github.com/any-design/anyui/commit/abfe63404116c91e38b50f73f8a922ebb851aa48))
- (select) wrong watcher usage ([13586a4](https://github.com/any-design/anyui/commit/13586a4768a41be52ba1dc78fe44786478315efc))
- (virtual-list) wrong watcher usage & add scrollToBottom API ([7fffca9](https://github.com/any-design/anyui/commit/7fffca91851e6ce7580bbd333bc4b9de7775d744))

### Features

- (chat) optimize styles and auto scroll to bottom ([eb3c32b](https://github.com/any-design/anyui/commit/eb3c32bf87d31f7f60bc130e268cd8372a831864))
- (hooks) export hooks ([452d912](https://github.com/any-design/anyui/commit/452d9126f41005827613f54685bc40f3fd1be556))

## [0.0.50](https://github.com/any-design/anyui/compare/0.0.49...0.0.50) (2023-04-11)

### Features

- (hooks) export hooks ([452d912](https://github.com/any-design/anyui/commit/452d9126f41005827613f54685bc40f3fd1be556))

## [0.0.49](https://github.com/any-design/anyui/compare/v0.0.48...v0.0.49) (2023-04-11)

### Bug Fixes

- (chat) & (virtual-list) fix wrong watcher implementation ([dd7bc53](https://github.com/any-design/anyui/commit/dd7bc539123b03c06531c1b4ab3b9eef9a07c603))
- (chat) wrong style of chat message ([bd1a69c](https://github.com/any-design/anyui/commit/bd1a69cf69b5dffd550fbbc488f616a67d50f5b4))

### Features

- (chat) better typing for role ([d5f7744](https://github.com/any-design/anyui/commit/d5f7744e20d004ddeee5861244063af86932ad8f))

## [0.0.48](https://github.com/any-design/anyui/compare/v0.0.47...v0.0.48) (2023-04-10)

- ⚠ (chat) BREAKING: `user` message now migrated to `self` message for better understanding.

## [0.0.47](https://github.com/any-design/anyui/compare/0.0.46...0.0.47) (2023-04-09)

### Bug Fixes

- (input) auto calculate the padding right when there's a post button ([0b1213a](https://github.com/any-design/anyui/commit/0b1213a46f397079432f059af61f9223a424ffd8))
- (virtual-list) observe border-box ([b504305](https://github.com/any-design/anyui/commit/b5043051af4e93c7c4f630f03ec0e923ffee7cef))

### Features

- (textarea) add before and after slots that allow you to insert something ([54d6a63](https://github.com/any-design/anyui/commit/54d6a63e49b78b0ff7e0577413ddfbd207e28ccc))
- (textarea) add borderless, disableResizeCorner, autoMatchHeight properties ([6deb72c](https://github.com/any-design/anyui/commit/6deb72c11bbc51855c295f8f2549457da6b4fb40))
- (theme) migrate bg-alter to bg-semi-light ([546442d](https://github.com/any-design/anyui/commit/546442d6fc3ba089b4e6598061f6d990a71fef21))
- (virtual-list) migrate forceUpdate to refreshable computed ([f878bb0](https://github.com/any-design/anyui/commit/f878bb01d15e784070c07b2beb5d54f8a655149b))

## [0.0.46](https://github.com/any-design/anyui/compare/v0.0.45...v0.0.46) (2023-04-09)

### Bug Fixes

- (virtual-list) trigger first render at first data set ([b3c31b3](https://github.com/any-design/anyui/commit/b3c31b313a8597e385719d5118442fe77a53811a))

### Features

- (chat) add chat component ([42a9deb](https://github.com/any-design/anyui/commit/42a9deb28213d4db84795187a1d7e7f255c2e072))
- (theme) configurable bg color set ([fdad4ff](https://github.com/any-design/anyui/commit/fdad4ff0113f2468ac208e4c076f86f6a7fa9f1c))
- (virtual-list) add crazy fast virtual list component ([9f86cd3](https://github.com/any-design/anyui/commit/9f86cd352a48606b9fb1e7becd453fd13531bdc7))

## [0.0.45](https://github.com/any-design/anyui/compare/v0.0.44...v0.0.45) (2023-03-26)

### Features

- (button) optimize hover and focus filter, add transition ([c5c130b](https://github.com/any-design/anyui/commit/c5c130b1d9dc316de9522555db054986704ab778))
- (input) add borderless property and post-button slot ([962504f](https://github.com/any-design/anyui/commit/962504f65e3e6ac91b00538edfc19925fd9bd736))
- (input) port more native properties to component ([7919c83](https://github.com/any-design/anyui/commit/7919c83952781825121d4d5f29f5b380fe66f3b3))
- (textarea) port more native properties to component ([f9079ff](https://github.com/any-design/anyui/commit/f9079fff6a536a78965f01d8d50458e7e44590df))

## [0.0.44](https://github.com/any-design/anyui/compare/v0.0.43...v0.0.44) (2023-03-10)

### Features

- (input) support type property ([89b0233](https://github.com/any-design/anyui/commit/89b023393658d06535cadffdf05d3f2ff46b1520))
- (popper) add closeWhenClickOutside property ([c986474](https://github.com/any-design/anyui/commit/c98647473addbe8e6bdd8524d5e7ec68dd766cc5))

## [0.0.43](https://github.com/any-design/anyui/compare/v0.0.42...v0.0.43) (2023-03-02)

### Features

- (input) add max length property ([24a47eb](https://github.com/any-design/anyui/commit/24a47eb1367bd74f5687689ab1b8bb965aa6ee9e))
- (textarea) add max length property ([1d02318](https://github.com/any-design/anyui/commit/1d02318b183d1e7b7cb3f33cac00c56170da3221))

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
