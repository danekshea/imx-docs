---
id: "developer-faq"
title: "FAQ"
slug: "/developer-faq"
sidebar_position: 2
keywords: [imx-games, imx-dx]
---

## General 
**How is asset custody managed in ImmutableX? **

ImmutableX is a self-custodial protocol, meaning all users are responsible for their own security. Users can manage their own private keys and maintain full control of their own assets, or opt for a custodial wallet flow. Users can deposit and withdraw their assets to and from the protocol at any time. Every transaction requires a signature from the user, and Immutable can’t authorise any actions on behalf of the user.

**Does ImmutableX have a block explorer? How do I keep track of user inventories?**

[Immutascan](https://immutascan.io/) is a block explorer where ImmutableX transactions can be viewed.

We also have API endpoints that are available for you to listen on. We recommend polling our mints, transfers, trades, etc endpoints at regular intervals to listen on events within ImmutableX, and these endpoints can be filtered depending on your requirements. 

**How do I port or build smart contract logic on ImmutableX?**

This is not supported at the moment, though most NFT projects don’t have a need for general computation. For example, game-related NFTs can have off-chain events and interactions within the client’s application, and only need to interact with ImmutableX for minting, transferring, burning, updating metadata, etc. A current limitation of ZK-rollups is general computation, but this challenge is rapidly being addressed by our partner StarkWare.

## Metadata

**Can I update the metadata of an ERC721 token on Layer 2?**

There are [two ways](../key-concepts/deep-dive-metadata.md#on-l2-immutablex) of storing token metadata on ImmutableX: Providing a `metadata_api_url` when creating a collection and providing a `blueprint` string when minting a token on L2.

***The `blueprint` cannot be changed:*** When a token which has been minted on L2 with a `blueprint` string is withdrawn to L1, the L1 smart contract is updated with this value, thus making it immutable. ImmutableX does not allow updates to a token's blueprint value on L2. 

***The `metadata_api_url` can be updated:*** Updating the `metadata_api_url` of a collection can be done via our [API](https://docs.x.immutable.com/reference/#/operations/updateCollection).

Currently, our metadata crawler only runs once at the time of minting so if you make changes to the off-chain metadata that we retrieve from your endpoint, you need to [trigger a metadata refresh](https://docs.x.immutable.com/docs/asset-metadata-refreshes) so it can be updated on ImmutableX. 

## Orders

**Does ImmutableX automatically match buy and sell orders for NFTs of the same value?**

There is currently no automatic matching of orders as ImmutableX only supports the maker/taker model at present. An NFT will be listed for sale for a specified price by the maker, and the trade occurs when this order is accepted by the taker. This will change in the future as we are working on implementing metadata orders where you can place buy orders on metadata properties (e.g. name = Demogorgon), which will bring more liquidity to functionally identical NFTs.

**Can I authorize others to create buy/sell orders on my behalf? **

ImmutableX is a self-custodial protocol, and every transaction requires a signature from the owner of the wallet. No third party (including us) can touch your assets unless they have access to your private key. 

## NFTs

**Is it possible to transfer assets between ImmutableX and Ethereum freely?**

Absolutely, that’s a key benefit of being a Layer 2 scaling solution. Even if ImmutableX (the company) ceases to exist, users will always have the ability to withdraw all assets back to mainnet. Currently the ImmutableX marketplace has yet to implement the withdrawals of NFTs on our frontend, however it is possible to withdraw NFTs using the ImmutableX APIs.
 
**If I mint an NFT on ImmutableX, does it exist on-chain? What happens when I withdraw to mainnet?**

If your NFT started off on mainnet Ethereum and was deposited into ImmutableX, the asset will be locked in our L1 smart contract and will now be tradable on L2. When the asset is successfully withdrawn, The asset is released from the smart contract and sent to the withdrawing user’s wallet.

If your NFT was minted directly on to ImmutableX (for no gas cost!), the asset will have Layer 1 representation, immutability, and cryptographic security via the merkle tree construct, but won’t be an ERC721 on mainnet ethereum until withdrawn from ImmutableX. At the time of withdrawal, the asset will be minted onto L1. 

## Smart Contracts

**Does ImmutableX support ERC1155s?**

No, ImmutableX does not support or recommend the use of ERC1155. We recommend that you use as few smart contracts as possible and consider merging your smart contracts, differentiating NFTs with metadata rather than by which smart contract they originated in. 
ImmutableX supports ERC721 smart contracts and recommends that you create a new ERC721 contract for each meaningfully different type of asset.
