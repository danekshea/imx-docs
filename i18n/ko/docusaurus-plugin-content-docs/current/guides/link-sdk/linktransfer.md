---
id: "linktransfer"
title: "Link.transfer"
slug: "/linktransfer"
excerpt: "이제 링크를 다중 토큰 전송을 포함하는 플로우 개시에 사용할 수 있습니다."
sidebar_position: 1
keywords:
  - imx-wallets
---

:::caution Registration is required for Receiver Wallet
`link.transfer` will only work if the receiver wallet was previously registered with ImmutableX.

To register the wallet, simply do `Connect Wallet` in the ImmutableX Marketplace and follow through all the steps until the wallet is fully connected to ImmutableX Marketplace
:::

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

`1.0.0` 버전부터 `@imtbl/imx-sdk`는 한 번의 여러 토큰을 전송하는 것을 지원합니다. 새로운 전송 플로우를 개시하려면, 그렇게 링크를 호출해야 합니다.

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

이렇게 변경할 수 있도록 `link.transfer` SDK 메서드는 다음과 같은 인터페이스 & 유형 변경을 가지고 있습니다.

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

구 `link.transfer` 메서드의 프라미스 응답 서명은 `void`입니다

투명성을 제고하고 어떤 전송이 실패하고 어떤 전송이 성공했는지를 보여주기 위해, 새로운 `link.transfer` 메서드는 트랜잭션 상태 리포트와 함께 귀결됩니다.

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

## 오류

오류 응답은 [여기](./link-errors.md#transfer)를 확인하십시오.