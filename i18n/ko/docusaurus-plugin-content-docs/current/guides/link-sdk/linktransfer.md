---
id: "linktransfer"
title: "Link.transfer"
slug: "/linktransfer"
excerpt: "Link can now be used to kick off flows containing multiple token transfers"
sidebar_position: 1
keywords: [imx-wallets]
---

:::caution Registration is required for Receiver Wallet
`link.transfer` will only work if the receiver wallet was previously registered with ImmutableX.

To register the wallet, simply do `Connect Wallet` in the ImmutableX Marketplace and follow through all the steps until the wallet is fully connected to ImmutableX Marketplace
:::

:::note Link reference tool
Check out our **[Link reference tool](https://tools.immutable.com/link-reference/)** to understand how `Link` methods work without having to write any code.
:::

As of `1.0.0`, the `@imtbl/imx-sdk` supports transferring multiple tokens at once. To begin a new transfer flow, link should be called like so:

```typescript
// eg: here is a sample link.transfer call:
const transferResponsePayload: TransferV2ResultsCodec = await link.transfer([
  {
    amount: '1.23',
    symbol: 'GODS',
    type: ERC20TokenType.ERC20,
    tokenAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
    toAddress: 'replace-this-with-a-receiver-address',
  },
  {
    amount: '0.23',
    type: ETHTokenType.ETH,
    toAddress: 'replace-this-with-a-receiver-address',
  },
])
```

To make this change possible, the `link.transfer` SDK method has had the following interface & type changes:

```typescript
// The below interfaces have not changed, they're just supplied here for context ...
const EthAddress = t.brand(
  t.string,
  (s: any): s is t.Branded<string, EthAddressBrand> => isAddress(s),
  'EthAddress'
)
export type EthAddress = t.TypeOf<typeof EthAddress>
const FlatETHTokenCodec = t.interface({
  type: ETHTokenTypeT,
})
const FlatETHTokenWithAmountCodec = t.intersection([
  FlatETHTokenCodec,
  t.interface({ amount: PositiveNumberStringC }),
])
const FlatERC20TokenCodec = t.interface({
  type: ERC20TokenTypeT,
  tokenAddress: EthAddress,
  symbol: t.string,
})
const FlatERC721TokenCodec = t.interface({
  type: ERC721TokenTypeT,
  tokenId: NonEmptyString,
  tokenAddress: EthAddress,
})
export const FlatTokenWithAmountCodec = t.union([
  FlatETHTokenWithAmountCodec,
  FlatERC721TokenCodec,
  FlatERC20TokenWithAmountCodec,
])

// The old interface:
const TransferParamsCodec = t.intersection([
  FlatTokenWithAmountCodec,
  t.interface({
    to: EthAddress,
  }),
])

// The new interfaces:
export const FlatTokenWithAmountAndToAddressCodec = t.intersection([
  FlatTokenWithAmountCodec,
  t.type({
    toAddress: EthAddress,
  }),
])

const TransferV2ParamsCodec = t.array(FlatTokenWithAmountAndToAddressCodec)
```

The promise response signature from the old `link.transfer` method is `void`

To better allow transparency and show which transfers failed and which transfers passed, the new `link.transfer` method resolves with a transaction status report:

```typescript
// the old interface:
void

// The new interfaces:
const SuccessCodec = t.literal('success');
const ErrorCodec = t.literal('error');

const TransferV2TokenWithResult = t.intersection([
  FlatTokenWithAmountAndToAddressCodec,
  t.union([
    t.type({ status: SuccessCodec, txId: t.Int }),
    t.type({ status: ErrorCodec, message: t.string }),
  ]),
]);

const TransferV2ResultsCodec = t.interface({
  result: t.array(TransferV2TokenWithResult),
});

// eg: a sample results block:
{
  result: [
    {
      type: 'ERC20',
      amount: '1.5',
      symbol: 'GODS',
      status: 'success',
      toAddress: '0x12345...',
      txId: 1
    }, {
      type: 'ETH',
      amount: '0.5',
      status: 'success',
      toAddress: '0x12345...',
      txId: 12
    }, {
      type: 'ERC721',
      tokenId: '654987',
      tokenAddress: '0x123456...',
      status: 'success',
      toAddress: '0x12345...',
      txId: 123
    }, {
      type: 'ERC721',
      tokenId: '1234',
      tokenAddress: '0x123456...',
      status: 'error',
      message: 'Cannot transfer to your own wallet',
      toAddress: '0x12345...',
    },
  ]
}
```

## Errors

See error responses [here](./link-errors.md#transfer).