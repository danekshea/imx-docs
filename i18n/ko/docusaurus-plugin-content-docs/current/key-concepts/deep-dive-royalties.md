---
title: "Deep dive into royalties"
slug: "/deep-dive-royalties"
keywords: [imx-dx]
---

import ListAdmonition from '@site/src/components/ListAdmonition';

<ListAdmonition>
    <ul>
        <li><a href="#what-are-royalties">What are royalties?</a></li>
        <li><a href="#royalties-on-blockchain">Royalties on blockchain</a></li>
		<ul>
			<li><a href="#royalties-for-secondary-sales-of-assets">Royalties for the secondary sales of assets</a></li>
			<li><a href="#royalties-on-immutablex">Royalties on ImmutableX</a></li>
		</ul>
    </ul>
</ListAdmonition>

## What are royalties?

The traditional definition of royalty is a payment made to the owners of assets for the use of that asset. The act of allowing a third party to use an asset you own is known as "licensing", where the asset owner is the "licensor" and the user is the "licensee".

Examples of ownership situations that can give rise to royalty agreements include:
* Landowners with oil or mineral rights can receive a portion of the value of the resouces that licensees find on their land
* Holders of patents can command a percentage of the income generated from a third party using their invention or design
* Authors of books are paid a % of total book sales from the publisher
* Musicians can command a % of income generated from the usage of their music, whether played on the radio, in other works of art like films or TV shows, or streaming on an online music service like Spotify

### Royalties for secondary sales and fairness for artists
A big issue concerning the sale of physical artworks, in particular, is that artists do not benefit from the increase in price of previously sold works. This is particularly concerning when, over time, an artist becomes more and more popular and the price that people are willing to pay for their work massively increase. Without producing new works, they are unable to share in that increase, even though it may have been their efforts since then that led to the increase, ie. promoting their work and engaging in other activities to create a name for themselves.

Given that the main use of royalties in blockchain applies to the re-selling of blockchain art, this is an issue that royalties on the blockchain aims to address.

## Royalties on blockchain

### How is art stored on the blockchain?
Since the early days of blockchain technology, artists have been using it to store/represent their artwork. The first proposed case of this was back in 2012, when Meni Robinson released a paper outlining a protocol on the Bitcoin network for "colored coins", which are basically "marked" bitcoins for particular uses or to represent real-world assets. Then, in 2014, a video clip was registered on the Namecoin blockchain, which facilitated the storing of on-chain metadata for individual coins.

When Ethereum came along, the ability to launch smart contracts that facilitated a wide range of functionality struck at many peoples' imaginations. Prior to the ERC-721 standard being proposed, which provides a template for representing unique tokens in smart contracts, variations of this idea had already been launched on the Ethereum blockchain, including the first blockchain game Etheria in 2015, and digital art collections, like Curio Cards, Cryptopunks and rare Pepe trading cards in 2017.

On Ethereum, the entities used to represent digital art are non-fungible tokens, which are part of token "collections" represented by individual smart contracts deployed on the Ethereum blockchain. Each token has a unique ID and stores information about the artwork that it represents as "metadata". If the token represents digital artwork, it typically stores information such as the hash of the data or a URL to the artwork in its metadata, however, a token can also represent a real-world asset and thus, store details about that, like the deed to a property.

### Types of blockchain royalties
Because smart contracts are versatile and can execute a wide range of functionality, they can either contain details about royalties that other applications can read and execute, or contain code that can be called upon to directly execute royalty payments.

The following are some examples of the different types:

