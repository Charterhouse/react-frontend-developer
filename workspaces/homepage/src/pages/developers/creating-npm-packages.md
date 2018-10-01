---
path: /developers/creating-npm-packages
title: Creating npm packages
tag: developer
---

Creating a valid, well-structured, and user-friendly npm package is not hard and an interested user will find a number of good examples. We like to recommend two online resources that we found very educative and useful in building and distributing our own npm packages:

 - [Package a module for npm in CommonJS/ES2015/UMD with babel and rollup],
 - [Setting up multi-platform npm packages]

Based mostly on these two resources we created the following recommendations below.

## Module format

There are two basic module systems/loaders in JavaScript:

- AMD (asynchronous module definition) - works with e.g. [RequireJS] - optimized for in-browser use, but can also be used with Node.

- CommonJS - native module system of Node. The module format is not optimal for browser, that's why one needs tools like [Browserify] or [Webpack] to create a browser-compatible bundle. CommonJS format gain in importance together with increased popularity of Node Package Manager (npm) and is currently de-facto standard in frontend development.

There is also *UMD* (universal module definition), which works as an AMD module, a CommonJS module, or as a browser global.

But now, with ES6 we finally have a module system that is part of the language (neither AMD nor CommonJS was), and its support in the browsers continuously increases. The most important advantage of using ES6 modules is multiple exports. With CommonJS and AMD you can export only one thing. Many modules are build in such a way that they export one big object with lots of functions attached. That makes it more or less impossible for the module bundler like Webpack to figure out which of these many function your code actually uses. With ES6 module syntax this is possible, but it will not happen without your help.

## pkg.main vs pkg.module

If you look at any valid npm package out there, you will find something like this:

```json
{
  "name": "my-package",
  "version": "0.1.0",
  "main": "lib/index.js"
}
```

The `main` attribute (`pkg.main`) tells the module loader where to search for CommonJS compatible modules.
So tools like Browserify or Webpack will not to include `lib/index.js` and any dependencies that it has in your bundle when you call `require('my-package')` in your code. This will work, but is not optimal. ES6 modules format-aware tools like Rollup and even Webpack will not be used to their full potential. ES6-aware tools try to resolve the `module` attribute (`pkg.module`) of the `package.json` file. `pkg.module` points to the version of your code that uses ES6 modules. Having access to the code that uses ES6 modules, ES6-aware tools can create smaller distribution bundles, which is great! In order to create user friendly packages that support both legacy module formats, and new ES6 modules, make sure that your `package.json` includes both `pkg.main` and `pkg.module` attributes like this:

```json
{
  "name": "my-package",
  "version": "0.1.0",
  "main": "lib/index.js",
  "module": "es/index.js"
}
```

## Can I use modern ES6 features like arrow functions, classes, and spread operators?

Absolutely! Who would like to use ES5 version of JavaScript when there is ES6? Unfortunately, not every modern language feature is supported in all environments. Thus we transpile. Even for `pkg.module` version of our code we need to transpile - in this case we basically transpile everything except for the module system. We see later that Babel transpiler has a special setting to do exactly this.

> It's a frequent source of frustration. Be a responsible library author and ship code that actually runs in the environments you support! Otherwise, whoever uses your library will have to transpile it themselves, including configuring their transpiler to handle your code, which might involve esoteric transforms and conflicting versions of Babel.

## Configuring Babel for transpilation

Since Babel 7, configuring Babel became simpler. We just add one npm module, `@babel/preset-env`:

```bash
$ yarn add -D @babel/preset-env
```

where `-D` means that `@babel/preset-env` will be installed as development dependency.

Next we just need to add the following to our `.babelrc` file:

```json
{
  "presets": ["@babel/preset-env"]
}
```

If you want Babel to transform rest properties for object destructuring assignment and spread properties for object literals you will need `@babel/plugin-proposal-object-rest-spread` npm module:

```bash
$ yarn add -D @babel/plugin-proposal-object-rest-spread
```

Your `.babelrc` configuration becomes:

```json
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-proposal-object-rest-spread"]
}
```

With this configuration you will cover most of the modern ES6 language features.

As explained above, we recommend creating at least two different transpilation configurations: one that transpiles ES2015+ to ES5 and one that transpiles ES2015+ to ES2015 (ES5 with ES6 modules).

Babel supports specifying more than one configuration in one `.babelrc` file using the `env` key:

```json
{
  "env": {
    "commonjs": {
      "presets": [
        "@babel/preset-env"
      ],
      "plugins": ["@babel/plugin-proposal-object-rest-spread"],
      "ignore": [
        "**/*.test.js",
        "**/__mocks__/**"
      ]
    },
    "es": {
      "presets": [
        ["@babel/preset-env", {
          "modules": false
        }]
      ],
      "plugins": ["@babel/plugin-proposal-object-rest-spread"],
      "ignore": [
        "**/*.test.js",
        "**/__mocks__/**"
      ]
    }
  }
}
```

The `env` key will be taken from `process.env.BABEL_ENV`, when this is not available then Babel uses `process.env.NODE_ENV` if even that is not available then it defaults to `development`.

In the `.babelrc` configuration above, we specify two different configurations: `commonjs` for CommonJS module format and `es` for ES6 module format. The only difference between these configurations is that `es6` configuration does not transpile ES6 modules (`"modules": false`) resulting in the ES5 version with ES6 modules.

## rollup.js

