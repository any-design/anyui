# CHANGELOG

## [0.4.0](https://github.com/any-design/anyui/compare/v0.3.3...v0.4.0) (2024-06-05)

### Features

- (avatar) add avatar component ([142bc10](https://github.com/any-design/anyui/commit/142bc104b5a8d4bb47537dcd55372b07f74c0d33))
- (virtual-list) better performance ([ef2a987](https://github.com/any-design/anyui/commit/ef2a987a216fa9e6fc6badef96a104e40eaca9b2))

## [0.3.3](https://github.com/any-design/anyui/compare/v0.3.2...v0.3.3) (2024-04-28)

### Bug Fixes

- (virtual-list) avoid -Infinity height item ([5193a8d](https://github.com/any-design/anyui/commit/5193a8d03e5bd95ab98f894f90b708b380ef402b))
- (virtual-list) refresh container when activated ([5222245](https://github.com/any-design/anyui/commit/5222245fa0eb36d8adccdde1ffa79bc8f3466756))

## [0.3.2](https://github.com/any-design/anyui/compare/v0.3.1...v0.3.2) (2024-02-28)

### Bug Fixes

- (layout) height property in header and footer now is responsive ([76f8e87](https://github.com/any-design/anyui/commit/76f8e8752d86bda1e23d18745c4e81e94fc396d8))
- (virtual-list) prevent re-render when component activate and deactivate ([b96a15d](https://github.com/any-design/anyui/commit/b96a15d0095accf0d7285b0078a4fcc58efacdb9))

## [0.3.1](https://github.com/any-design/anyui/compare/v0.3.0...v0.3.1) (2024-02-18)

### Bug Fixes

- (build) fix resolver type building ([8df0187](https://github.com/any-design/anyui/commit/8df0187df0c959e9f0fbc237cfae428355a994f6))
- (form) wrong import statement ([9aaf8e8](https://github.com/any-design/anyui/commit/9aaf8e88cdb0c24ef6496b4859c81cdaa14d461d))

## [0.3.0](https://github.com/any-design/anyui/compare/v0.2.9...v0.3.0) (2024-01-29)

### Breaking

- (virtual-list) Remove `reuseNodes` and `keyType`, to the complicated components, reuse the wrapper nodes can cause some undetermined bugs, the state in the component might be a big mess. Now the key will be the same as the `id` of item in `items`.

### Bug Fixes

- (virtual-list) refactor item refreshing to allow the height reducing.

## [0.2.9](https://github.com/any-design/anyui/compare/v0.2.8...v0.2.9) (2023-11-23)

### Features

- (virtual-list) add an extra scrollTop shift when item is larger than estimated in scrolling up ([dc963ea](https://github.com/any-design/anyui/commit/dc963ea4057bb775244451c5d809ad25403fd805))

## [0.2.8](https://github.com/any-design/anyui/compare/v0.2.7...v0.2.8) (2023-11-23)

### Features

- (virtual-list) expose getContainer and scrollTo methods ([e2422ae](https://github.com/any-design/anyui/commit/e2422ae5ebfd30b2faf7ad6dfb03502daf766e6c))
- (virtual-list) tweak scrollToBottom method to be more accurate ([1606b6c](https://github.com/any-design/anyui/commit/1606b6cd5ce43dd198638760dd6877d0d5f1526a))

## [0.2.7](https://github.com/any-design/anyui/compare/v0.2.6...v0.2.7) (2023-11-23)

### Bug Fixes

- (checkboxGroup) register checkbox in component ([e8fdfc6](https://github.com/any-design/anyui/commit/e8fdfc639b6aa1afd44d616cb7fb38a4ee1b2001))
- (popmenu) register popper inside the component ([07baa3a](https://github.com/any-design/anyui/commit/07baa3a9186991933aba407dc38e6a2940072451))
- (radioGroup) register the ARadio inside the component ([6ac4286](https://github.com/any-design/anyui/commit/6ac4286a1d81f68b7c241de33668ac2e81dce0ab))
- (select) register input and popper in the component ([ed09351](https://github.com/any-design/anyui/commit/ed09351f8052464320901f5726dd831b308121ce))

## [0.2.6](https://github.com/any-design/anyui/compare/v0.2.5...v0.2.6) (2023-11-23)

### Bug Fixes

- (resolver) select cannot be imported properly by resolver ([47b012f](https://github.com/any-design/anyui/commit/47b012ff2c598a14f42ae390f2e5d7956fff438d))

## [0.2.5](https://github.com/any-design/anyui/compare/v0.2.4...v0.2.5) (2023-11-15)

### Features

- (empty) non-selectable empty component ([5e732f3](https://github.com/any-design/anyui/commit/5e732f3e047a1e14e9dc470de94aa39cff11db57))
- (listMenu) not-selectable split element ([63b519a](https://github.com/any-design/anyui/commit/63b519a3439b96386904ff11cbaf5e0710ac5950))
- (listMenu) use overlay color as hover color ([e6d5c75](https://github.com/any-design/anyui/commit/e6d5c75438219bd87757e043b6669c5c2653cebf))
- (resolver) export resolver in bundle ([ebcc0b6](https://github.com/any-design/anyui/commit/ebcc0b612f415a2690f82f413c8baef08a17bfd9))

## [0.2.4](https://github.com/any-design/anyui/compare/v0.2.3...v0.2.4) (2023-11-15)

### Bug Fixes

- (form) set triggerType optional ([f737116](https://github.com/any-design/anyui/commit/f737116957a5b477245c8e9b423af91665d6f3f3))

### Features

- (empty) add empty component ([b94c16b](https://github.com/any-design/anyui/commit/b94c16b70077d42fa4cff0d03f12dee67ab6b448))
- (listMenu) the item will not be selectable ([72ee528](https://github.com/any-design/anyui/commit/72ee528b2cece285be9d261ca4466088819567bb))

## [0.2.3](https://github.com/any-design/anyui/compare/v0.2.1...v0.2.3) (2023-11-15)

### Bug Fixes

- (core) wrong type entry location ([0ff1801](https://github.com/any-design/anyui/commit/0ff1801e0a07e5ad6da4e12d72689e83497040aa))

## [0.2.2](https://github.com/any-design/anyui/compare/v0.2.1...v0.2.2) (2023-11-14)

### Bug Fixes

- (resolver) import related component style automatically ([82f110f](https://github.com/any-design/anyui/commit/82f110ffb14db26ede56140052b0bec79c32c0e2))

### Features

- (core) upgrade deps & lint fix all files ([6fdde00](https://github.com/any-design/anyui/commit/6fdde008306f2c4d137b6e995c4d7a01e1f6447e))

## [0.2.1](https://github.com/any-design/anyui/compare/v0.2.0...v0.2.1) (2023-11-14)

### Bug Fixes

- (listView) the style file cannot be generated properly ([bb0fa15](https://github.com/any-design/anyui/commit/bb0fa154b48a1d692c7c6154c04a9587319d7fd6))

# [0.2.0](https://github.com/any-design/anyui/compare/v0.1.21...v0.2.0) (2023-11-14)

### Bug Fixes

- (index) add export of listView ([f842823](https://github.com/any-design/anyui/commit/f8428234c2a28402af3eb778109b098991cb4d4b))

### Features

- (core) **BREAKING**: allow to import sub-component style separetely ([b71d192](https://github.com/any-design/anyui/commit/b71d192160995ef3c7cccd01c045f6600c30c1c2))
- (clickable-text) add more colored type ([1ec1f94](https://github.com/any-design/anyui/commit/1ec1f94c147c2cf967f27be803cea756ed0bda2a))
- (float) now float mask will have a larger radius blur ([b0ad294](https://github.com/any-design/anyui/commit/b0ad2941b9c68b3ee74d04cc1cca2087f06d30d6))
- (float) now the float can be centered & tweat the style of the background ([701ce5b](https://github.com/any-design/anyui/commit/701ce5b7efed48c0405b1355acd638a9a62083ef))

## [0.1.21](https://github.com/any-design/anyui/compare/v0.1.20...v0.1.21) (2023-11-14)

### Bug Fixes

- (layout) side width now is reactive ([c69d256](https://github.com/any-design/anyui/commit/c69d256c79cf8050e8d96239b010a5d94d5f1607))

### Features

- (button) add colored button with info, warn, danger color ([439b197](https://github.com/any-design/anyui/commit/439b1978c129fe30e02b10d559b13c20dac58fd3))
- (layout) make auto fit SSR friendly ([910f296](https://github.com/any-design/anyui/commit/910f2962712e2e214af25a878a23184443561fb0))
- (layout) now layout will fill the parent element when the parent element has relative position setting ([2cdf0dc](https://github.com/any-design/anyui/commit/2cdf0dc8a0413ef5fa37e776bfe2a797680d8d20))
- (listView) add listView component ([742351f](https://github.com/any-design/anyui/commit/742351f4346f6c0e55773bbd9404dc58bc1d349a))
- (theme) support alpha color when generating dark colors in color map ([eea0476](https://github.com/any-design/anyui/commit/eea0476bc93974ed696265c1d70d603ec7800b7c))

## [0.1.20](https://github.com/any-design/anyui/compare/v0.1.19...v0.1.20) (2023-11-13)

### Bug Fixes

- (float) float content should be relative position ([176221e](https://github.com/any-design/anyui/commit/176221efbda70327a94d7122eb584f46162e1796))

## [0.1.19](https://github.com/any-design/anyui/compare/v0.1.18...v0.1.19) (2023-11-13)

### Features

- (button) add type "secondary" ([41b4f02](https://github.com/any-design/anyui/commit/41b4f02efa567ad2ae7fa21e4bf21707e07b4fe3))

## [0.1.18](https://github.com/any-design/anyui/compare/v0.1.17...v0.1.18) (2023-11-12)

### Features

- (form) support triggerType in form item to validate fields dynamically ([492b684](https://github.com/any-design/anyui/commit/492b68408084b3a94da09ac68ff72a69d972fbd5))
- (input) add change, input, blur events ([6e16617](https://github.com/any-design/anyui/commit/6e16617e38823533f7b2b475e16dcd7d757c4fb4))
- (radio-button-group) add change event ([0abb309](https://github.com/any-design/anyui/commit/0abb3092252f173ee59ef233b77cbdacc3dbf540))
- (radio-group) add change event ([c82959b](https://github.com/any-design/anyui/commit/c82959bc9da8730910cd11714f627f80941d9e1e))
- (select) add change, blur events ([1483e63](https://github.com/any-design/anyui/commit/1483e6342861ea63d5154807bef66369a9d463d1))
- (textarea) add blur, change, input events ([0b45130](https://github.com/any-design/anyui/commit/0b451306c0b7f3cd940a3c9c125f12ce2feb902a))

## [0.1.17](https://github.com/any-design/anyui/compare/v0.1.16...v0.1.17) (2023-11-12)

### Bug Fixes

- (spinner) extract spinner styles into spinner component ([8f665dd](https://github.com/any-design/anyui/commit/8f665dd403d895b8c326179d21e1b5cfe5e2c36c))

### Features

- (button) remove spinner import ([5226fe6](https://github.com/any-design/anyui/commit/5226fe60abffd400b0006924b9bdd2e85cd90d5f))
- (message) add enter animation to message ([2c6ce77](https://github.com/any-design/anyui/commit/2c6ce7705a6679ab330260c0265cb8605fa52914))
- (message) now the new messages will always on the top of container ([6b20fc6](https://github.com/any-design/anyui/commit/6b20fc6966f5625d7fffb14a458b3effc9c6304c))

## [0.1.16](https://github.com/any-design/anyui/compare/v0.1.15...v0.1.16) (2023-11-12)

### Features

- (float) className => class & not set padding to inline style by default ([ecce985](https://github.com/any-design/anyui/commit/ecce98553fa48a6e5752069f527db16d7cadbe01))

## [0.1.15](https://github.com/any-design/anyui/compare/v0.1.14...v0.1.15) (2023-11-12)

### Bug Fixes

- (button) event not be handled properly ([497d565](https://github.com/any-design/anyui/commit/497d565bfa219064604f90686ba777fb9e2ea360))

## [0.1.14](https://github.com/any-design/anyui/compare/v0.1.13...v0.1.14) (2023-11-12)

### Features

- (button) add loading state ([19ec971](https://github.com/any-design/anyui/commit/19ec9715de74b0d80f8f80342428d0b09dcf819f))

## [0.1.13](https://github.com/any-design/anyui/compare/v0.1.12...v0.1.13) (2023-11-12)

### Features

- (button) optimize the shadow of gradient & depth style ([999d767](https://github.com/any-design/anyui/commit/999d767f0118eea0b1054d2f133ea56a8f2f0f29))
- (float) add round property to float ([193d930](https://github.com/any-design/anyui/commit/193d930e7208ebcdc7eec4257e7d034927af338b))

## [0.1.12](https://github.com/any-design/anyui/compare/v0.1.10...v0.1.12) (2023-11-12)

### Bug Fixes

- (list-menu) export list menu ([49f4885](https://github.com/any-design/anyui/commit/49f48851fcbcacdf3bdca58356f03196a8188100))

## [0.1.11](https://github.com/any-design/anyui/compare/v0.1.10...v0.1.11) (2023-11-11)

### Bug Fixes

- (theme) override for colors now will be also applied to dark-colors ([2ca05ef](https://github.com/any-design/anyui/commit/2ca05ef28cceae4a864ca1252dd5faf7c3ff37b0))

## [0.1.10](https://github.com/any-design/anyui/compare/v0.1.9...v0.1.10) (2023-10-07)

### Bug Fixes

- (layout) layout might not fill the parent element in some cases ([f23787c](https://github.com/any-design/anyui/commit/f23787c0e9acb5860754ba68ce40644a6b6aad69))
- (pagination) wrong text color of selected page ([44c7898](https://github.com/any-design/anyui/commit/44c789886bd7b1c9ba1f026bca4c96137f4122c1))

### Features

- (input) optimize the visual design of borderless readonly input ([906cde2](https://github.com/any-design/anyui/commit/906cde2a5b6e28d1c9e246998e9bf23b68b025c0))
- (listMenu) add ListMenu component ([b0c591b](https://github.com/any-design/anyui/commit/b0c591bf3bddc91f98de835466b97b390d2b06ef))
- (theme) add hover color ([23935a5](https://github.com/any-design/anyui/commit/23935a502d97ae3ac5652d6e0da968a725c0166a))
- (upload) add disabled property ([ba467ef](https://github.com/any-design/anyui/commit/ba467ef5684d6f5cfbcae9a49e7d3977dbca1c2b))

## [0.1.9](https://github.com/any-design/anyui/compare/v0.1.8...v0.1.9) (2023-10-06)

### Features

- (input) support measurement for slots ([95e412b](https://github.com/any-design/anyui/commit/95e412bb566e037ccf2aa91121ad3eb1119a2857))
- (theme) boost lightness for default theme ([daf5089](https://github.com/any-design/anyui/commit/daf5089a1bd40fdbf00aecce106185e00fd06b05))
- (theme) support deep merge in lightness adjustment map, and now dark mode can have its own adjustment map ([532486e](https://github.com/any-design/anyui/commit/532486ebb517fd720728ecb54c100915c07bd5f3))

## [0.1.8](https://github.com/any-design/anyui/compare/v0.1.7...v0.1.8) (2023-10-06)

### Bug Fixes

- (theme) customization won't work with defined colors ([4ef2941](https://github.com/any-design/anyui/commit/4ef2941bf44efdff3931e070222fadd45c808a82))

## [0.1.7](https://github.com/any-design/anyui/compare/v0.1.5...v0.1.7) (2023-09-19)

### Bug Fixes

- (layout) correct html tag name ([a5dba2d](https://github.com/any-design/anyui/commit/a5dba2d2ec950b92656ff32ab1ec853a1c71e608))
- (pagination) type declaration generate failed ([ae646ea](https://github.com/any-design/anyui/commit/ae646ea41a8f6c3b40935117465e7f6f85849bd2))

### Features

- (button) support IconifyIcon type in prop ([e8310d4](https://github.com/any-design/anyui/commit/e8310d4fafa6b556680f65d376ee6e37cfdbde32))
- (checkbox) support IconifyIcon type in prop ([315ed1e](https://github.com/any-design/anyui/commit/315ed1e304a61fb7f19755e7b75267b1f80d3bba))
- (message) support IconifyIcon type in prop ([6a97a5d](https://github.com/any-design/anyui/commit/6a97a5dead5167ca1a76a5f286d59a9d98812aca))
- (pagination) add pagination component ([6c4cc3e](https://github.com/any-design/anyui/commit/6c4cc3ed5e42d40b5189027720d3721bd665f6d4))
- (select) support IconifyIcon type in prop ([cdf7be4](https://github.com/any-design/anyui/commit/cdf7be444a1d9df75b1cfa22349b4d5aa8d83c23))
- (spinner) support IconifyIcon type in prop ([14d37f3](https://github.com/any-design/anyui/commit/14d37f34d5293f11b0eb7cf069703ad08573acf9))

## [0.1.6](https://github.com/any-design/anyui/compare/v0.1.5...v0.1.6) (2023-09-18)

### Features

- (pagination) add pagination component ([6c4cc3e](https://github.com/any-design/anyui/commit/6c4cc3ed5e42d40b5189027720d3721bd665f6d4))

## [0.1.5](https://github.com/any-design/anyui/compare/v0.1.4...v0.1.5) (2023-09-17)

### Features

- (popmenu) command event now will have an extra argument which contains the elements of popper ([7ba3eb0](https://github.com/any-design/anyui/commit/7ba3eb070df2bc96b81284592400899c71891ff9))

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
