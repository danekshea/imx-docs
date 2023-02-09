---
title: "Register users"
slug: "/how-to-register-users"
keywords:
  - imx-wallets
  - imx-dx
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ListAdmonition from '@site/src/components/ListAdmonition';

User registration consists of two parts:
1. Generating an ImmutableX L2 user account for an Ethereum L1 account
2. Registering the L1 <-> L2 wallet pair

This enables the following:
* A user with an Ethereum L1 account now has an associated L2 account on ImmutableX
* L1 users can deposit L1 assets to their L2 account
* An L2 user can transact on ImmutableX (create orders, trade assets, transfer assets, etc.)
* An L2 user can withdraw their assets on L2 to their L1 account

### Off-chain, then on-chain registration
By default, Immutable's [registerUser](https://docs.x.immutable.com/reference#/operations/registerUser) endpoint first registers a user **off-chain**. This means that the L1-L2 wallet pair is recorded in an Immutable database. All transactions that the user performs on L2 are recorded against this registered L2 user, however, L1 is not yet aware of the wallet mapping.

Then, when the users performs a transaction that requires an update of the state of the corresponding L1 wallet (ie. withdrawing an NFT from the L2 wallet to the L1 wallet), the user is registered **on-chain**, which means recording the L1-L2 wallet pair on Ethereum (L1).

### What's going on under the hood?
* A deterministic calculation according to EIP-2645 which uses the user's Ethereum key to sign a static string.
* This signature is used as a cryptographic seed with generic path parameters defined by the proposal's derivation path for hierarchical keys: `m / purpose' / layer' / application' / eth_address_1' / eth_address_2' / index` (This is the step that binds the L2 key with the L1 key)
* The generated private key is then passed through an efficient grinding method to enforce distribution within STARK's elliptic curve domain. The generated key pair is what you'll be using on a day-to-day basis to interact with any ImmutableX functionality.

This is a high-level overview of the user registration process: ![User Registration](/img/user-registration.png "User Registration")

<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
        <li><a href="./link-setup">Link SDK</a></li>
    </ul>
</ListAdmonition>

## Core SDK

### 1. Initialize the Core SDK
In order to use the Core SDK, you need to [initialize it](../install-initialize/index.md#core-sdk).

### 2. Generate signers
Registering a user requires the user's signature, so your application will need to create signers. See the guide on [how to generate signers](../generate-signers/index.md).

### 3. Register the user
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#registerOffchain">registerOffchain</a></li>
      </ul>
  </ListAdmonition>

```ts
const walletConnection = { ethSigner, starkSigner }

client.registerOffchain(walletConnection)
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk/-immutable-x-core/register-off-chain.html">registerOffchain</a></li>
      </ul>
  </ListAdmonition>

```kotlin
ImmutableXCore.registerOffchain(signer, starkSigner)
``` 
  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-2-2/documentation/immutablexcore/usersapi/registeruser(registeruserrequest:)">registerOffchain</a></li>
      </ul>
  </ListAdmonition>

```swift
UsersApi.registerUser(ethSignature, etherKey, starkKey, starkSignature)
```
  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.RegisterOffchain">RegisterOffchain</a></li>
      </ul>
  </ListAdmonition>

See [this example](https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/registration/main.go).
  </TabItem>
</Tabs>