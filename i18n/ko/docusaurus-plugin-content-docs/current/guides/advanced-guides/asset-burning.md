---
title: "Burn assets"
slug: "/asset-burning"
sidebar_position: 1
keywords:
  - imx-assets
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Burning is the process of permanently removing tokens from circulation. On Ethereum mainnet, this is achieved by transferring the asset to a designated burn address (a ["zero account"](https://etherscan.io/address/0x0000000000000000000000000000000000000000)). A burn address is not owned by any user and no one can feasibly guess its private key, so any assets owned by a burn address are considered lost forever.

On ImmutableX L2, the designated burn address comprises of a L1 burn account (zero address - 0x00...0) paired with a non-zero Stark key (0x00...01). The Stark key must be non-zero because a zero Stark key does not lie on the Stark elliptic curve and would therefore be invalid, so the next closest was chosen. For the L1 zero account, finding the Stark private key for this public key is practically impossible, so assets owned by this Stark key will remain locked in the Stark smart contract forever and cannot be transferred or withdrawn.

#### Burn addresses:
```solidity
BurnEthAddress = 0x0000000000000000000000000000000000000000
BurnStarkKey   = 0x0000000000000000000000000000000000000000000000000000000000000001
```

<ListAdmonition>
    <ul>
        <li><a href="#how-to-burn-an-asset">How to burn an asset</a></li>
        <li><a href="#get-burned-assets">Get burned assets</a></li>
        <li><a href="#multi-burns">Multi-burns</a></li>
    </ul>
</ListAdmonition>

## How to burn an asset
To burn an asset, you simply need to **transfer the asset to the burn address**:
* **SDKs or API:** Use the [transfer](/reference#/operations/createTransferV1) function and set the burn address as the recipient.
* **JS SDK:** There is a `burn` function which is just a wrapper around the standard `transfer` function to a burn address.

<Tabs>
<TabItem value="core-sdk" label="Core SDK" default>  

```typescript
const unsignedTransferRequest = {
  type: "ETH",
  amount: "100000000", // Denominated in wei
  receiver: "0x0000000000000000000000000000000000000000", // Ethereum burn account
}

const walletConnection = { ethSigner, starkSigner }

// Transfers the asset
const response = await client.transfer(
  walletConnection,
  unsignedTransferRequest,
);

// Print out the response
console.log(response);
```
</TabItem>

<TabItem value="js-sdk" label="JS SDK" default>

Using the burn function:
```typescript
import { ImmutableXClient } from '@imtbl/imx-sdk';

client = ImmutableXClient.build({...})

await client.burn({
    sender: "<wallet-address>",
    token: {
        type: ERC721TokenType.ERC721,
        data:{
            tokenId: "123",
            tokenAddress: "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c"
        }
    },
    quantity: 1,
});
```

Or using the standard transfer function:
```typescript
await client.transfer({
    sender: "<wallet-address>",
    token: {
        type: ERC721TokenType.ERC721,
        data:{
            tokenId: "123",
            tokenAddress: "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c"
        }
    },
    receiver: "0x0000000000000000000000000000000000000000",
    quantity: 1,
});
```
</TabItem>

<TabItem value="link-sdk" label="Link SDK">

```typescript
import { Link } from '@imtbl/imx-sdk';
link = new Link(<link-url>)

const transferResponsePayload: TransferV2ResultsCodec = await link.transfer([
  {
    type: ERC721TokenType.ERC721,
    tokenId: '123',
    tokenAddress: '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c',
    toAddress: '0x0000000000000000000000000000000000000000',
  },
]);
```
</TabItem>
</Tabs>

## Get burned assets

Burned assets will still show up in the [listAssets](/reference#/operations/listAssets) API endpoint with a "burned" status. This is a filterable field.

This is an example of getting burned assets using the JS SDK:

```typescript 
import { ImmutableXClient, ImmutableAssetStatus } from '@imtbl/imx-sdk';
client = ImmutableXClient.build({...})

const burnedAssets = await client.getAssets({
    status: ImmutableAssetStatus.burned, // 'burned'
});
```

## Multi-burns

<ListAdmonition title="Available with:" icon="📚">
    <ul>
        <li>Link SDK's multi-transfer capability is in its <a href="./linktransfer">transfer</a> function</li>
    </ul>
</ListAdmonition>

This allows you to burn multiple assets with one function call, however, keep in mind that under the hood, this submits separate transfer transactions to the API. Although rare, it is possible to have some transfers fail while others succeed, so multi-burns (just like multi-transfers) are not an entirely atomic operation. We will be looking into adding support for atomic 'multi' transactions across all features in the future.

For use cases such as "burn x NFTs to receive a new NFT", it is currently recommended to keep track of all successful and failed burns (provided in the `Link.transfer` response), and implement a retry mechanism for users to complete their full burn before triggering the next step in the process.
