---
id: "create-react-app-webpack-5-errors"
title: "Webpack 5 errors"
slug: "/create-react-app-webpack-5-errors"
sidebar_position: 3
keywords: [imx-dx]
---

If you're using the latest version of [create-react-app](https://create-react-app.dev/) with the [@imtbl/imx-sdk](https://www.npmjs.com/package/@imtbl/imx-sdk) module, you may see errors like this when trying to start up the app:

```shell
Module not found: Error: Can't resolve 'https' in '/Users/{username}/{project-name}/node_modules/@imtbl/imx-sdk/dist'
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.
```

### Why is this happening?
The reason for this error is that create-react-app uses a version of webpack greater than 5, which, unlike versions < 5, does not include Node.js polyfills by default. This means that they need to be configured manually for each module that requires them.

Normally, this involves updating the webpack config file inside a project, however, create-react-app uses another package called [react-scripts](https://www.npmjs.com/package/react-scripts) to manage webpack (and other build dependencies). As we cannot update the webpack config within react-scripts, we will need to override it.

### How to fix this
#### 1. Install [react-app-rewired](https://www.npmjs.com/package/react-app-rewired)
This package allows us to update the webpack config file to fix the polyfill node core module error.

Install with **npm**:
```shell
npm install --save-dev react-app-rewired
```

Install with **yarn**: 
```shell
yarn add --dev react-app-rewired
```
#### 2. Install the missing dependencies

The following missing dependencies will have to be installed: ***crypto-browserify, stream-browserify, assert, stream-http, https-browserify, os-browserify, url, process***

Install with **npm**:
```shell
npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```
Install with **yarn**:
```shell
yarn add process crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer
```

#### 3. Override the create-react-app webpack config file

This is how we override the webpack config file in react-scripts and tell it how to resolve the missing polyfill dependencies. 

In the root folder of your project, create a new file called `config-overrides.js`, and add the following code to it:
```javascript "config-overrides.js"
const webpack = require('webpack');
module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })
    return config;
}
```

#### 4. Override package.json to include the webpack configuration

Now, to implement the new config, we need to call `react-app-rewired` instead of `react-scripts` in the following scripts in our package.json:
* start
* build
* test

This is what the package.json file looks like **before**:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject" 
},
```
This is what it looks like **after**:
```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject" 
},
```
Once you've done this, the development server should be up and running again.

### How to deal with 'failed to parse source map' warnings

You will still have a large amount of `failed to parse source map` from modules warnings. They can be ignored for now, however, should you want to get rid of them, you can disable them (see [this discussion](https://github.com/facebook/create-react-app/discussions/11767#discussioncomment-2092902)) by adding `GENERATE_SOURCEMAP=false` to the `start` script in package.json:

```json
"scripts": {
    "start": "GENERATE_SOURCEMAP=false react-app-rewired start",
    // ...
},
```
