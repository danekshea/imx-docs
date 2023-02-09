---
id: "sdk-api"
title: "Overview"
slug: "/sdk-api"
sidebar_position: 1
pagination_next: "guides/link-sdk/link-setup"
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

For context, read our [overview of the ImmutableX JS SDK](../js-sdk/index.md).

## 링크 사용법

링크 SDK는 프론트엔드, 사용자 대면 상호작용에 사용됩니다.

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

## API 클라이언트 사용법

API 클라이언트는 REST 메서드로의 직접 매핑으로 여기(https://docs.x.immutable.com/reference)에 문서로 작성되어 있습니다.

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
