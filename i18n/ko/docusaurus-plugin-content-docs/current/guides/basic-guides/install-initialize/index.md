---
title: "Install and initialize"
slug: "/how-to-install-initialize"
keywords: [imx-dx]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ListAdmonition from '@site/src/components/ListAdmonition';

<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
        <li><a href="./immutable-x-sdk#setting-up-the-sdk">JS SDK</a></li>
    </ul>
</ListAdmonition>

## Core SDK
The [Core SDK](/sdk-docs/core-sdk-ts/overview) is a wrapper around our [API](/reference) and provides the bulk of the functionality of the ImmutableX platform. Before you can start using the Core SDK, you must initialize the client.

Initialize the Core SDK client with the network on which you want your application to run:

| Network | Description |
| -- | -- |
| `Sandbox` | The default test network (currently, it is Goërli)  |
| `Production` | Ethereum network  |
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

1. Install the npm package
```shell
npm install @imtbl/core-sdk --save
# or
yarn add @imtbl/core-sdk
```

2. Initialize the SDK with the correct environment:
```ts
import { ImmutableX, Config } from '@imtbl/core-sdk';

const config = Config.SANDBOX; // Or Config.PRODUCTION
const client = new ImmutableX(config);
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

1. Add Maven Central to your repositories:
```kotlin
repositories {
    mavenCentral()
}
```

2. Add the dependency to your app's `build.gradle` file:

```kotlin
dependencies {
    implementation 'com.immutable.sdk:imx-core-sdk-kotlin-jvm:$version'
}
```

3. Initialize the SDK with the correct environment:
```kotlin
ImmutableXCore.setBase(ImmutableXBase.Sandbox) // Or ImmutableXBase.Production (default)
```

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

### Pre-requisites:
* iOS 13.0 or macOS 10.15
* Swift 5.5

### Steps:
1. In your Swift package manager - `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/immutable/imx-core-sdk-swift.git", from: "0.2.2")
]
```

2. In your `Podfile`:
```swift
platform :ios, '13.0'
use_frameworks!

target 'MyApp' do
  pod 'ImmutableXCore'
end
```

3. Initialize the SDK with the correct environment:
```swift
ImmutableXCore.initialize(base: .sandbox) // Or .production
```
  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

### Pre-requisites:
The supported go versions are `1.18` or above.

### Steps:
1. Install the go package:
```shell
go get github.com/immutable/imx-core-sdk-golang 
```

2. Initialize the SDK with the correct environment:
```go
import (
  "context"
  "fmt"
  "github.com/immutable/imx-core-sdk-golang/generated/api"
  "github.com/immutable/imx-core-sdk-golang/config"
)

func initializeSDK() {
  configuration := api.NewConfiguration()

  apiClient := api.NewAPIClient(configuration)

  ctx := context.WithValue(context.Background(), api.ContextServerIndex, config.Sandbox) // Or config.Production
}
```
  </TabItem>

  <TabItem value="csharp" label="C# Core SDK">

1. Add the following nuget packages:
* https://www.nuget.org/packages/Imx.Sdk
* https://www.nuget.org/packages/Imx.Sdk.Gen

```sh
dotnet add package Imx.Sdk --version 0.1.1
dotnet add package Imx.Sdk.Gen --version 0.1.1
```

2. Initialize the Core SDK client with the network on which you want your application to run (see [all networks available](https://github.com/immutable/imx-core-sdk-csharp/blob/main/Src/IMX/Imx.Sdk/Client.cs#L17)):

Select one of the following Ethereum networks ImmutableX platform currently supports.

| Environment | Description   |  
|-------------|---------------|
| Sandbox     | The default test network (currently, it is Goërli)  |
| Mainnet     | Ethereum network    | 

```csharp
using Imx.Sdk;

try
{
    Client client = new Client(new Config()
    {
        Environment = EnvironmentSelector.Sandbox // Or EnvironmentSelector.Sandbox
    });
}
catch (Exception e)
{
    Console.WriteLine("Error message: " + e.Message);
    Console.WriteLine(e.StackTrace);
}
```
  </TabItem>

</Tabs>