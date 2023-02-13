---
id: "linksign"
title: "Link.sign"
slug: "/linksign"
sidebar_position: 10
keywords: [imx-wallets]
---

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

SDK v1.14.1+ used with Link UI add support to request arbitrary L1 signatures. This feature provide some flexibility for the developer to request L1 signatures for different actions that are not core to the platform such as like, follow, comment, etc.

## Parameters

This method requires message that an engineer wants to sign and description that presents a user friendly message that will be shown to a user

```json
{
  "message": "NonEmptyString",
  "description": "NonEmptyString"
}
```

## Usage
To sign a message an engineer needs to call the method sign()
```typescript
link.sign({
    message: 'My awesome message',
    description: 'Message that a user will see',
});
```

![Sign Message](/img/link-sign/sign-msg.png 'Sign Message')

If a user successfully signed a message, link.sign() will be resolved with the value:
```json
{
    "result": "0x0d8705969ea15dac4f684f5f5a7a3447f514b07c96c7a9bb21588ef33821caed63f204c11f0ed69777132c8fa25af62c883627169c7b5b46f23b132db46e7d8d1c"
}
```

## Errors
If a user denied to sign a message, link.sign() will return rejected promise.

Also, there is an error screen that will be appeared if a message cannot be sign as contains forbidden message

![Sign Message Error](/img/link-sign/error.png 'Sign Message Error')

## Encryption public key

To get an encryption public key an engineer needs to call the method getPublicKey(). This method is available from SDK v1.16.0+
```typescript
link.getPublicKey({});
```

An example for Metamask provider:

![Request Encryption Public Key](/img/link-sign/public-key.png 'Request Encryption Public Key')

If a user allowed to provide a public encryption key, link.getPublicKey() will be resolved with the value:
```json
{
    "result": "1Afjjdub580LjsizQtlDmrSZ+BZIiydkx4BGRb2DDBI="
}
```