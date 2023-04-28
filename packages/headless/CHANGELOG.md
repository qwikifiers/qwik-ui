# Changelog

This file was generated using [@jscutlery/semver](https://github.com/jscutlery/semver).

## [0.1.4](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.3...headless-0.1.4) (2023-04-28)


### Bug Fixes

* add css inline definitions ([#276](https://github.com/qwikifiers/qwik-ui/issues/276)) ([0ed7d96](https://github.com/qwikifiers/qwik-ui/commit/0ed7d961ee0d4249afbb569bedc9bc3e18fa5807))
* project folders and linter ([#205](https://github.com/qwikifiers/qwik-ui/issues/205)) ([198f729](https://github.com/qwikifiers/qwik-ui/commit/198f729b1263797941ee21f82a2c71b20727c45e))
* remove any to satisfy the picky linter ✅ ([737860b](https://github.com/qwikifiers/qwik-ui/commit/737860bc6f06d523e813c0088dc1265dd36ed0f3))
* solve headless linter warnings ([a97d826](https://github.com/qwikifiers/qwik-ui/commit/a97d826eff4fb16f51b027c87829e9c3b31f7f1e))
* solve linter errors ([100ed43](https://github.com/qwikifiers/qwik-ui/commit/100ed4376b7cbfe454cef9ca7b1743c6335bf069))
* **toggle component:** renamed prop & change funcionality in Toggle ([#210](https://github.com/qwikifiers/qwik-ui/issues/210)) ([d96c401](https://github.com/qwikifiers/qwik-ui/commit/d96c40130fc8bf38036d837c478de5ed503f24b1)), closes [#209](https://github.com/qwikifiers/qwik-ui/issues/209)
* tooltip works only the first time ([#269](https://github.com/qwikifiers/qwik-ui/issues/269)) ([29b14ff](https://github.com/qwikifiers/qwik-ui/commit/29b14ff91981d6782885993422f1e7ea6bb9f2dc))
* update config to enable cypress component testing ([ff170b8](https://github.com/qwikifiers/qwik-ui/commit/ff170b8491a58f2fd300a62745f5e7be8e2d45fd))


### Features

* add checkbox ([#154](https://github.com/qwikifiers/qwik-ui/issues/154)) ([b8d9a73](https://github.com/qwikifiers/qwik-ui/commit/b8d9a7312a276dfa0c96a4f0b0592e08b134f9fe)), closes [#128](https://github.com/qwikifiers/qwik-ui/issues/128)
* add daisy slider component ([#199](https://github.com/qwikifiers/qwik-ui/issues/199)) ([f9b997d](https://github.com/qwikifiers/qwik-ui/commit/f9b997dcbcc2edc1c23948c93f4dc783e7b620d6))
* add input phone ([#243](https://github.com/qwikifiers/qwik-ui/issues/243)) ([8c8b1aa](https://github.com/qwikifiers/qwik-ui/commit/8c8b1aa6a825852ed3bde0695514b9f7d676ecaf))
* added a11y to storybook ([2310d71](https://github.com/qwikifiers/qwik-ui/commit/2310d71ef378c8852704a472da903b1a82ec6f48))
* auto country code ([#249](https://github.com/qwikifiers/qwik-ui/issues/249)) ([91af379](https://github.com/qwikifiers/qwik-ui/commit/91af3798fe9c6e298c4747208b8db64cfd1bd3c6))
* base pagination ([#151](https://github.com/qwikifiers/qwik-ui/issues/151)) ([76aed0e](https://github.com/qwikifiers/qwik-ui/commit/76aed0e6ae2e9c67051ab574f0d1e3c9313904e6)), closes [#130](https://github.com/qwikifiers/qwik-ui/issues/130) [#15](https://github.com/qwikifiers/qwik-ui/issues/15)
* **component:** Add Badge Component ([#222](https://github.com/qwikifiers/qwik-ui/issues/222)) ([fe15e6c](https://github.com/qwikifiers/qwik-ui/commit/fe15e6ce8a96941f295887739f5dff4cbc296c21)), closes [#219](https://github.com/qwikifiers/qwik-ui/issues/219)
* **component:** add carousel component ([#258](https://github.com/qwikifiers/qwik-ui/issues/258)) ([d258189](https://github.com/qwikifiers/qwik-ui/commit/d2581896653b6291f5b1ed97a6802069f2b7ddc3))
* **component:** Add loading indicator ([#207](https://github.com/qwikifiers/qwik-ui/issues/207)) ([923fd4e](https://github.com/qwikifiers/qwik-ui/commit/923fd4e356f4855fa1be0e6ce449ed3146683231))
* **component:** add navigation bar ([#213](https://github.com/qwikifiers/qwik-ui/issues/213)) ([dfd89e0](https://github.com/qwikifiers/qwik-ui/commit/dfd89e04b2b765476d3f31ea066af56050318ff8)), closes [#200](https://github.com/qwikifiers/qwik-ui/issues/200)
* **component:** add new Breadcrumb component ([#212](https://github.com/qwikifiers/qwik-ui/issues/212)) ([5b526cc](https://github.com/qwikifiers/qwik-ui/commit/5b526cc2cc23acc9fecd3aefefa881af0deb33c4))
* **component:** an alert component ([#218](https://github.com/qwikifiers/qwik-ui/issues/218)) ([d3daf68](https://github.com/qwikifiers/qwik-ui/commit/d3daf68e2f1a64cc9f267c4ca41262942bd92e0d)), closes [#217](https://github.com/qwikifiers/qwik-ui/issues/217)
* **component:** improve pagination ([#208](https://github.com/qwikifiers/qwik-ui/issues/208)) ([5d86b51](https://github.com/qwikifiers/qwik-ui/commit/5d86b510809276e748ad990cd0310bd88155c391))
* **input:** add input component ([#257](https://github.com/qwikifiers/qwik-ui/issues/257)) ([43c5f53](https://github.com/qwikifiers/qwik-ui/commit/43c5f53cbcd5ca5d08f522fa0707a251026a046e))


### BREAKING CHANGES

* **toggle component:** any component who uses daisy-toggle, will have to rename `checked` to `pressed`



## [0.1.3](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.2...headless-0.1.3) (2023-02-23)



## [0.1.2](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.1...headless-0.1.2) (2023-02-23)


### Bug Fixes

* debounce showing/hiding the tooltip ([#159](https://github.com/qwikifiers/qwik-ui/issues/159)) ([f889444](https://github.com/qwikifiers/qwik-ui/commit/f889444da72e7c1f7f9ba3bb05fb470ad057a017))
* deprecated useClientEffect$ and createContext hooks ([#187](https://github.com/qwikifiers/qwik-ui/issues/187)) ([ff6016f](https://github.com/qwikifiers/qwik-ui/commit/ff6016f88f19a6a0f915afe5f70f5576e3c3be1a))
* **rating:** add useId as key for each RatingIcon ([#162](https://github.com/qwikifiers/qwik-ui/issues/162)) ([b9f47b1](https://github.com/qwikifiers/qwik-ui/commit/b9f47b1bed4898db9056a397b725fa07e2ab03a3))
* remove any from Component<any> ([#190](https://github.com/qwikifiers/qwik-ui/issues/190)) ([35bc6fa](https://github.com/qwikifiers/qwik-ui/commit/35bc6faac9717a29c8162486c08d0ef21a809641))
* remove double await ([97c9f0e](https://github.com/qwikifiers/qwik-ui/commit/97c9f0eb9a971e1d793add29fd7accec48c8d835)), closes [#75](https://github.com/qwikifiers/qwik-ui/issues/75)
* remove warnings ([#182](https://github.com/qwikifiers/qwik-ui/issues/182)) ([befcbc5](https://github.com/qwikifiers/qwik-ui/commit/befcbc5509708a3c222a6a634cce4dc5bf93dfb4))
* rub up tests ([0f2adf9](https://github.com/qwikifiers/qwik-ui/commit/0f2adf91822a3c40072f72c07463024849cd79d1))


### Features

* **component:** add draft Popover component ([#140](https://github.com/qwikifiers/qwik-ui/issues/140)) ([15950fe](https://github.com/qwikifiers/qwik-ui/commit/15950fe87a23a35ce8d6a5d61a2599a2687abf7d))
* **component:** add new  Progress Bar component ([#174](https://github.com/qwikifiers/qwik-ui/issues/174)) ([5bf8262](https://github.com/qwikifiers/qwik-ui/commit/5bf8262e86abd20590baa81cc69988dd5daf307b)), closes [#129](https://github.com/qwikifiers/qwik-ui/issues/129)
* **component:** add radio component ([#178](https://github.com/qwikifiers/qwik-ui/issues/178)) ([35b7a60](https://github.com/qwikifiers/qwik-ui/commit/35b7a60ceda6233587fe4f6ffe2b187e7ef5757e)), closes [#128](https://github.com/qwikifiers/qwik-ui/issues/128)
* **component:** add the Accordion Component ([#176](https://github.com/qwikifiers/qwik-ui/issues/176)) ([523d19d](https://github.com/qwikifiers/qwik-ui/commit/523d19d124c245f3973b3b6ac0adbb82a6820e60)), closes [#126](https://github.com/qwikifiers/qwik-ui/issues/126)
* **component:** add the rating component ([#149](https://github.com/qwikifiers/qwik-ui/issues/149)) ([0c07dd9](https://github.com/qwikifiers/qwik-ui/commit/0c07dd993f7ea46dc93420625ca8bbb8c3dc2e69))
* **component:** added a new headless slider component ([#169](https://github.com/qwikifiers/qwik-ui/issues/169)) ([80f860f](https://github.com/qwikifiers/qwik-ui/commit/80f860f1536e2364eddd6295a4375639bbcc6b4e))
* **component:** added a Toast component that reads the label, the po… ([#157](https://github.com/qwikifiers/qwik-ui/issues/157)) ([019f7fa](https://github.com/qwikifiers/qwik-ui/commit/019f7fa1e72ef7bd85c19adec3184add33e55010))
* headless menu ([#158](https://github.com/qwikifiers/qwik-ui/issues/158)) ([1ec959e](https://github.com/qwikifiers/qwik-ui/commit/1ec959eb81c127161db52ab8ab0d6e27ac34e7a1))



## [0.1.1](https://github.com/qwikifiers/qwik-ui/compare/headless-0.1.0...headless-0.1.1) (2023-02-09)


### Bug Fixes

* actions/test ([#107](https://github.com/qwikifiers/qwik-ui/issues/107)) ([816fa37](https://github.com/qwikifiers/qwik-ui/commit/816fa377cc7996ffb0cf5985068a205d7df9d197))
* **component:** add TS support for HTMLButton properties ([b3fca21](https://github.com/qwikifiers/qwik-ui/commit/b3fca210dbe026c653e0f4a7518ed7621bd1aeda))


* add select implementation (#88) ([ba67163](https://github.com/qwikifiers/qwik-ui/commit/ba671637546cd2211960f05fb3187fd173517958)), closes [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#76](https://github.com/qwikifiers/qwik-ui/issues/76) [#76](https://github.com/qwikifiers/qwik-ui/issues/76) [#76](https://github.com/qwikifiers/qwik-ui/issues/76) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#97](https://github.com/qwikifiers/qwik-ui/issues/97) [#88](https://github.com/qwikifiers/qwik-ui/issues/88) [#88](https://github.com/qwikifiers/qwik-ui/issues/88)


### Features

* add Button component ([#98](https://github.com/qwikifiers/qwik-ui/issues/98)) ([58f1ff1](https://github.com/qwikifiers/qwik-ui/commit/58f1ff1fcabbe9f0cfb66203000e84d76096d5b4))
* **component:** add ButtonGroup component ([#103](https://github.com/qwikifiers/qwik-ui/issues/103)) ([30d9f69](https://github.com/qwikifiers/qwik-ui/commit/30d9f697e9cda54d9aa7ee452fe870d555ad0ce5))


### BREAKING CHANGES

* Value on option elements are set to 0 despite value prop being successfully passed
