---
id: "link-off-ramp"
title: "Link.offramp"
slug: "/link-off-ramp"
sidebar_position: 12
keywords: [imx-wallets]
---

:::danger Off-ramp requires authenticated user
`Link.offramp({})` should only be called when user is authenticated and logged in, otherwise it will require user to reconnect
:::

The off-ramp functionality is available in SDK v1.35.3+ and is a collaboration between ImmutableX and providers, such as MoonPay and Layerswap.

:::info Limited Currency Support with MoonPay
We only support ETH, USDC, GODS or IMX token
:::

### Off-ramp with MoonPay provider

To initialize the off-ramp process with an option to choose any available currency and amount, marketplace needs to call the off-ramp function:

```typescript
await link.offramp({})
```

This displays the Link UI with a screen when a user need to choose currency and anter amount:

![Off-ramp without parameters](/img/link-sdk-offramp/offramp-without-params.png 'Off-ramp without parameters')

To initialize the off-ramp process for a specific currency:
```typescript
await link.offramp({ cryptoCurrencies: ['ETH'] })
```

This displays the Link UI with a screen when a user can only enter amount with already populated currency:

![Off-ramp with specific currency](/img/link-sdk-offramp/offramp-with-currency.png 'Off-ramp with specific currency')

To initialize the off-ramp process with defined currency and amount:

```typescript
await link.offramp({ cryptoCurrencies: ['ETH'], amount: '0.01' })
```
This displays the Link UI with loaded MoonPay widget:

![Off-ramp with specific currency and amount](/img/link-sdk-offramp/offramp-with-currency-and-amount.png 'Off-ramp with specific currency and amount')

### Off-ramp with Layerswap provider

To initialize the off-ramp process with specified provider(by default MoonPay):

```typescript
await link.offramp({ provider: 'layerswap' })
```

This displays the Link UI with loaded Layerswap widget:

![Off-ramp with specified provider](/img/link-sdk-offramp/offramp-layerswap.png 'Off-ramp with specified provider')

## Errors

See error responses [here](./link-errors.md#offramp).
