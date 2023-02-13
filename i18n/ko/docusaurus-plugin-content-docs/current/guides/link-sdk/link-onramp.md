---
id: "link-on-ramp"
title: "Link.onramp"
slug: "/link-on-ramp"
sidebar_position: 11
keywords: [imx-wallets]
---

:::danger On-ramp requires authenticated user
`Link.onramp({})` should only be called when user is authenticated and logged in, otherwise it will require user to reconnect
:::

The on-ramp functionality is available in SDK v1.35.3+ and is a collaboration between ImmutableX and Providers, such as MoonPay and Layerswap.

:::info Limited Currency Support
We only support ETH, USDC, GODS or IMX token
:::

The list of supported `cryptoCurrencies` in the Link SDK:

- `ExchangeCurrency.USDC`
- `ExchangeCurrency.ETH`
- `ExchangeCurrency.IMX`
- `ExchangeCurrency.GODS`


### On-ramp with MoonPay provider
To initialize the on-ramp process with an option to choose any available currency, marketplace needs to call the `onramp` function:

```typescript
await link.onramp({})
```

This displays the Link UI with loaded MoonPay widget:

![On-ramp without parameters](/img/link-sdk-onramp/onramp-without-params.png 'On-ramp without parameters')

To initialize the on-ramp process for a specific currency:

```typescript
await link.onramp({ cryptoCurrencies: ['ETH'] })
```

This displays the Link UI with loaded MoonPay widget:

![On-ramp with specific currency](/img/link-sdk-onramp/onramp-with-currency-chosen.png 'On-ramp with specific currency')

To initialize the on-ramp process when a user can choose only specific currencies:

```typescript
await link.onramp({ cryptoCurrencies: ['ETH', 'USDC'] })
// or
await link.onramp({ cryptoCurrencies: ['IMX', 'GODS'] })
```

:::success MoonPay sandbox testing
To test the transactions in the Sandbox environment, please use the following test cards:

**CARD**: Visa
**NUMBER**: 4444493318246892
**DATE**: 12/2023
**CVC**: 123

**CARD**: Mastercard
**NUMBER**: 2222755234426838
**DATE**: 01/2024
**CVC**: 123
:::

### On-ramp with Layerswap provider

To initialize the on-ramp process with specified provider(by default MoonPay):

```typescript
await link.onramp({ provider: 'layerswap' })
```
This displays the Link UI with loaded Layerswap widget:

![On-ramp with specified provider](/img/link-sdk-onramp/onramp-layerswap.png 'On-ramp with specified provider')

:::success Layerswap sandbox testing
To test the transactions in the Sandbox environment, please use your exchange account with feature supported Goerli cryptocurrencies
:::

## Errors

See error responses [here](./link-errors.md#onramp).