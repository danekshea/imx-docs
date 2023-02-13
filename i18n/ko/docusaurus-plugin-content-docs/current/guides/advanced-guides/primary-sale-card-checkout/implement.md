---
id: "implement-primary-sale-card-checkout"
title: "Implement primary sale card checkout feature"
slug: "/implement-primary-sale-card-checkout"
sidebar_position: 2
keywords: [imx-payments]
---
import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution Feature for managed partners only
This is a feature intended for managed partners. If you are not a managed partner and would like to become one, please reach out to us on our [#dev-discussion channel](https://discord.gg/7URHuYFCN4) on Discord. 

If you are a managed partner, your partner success manager needs to set up a commercial partnership with MoonPay for you. Please reach out to them to facilitate this.
:::

<ListAdmonition title="Pre-requisites" icon="🤚" type="tip">
    <ul>
        <li>Must be a managed partner and your partner success manager has set up a commercial partnership with MoonPay for you</li>
        <li>Have a deployed L1 smart contract from which tokens can be minted</li>
        <li><a href="https://docs.x.immutable.com/docs/launch-collection">Launched a collection on ImmutableX</a></li>
        <li>Set up the <a href="/docs/setup-primary-sale-card-checkout/">required endpoints</a></li>
    </ul>
</ListAdmonition>

## How to implement this feature

<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
        <li><a href="./link-nft-checkout-primary">Link SDK</a></li>
        <li><a href="#api">API</a></li>
    </ul>
</ListAdmonition>

## Core SDK

Currently, this functionality is only available in the [Typescript Core SDK](/sdk-docs/core-sdk-ts/overview) v1.0.0+. Please refer to the API endpoints referenced in each step for other implementations. The full list of endpoints required are also listed [here](#api).

### 1. Initialize the Core SDK
In order to use the Core SDK, you need to [initialize it](../../basic-guides/install-initialize/index.md#core-sdk).

### 2. Create the NFT checkout transaction

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/createNftPrimary">createNftPrimary</a></li>
    </ul>
</ListAdmonition>

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#createNftPrimary">createNftPrimary</a></li>
    </ul>
</ListAdmonition>

```typescript
const nftPrimaryTxnParams: NftCheckoutPrimaryApiCreateNftPrimaryRequest = {
    createAPIRequest: {
        contract_address: '0x5d...',
        provider: 'moonpay',
        offer_id: '20111212',
        user_wallet_address: '0xqw2...',
        widget: { theme: 'dark' }
    }
};

const nftPrimaryTxnResponse = await imxClient.createNftPrimary(nftPrimaryTxnParams)
```

Where:
- `user_wallet_address` - L2 wallet address of seller, funds will be sent to this address
- `contract_address` - smart contract address of the NFT
- `offer_id` - identifier that represents what will be minted
- `widget.theme` - MoonPay widget theme

In the cases where purchasers know what they're purchasing (such as a specific item in a PFP project) `offerId` could be the token ID (i.e. `20111212`) and in other cases where they don't know what they're purchasing (such as a loot box) it could be something like `silver-chest`. This is simply a way to render an item in the cart, and doesn't need to tie to the actual NFT asset directly.

:::info Handling the offerID
Note that primary sales involve taking a payment before the mint occurs. Because the asset does not exist yet, we've included an `offerId` instead of an asset ID. Therefore, in order to successfully render the checkout with the information seen below (offer, title and image), you will need to be a managed partner with ImmutableX (please reach out to us on our [#dev-discussion](https://discord.gg/7URHuYFCN4) channel on Discord to request to become one).
:::

After creating a transaction successfully, you will be provided with a MoonPay widget URL to be rendered for checkout where the user can proceed with payment.

This displays the UI with the loaded MoonPay widget:

![MoonPay checkout widget](/img/core-sdk-nft-checkout-primary/moonpay-widget-for-checkout.png 'NFT primary sale card checkout')

### 3. Check the transaction status (optional)
You can check the transaction status using the transaction ID from previous step. The status value should be `created` to confirm successful transaction creation.

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/getNftPrimaryTransaction">getNftPrimaryTransaction</a></li>
    </ul>
</ListAdmonition> 

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#getNftPrimaryTransaction">getNftPrimaryTransaction</a></li>
    </ul>
</ListAdmonition>

```typescript
const getNftPrimaryTransactionResponse = await imxClient.getNftPrimaryTransaction({
    transactionId: nftPrimaryTxnResponse.data.transaction_id
});
```

### 4. Minting is triggered once a successful payment has been received
After the payment has been received by MoonPay, the mint process will be automatically triggered (via the endpoint that you created [here](./setup.md#triggering-the-mint-endpoint)).

![Mint by fiat](/img/core-sdk-nft-checkout-primary/processing-stage.png 'Minting in process')

### 5. Verify the transaction status 
Please consider checking the transaction status in a polling fashion in the background.

<ListAdmonition label="API reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/reference/#/operations/getNftPrimaryTransaction">getNftPrimaryTransaction</a></li>
    </ul>
</ListAdmonition> 

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1-0-0/classes/immutablex.immutablex#getNftPrimaryTransaction">getNftPrimaryTransaction</a></li>
    </ul>
</ListAdmonition>

```typescript
const getNftPrimaryTransactionResponse = await imxClient.getNftPrimaryTransaction({
    transactionId: nftPrimaryTxnResponse.data.transaction_id
});
```

The transfer process can take few minutes and during that time transaction can return a `pending` or `waitingPayment` status while it's still being processed.

The final stage of transaction status can be:
* `completed` - successful completion
* `failed` - failure encountered

Upon reaching final stage of the transaction status, you can show an appropriate message, send a notification or update any state with the successful/failed transaction.

![Mint complete](/img/core-sdk-nft-checkout-primary/transaction-complete.png 'Mint complete')

## API

| Step | Description | API endpoint |
| --- | --- | --- |
| 1 | Create the checkout transaction | [createNftPrimary](https://docs.x.immutable.com/reference/#/operations/createNftPrimary) |
| 2 | Check or verify the transaction status | [getNftPrimaryTransaction](https://docs.x.immutable.com/reference/#/operations/getNftPrimaryTransaction) |