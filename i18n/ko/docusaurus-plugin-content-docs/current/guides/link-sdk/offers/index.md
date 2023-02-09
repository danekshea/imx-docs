---
id: "link-offers"
title: "Link Offers"
slug: "/link-offers"
keywords:
  - trading
  - orderbook
  - offer
  - buy-order
---

:::danger OFFERS IS IN BETA 
This feature is currently in beta. Some functionality might be restricted or changed without notice. Please contact IMX if you have questions about integrating this feature.
:::

The following sections describe the offer functionality. These functions allow a user to place an offer on an asset which can then be accepted by the owner to create a trade.

The three flows are:
* `makeOffer` - making an offer on a specific asset
* `cancelOffer` - cancelling an offer previously made on a specific asset
* `acceptOffer` - creating a trade by accepting a valid offer on your asset

If a user wants to change their offer on an asset, they must first cancel the existing offer and then make a new one.

Offers are the equivalent of active buy orders from the v3 orders API. The buy side token type is ERC721 (an NFT) and the sell side token type would be ETH or ERC20 (currency). To retrive a list of offers for a particular asset you will need to make a request to the `/v3/orders` public API and pass parameters to filter for `active` buy orders on the asset. For example to filter for active offers (buy orders) on a particular asset, the parameters to pass would include:

```typescript
{
  status: 'active',
  buy_token_id: '2002',
  buy_token_address: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
  buy_token_type: 'ERC721'
}
```
