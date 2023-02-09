---
id: "linkcompletewithdrawal"
title: "Link.completeWithdrawal"
slug: "/linkcompletewithdrawal"
sidebar_position: 6
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

다음은 ETH 인출 완료 방법입니다.

응답은 `completeWithdrawal`가 반환하는 프라미스의 결과를 저장함으로써 획득할 수 있습니다.

```typescript
const response = await link.completeWithdrawal({
  type: ETHTokenType.ETH,
})

console.log(response)
// 다음을 반환합니다 { transactionId: '0x...' }
```

## 오류

오류 응답은 [여기](./link-errors.md#complete-withdrawal)를 확인하십시오.