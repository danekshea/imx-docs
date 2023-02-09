---
id: "link-buy2"
title: "Link.buy"
slug: "/link-buy2"
excerpt: "이제 링크를 다중 오더 ID를 포함하는 매수 플로우 시작에 사용할 수 있습니다"
sidebar_position: 4
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

다음은 매수 오더를 개시하는 방법입니다.

```typescript
import { Link, ImmutableXClient, ImmutableOrderStatus} from ‘@imtbl/imx-sdk’;
const link = new Link("https://link.sandbox.x.immutable.com")
buyResults: BuyResponse = await link.buy({ orderIds: ['1', '2', '3'] });
```


다른 링크 SDK 메서드와 마찬가지로, **매수**는 프라미스를 반환하고, 이 프라미스는 모든 작업이 완료되면 이행(resolve)하거나 링크가 치명적인 오류에 직면하면 거부(reject)합니다.

다중 매수 플로우가 사용자에 의해 확정되면 **매수**는 비동기식으로 목록에 있는 각 오더의 구매를 시도한 후 그 결과를 표시합니다.

이 기능이 허용하는 새로운 유형의 다양한 오류 상태를 처리하기 위해 `link.buy`는 이제 다음의 유형에 매칭되는 응답 리포트 페이로드로 해결합니다.

```typescript
type SuccessOrError = 'success' | 'error'

type OrderStatus = {
  status: SuccessOrError
  message?: string
}

type BuyResults = {
  [orderId: string]: OrderStatus
}

type BuyResponse = {
  result: BuyResults
}
```

반성공적인 `buy()` 플로우에서의 해결 페이로드 예시

```typescript
{
  result: {
     '1': { status: 'success' },
     '2': {
        status: 'error',
        message: 'Cannot purchase own order',
     },
     '3': { status: 'success' },
  }
}
```

최소한의 클라이언트 측 확인을 거친 후 다중 매수 플로우가 0개의 유효한 오더를 포함하는 것으로 밝혀진다면 링크는 오류를 출력하며 (buy() 메서드에서 반환한 프라미스를 거부하고) 어떤 오더도 구매되지 않습니다.

## 오류

오류 응답은 [여기](./link-errors.md#buy)를 확인하십시오.