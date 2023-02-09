---
id: "link-nft-checkout-primary"
title: "Link.nftCheckoutPrimary"
slug: "/link-nft-checkout-primary"
sidebar_position: 13
keywords:
  - imx-payments
---

:::caution Feature for managed partners only
This is a feature intended for managed partners. If you are not a managed partner and would like to become one, please reach out to us on our [#dev-discussion channel](https://discord.gg/7URHuYFCN4) on Discord.

If you are a managed partner, your partner success manager needs to set up a commercial partnership with MoonPay for you. Please reach out to them to facilitate this.
:::

We have partnered with MoonPay to enable you to integrate their [NFT Checkout](https://www.moonpay.com/business/nfts) feature so you can build applications that allow your users to purchase NFTs directly on ImmutableX with a credit card - no ETH or other ERC20 token required!

This primary sales flow is available in the Link SDK v1.35.7+ and is a collaboration between Immutable X and MoonPay. It requires you to register your intent to use the service with us, and to have commercial agreement between you & MoonPay.

Once you have been approved, to initialize the NFT Checkout process you need to call the nftCheckoutPrimary function:

```typescript
await link.nftCheckoutPrimary({
    sellerWalletAddress: "0x001", // L2 wallet address of the seller 
    contractAddress: "0x002", // NFT contract address
    offerId: "new_offer" // The identifier for the "offer"
})
```

Where:
- `sellerWalletAddress` - L2 wallet address of the seller, funds will be send to this address
- `contractAddress` - NFT contract address
- `offerId` - An identifier that represents what will be minted.

In the cases where purchasers know what they're purchasing (such as a specific pfp) `offerId` could be the token ID (i.e. `420`) and in other cases where they dont know what they're purchasing (such as a loot box) it could be something like `silver-chest`. This is simply a way to render an item in the cart, and doesnt need to tie to the actual NFT asset directly.

:::info Handling the offerID
Note that primary sales involve taking a payment before the mint occurs. Because the asset doesnt exist yet, we've included an `offerId` instead of an asset ID. Therefore in order to successfully render the checkout with the information seen below (Offer title, and image) - you will need to be a managed partner with ImmutableX.
:::

This displays the Link UI with loaded MoonPay widget:

![Mint By Fiat](/img/link-sdk-nft-checkout-primary/nft-checkout-primary.png "NFT Checkout primary")

## Errors

See error responses [here](./link-errors.md#nft-checkout-primary).