---
title: "Crypto on and off-ramps"
slug: "/how-to-enable-on-off-ramps"
keywords: [imx-wallets]
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Typically, getting crypto onto ImmutableX Layer 2 wallets is a multi-step process. A common flow is:
1. A user obtains crypto on L1 (such as by purchasing it on an exchange like Coinbase)
2. Transfers it from the exchange to an L1 wallet that they own
3. Deposits it from the L1 wallet to their ImmutableX L2 wallet

However, there are crypto on-ramp and off-ramp providers that enable users to get crypto in and out of L2 wallets in a ***single step***. ImmutableX make it easy for you to integrate with the following providers via our SDKs and API:

| Provider | How does it work? | Fees | Min. purchase / deposit   | Restrictions |
| --- | --- | --- |---------------------------| --- |
| [MoonPay](https://www.moonpay.com/) | Users can buy crypto with a card payment and it is immediately transferred to their L2 wallet | See [MoonPay's transaction fee](https://support.moonpay.com/hc/en-gb/articles/360011930117-What-fees-do-you-charge-) | $20USD                    | See these lists of ***non-supported*** countries:<br/>- [On-ramp](https://support.moonpay.com/hc/en-gb/articles/6557330712721-What-are-our-non-supported-countries-states-and-territories-for-on-ramp-product-)<br/>- [Off-ramp](https://support.moonpay.com/hc/en-gb/articles/360009279877-What-are-our-non-supported-countries-states-and-territories-for-off-ramp-) |
| [Layerswap](https://www.layerswap.io/) | Users can transfer crypto they own in a centralised exchange account (ie. Coinbase) directly to their L2 wallet | See [Layerswap's transfer fees](https://docs.layerswap.io/user-docs/using-layerswap/fees) | 0.009ETH / 15IMX / 12USDC | |


<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
          <ul>
            <li><a href="#on-ramp">On-ramp</a></li>
            <li><a href="#off-ramp">Off-ramp</a></li>
          </ul>
        <li>Link SDK:</li>
          <ul>
            <li><a href="./link-on-ramp">On-ramp</a></li>
            <li><a href="./link-off-ramp">Off-ramp</a></li>
          </ul>
        <li><a href="#api">API</a></li>
    </ul>
</ListAdmonition>

## Core SDK

Currently, this functionality is only available in the Typescript Core SDK. Please refer to the API endpoints referenced in each step for other implementations. The full list of endpoints required are also listed [here](#api).

## On-ramp

### 1. Initialize the Core SDK
In order to use the Core SDK, you need to [initialize it](../install-initialize/index.md#core-sdk).

### 2. Create the on-ramp request
<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/createExchange">createExchange</a></li>
    </ul>
</ListAdmonition> 

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#createExchange">createExchange</a></li>
    </ul>
</ListAdmonition> 

<Tabs>
<TabItem value="moonpay" label="MoonPay">

```ts
const exchangeTxnParams: ExchangesApiCreateExchangeRequest = {
  createExchangeAPIRequest: {
    provider: 'moonpay',
    type: 'onramp',
    wallet_address: '0xqw2...', // L2 wallet
    widget: { theme: 'light' }
  }
};

const exchangeTxnResponse = await imxClient.createExchange(exchangeTxnParams);
```

This displays the UI with the loaded MoonPay widget.

The user will be asked to provide credit card details:
![MoonPay widget](/img/core-sdk-on-ramp/moonpay-widget.png 'On-ramp with MoonPay')

</TabItem>
<TabItem value="layerswap" label="Layerswap">

```ts
const exchangeTxnParams: ExchangesApiCreateExchangeRequest = {
  createExchangeAPIRequest: {
    provider: 'layerswap',
    type: 'onramp',
    wallet_address: '0xqw2...', // L2 wallet
    widget: { theme: 'light' }
  }
};

const exchangeTxnResponse = await imxClient.createExchange(exchangeTxnParams);
```

This displays the UI with the loaded Layerswap widget.

The user will be asked to connect to the exchange they want to use:
![Layerswap widget](/img/core-sdk-on-ramp/layerswap-widget.png 'On-ramp with Layerswap')

</TabItem>
</Tabs>

After creating a transaction successfully, you will be provided with the specified provider's widget URL to be rendered where users can proceed with transfer.

The user proceeds with transfer details on the provider's widget.


### 3. Verify the transaction status

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/getExchange">getExchange</a></li>
    </ul>
</ListAdmonition>

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#getExchange">getExchange</a></li>
    </ul>
</ListAdmonition> 

Please consider checking the transaction status in a polling fashion in the background.

```ts
const getExchangeTransactionResponse = await imxClient.getExchange({
  id: exchangeTxnResponse.id
});
```

The transfer process can take few minutes and during that time transaction can return a `pending` or `waitingPayment` status while it's still being processed.
The final stage of transaction status can be:
* `completed` - successful completion
* `failed` - failure encountered

Upon reaching final stage of the transaction status, you can show an appropriate message, send a notification or update any state with the successful/failed transaction.

## Off-ramp

### 1. Initialize the Core SDK
In order to use the Core SDK, you need to [initialize it](../install-initialize/index.md#core-sdk).

### 2. Create the off-ramp request

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/createExchange">createExchange</a></li>
    </ul>
</ListAdmonition> 

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#createExchange">createExchange</a></li>
    </ul>
</ListAdmonition> 

<Tabs>
<TabItem value="moonpay" label="MoonPay">

```ts
const exchangeTxnParams: ExchangesApiCreateExchangeRequest = {
  createExchangeAPIRequest: {
    provider: 'moonpay',
    type: 'offramp',
    wallet_address: '0xqw2...', // L2 wallet
    widget: { theme: 'light' }
  }
};

const exchangeTxnResponse = await imxClient.createExchange(exchangeTxnParams);
```

</TabItem>
<TabItem value="layerswap" label="Layerswap">

```ts
const exchangeTxnParams: ExchangesApiCreateExchangeRequest = {
  createExchangeAPIRequest: {
    provider: 'layerswap',
    type: 'offramp',
    wallet_address: '0xqw2...', // L2 wallet
    widget: { theme: 'light' }
  }
};

const exchangeTxnResponse = await imxClient.createExchange(exchangeTxnParams);
```

After creating a transaction successfully, you will be provided with the specified provider's widget URL to be rendered where users can proceed with entering transfer details.

</TabItem>
</Tabs>

### 3. Get transaction details

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/getExchange">getExchange</a></li>
    </ul>
</ListAdmonition>

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#getExchange">getExchange</a></li>
    </ul>
</ListAdmonition> 

Please consider checking the transaction status in a polling fashion in the background.

```ts
const transactionDetails = await imxClient.getExchange({
  id: exchangeTxnResponse.id
});
```

### 4. Generate signers
Initiating an off-ramp request for a user requires a user's signature, so your application will need to create signers. See the guide on [how to generate signers](../generate-signers/index.md).

### 5. Initiate the off-ramp request

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/getExchangeSignableTransfer">getExchangeSignableTransfer</a></li>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/createExchangeTransfer">createExchangeTransfer</a></li>
    </ul>
</ListAdmonition>

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#exchangeTransfer">exchangeTransfer</a></li>
    </ul>
</ListAdmonition> 

Before initiating the off-ramp request, check that the transaction details have been fetched (see [Step 3](#3-get-transaction-details)).

Once the details are fetched and status is `waitingPayment`, initiate the request:

```ts
const exchangeTransferParams: UnsignedExchangeTransferRequest = {
  type: transactionDetails.data.from_currency, // "ETH"
  amount: transactionDetails.data.from_amount, // "0.001"
  transactionID: transactionDetails.id,
  receiver: transactionDetails.provider_wallet_address
};

const exchangeTransferResponse = await imxClient.exchangeTransfer(walletConnection, exchangeTransferParams);
```

It will prompt the user to sign the request to proceed with the transaction.

### 6. Verify the transaction status

See [3. Verify the transaction status](#3-verify-the-transaction-status) in the on-ramp guide.

## API

### On-ramp endpoints:
| Step | Description | API endpoint |
| --- | --- | --- |
| 1 | Create the on-ramp request | [createExchange](https://docs.x.immutable.com/reference/#/operations/createExchange) |
| 2 | Verify the transaction status | [getExchange](https://docs.x.immutable.com/reference/#/operations/getExchange) |

### Off-ramp endpoints:
| Step | Description | API endpoint |
| --- | --- | --- |
| 1 | Create the off-ramp request | [createExchange](https://docs.x.immutable.com/reference/#/operations/createExchange) |
| 2 | Get transaction details | [getExchange](https://docs.x.immutable.com/reference/#/operations/getExchange) |
| 3 | Get the transaction details to be signed when initiating the off-ramp request | [getExchangeSignableTransfer](https://docs.x.immutable.com/reference/#/operations/getExchangeSignableTransfer) |
| 4 | Initiate the off-ramp request | [createExchangeTransfer](https://docs.x.immutable.com/reference/#/operations/createExchangeTransfer) |
