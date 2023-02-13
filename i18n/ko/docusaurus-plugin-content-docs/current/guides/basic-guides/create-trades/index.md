---
title: "Creating trades"
slug: "/how-to-create-trades"
keywords: [imx-traders, imx-dx]
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creating a trade is also known as filling an order, or buying an asset. A user executes a trade by agreeing to purchase an asset at the terms specified in the order and then becomes the new owner of the asset.

<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
        <li><a href="./link-buy2">Link SDK</a></li>
    </ul>
</ListAdmonition>

## Core SDK

### 1. Initialize the Core SDK
In order to use the Core SDK, you need to [initialize it](../install-initialize/index.md#core-sdk).

### 2. Generate signers
Creating a trade for a user requires a user's signature, so your application will need to create signers. See the guide on [how to generate signers](../generate-signers/index.md).

### 3. Create the trade
:::note When setting [taker fees](../../../overview/fees.md) in the trade params
* You cannot set more than 3 recipients
* You cannot set the same recipient more than once
* The combined fee percentage can’t exceed 100%
* Individual percentage fees can’t be <= 0%
:::

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#createTrade">createTrade</a></li>
      </ul>
  </ListAdmonition>

Creating a trade for the order with ID `7232`:
```ts
const createTrade = async (wallet: WalletConnection, orderId: number) => {
  const ethAddress = await wallet.ethSigner.getAddress();
  const tradeData = {
    order_id: orderId,
    user: ethAddress
  } as GetSignableTradeRequest;

  const response = await client.createTrade(wallet, tradeData);
  return response;
}

createTrade(wallet, 7232)
  .then((result) => {
    console.log(result)
  })
  .catch((e) => {
    console.log(e)
  })
```
#### Example response:
```ts
{ 
  trade_id: 226892, // ID of trade within ImmutableX
  status: '' // Current status of trade
}
```
  </TabItem>

  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk/-immutable-x-core/buy.html">buy</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/tradesapi/createtrade(ximxethaddress:ximxethsignature:createtraderequest:)">createTrade</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.CreateTrade">CreateTrade</a></li>
      </ul>
  </ListAdmonition>

  <ListAdmonition label="Example">
      <ul>
          <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/trade/main.go">CreateTrade</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>





