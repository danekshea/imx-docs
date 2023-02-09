---
id: "create-react-app-webpack-5-errors"
title: "Webpack 5 errors"
slug: "/create-react-app-webpack-5-errors"
sidebar_position: 3
keywords:
  - imx-dx
---

[create-react-app](https://create-react-app.dev/) 최신 버전을 [@imtbl/imx-sdk](https://www.npmjs.com/package/@imtbl/imx-sdk) 모듈과 함께 사용하는 경우, 앱을 시작하려고 할 때 다음과 같은 오류가 나타날 수 있습니다.

```shell
Module not found: Error: Can't resolve 'https' in '/Users/{username}/{project-name}/node_modules/@imtbl/imx-sdk/dist'
BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.
```

### 이런 오류가 나타나는 이유는 무엇인가요?
The reason for this error is that create-react-app uses a version of webpack greater than 5, which, unlike versions < 5, does not include Node.js polyfills by default. 이것은 Node.js 폴리필을 요구하는 각 모듈에 대해 수동으로 구성되어야 함을 의미합니다.

보통 이것은 프로젝트 내부의 웹팩 config 파일을 업데이트하는 것을 포함합니다. 하지만 create-react-app은 [react-scripts](https://www.npmjs.com/package/react-scripts)라 불리는 다른 패키지를 사용해 웹팩(및 기타 빌드 종속성)을 관리합니다. react-scripts 내에서는 webpack config를 업데이트할 수 없으므로 그것을 오버라이딩해야 합니다.

### 해결 방법
#### 1. [react-app-rewired](https://www.npmjs.com/package/react-app-rewired) 설치
이 패키지는 webpack config 파일을 업데이트하여 폴리필 노드 코어 모듈 오류를 고칠 수 있게 해줍니다.

**npm**으로 설치:
```shell
npm install --save-dev react-app-rewired
```

**yarn**으로 설치:
```shell
yarn add --dev react-app-rewired
```
#### 2. 누락된 종속성 설치

다음의 누락된 종속성은 반드시 설치되어야 합니다:***crypto-browserify, stream-browserify, assert, stream-http, https-browserify, os-browserify, url, process***

**npm**으로 설치:
```shell
npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```
**yarn**으로 설치:
```shell
yarn add process crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer
```

#### 3. create-react-app webpack config 파일 오버라이딩

이것은 react-scripts에서 webpack config 파일을 오버라이딩하는 방법으로 누락된 폴리필 종속성을 해결하는 방법을 알려줍니다.

프로젝트의 루트 폴더에서 `config-overrides.js`라는 새 파일을 생성하고 다음의 코드를 거기에 추가하십시오.
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

#### 4. package.json을 오버라이딩하여 웹팩 구성에 추가

이제 새 config를 구현하기 위해 package.json의 다음 스크립트에 `react-scripts` 대신 `react-app-rewired`를 호출해야 합니다.
* 시작
* 빌드
* 테스트

이것은 package.json의 **before**입니다.
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject" 
},
```
**after**는 다음과 같습니다.
```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject" 
},
```
이 작업을 완료하고 나면, 개발 서버가 다시 정상적으로 실행됩니다.

### 'failed to parse source map' 경고 해결 방법

모듈 경고에서 여전히 `failed to parse source map`가 많이 발생할 수 있습니다. 현재는 무시할 수 있으나 이를 제거하고 싶은 경우, `GENERATE_SOURCEMAP=false`를 package.json의 `start` 스크립트에 추가함으로써 경고를 비활성화할 수 있습니다([이 토론](https://github.com/facebook/create-react-app/discussions/11767#discussioncomment-2092902)을 참고)

```json
"scripts": {
    "start": "GENERATE_SOURCEMAP=false react-app-rewired start",
    // ...
},
```
