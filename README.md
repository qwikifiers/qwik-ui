# 🚀🧩 Qwik UI - Components Library

The components library for Qwik

![npm](https://img.shields.io/npm/v/@qwik-ui/core?label=npm%20version)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT) [![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- [![npm downloads](https://img.shields.io/npm/dm/@qwik-ui/core.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@qwik-ui/core&from=2017-07-26) -->

<!-- [![codecov](https://img.shields.io/codecov/c/github/qwikifiers/qwik-ui.svg)](https://codecov.io/gh/qwikifiers/qwik-ui)  -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<br/>

Here is our temporary logo 😅👇

![image](packages/website/public/qwik-ui-banner-github.png)

# ⚠ This is not ready for production!

This library is still in early stages and once we'll collect enough feedback from the community we'll release the first beta version.

We still need to

- [ ] Design a normal logo
- [ ] Build a proper documentation website
- [ ] Add tests
- [ ] Fix bugs
- [ ] more...

<br/>

## Installation (for trying it out and reporting issues)

```console

npm install -D @qwik-ui/core
```
or
```console

yarn add @qwik-ui/core
```
Once the package was added to your project, you will have to add tailwind configuration. </br>
At the root of your project, add `postcss.config.cjs` file with the following content:
```js
const path = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.cjs'),
    },
    autoprefixer: {},
  },
};
```
At the root of your project add `tailwind.config.cjs` file with the following content:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
```
At the main css file in your project you will need to add the following lines to enable tailwind and daisy styles:
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
````
Now you can start using the library components.

## Component Usage Example

```js

import { Alert } from '@qwik-ui/core';

export Page = component$(()=> {
  return (

    <div>
      <Alert class="alert-success">Some message</Alert>
    </div>
  )
})

```

## Contributing

Want to contribute? Yayy! 🎉

Please read and follow our [Contributing Guidelines](CONTRIBUTING.md) to learn what are the right steps to take before contributing your time, effort and code.

Thanks 🙏

<br/>

## Code Of Conduct

Be kind to each other and please read our [code of conduct](CODE_OF_CONDUCT.md).

<br/>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://hirez.io/?utm_source=github&utm_medium=link&utm_campaign=qwik-ui"><img src="https://avatars1.githubusercontent.com/u/1430726?v=4?s=100" width="100px;" alt="Shai Reznik"/><br /><sub><b>Shai Reznik</b></sub></a><br /><a href="https://github.com/qwikifiers/qwik-ui/commits?author=shairez" title="Code">💻</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=shairez" title="Tests">⚠️</a> <a href="#infra-shairez" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=shairez" title="Documentation">📖</a> <a href="#maintenance-shairez" title="Maintenance">🚧</a> <a href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Ashairez" title="Reviewed Pull Requests">👀</a> <a href="#ideas-shairez" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="http://www.gilfink.net"><img src="https://avatars.githubusercontent.com/u/1590253?v=4?s=100" width="100px;" alt="Gil Fink"/><br /><sub><b>Gil Fink</b></sub></a><br /><a href="#infra-gilf" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=gilf" title="Tests">⚠️</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=gilf" title="Code">💻</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=gilf" title="Documentation">📖</a> <a href="#ideas-gilf" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Agilf" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://it.linkedin.com/in/giorgio-boa"><img src="https://avatars.githubusercontent.com/u/35845425?v=4?s=100" width="100px;" alt="Giorgio Boa"/><br /><sub><b>Giorgio Boa</b></sub></a><br /><a href="https://github.com/qwikifiers/qwik-ui/commits?author=gioboa" title="Code">💻</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=gioboa" title="Tests">⚠️</a> <a href="https://github.com/qwikifiers/qwik-ui/commits?author=gioboa" title="Documentation">📖</a> <a href="#ideas-gioboa" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/qwikifiers/qwik-ui/pulls?q=is%3Apr+reviewed-by%3Agioboa" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/reemardelarosa"><img src="https://avatars.githubusercontent.com/u/4918140?v=4?s=100" width="100px;" alt="John Reemar Dela Rosa"/><br /><sub><b>John Reemar Dela Rosa</b></sub></a><br /><a href="#maintenance-reemardelarosa" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<br/>

## License

MIT
