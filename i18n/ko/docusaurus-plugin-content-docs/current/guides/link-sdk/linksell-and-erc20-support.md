---
id: "linksell-and-erc20-support"
title: "Link.sell and ERC20 support"
slug: "/linksell-and-erc20-support"
sidebar_position: 7
keywords: [imx-wallets]
---

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

**SDK v1.3.13+** supports different currencies in the sell process, allowing users to list items in ETH and whitelisted tokens (USDC, GODS or IMX token). The listing can be only bought for the same currency it was listed for.

:::info Limited Currency Support
We only support USDC, GODS or IMX token
:::

ImmutableX is not prescriptive in how marketplaces handle the sell process. There are several optional parameters you can use for your marketplace, to influence the user journey for the listing and the listing order itself.

Available parameters:

```typescript
{
  tokenId: t.string,
  tokenAddress: EthAddress,
  amount?: PositiveNumberStringC,
  currencyAddress?: EthAddress
}
```

## Usage

If no currency and no amount is provided, both currency and amount will be requested from the user by Link UI.

```typescript
link.sell({
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
})
```

![List for sale and Select both Amount and Currency](/img/linksell-and-erc20-support/list-for-sale-select-amount-currency.png 'List for sale and Select both Amount and Currency')

If no currency is provided, but the amount is present, the system will default to sell in ETH.

```typescript
link.sell({
  amount: '0.01',
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
})
```

![Default currency is ETH](/img/linksell-and-erc20-support/list-for-sale-default-eth.png 'Default currency is ETH')

To restrict your marketplace to selling in a specific whitelisted currency, you need to provide `currencyAddress` for a token.

In this flow, Link UI will be displayed asking the user to specify the amount. A list of whitelisted tokens is available via API endpoint [/get_v1-tokens-1]/reference#/operations/listTokens)

```typescript
link.sell({
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
  currencyAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
})
```

![Select amount only](/img/linksell-and-erc20-support/select-amount.png 'Select Amount only')

You can also restrict users to a specific currency _and_ specific amount. Then Link UI will ask users for confirmation of the currency and amount.

```typescript
link.sell({
  amount: '0.01',
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
  currencyAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
})
```

## Errors

See error responses [here](./link-errors.md#sell).