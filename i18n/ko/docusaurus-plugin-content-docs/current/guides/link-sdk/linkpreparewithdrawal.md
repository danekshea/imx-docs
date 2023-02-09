---
id: "linkpreparewithdrawal"
title: "Link.prepareWithdrawal"
slug: "/linkpreparewithdrawal"
sidebar_position: 5
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

다음은 ETH의 인출을 준비하는 방법입니다.

이 요청에 대한 응답은 `prepareWithdrawal`가 반환하는 프라미스의 결과를 저장함으로써 획득할 수 있습니다.

```typescript
const response = await link.prepareWithdrawal({
  type: ETHTokenType.ETH,
  amount: '0.001', //The amount of the token to withdraw
})

console.log(response)
// returns { withdrawalId: 123456 }
```