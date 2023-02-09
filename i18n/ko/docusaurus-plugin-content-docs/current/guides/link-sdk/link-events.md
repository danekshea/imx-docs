---
id: "link-events"
title: "Link Events"
slug: "/link-events"
sidebar_position: 14
keywords:
  - imx-wallets
---

:::info
  <h5>Link Events are available from imx-sdk version 1.40.0</h5>
:::

## Link Event Types

The Link SDK will dispatch events on the window object with type `imx-link-info` from time to time. Currently this will only happen in the [Link.buy](./link-buy2.md) flow when a user connects to a different game wallet before completing their purchase.

If this happens a Custom Event will be dispatched which will have the following shape:

``` typescript
{
  ...
  detail: {
    type: string;
    payload?: any;
  }
}
```

The event detail types are defined in the `ImxLinkInfoEventType` enum.
> Note that more of these event types may be added in future.

``` typescript
enum ImxLinkInfoEventType {
  WALLET_CONNECTION = 'wallet-connection',
}
```
### Wallet Connection
There is a flow in `link.buy()`, in which the user may connect to a different wallet before completing their purchase. The event dispatched will hold the details of the new wallet connection. Listening to this will enable your application to remain in sync with the currently connected wallet in Link.

Here's an example event
``` typescript
{
  "detail": {
    "type": "wallet-connection",
    "payload": {
      "walletAddress": "0x...",
      "starkPublicKey": "...",
      "providerPreference": "metamask",
      "ethNetwork": "goerli",
      "email": ""
    }
  }
}
```

## How to listen for events from Link

The following code is an example of how to set up a listener for this event.

``` typescript
import { LINK_INFO_MESSAGE_TYPE, ImxLinkInfoEventType } from "@imtbl/imx-sdk"

function linkInfoEventHandler(event: CustomEvent) => {
  console.log("Type of the event, ", event.detail.type);
  if(event.detail.payload) {
    console.log("Payload of the event, ", event.detail.payload);
  }

  if(event.detail.type === ImxLinkInfoEventType.WALLET_CONNECTION){
    // handle wallet-connection event
  }
}

// Add the event listener
window.addEventListener(LINK_INFO_MESSAGE_TYPE, linkInfoEventHandler);

// At some other point you can remove the event listener with
window.removeEventListener(LINK_INFO_MESSAGE_TYPE, linkInfoEventHandler);
```

