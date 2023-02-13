---
id: "link-iframe-support"
title: "Link iFrame Support"
slug: "/link-iframe-support"
sidebar_position: 3
keywords: [imx-wallets]
---

## How to trigger link inside an iframe

The link supports iframe embedding.

Simply supply an additional options object when you construct Link:

```typescript
import { Link } from '@imtbl/imx-sdk';

type IframePositionKeys = 'left' | 'right' | 'top' | 'bottom';

type IframePositionOptions = {
  [key in IframePositionKeys]?: string;
};

type ConfigurableIframeOptions = null | {
  className?: string;
  containerElement?: HTMLElement;
  protectAgainstGlobalStyleBleed?: boolean;
  position?: IframePositionOptions;
};

const linkIframeOptions: ConfigurableIframeOptions = { className: 'my-link-iframe' };

const link = new Link('https://link.dev.x.immutable.com', linkIframeOptions);
```

### 3rd party cookie-blocking policy

Link use browser's localStorage, which is unavailable when running inside an iFrame if the user blocks 3rd party cookies. When this occurs, on every method called on Link it will be rejected with the error `Code 1004 - There is no storage available. This is usually related to a 3rd party cookie-blocking policy.`. For more information refer to the error responses [here](./link-errors.md#general-errors).

### Mobile experience

As it currently stands, web3 support in mobile devices is hit-and-miss and the experience differs a lot among platforms.
With that in mind and based on our tests, even if you decided to use Link as iFrame, we recommend keeping using Link as a pop-up at least when the end-user is navigating through a responsive/mobile device. You can do that simply by using the util `isMobile` shown in the code snippet below:

```typescript
import { isMobile, Link } from '@imtbl/imx-sdk';

type ConfigurableIframeOptions = null | {
  className?: string;
};

const linkIframeOptions: ConfigurableIframeOptions = 
  isMobile()
    ? null
    : { className: 'my-link-iframe' };

const link = new Link('https://link.dev.x.immutable.com', linkIframeOptions);
```