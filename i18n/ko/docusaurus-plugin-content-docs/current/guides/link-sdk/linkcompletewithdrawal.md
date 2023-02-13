---
id: "linkcompletewithdrawal"
title: "Link.completeWithdrawal"
slug: "/linkcompletewithdrawal"
sidebar_position: 6
keywords: [imx-wallets]
---

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

Here's how you can complete the withdrawal of ETH:

The response can be obtained by saving the results of the Promise returned by `completeWithdrawal`:

```typescript
const response = await link.completeWithdrawal({
  type: ETHTokenType.ETH,
})

console.log(response)
// returns { transactionId: '0x...' }
```

## Errors

See error responses [here](./link-errors.md#complete-withdrawal).