---
title: "Generate signers"
slug: "/how-to-generate-signers"
keywords:
  - imx-wallets
  - imx-dx
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ListAdmonition from '@site/src/components/ListAdmonition';

User signatures are required for certain types of operations on ImmutableX. These are:
1. Transactions that update blockchain state
2. Operations that update ImmutableX's databases that require user authorization for

#### Examples:
<table>
  <tbody>
    <tr>
      <th colspan="2">✅ Require user signatures</th>
      <th>❌ Do not require user signatures</th>
    </tr>
    <tr>
      <th>Transactions that update<br/>blockchain state</th>
      <th>Operations requiring user<br/>authorization</th>
      <th><a href="/docs/how-to-get-data">Read-only operations</a></th>
    </tr>
    <tr>
      <td>
        <ul>
          <li>Creating an order</li>
          <li>Filling an order (creating a trade)</li>
          <li>Transferring assets between users</li>
          <li>Depositing assets on L2 (ImmutableX)</li>
          <li>Withdrawing assets to L1 (Layer 1 Ethereum)</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Creating a project</li>
          <li>Registering a user off-chain</li>
        </ul>
      </td>
      <td>
        <ul>
          <li>Getting a list of all assets on ImmutableX</li>
          <li>Getting the details (ie. metadata) of a particular asset</li>
          <li>Getting a list of all open orders</li>
          <li>Getting a list of historical trades</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Using "signers" to get user signatures

In order to get user signatures, applications can use "signers". These are abstractions of user accounts that can be used to sign transactions. A user's private key is required to generate them.

Ethereum (L1) signers are required to sign transactions on L1 (ie. depositing assets from the L1 wallet to the L2 one) and Stark (L2) signers are required to sign transactions on L2 (ie. creating an order on an L2 marketplace, transferring an asset to another user on L2).

### How do applications generate and use signers?
There are two ways to get signers in your application:

