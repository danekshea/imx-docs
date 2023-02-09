---
id: "linksell-and-erc20-support"
title: "Link.sell and ERC20 support"
slug: "/linksell-and-erc20-support"
sidebar_position: 7
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

**SDK v1.3.13 이상**은 매도 과정에서 다양한 통화를 지원하여, 사용자들이 ETH 및 화이트리스트 처리된 토큰(USDC, GODS or IMX token)으로 항목을 상장할 수 있게 해줍니다. 상장된 자산은 상장된 통화와 동일한 통화로만 매수할 수 있습니다.

:::info 제한된 통화 지원
이뮤터블 X는 USDC, GODS 또는 IMX 토큰만을 지원합니다
:::

ImmutableX is not prescriptive in how marketplaces handle the sell process. 사용자의 상장 과정 및 상장 오더 그 자체에 영향을 미치기 위해 마켓플레이스에 사용할 수 있는 선택적인 매개 변수가 몇 가지 있습니다.

이용 가능한 매개 변수:

```typescript
{
  tokenId: t.string,
  tokenAddress: EthAddress,
  amount?: PositiveNumberStringC,
  currencyAddress?: EthAddress
}
```

## 사용 방법

통화 및 금액이 정해지지 않은 경우, 링크 UI가 사용자에게 통화와 금액을 요청합니다.

```typescript
link.sell({
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
})
```

![매도 상장 및 금액 및 통화 모두 선택](/img/linksell-and-erc20-support/list-for-sale-select-amount-currency.png "매도 상장 및 금액 및 통화 모두 선택")

통화는 정해지지 않았으나 금액은 존재하는 경우, 시스템은 디폴트로 ETH로 매도합니다.

```typescript
link.sell({
  amount: '0.01',
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
})
```

![기본 통화는 ETH입니다](/img/linksell-and-erc20-support/list-for-sale-default-eth.png "기본 통화는 ETH입니다")

마켓플레이스가 화이트리스트 처리된 특정 통화로 매도하는 것을 제한하려면, 토큰에 `currencyAddress`를 제공해야 합니다.

이 플로우에서 링크 UI는 사용자에게 금액을 지정할 것을 요청합니다. 화이트리스트 처리된 토큰 목록은 API 엔드 포인트를 통해 이용할 수 있습니다 [/get_v1-tokens-1]/reference#/operations/listTokens)

```typescript
link.sell({
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
  currencyAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
})
```

![금액만 선택](/img/linksell-and-erc20-support/select-amount.png "금액만 선택")

또한 사용자에게서 특정 통화 _및_ 특정 금액을 제한할 수도 있습니다. 그러면 링크 UI가 사용자에게 통화 및 금액을 확인할 것을 요청합니다.

```typescript
link.sell({
  amount: '0.01',
  tokenId: '123',
  tokenAddress: '0x2ca7e3fa937cae708c32bc2713c20740f3c4fc3b',
  currencyAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
})
```

## 오류

오류 응답은 [여기](./link-errors.md#sell)를 확인하십시오.