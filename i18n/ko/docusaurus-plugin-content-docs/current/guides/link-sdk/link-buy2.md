---
id: "link-buy2"
title: "Link.buy"
slug: "/link-buy2"
excerpt: "Link can now be used to kick off buy flows containing multiple order ID's"
sidebar_position: 4
keywords: [imx-wallets]
---

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

Here's how you can initiate a buy order:

```typescript
import { Link, ImmutableXClient, ImmutableOrderStatus} from ‘@imtbl/imx-sdk’;
const link = new Link("https://link.sandbox.x.immutable.com")
buyResults: BuyResponse = await link.buy({ orderIds: ['1', '2', '3'] });
```


Just like all other link SDK methods, **buy** returns a promise, which resolves once all operations are complete, or rejects once the link encounters a critical error.

Once a multi-buy flow is confirmed by the user, **Buy** will asynchronously try to buy each order in the list and then display the results.

In order to handle the various new kinds of error states that this functionality allows, `link.buy` will now resolve with a response report payload which matches the following types:

```typescript
type SuccessOrError = 'success' | 'error'

type OrderStatus = {
  status: SuccessOrError
  message?: string
}

type BuyResults = {
  [orderId: string]: OrderStatus
}

type BuyResponse = {
  result: BuyResults
}
```

An example resolve payload from a semi-successful `buy()` flow:

```typescript
{
  result: {
     '1': { status: 'success' },
     '2': {
        status: 'error',
        message: 'Cannot purchase own order',
     },
     '3': { status: 'success' },
  }
}
```

If the multi-buy flow is found to contain 0 valid orders after minimal client-side validation, then link will error out (and reject the promise it returned from the buy() method) and no orders will be purchased.

## Errors

See error responses [here](./link-errors.md#buy).