# eslint-config-tidy [![Build status for ESLint Config Tidy](https://api.travis-ci.com/sholladay/eslint-config-tidy.svg "Build Status")](https://travis-ci.com/sholladay/eslint-config-tidy "Builds")

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for Tidy style

## Why?

 - Consistency.
 - Clarity.
 - Simplicity.

## Install

```sh
npm install eslint-config-tidy --save-dev
```

## Usage

All you have to do is tell your linter to use this config.

### Use with [XO](https://github.com/sindresorhus/xo) (recommended)

Add an `xo.config.js` file to your project:

```js
import tidy from 'eslint-config-tidy';

export default [
	...tidy
];
```

### Alternatively, use with [ESLint](https://github.com/eslint/eslint)

Add an `eslint.config.js` file to your project:

```js
import tidy from 'eslint-config-tidy';

export default [
	...tidy
];
```

## Related

 - [eslint-config-tidy-react](https://github.com/sholladay/eslint-config-tidy-react) - ESLint shareable config for [React](https://reactjs.org) to be used with this config

## Contributing

See our [contributing guidelines](https://github.com/sholladay/eslint-config-tidy/blob/master/CONTRIBUTING.md "Guidelines for participating in this project") for more details.

1. [Fork it](https://github.com/sholladay/eslint-config-tidy/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sholladay/eslint-config-tidy/compare "Submit code to this project for review").

## License

[MPL-2.0](https://github.com/sholladay/eslint-config-tidy/blob/master/LICENSE "License for eslint-config-tidy") © [Seth Holladay](https://seth-holladay.com "Author of eslint-config-tidy")

Go make something, dang it.
