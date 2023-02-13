---
id: "link-cancel-offer"
title: "Link.cancelOffer"
slug: "/link-cancel-offer"
excerpt: "Link can now be used to cancel an offer made previously"
sidebar_position: 2
keywords: [trading, orderbook, offers, buy-order]
---

:::danger OFFERS IS IN BETA
This feature is currently in beta. Some functionality might be restricted or changed without notice. Please contact IMX if you have questions about integrating this feature.
:::

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

Here's how you can cancel an offer:

```typescript
import { Link, ImmutableXClient, ImmutableOrderStatus} from ‘@imtbl/imx-sdk’;
const link = new Link("https://link.sandbox.x.immutable.com")
// cancel an offer by passing the orderId of the offer to cancel
await link.cancelOffer({
  orderId: '940'
});
```

Just like all other link SDK methods, **cancelOffer** returns a promise, which resolves once all operations are complete, or rejects once the link encounters a critical error.

Input parameters:
```typescript
{
  orderId: string // id of the order to cancel
}
```

![Cancel an offer](/img/link-offers/cancel-offer-prompt.png 'Cancel an offer')

![Cancel an offer confirmation](/img/link-offers/cancel-offer-success.png 'Cancel an offer confirmation')

## Errors

See error responses [here](./../link-errors.md#offers).