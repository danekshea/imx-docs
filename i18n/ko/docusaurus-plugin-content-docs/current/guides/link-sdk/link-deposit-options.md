---
id: "link-deposit-options"
title: "Link.deposit"
slug: "/link-deposit-options"
sidebar_position: 8
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

링크 UI와 함께 사용되는 **SDK v1.3.30 이상**은 다양한 방식으로 ETH과 USDC, GODS, IMX 토큰 등 화이트리스트 처리된 ERC20 토큰의 입금을 지원합니다. :::info Currency support  
Right now, ImmutableX _only_ supports ETH and whitelisted ERC20 tokens.
:::

ImmutableX is not prescriptive in how marketplaces handle the deposit process. 사용자의 입금 과정에 영향을 미치기 위해 마켓플레이스에 사용할 수 있는 선택적인 매개 변수가 몇 가지 있습니다.

이용 가능한 매개 변수:

```typescript
{
  type: ETH,
  amount?: PositiveNumberStringC
}

{
  amount: PositiveNumberStringC
}

{
  type: ERC20,
  tokenAddress: EthAddress,
  symbol: string,
  amount?: PositiveNumberStringC
}
```

## 사용 방법

마켓플레이스가 오직 금액만을 제공하거나, 금액과 함께 ETH 유형을 제공한다면 시스템은 ETH로 입금합니다. 이것은 마켓플레이스가 ETH로만 입금을 허용하기를 원하거나 마켓플레이스 자체 브랜딩을 위해 입금 양식을 꾸미고 싶어할 때 사용될 수 있습니다.

```typescript
link.deposit({
  amount: '0.1',
})

// or

link.deposit({
  type: 'ETH',
  amount: '0.1',
})
```

![ETH 금액 입금](/img/link-deposit/deposit-eth-amount.png "ETH 금액 입금")

마켓플레이스가 토큰 정보와 금액을 제공하면, 사용자는 입금을 확정할 것을 요청받습니다. 이것은 사용자에게 '1GODS 토큰 입금'과 같은 단축키를 제공하거나, 마켓플레이스가 브랜딩 목적으로 입금 양식을 꾸미고 싶을 때 사용할 수 있습니다.

```typescript
link.deposit({
  amount: '10',
  type: 'ERC20',
  symbol: 'USDC',
  tokenAddress: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
})
```

![USDC 금액 입금](/img/link-deposit/deposit-usdc-amount.png "USDC 금액 입금")

마켓플레스가 토큰 정보만을 제공하는 경우, 사용자는 금액을 제공하고 입금을 확정할 것을 요청받습니다. 이것은 사용자에게 'GODS 입금'과 같은 단축키를 제공하거나, 다시 말하지만, 양식에 브랜드 전용 스타일을 추가하고 싶을 때 사용될 수 있습니다.

```typescript
link.deposit({
  type: 'ERC20',
  symbol: 'GODS',
  tokenAddress: '0x4c04c39fb6d2b356ae8b06c47843576e32a1963e',
})
```

![지정된 토큰 입금](/img/link-deposit/deposit-token-provided.png "지정된 토큰 입금")

마켓플레이스에서 어떤 매개 변수도 제공하지 않는 경우, 사용자는 입금을 확정하기 전 통화와 금액을 선택할 것을 요청받습니다. 이것은 마켓플레이스가 이뮤터블이 브랜딩하는 통화와 양식에 의존하는 것을 선호하는 경우에 사용될 수 있습니다.

```typescript
link.deposit()
```

![매개 변수 없이 입금](/img/link-deposit/deposit-without-params.png "매개 변수 없이 입금")

## 오류

오류 응답은 [여기](./link-errors.md#deposits)를 확인하십시오.