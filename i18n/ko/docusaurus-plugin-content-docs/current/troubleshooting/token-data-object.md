---
id: "token-data-object"
title: "Token data object"
slug: "/token-data-object"
sidebar_position: 4
keywords:
  - imx-games
---

현재 이뮤터블의 API 레퍼런스에는 많은 엔드 포인트의 매개 변수로 요구되는 `token.data` 객체가 있습니다.

**예시:** ![토큰 데이터](/img/token-data.png "토큰 데이터 매개 변수")

하지만 API 레퍼런스에서 이 객체가 어떤 모습이어야 하는지는 명확하지 않습니다. 이 페이지에서는 그것을 명확하게 밝히고자 합니다.

### `token.data`가 필요한 엔드 포인트:
* [getSignableOrder](https://docs.x.immutable.com/reference#/operations/getSignableOrder)
* [getSignableTransferV1](https://docs.x.immutable.com/reference#/operations/getSignableTransferV1)
* [getSignableTransfer](https://docs.x.immutable.com/reference/#/operations/getSignableTransfer)(서명 가능한 전송의 세부 사항 대부분 가져오기)
* [getSignableWithdrawal](https://docs.x.immutable.com/reference#/operations/getSignableWithdrawal)

### 토큰

`token` 매개 변수는 두 필드로 구성되어 있습니다.
* **type**
* **data**

`type`은 다음 중 하나일 수 있습니다: **ETH**, **ERC20**, 또는 **ERC721**

`data`는 사용되는 `type`에 따라 달라집니다. 필드는 다음과 같습니다.
* **decimals** (ETH, ERC20에 필요)
* **token_address** (ERC20, ERC721에 필요)
* **token_id** (ERC721에 필요)

필수 필드 중 하나가 누락되면, 요청에 오류가 발생합니다.

### 요청 예시:

#### type: 'ETH'

```typescript
{
  ...
  "token": {
      "type": "ETH",
      "data": {
          "decimals": 18
      }
  }
}
```

#### type: 'ERC20'

```typescript
{
  ...
  "token": {
      "type": "ERC20",
      "data": {
          "decimals": 18,
          "token_address": "0x..."
      }
  }
}
```

#### type: 'ERC721'

```typescript
{
  ...
  "token": {
      "type": "ERC721",
      "data": {
          "token_address": "0x...",
          "token_id": "123"
      }
  }
}
```