1. **[Generate your own by obtaining and using the user's private keys](#generate-your-own-signers)**
2. **[Connect to a user's wallet application](#connect-to-users-wallets)**

The first option, where an application obtains a user's private key directly, is risky because these keys allow anyone in possession of them full control of an account.

The second option provides an application with an interface to the user's account by prompting the user to connect with their wallet application (ie. mobile or browser wallet). Once connected the app can begin asking the user to sign transactions and messages without having to reveal their private key.

## 1. Generate your own signers

<ListAdmonition title="Available with:">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
    </ul>
</ListAdmonition>

### Core SDK

Below are instructions on how to generate:
* Ethereum (L1) signers
* Stark (L2) private keys and signers using the Core SDK

:::caution
If you generate your own Stark private key, you will have to persist it. The key is randomly generated so **_cannot_** be deterministically re-generated.
:::

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

The Core SDK provides functionality for applications to generate Stark (L2) [private keys](https://github.com/immutable/imx-core-sdk/blob/main/src/utils/stark/starkCurve.ts#L99) and [signers](https://github.com/immutable/imx-core-sdk/blob/main/src/utils/stark/starkSigner.ts#L60):
```ts
import { AlchemyProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { generateStarkPrivateKey, createStarkSigner } from '@imtbl/core-sdk';

// Create Ethereum signer
const ethNetwork = 'goerli'; // Or 'mainnet'
const provider = new AlchemyProvider(ethNetwork, YOUR_ALCHEMY_API_KEY);
const ethSigner = new Wallet(YOUR_PRIVATE_ETH_KEY).connect(provider);

// Create Stark signer
const starkPrivateKey = generateStarkPrivateKey(); // Or retrieve previously generated key
const starkSigner = createStarkSigner(starkPrivateKey);
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

In order to use any workflow functions, you will need to pass in the connected wallet provider. This means you will need to implement your own Wallet L1 [Signer](https://github.com/immutable/imx-core-sdk-kotlin-jvm/blob/main/imx-core-sdk-kotlin-jvm/src/main/kotlin/com/immutable/sdk/Signer.kt).

Once you have created a Signer instance you can generate the user's Stark key pair and use it to create an instance of StandardStarkSigner, an implementation of StarkSigner.
```kotlin
StarkKey.generate(signer).whenComplete { keyPair, error ->
    val starkSigner = StandardStarkSigner(keyPair)
}
``` 
  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

In order to use any workflow functions, you will need to pass in the connected wallet provider. This means you will need to implement your own Wallet L1 [Signer](https://github.com/immutable/imx-core-sdk-swift/blob/main/Sources/ImmutableXCore/Signer.swift) and L2 [StarkSigner](https://github.com/immutable/imx-core-sdk-swift/blob/main/Sources/ImmutableXCore/Signer.swift).

Once you have a Signer instance you can generate the user's Stark key pair and use the result to instantiate a StarkSigner, for example, by using the default StandardStarkSigner provided by the SDK.
```swift
let keyPair = try await StarkKey.generateKeyPair(from: signer)
let starkSigner = StandardStarkSigner(pair: keyPair)
```
  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

### 1. Generate L1 signer
When you implement an L1signer, it must satisfy [L1Signer interface](https://github.com/immutable/imx-core-sdk-golang/blob/main/signers/signers.go). See [BaseL1Signer](https://github.com/immutable/imx-core-sdk-golang/blob/main/examples/workflows/utils/signer.go) for a sample implementation of an L1 Signer.

Also refer to [examples/publicapi/list_assets/main.go](https://github.com/immutable/imx-core-sdk-golang/blob/main/examples/publicapi/list_assets/main.go) for environment setup examples.


### 2. Generate L2 signer
See [signers/stark](https://github.com/immutable/imx-core-sdk-golang/tree/main/signers/stark) for information about generating your own L2 signer, as well as the following code snippet:
```go
import (
   "github.com/immutable/imx-core-sdk-golang/signers/stark"
   ...
)

func main() {
   // L1 credentials
   l1signer := YourImplementationOfL1SignerInterface() // See examples/workflows/utils/signer.go 

   // L2 credentials
   // Obtain the stark signer associated with this user.
   l2signer, err := stark.GenerateStarkSigner(l1signer) // this is the sdk helper function
   if err != nil {
      ...
   }
}
```
  </TabItem>
</Tabs>

## 2. Connect to users' wallets
Your application can facilitate signing of user transactions by connecting to users' wallet applications. This ensures that you do not have to handle private keys.

<ListAdmonition title="Available with:">
    <ul>
        <li>Wallet SDK (with Core SDK)</li>
        <li>Link SDK</li>
    </ul>
</ListAdmonition>

<Tabs>
<TabItem value="wallet-sdk" label="Wallet SDK">

The Wallet SDK provides a way for applications to connect to certain user wallets:
<table>
  <tbody>
    <tr>
      <th>Wallet SDK</th>
      <th>Platform</th>
      <th>Wallets supported</th>
    </tr>
    <tr>
      <td><a href='https://github.com/immutable/imx-wallet-sdk-web/'>Wallet SDK Web</a></td>
      <td>Web</td>
      <td>
        <ul>
          <li>Metamask</li>
          <li>WalletConnect</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href='https://github.com/immutable/imx-wallet-sdk-android/'>Wallet SDK Android</a></td>
      <td>Android</td>
      <td>
        <ul>
          <li>Any wallet that supports WalletConnect v1.0</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><a href='/docs/sdk-docs/wallet-sdk-ios/overview'>Wallet SDK iOS</a></td>
      <td>iOS</td>
      <td>
        <ul>
          <li>Any wallet that supports WalletConnect v1.0</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<Tabs>
  <TabItem value="typescript" label="Wallet SDK Web">

1. Install the [Wallet SDK npm package](https://www.npmjs.com/package/@imtbl/wallet-sdk-web):
```shell
npm install @imtbl/wallet-sdk-web --save
```

2. Set up the Wallet SDK and use with the [Core SDK for Typescript](https://docs.x.immutable.com/sdk-docs/core-sdk-ts/overview):
```ts
import {
  ENVIRONMENTS,
  L1_PROVIDERS,
  WalletSDK,
} from '@imtbl/wallet-sdk-web';

(async () => {
  // Builds the Wallet SDK object
  const sdk = await WalletSDK.build({
    env: ENVIRONMENTS.STAGING,
    /*
      RPC config is only required if the WalletConnect provider (L1_PROVIDERS.WALLET_CONNECT)
      is being used. Follow this reference for the RPC config:
      https://docs.walletconnect.com/quick-start/dapps/web3-provider#provider-options
    */
    rpc: {
      5: 'https://goerli.mycustomnode.com',
    },
    /*
      Will switch the chain based on this configured chainID when connecting to the wallet.(Optional)
      Following the table below to get the chainID and name mapping. 
      Consult https://chainlist.org/ for more.
      ChainId   | Network
      --- --- | --- --- 
      1       | Ethereum Main Network (Mainnet)
      5       | Goerli Test Network
    */
    chainID: 5,
  });

  // Connects on the chosen provider - WalletConnect
  const walletConnection = await sdk.connect({ provider: L1_PROVIDERS.WALLET_CONNECT });
  // For Metamask:
  // const walletConnection = await sdk.connect({ provider: L1_PROVIDERS.METAMASK });

  // Use with the Core SDK for Typescript, e.g. Register a user
  await client.registerOffchain(walletConnection);
})();
```

:::tip
The `WalletConnection` object can also be retrieved in the following ways:
```ts
// By calling the method `getWalletConnection`
const walletConnection = sdk.getWalletConnection();

// By listening to the event `WALLET_SDK_EVENTS.CONNECTION_UPDATED`
walletSdkEvents.on(
  WALLET_SDK_EVENTS.CONNECTION_UPDATED,
  (updatedWalletConnection: WalletConnection) =>
    { const walletConnection = updatedWalletConnection; },
);
```
:::  
  </TabItem>
  <TabItem value="android" label="Wallet SDK Android">

1. Add Maven Central and JitPack to your repositories

```kotlin
repositories {
    mavenCentral()
    maven { url = "https://jitpack.io" } // Needed for WalletConnect
}
```

2. Add the dependency to your app's `build.gradle` file:
```kotlin
dependencies {
    implementation 'com.immutable.wallet:imx-wallet-sdk-android:$version'
}
```

3. In your `Application` class:
```kotlin
class ExampleApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    ImmutableXWallet.init(this)
  }
}
```

4. Connect to the user's wallet
```kotlin
ImmutableXWallet.connect(
    Provider.WalletConnect(
        appUrl = "https://www.marketplace.com/",
        appName = "My NFT Marketplace",
        appDescription = "This is a marketplace where all my favorite NFTs can be traded.",
        appIcons = listOf("http://www.marketplace.com/appicon.svg")
    )
)
```
If you want to use your own bridge server instead of the default provide it via bridgeServerUrl when connecting. For more info on how WalletConnect and the bridge works [see here](https://docs.walletconnect.com/1.0/bridge-server).

5. Use with the [Core SDK for Kotlin/JVM](https://github.com/immutable/imx-core-sdk-kotlin-jvm)

Once you connect a user's wallet with the Wallet SDK you can provide the `Signer` and `StarkSigner` instances to Core SDK workflows:
```kotlin
val signer = ImmutableXWallet.signer
val starkSigner = ImmutableXWallet.starkSigner
if (signer != null && starkSigner != null) {
    ImmutableXCore.buy(orderId, emptyList(), signer, starkSigner).whenComplete { ... }
} else {
    // Handle not connected
}
```
</TabItem>
  <TabItem value="ios" label="Wallet SDK iOS">

1. Add `pod ImmutableXWallet` to your Podfile

```ruby
platform :ios, '13.0'
use_frameworks!

target 'MyApp' do
  pod 'ImmutableXWallet'
end
```

2. Connect to the user's wallet

```swift
try await ImmutableXWallet.shared.connect(
    to: .walletConnect(
        config: .init(
            appURL: URL(string: "https://immutable.com")!,
            appName: "ImmutableX Sample",
            // The Universal Link or URL Scheme of the chosen wallet to be connected.
            walletDeeplink: "https://metamask.app.link"
        )
    )
)
```

If you want to use your own bridge server instead of the default provide it via bridgeServerUrl when connecting. For more info on how WalletConnect and the bridge works [see here](https://docs.walletconnect.com/1.0/bridge-server).

3. Use with the [Core SDK for Swift](https://github.com/immutable/imx-core-sdk-swift)

Once you connect a user's wallet with the Wallet SDK you can provide the `Signer` and `StarkSigner` instances to Core SDK workflows:

```swift
guard let signer = ImmutableXWallet.shared.signer, 
    let starkSigner = ImmutableXWallet.shared.starkSigner else {
    // handle not connected
    return
}

let result = try await ImmutableXCore.shared.buy(
    orderId: orderId, 
    signer: signer, 
    starkSigner: starkSigner
)
```
</TabItem>
</Tabs>
</TabItem>

<TabItem value="link-sdk" label="Link SDK">

1. Install the [npm package](npmjs.com/package/@imtbl/imx-sdk):
```shell
npm install @imtbl/imx-sdk --save
# or
yarn add @imtbl/imx-sdk
```

2. Import the Link package:
```ts
import { Link } from '@imtbl/imx-sdk';
```

3. Set the correct network URL

Choose from the following:

| Network | Description | URL |
| --- | --- | --- |
| Sandbox | The default test network (currently, it is Goërli) | https://link.sandbox.x.immutable.com/v1 |
| Production | Ethereum network  | https://link.x.immutable.com/v1 |

```ts
const linkAddress = "https://link.x.immutable.com/v1"; // Or "https://link.sandbox.x.immutable.com/v1"
```

4. Initialize the client
```ts
const link = new Link(linkAddress);
```

Operations like registering a user (see [guide](../../link-sdk/link-setup.md)) can be executed by the Link client, which uses the JS SDK under the hood.
</TabItem>
</Tabs>
