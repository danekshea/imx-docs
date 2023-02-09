---
id: "link-accept-offer"
title: "Link.acceptOffer"
slug: "/link-accept-offer"
excerpt: "Link can now be used to accept an offer made on your asset"
sidebar_position: 3
keywords:
  - trading
  - orderbook
  - offers
  - buy-order
---

:::danger OFFERS IS IN BETA
This feature is currently in beta. Some functionality might be restricted or changed without notice. Please contact IMX if you have questions about integrating this feature.
:::

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

Here's how you can accept an offer:

```typescript
import { Link, ImmutableXClient, ImmutableOrderStatus} from '@imtbl/imx-sdk';
const link = new Link("https://link.sandbox.x.immutable.com")
// accept an offer by passing the orderId of the offer
await link.acceptOffer({
  orderId: '940',
  fees: [  // optionally specify seller marketplace fees in array
    {
      address: '0x383b14727ac2bD3923f1583789d5385C3A26f91E',
      fee_percentage: 0.5, // equal to 0.5%
    },
  ],
});
```

Just like all other link SDK methods, **acceptOffer** returns a promise, which resolves once all operations are complete, or rejects once the link encounters a critical error.

Input parameters:
```typescript
{
  orderId: string, // order id of the offer to be accepted
  fees?: {
    address: string, // recipient eth address
    fee_percentage: number, // fee percentage
  }[] // optionally specify seller marketplace fees in array
}
```
![Accept an offer](/img/link-offers/accept-offer-prompt.png "Accept an offer")

![Accept an offer confirmation](/img/link-offers/accept-offer-success.png "Accept an offer confirmation")

## Errors

See error responses [here](./../link-errors.md#offers).