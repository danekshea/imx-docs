---
id: "linksign"
title: "Link.sign"
slug: "/linksign"
sidebar_position: 10
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

링크 UI와 함께 사용되는 SDK v1.14.1 이상에서는 임의 L1 서명을 요청하는 지원을 추가합니다. 이 기능은 개발자에게 좋아요, 팔로우, 코멘트 등 플랫폼에 핵심적이지 않은 다양한 동작을 위한 L1 서명을 요청할 수 있게 어느 정도의 유연성을 제공합니다.

## 매개 변수

이 메서드는 엔지니어가 서명을 원하는 메시지와 사용자에게 출력될 사용자 친화적 메시지를 나타내는 설명을 요구합니다.

```json
{
  "message": "NonEmptyString",
  "description": "NonEmptyString"
}
```

## 사용 방법
메시지에 서명하려면 엔지니어가 sign() 메서드를 호출해야 합니다.
```typescript
link.sign({
    message: 'My awesome message',
    description: 'Message that a user will see',
});
```

![메시지 서명](/img/link-sign/sign-msg.png "메시지 서명")

사용자가 성공적으로 메시지에 서명한 경우, link.sign()은 다음과 같은 값으로 귀결됩니다.
```json
{
    "result": "0x0d8705969ea15dac4f684f5f5a7a3447f514b07c96c7a9bb21588ef33821caed63f204c11f0ed69777132c8fa25af62c883627169c7b5b46f23b132db46e7d8d1c"
}
```

## 오류
사용자가 메시지에 서명하는 것을 거부하는 경우, link.sign()은 거부된 프라미스를 반환합니다.

또한 메시지에 금지된 메시지가 포함되어 있어 서명할 수 없는 경우 오류 화면이 나타납니다.

![메시지 서명 오류](/img/link-sign/error.png "메시지 서명 오류")

## 암호화 공개 키

암호화 공개 키를 얻으려면 엔지니어는 getPublicKey() 메서드를 호출해야 합니다. 이 메서드는 SDK v1.16.0 이상에서 사용할 수 있습니다.
```typescript
link.getPublicKey({});
```

메타마스크 공급자 예시:

![암호화 공개 키 요청](/img/link-sign/public-key.png "암호화 공개 키 요청")

사용자가 공개 암호화 키 제공을 허용했다면, link.getPublicKey()는 다음의 값으로 귀결됩니다.
```json
{
    "result": "1Afjjdub580LjsizQtlDmrSZ+BZIiydkx4BGRb2DDBI="
}
```