| Royalty for... | What does the smart contract do? | How is the royalty enforced? | Any issues? |
| --- | --- | --- | --- |
| A portion of proceeds from minting | The `mint()` function contains code that pays out a royalty recipient when a new token is minted | Because the contract's `mint()` function must be called everytime a token is minted, the royalty recipient encoded in the contract will automatically be paid when tokens are minted | Royalties are only enforced when the token is first minted, not for subsequent token sales |
| [Secondary sale of an asset](#royalties-for-secondary-sales-of-assets) | Stores information about the royalty amount and recipient | Must be enforced by the application and/or smart contract that is facilitating the sale of the asset, because it needs to allocate a portion of the sale proceeds to the royalty recipients | If the application (typically, this is a marketplace) chooses not to recognise the royalty, then it just won't be paid.<br/><br/>The reason for this is because the contract's `transfer()` function is used to facilitate the transfer of the token once a sale has been made, however, this function is multi-purpose, in that it can facilitate transfers regardless of whether or not there has been a sale, so royalties do not apply to every transaction. |
| Usage of an asset | The asset's smart contract may have income-generating functions that are called when using it such that royalties are distributed to other participants.<br/><br/>A good example of these types of tokens are game assets, which could be used by players in different ways. For example, within a game, the owner of a crafted asset can loan it to another player, who, if in the course of using it earns in-game tokens, then the owner can get a portion of those tokens. This, of course, would be up to the game to implement. | The royalty will automatically be paid when the function is called | If another application decides to use that asset in a different way, not requiring the use of that particular mechanism that executes the royalty, then the royalty payment can be sidestepped |
| A real-world event occurring (ie. the token represents a song, and royalty payments are to be paid everytime it is played on a streaming service) | There are a number of ways that the smart contract can encode the royalty conditions: <ul><li>Simply outlines the conditions under which the royalty payment should be made (the execution must be manual)</li><li>Plugs into another oracle smart contract that provides a trigger when a real-world event occurs that mandates a royalty payment</li></ul> | <-- See previous column | In the first example, where the royalty payment must be executed manually, the application may simply not pay it out. |

## Royalties for secondary sales of assets
Currently, in the world of NFTs, this is the main use case of royalties.

Secondary sale royalty payments consist of the following components:
1. Specification of the royalty amount and recipient
2. Facilitating the payment of the royalty when the sale occurs

The royalty recipient can be the contract owner, or the original artist, or a smart contract that distributes the royalty payments to multiple recipients. A secondary sale of an asset is any sale after the asset has been minted (see [Deep dive into minting](../key-concepts/deep-dive-minting.md)) and is now circulating in the open market. Typically, these assets are re-sold on NFT marketplaces like OpenSea or Rarible on layer 1, or [Token Trove](https://tokentrove.com/) or the [Immutable Marketplace](https://market.immutable.com/) on layer 2.

There are multiple ways that token collections can specify royalty amounts and recipients:

| | Method | Examples | Issues |
| --- | --- | --- | --- |
| 1 | Inside the contract, using standard methods required by certain marketplaces or standards | <ul><li>The Rarible Multichain Protocol defines an interface to query royalties from a contract, or interacts with a Royalty Registry to get the royalties implemented on a collection, or queries the interface function defined by EIP-2981 (read more [here](https://docs.rarible.org/overview/tokens-fees-royalties/#royalties))</li> <li>The contract can implement [EIP-2981](https://eips.ethereum.org/EIPS/eip-2981), which defines a standardized way to retrieve royalty payment information for non-fungible tokens (NFTs) to enable universal support for royalty payments across all NFT marketplaces and ecosystem participants.</li></ul> | Marketplaces can simply choose not to obtain royalty information and facilitate payment |
| 2 | On the marketplace directly, on a per-marketplace basis | [OpenSea](https://docs.opensea.io/docs/10-setting-fees-on-secondary-sales#setting-your-secondary-sale-fee) | <ul><li>Only for a specific marketplace, some marketplaces can simply choose not to obtain royalty information and facilitate payment.</li><li>Owners have to update royalty info per marketplace</li></ul> |
| 3 | Register a contract's royalties on the [Royalty Registry](https://royaltyregistry.xyz/), which marketplaces can look up to discover the royalties registered for a particular token collection | [Royalty Registry](https://royaltyregistry.xyz/) | Marketplaces can simply choose not to look it up |

#### 2. Facilitating the payment of the royalty when the sale occurs

Typically, the handling of secondary sales royalties are implemented by the marketplace that is facilitating the sale. Sales of NFTs are typically handled by orderbook smart contracts, which allow users to list their items, and settlement contracts, which handle the payments and transfer of asset from seller to buyer. These contracts need to be able to obtain royalty information about the tokens that they are facilitating the sale of. The issue is that these marketplaces can just decide not to read this royalty information and so not facilitate royalty payments.

### How are royalties paid and why are they hard to enforce?
As stated in the description of `Secondary sale of an asset` in the [table](#types-of-blockchain-royalties) above, whilst the smart contract can provide information about the royalty amount and recipient, it relies on the application/smart contract that is facilitating the sale of the asset to pay out the royalty, not on the original smart contract. 

There is no function in the smart contract that automatically pays out the royalty when a sale goes through. Typically, sales of NFTs are handled by orderbook services, which allow users to list their items, and **settlement contracts**, which handle the payments and transfer of asset from seller to buyer. The settlement contract uses the token contract's `transfer()` mechanism as part of the process of facilitating a sale. This is a generic function that is called whenever a token changes hands, which could be for many different reasons: A token being sent as a gift, or transferred by the owner from one wallet that they own to another, or it could be a sale. It does not know anything about the reason for a transfer.

As such, if the settlement contract does not implement a mechanism that pays out a portion of the sale price to the royalty recipient, then it will just not happen.

### How can royalties be enforced trustlessly?
In order for royalties to be enforced trustlessly, it requires two components:
1. A standard way for royalties and their recipients to be specified in an immutable and decentralized manner, ie. by hardcoding that information in the token itself.
2. When the token is sold, the royalty amount is automatically sent to the specified recipient. This requires the mechanism by which a token is sold to perform this.

## Royalties on ImmutableX
:::info Note:
* Royalties can only be set for tokens that are [minted on ImmutableX](../key-concepts/deep-dive-minting.md#what-is-minting-on-immutablex).
* When minting, if a royalty recipient is specified that is not a registered user on ImmutableX, then minting will fail.
* Once tokens have been minted and royalty information set, ImmutableX currently does not support changing this information. This includes either changing the royalty amount or the recipient.
* See also [Rules for setting royalties](../overview/fees.md#rules-for-setting-royalties).
:::

* **Royalty information is stored for all tokens minted on ImmutableX** - royalties can be specified contract-wide, or for specific tokens.
* **ImmutableX's settlement (sale) contracts will automatically pay out royalties when a sale occurs** - this is enforced across the ImmutableX protocol because all applications built using ImmutableX's APIs (giving them access to Immutable's Global Orderbook) use these settlement contracts.

An example of how royalties are set while minting on ImmutableX:
```ts
const result = await minter.mintV2([
	{
		"contractAddress": "0xc6185055ea9891d5d9020c927ff65229baebdef2",
		// Specifying contract-wide royalty information
		"royalties": [
			{
				// Specifying the contract-wide royalty recipient's wallet address
				"recipient": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
				// Specifying the contract-wide royalty rate for this collection
				"percentage": 2.5
			}
		],
		"users": [
			{
				"etherKey": "0xc3ec7590d5970867ebd17bbe8397500b6ae5f690",
				"tokens": [
					{
						// Specific NFT token
						"id": "1",
						"blueprint": "my-on-chain-metadata",
						// Overriding the contract-wide royalty information with token-specific royalty information
						"royalties": [
							{
								// Same recipient's wallet address
								"recipient": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
								// Changed royalty rate for this specific token (i.e. 1% instead of the default 2.5%)                        
								"percentage": 1
							}
						],
					}
				]
			},
			{
				"etherKey": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
				"tokens": [
					{
						// Specific NFT token
						// No token-specific royalty information specified; contract-wide royalty infromation will be used
						"id": "2",
						"blueprint": "my-other-on-chain-metadata"
					}
				]
			},
			...
		]
	}
]);
```

### How are royalties calculated?
On ImmutableX, royalties are calculated by adding the royalty rate (as a proportion of the sale price) on top of the sale price. Here is an example:
* An NFT is listed for 1 ETH on Immutable
* There is a taker fee of 1%
* There is a maker fee of 1%
* There is a protocol fee of 2%
* There is a royalty fee of 5% to one recipient
* A buyer will see the NFT listed at 1 ETH * 1.09 (100% + all the fees) = 1.09 ETH.
* When the buyer purchases the NFT for 1.09 ETH, the seller will receive the full 1 ETH and the royalty recipient will receive 5% of the selling price, i.e. 0.05 ETH.