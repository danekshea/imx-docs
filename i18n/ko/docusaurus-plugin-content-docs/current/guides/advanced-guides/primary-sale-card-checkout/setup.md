---
id: "setup-primary-sale-card-checkout"
title: "Set up required endpoints"
slug: "/setup-primary-sale-card-checkout"
sidebar_position: 1
keywords:
  - imx-payments
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ListAdmonition from '@site/src/components/ListAdmonition';

# Set up required endpoints

:::caution Feature for managed partners only
This is a feature intended for managed partners. If you are not a managed partner and would like to become one, please reach out to us on our [#dev-discussion channel](https://discord.gg/7URHuYFCN4) on Discord.

If you are a managed partner, your partner success manager needs to set up a commercial partnership with MoonPay for you. Please reach out to them to facilitate this.
:::

In order to [implement](./implement.md) this NFT primary sale card checkout feature, you need to complete the following:
1. Establish a commercial partnership with MoonPay (your partner success manager will facilitate this for you)
2. [Set up and register with ImmutableX with the required endpoints](#how-to-set-up-and-register-endpoints)

## How to set up and register endpoints

<ListAdmonition title="Steps:">
    <ol>
        <li><a href="#1-create-endpoints">Create required endpoints</a></li>
        <li><a href="#2-register-with-immutablex-using-created-endpoints">Register with ImmutableX using created endpoints</a></li>
        <li><a href="#3-how-to-validate-the-imx-signature">Validate the <code>IMX-Signature</code></a></li>
   </ol>
</ListAdmonition>

### 1. Create endpoints

You are required to provide the following endpoints:

1. [Trigger the mint](#triggering-the-mint-endpoint): An endpoint to mint the asset once payment has been confirmed with MoonPay
2. [Get asset info](#get-asset-info-endpoint): An endpoint to get information about the minted asset and render the checkout

### Triggering the mint endpoint

#### Headers required:

| Name                                                                                                           | Description                                                  |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `IMX-Signature` - [How to validate this](#3-how-to-validate-the-imx-signature)                                 | Signature to confirm that the request was made by ImmutableX |
| `IMX-Timestamp` - [How to generate this](../../../key-concepts/deep-dive-api-concepts.md#imx-timestamp-string) | Timestamp header to validate `IMX-Signature`                 |

#### Request body:

| Property                  | Type          | Description                                                                                |
| ------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `offer_id`                | String        | The ID of the offer provided for the NFT to be minted                                      |
| `contract_address`        | String        | Smart contract address of the NFT                                                          |
| `user`                    | String        | User that the NFT will be minted for (will become the NFT's owner)                         |
| `wallet_address`          | String        | Wallet address that will receive the payment, in crypto (from MoonPay), for the minted NFT |
| `external_transaction_id` | String (UUID) | Unique ImmutableX transaction ID that can be used to get information about the transaction |

#### Response:

| Property           | Type    | Descrtiption                                                                          |
| ------------------ | ------- | ------------------------------------------------------------------------------------- |
| `contract_address` | String  | Smart contract address of the NFT                                                     |
| `token_id`         | String  | Token ID (as specified by the NFT smart contract) of the minted asset                 |
| `tx_id`            | Integer | Minting transaction ID - see [mintTokens](/reference#/operations/mintTokens) response |

#### Example:

```shell
Request: POST /mint
headers: {
  "IMX-Signature": "5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd",
  "IMX-Timestamp": "1492774577"
}

data: {
  "offer_id": "string",
  "contract_address": "string",
  "user": "string",
  "wallet_address": "string",
  "external_transaction_id": "string(UUID)",
}

Status: 200
Response: {
  "contract_address": "string",
  "token_id": "string",
  "tx_id": 0
}
```

:::info Error on mint
If minting fails, please provide a response with the error code and message.

```shell
Response: {
 "code": "number", // the error code
 "message": "string", // the error message
 "details": "string" // the error details
}
```
:::

### Get asset info endpoint

This endpoint will be used to get information about the asset to be minted using [trigger mint endpoint](#triggering-the-mint-endpoint).

#### Response:

| Property              | Type   | Description                                                                                |
| --------------------- | ------ | ------------------------------------------------------------------------------------------ |
| `offer_id`            | String | The ID of the offer provided for the NFT to be minted                                      |
| `contract_address`    | String | Smart contract address of the NFT                                                          |
| `name`                | String | Token name to be rendered at checkout                                                      |
| `collection`          | String | Collection name to be rendered at checkout                                                 |
| `image_url`           | String | URL where the image to be displayed for the minted asset is hosted                         |
| `price_currency_code` | String | Currency of the amount to be paid. Choose from: `"ETH"` or `"USDC"`                        |
| `price`               | String | Amount of the currency required to mint the token                                          |
| `seller_address`      | String | Wallet address that will receive the payment, in crypto (from MoonPay), for the minted NFT |

#### Example:

```shell
Example Request: GET /:contract_address/:offer_id

Status: 200
Response: {
 "offer_id": "123",
 "contract_address": "0xacb3...",
 "name": "SiShinylver Card Pack",
 "collection": "Gods Unchained",
 "image_url": "https://images.godsunchained.com/cardpack-images--marketing/256/mortal--neutral--shiny--legendary.png",
 "price": "125.29",
 "price_currency_code": "USD",
 "seller_address": "0xacb3...",
}
```

:::info Unavailable offer
If an offer is unavailable, a response should return `404 - Not Found`.
```
Status: 404
Response: {
 "code": "404", // the error code
 "message": "Missing offer", // the error message
 "details": "The offer id {offer_id} is not a valid offer for purchase" // the error details
}
```
:::

### 2. Register with ImmutableX using created endpoints

When you've set up the endpoints required in the previous step, please register with ImmutableX using the [registerNftPrimarySalesContract](https://docs.x.immutable.com/reference/#/operations/registerNftPrimarySalesContract) API endpoint.

After registration, ImmutableX will send you a webhook key that will be used to validate the signature when initiating mint requests.

### 3. How to validate the `IMX-Signature`

Generate a `signed_payload` by concatenating the following:
* `IMX-Timestamp` header
* The character `.`
* JSON payload of the message to be signed

Example:
```ts
const payload = JSON.stringify({
    "offer_id": "1",
    "contract_address": '0x23a...',
    "user": '0x8b1...',
    "wallet_address": '0x11a...',
    "external_transaction_id": "00000000-0000-0000-aaaa-0000a000aa00",
    });

const signed_payload = imx_timestamp_header_value + "." + payload;

```

You will then need to compute an HMAC with the SHA-256 hash function using the webhook key that we provided when you [registered the endpoints with ImmutableX](#2-register-with-immutablex-using-created-endpoints) for the `signed_payload` and use it to compare the signature in the header:

```ts
import crypto from "crypto-js"

const generatedSignature = crypto.HmacSHA256(signed_payload, webhookKey).toString();
```

## More information

### Main flow diagram:

![NFT Checkout Primary Main flow](/img/tutorial/nft-checkout-primary-main-flow.png "NFT Checkout Primary by fiat main flow")

### Technical flow diagram:

![NFT Checkout Primary By Fiat Technical flow](/img/tutorial/nft-checkout-primary-technical-flow.png "NFT Checkout Primary by fiat technical flow")
