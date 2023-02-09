---
id: "linkbatchnfttransfer"
title: "Link.batchNftTransfer"
slug: "/linkbatchnfttransfer"
sidebar_position: 2
keywords:
  - imx-wallets
---

`1.3.52`버전부터 `@imtbl/imx-sdk`는 배치에서 대량 NFT 전송을 지원합니다. 새 배치 전송 플로우를 시작하려면, 그렇게 링크를 호출해야 합니다.

```javascript
const response = await link.batchNftTransfer(payload)
```

페이로드가 `LinkParams.BatchNftTransfer` 유형인 경우:

```typescript
const payload: LinkParams.BatchNftTransfer = [
  {
    type: ERC721TokenType.ERC721, // Must be of type ERC721
    tokenId: string, // the token ID
    tokenAddress: string, // the collection address / contract address this token belongs to
    toAddress: string, // the wallet address this token is being transferred to
  },
  //...remainingTransfers
]
```

응답 유형은 [Link.transfer](./linktransfer.md)와 같습니다.

## 참고

- 요청은 **100개**의 그룹으로 일괄 처리됩니다(이것은 현재 배치 사이즈로, 변경될 수 있으나 이는 구현에 영향을 미치지 않습니다).

- `ERC721TokenType.ERC721` 유형의 토큰만 `link.batchNftTransfer`에서 사용할 수 있습니다.

- 현재 배치에 인증 오류가 있는 경우, 전체 배치가 실행되지 않습니다

- 현재 배치 처리의 일부로 API 오류가 수령되는 경우, 전체 배치가 실패합니다

- 특정 배치에 오류가 존재하는 경우(인증, API, 또는 기타 이유로), 다음 배치로 계속 진행할 수 있습니다.

- 각 확인에는 사용자 지갑에서의 서명 과정이 수반됩니다.

## 사용자 여정의 스크린샷

'@docusaurus/useBaseUrl'에서 useBaseUrl를 임포트;


![일괄 전송 확인](/img/linkbatchnfttransfer/confirm-transfer-batch.png "일괄 전송 확인")

![첫 번째 배치 완료](/img/linkbatchnfttransfer/first-batch-complete.png "첫 번째 배치 완료")

![모든 배치 완료](/img/linkbatchnfttransfer/batch-complete.png "모든 배치 완료")

![인증 오류 예시](/img/linkbatchnfttransfer/example-validation-error.png "인증 오류 예시")

## 오류

오류 응답은 [여기](./link-errors.md#transfer)를 확인하십시오.