---
id: "sdk-api"
title: "Overview"
slug: "/sdk-api"
sidebar_position: 1
pagination_next: "guides/link-sdk/link-setup"
keywords: [imx-wallets]
---

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

For context, read our [overview of the ImmutableX JS SDK](../js-sdk/index.md).

## Link usage

The Link SDK is used for frontend, user-facing interactions.

```typescript
import { Link, ETHTokenType } from '@imtbl/imx-sdk'

async function sdkExample() {
  const link = new Link('https://link.sandbox.x.immutable.com')

  // Register user, you can persist address to local storage etc.
  const { address } = await link.setup({})
  localStorage.setItem('address', address)

  // Deposit ETH into IMX
  link.deposit({
    type: ETHTokenType.ETH,
    amount: '0.01',
  })

  // View transaction history
  link.history({})

  // Create a sell order for token id 123 for 0.01 ETH
  link.sell({
    amount: '0.01',
    tokenId: '123',
    tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
  })

  // Cancel a sell order
  link.cancel({
    orderId: '1',
  })

  // Create a buy flow:
  link.buy({
    orderIds: ['1', '2', '3'],
  })

  // Prepare withdrawal, you will need to wait some time before completing the withdrawal
  link.prepareWithdrawal({
    type: ETHTokenType.ETH,
    amount: '0.01',
  })

  // Complete withdrawal
  link.completeWithdrawal({
    type: ETHTokenType.ETH,
  })
}
```

## API client usage

The API client is a direct mapping to the REST methods documented here: https://docs.x.immutable.com/reference

```typescript
import { ImmutableXClient } from '@imtbl/imx-sdk'

async function libExample() {
  const client = await ImmutableXClient.build({
    publicApiUrl: 'https://api.sandbox.x.immutable.com/v1',
  })
  const address = localStorage.getItem('address')

  if (address) {
    const balances = await client.getBalances({ user: address })
    const orders = await client.getOrders()
    const order = await client.getOrder({ orderId: 1 })
    const assets = await client.getAssets({
      user: address,
    })
  }
}
```