From [rollup.js] documentation:

> Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the new standardized format for code modules included in the ES6 revision of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and AMD. ES6 modules let you freely and seamlessly combine the most useful individual functions from your favorite libraries. This will eventually be possible natively, but Rollup lets you do it today.

We recommend using rollup to create a UMD version of our package (development and minimized) and use that version as the version pointed to by `pkg.main` (which expects CommonJS module format). UMD is compatible with both browser and node and therefore it can be used everywhere where CommonJS is required. Rollup can generate significantly smaller version of our package by using tree-shaking (see [Rollup! The tree-shaking bundler] and [MDN: Tree shaking]). Even when your package has dependencies that only provide the CommonJS format, rollup can, via `rollup-plugin-commonjs` plugin, convert CommonJS modules to ES6 format, and then still perform tree-shaking to remove dead code. The resulting UMD version can be pointed to by the `main` property in your `package.json` file. This way even the legacy bundlers will take advantage of lighter, faster, and less complicated version of your package.

In creating UMD, tree-shaken version of our package, rollup takes as the input the entry point of our package in ES6 (ES2015+) format (e.g. `source/index.js`). Then it transpiles the source files using Babel, ignoring the content of the `node_modules` folder. For any dependencies in CommonJS module format only (i.e. without `pkg.module` pointing to the ES module format), it converts them to ES6 module format and after tree-shaking uses includes the relevant code in the bundle. All this is controlled via `rollup.config.js` file. Below is an example configuration:

```javascript
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

const config = {
  input: 'source/index.js',
  output: {
    name: 'css-grid-helper'
  },
  external: ['web3'],
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config
```

In the configuration above we also let rollup to replace the value of `process.env.NODE_ENV` variable to the value provided by the user.

We also add a separate `.babelrc` configuration that we will use for rollup only - we will call it `umd`:

```json
"umd": {
  "presets": [
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  "plugins": ["@babel/plugin-proposal-object-rest-spread"],
  "ignore": [
    "**/*.test.js",
    "**/__mocks__/**"
  ]
}
```

As we see, this configuration is (currently) identical to the configuration we use for ES6 modules format.

## running babel and rollup.js

Babel and rollup can be invoked directly from `package.json` or one can use the following script:

```javascript
// tools/build.js
const fs = require('fs')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

console.log('Building CommonJS modules ...')

exec('babel source -d lib', {
  BABEL_ENV: 'commonjs'
})

console.log('\nBuilding ES modules ...')

exec('babel source -d es', {
  BABEL_ENV: 'es'
})

console.log('\nBuilding UMD module ...')

exec('rollup -c -f umd -o umd/css-grid-helper.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development'
})

console.log('\nBuilding minimized UMD module ...')

exec('rollup -c -f umd -o umd/css-grid-helper.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production'
})

const size = gzipSize.sync(
  fs.readFileSync('umd/css-grid-helper.min.js')
)

console.log('\ngzipped, the UMD build is %s', prettyBytes(size))
```

This will result in three folders created:

1. `lib` - standard CommonJS version of our package
2. `es` - ES6 module format
3. `umd` - universal version made with rollup after tree-shaking with both develop and minimized production bundles

## package.json

`package.json` for a module looks like this:

```json
{
  "name": "@react-frontend-developer/css-grid-helper",
  "version": "1.0.3",
  "description": "Lightweight javascript helper to work with CSS grid",
  "author": "Marcin Czenko <mczenok@me.com>",
  "license": "MIT",
  "main": "umd/css-grid-helper.min.js",
  "module": "es/index.js",
  "scripts": {
    "build": "node ./tools/build.js"
  },
  "engines": {
    "node": ">=9.0.0"
  },
  "files": [
    "lib",
    "es",
    "umd",
    "source"
  ],
  "publishConfig": {
    "access": "public"
  },
  "keywords": [
    "css-in-js",
    "react",
    "glamorous",
    "emotion",
    "styled-components"
  ],
  "devDependencies": {
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0",
    "@babel/plugin-proposal-object-rest-spread": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "gzip-size": "^4.1.0",
    "pretty-bytes": "^4.0.2",
    "rollup": "^0.66.0",
    "rollup-plugin-babel": "^4.0.0",
    "rollup-plugin-commonjs": "^9.1.3",
    "rollup-plugin-node-resolve": "^3.3.0",
    "rollup-plugin-replace": "^2.0.0",
    "rollup-plugin-uglify": "^3.0.0"
  }
}
```

Notice that we recommend using `files` to whitelist all the artifacts that should be included in the published package, which is often much easier than using a combination of `.gitignore` and `.npmignore` files.

The user can use our module as follows:

```javascript
import { Grid } from '@react-frontend-developer/css-grid-helper'
```

[Package a module for npm in CommonJS/ES2015/UMD with babel and rollup]: http://dev.topheman.com/package-a-module-for-npm-in-commonjs-es2015-umd-with-babel-and-rollup/

[Setting up multi-platform npm packages]:
http://2ality.com/2017/04/setting-up-multi-platform-packages.html

[RequireJS]: http://requirejs.org
[Browserify]: http://browserify.org
[Webpack]: https://webpack.js.org
[Babel]: http://babeljs.io
[rollup.js]: https://rollupjs.org
[Rollup! The tree-shaking bundler]: https://medium.com/tldr-tech/rollup-the-tree-shaking-bundler-ca546bd14477
[MDN: Tree shaking]: https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking
