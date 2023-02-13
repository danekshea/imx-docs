---
title: "Fees"
slug: "/fees"
sidebar_position: 4
---

Fees are additional amounts that a user pays on top of a base price of an asset. These can be imposed by various entities. On ImmutableX, they are:

| Entity | Type of fee | Amount | Example |
| --- | --- | --- | --- |
| ImmutableX | Protocol | 2% of every trade. | Alice lists an NFT for 1 ETH on a marketplace. When Bob purchases this NFT, he would need to pay 1.02 ETH where 1 ETH goes to Alice and 0.02 ETH goes to ImmutableX. |
| Application enabling the creation of an order, ie. marketplace | Maker | See<a href="#rules-for-setting-maker-and-taker-fees"> rules below.</a><br/><br/>When the [create order endpoint](/reference#/operations/createOrder) is called, the caller (usually the marketplace facilitating the creation of the order) can set a fee amount and recipient in the request payload. This amount is added on top of the order price and paid by the user purchasing the asset. | Alice lists an asset for 1 ETH on a marketplace that imposes a maker fee of 1%. Therefore, the price that the asset will be listed for on the marketplace is 1.01 ETH. |
| Application enabling filling of an order (trade), ie. marketplace | Taker | See<a href="#rules-for-setting-maker-and-taker-fees"> rules below.</a><br/><br/>When the [create trade endpoint](/reference#/operations/createTrade) is called, the caller (usually the marketplace facilitating the creation of the trade) can set a fee amount and recipient in the request payload. This amount is added on top of the order price and paid by the user purchasing the asset. | Bob buys an asset from a marketplace that imposes a taker fee of 1%. If the base price of the asset is 1 ETH, the amount he will pay is 1.01 ETH.<br/><br/>If the marketplace that the asset's owner listed it for also imposed a maker fee of 2%, then Bob must pay for both the maker and the taker fees, so total Bob will pay is 1.03 ETH. |
| Collection royalty recipient, ie. owner of an NFT smart contract | Royalty | See<a href="#rules-for-setting-royalties"> rules below.</a><br/><br/>When minting an asset on ImmutableX, the contract owner can set a royalty rate and recipient either collection-wide (for all tokens in the collection), or per token. When the asset is sold on an ImmutableX marketplace, the royalty amount will be added to the price of the asset, to be paid by the purchaser.<br/><br/>See also: [Deep dive into royalties](../key-concepts/deep-dive-royalties.md). | Alice mints a collection of assets on ImmutableX and sets a 5% royalty for every asset in the collection to go to her.<br/><br/>Bob owns an asset from Alice's collection and sets the sale price of 1 ETH. The ImmutableX marketplace on which he lists the asset will display a selling price of 1.05 ETH, which contains the royalty amount.<br/><br/>When Ciaran comes along and buys this asset, he pays 1.05 ETH, 1 ETH of which goes to Bob, and 0.05 ETH goes to Alice. |

## When are fees paid out?
Fees are paid by the asset purchaser and sent to the recipient accounts as part of the transaction - so as soon as a transaction is confirmed.

## Rules for setting maker and taker fees
**Maker fees** can be set by the application that is enabling the user to [create an order](../guides/basic-guides/create-orders/index.md) (put an asset up for sale). **Taker fees** can be set by the application enabling the user to [create a trade](../guides/basic-guides/create-trades/index.md) (purchase an item for sale).
* You cannot set more than 3 recipients
* You cannot set the same recipient more than once
* The combined fee percentage can’t exceed 100%
* Individual percentage fees can’t be <= 0%

## Rules for setting royalties
* You can set up to 50 royalty recipients
* You cannot set the same recipient more than once
* The royalty percentage for a single user cannot exceed 100% (however, the combined percentage for all recipients may exceed 100% - as this amount is calculated on top of the sale price)
* Individual percentage fees can’t be < 0%