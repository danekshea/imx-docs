---
id: "link-setup"
title: "Link.setup"
slug: "/link-setup"
sidebar_position: 1
keywords:
  - imx-wallets
---

:::note 링크 레퍼런스 도구
**[링크 레퍼런스 도구](https://tools.immutable.com/link-reference/)**를 확인해 `Link` 메서드가 어떻게 어떤 코드도 작성하지 않고 작동하는지 알아보십시오.
:::

A user's web3 wallet (e.g. Metamask) is used to create, connect, and sign transactions on ImmutableX. Before a user can do this, they need to be registered on Immutable and signed into their wallet. 이 두 단계는 모두 단일 호출 `Linksetup`으로 완료될 수 있습니다. 사용자가 이미 등록한 경우, 이 기능은 로그인을 위해 호출될 수 있습니다.

## 지원하는 지갑

링크에서 지원되는 지갑은 다음과 같습니다.
- Metamask
- Magic Link
- Gamestop Wallet

## 매개 변수

```typescript
// Use the default Link.setup params (providerPreference is "metamask")
link.setup({})

// Specify the provider preference
link.setup({providerPreference: ProviderPreference})

enum ProviderPreference {
    GAMESTOP = 'gamestop',
    METAMASK = 'metamask',
    MAGIC_LINK = 'magic_link',
    NONE = 'none',
}

```

:::info 게임스탑 지갑
**게임스탑 지갑**은 SDK v1.22.0에서 이용할 수 있습니다.

**게임스탑 지갑**은 최소 0.6.0버전이어야 합니다.
:::

## 사용 방법

```typescript
// Sample link.setup call using the default provider:
const setupResponsePayload: SetupResultsCodec = await link.setup({})

// Using none as option (list all available options including Magic):
const setupResponsePayload: SetupResultsCodec = await link.setup({ providerPreference: "none" })

// Specifying a provider:
const setupResponsePayload: SetupResultsCodec = await link.setup({ providerPreference: "magic_link" })
```

`Link.setup` returns the user's signed-in address and STARK public key if the setup or sign in was completed successfully.

```typescript
const SetupResultsCodec = t.intersection([
  t.type({
    address: EthAddress,
    starkPublicKey: HexadecimalString,
    ethNetwork: t.string,
    providerPreference: t.string,
  }),
  t.partial({
    email: t.string,
  }),
]);

// Sample response block
// ie. await link.setup({})
result = {
    "address": "0x...",
    "starkPublicKey": "0x...",
    "providerPreference": null,
    "ethNetwork": "goerli"
}

// `email` field is returned in the response if the magic_link provider is requested
// ie. await link.setup({ providerPreference: "magic_link" })
{
    "address": "0x...",
    "starkPublicKey": "0x...",
    "providerPreference": "magic_link",
    "ethNetwork": "goerli",
    "email": "name@domain.com"
}
```

### 가능한 모든 옵션 리스트
```typescript
// Using none as option (list all available options including Magic):
const setupResponsePayload: SetupResultsCodec = await link.setup({ providerPreference: "none" })
```
![없음](/img/link-setup/none.png "없음")

# 다양한 공급자에 기반한 UI

### 메타마스크(기본)
```typescript
// Sample link.setup call using the default provider:
const setupResponsePayload: SetupResultsCodec = await link.setup({})
```
![기본/메타마스크](/img/link-setup/default-metamask.png "기본/메타마스크")

### 매직 링크
```typescript
// Specifying Magic as provider:
const setupResponsePayload: SetupResultsCodec = await link.setup({ providerPreference: "magic_link" })
```
![매직_링크](/img/link-setup/magic_link.png "매직_링크")


### 게임스탑 지갑
```typescript
// Specifying Magic as provider:
const setupResponsePayload: SetupResultsCodec = await link.setup({ providerPreference: "gamestop" })
```

:::caution
게임스탑 지갑은 메인넷에서만 사용할 수 있습니다
:::

![게임스탑 지갑](/img/link-setup/gamestop.png "게임스탑 지갑")

## 다중 브라우저 지갑 탐지

:::caution
이뮤터블은 이뮤터블 플랫폼에 연결하기 위해 사용되는 다양한 지갑을 지원합니다. 한편 지갑에는 기본 지갑으로 설정하기 옵션이 있으며 이 옵션을 활성화하면 다른 지갑의 연결 시도 시 문제가 발생할 수 있습니다.

더 자세한 내용은 [이뮤터블의 다중 지갑 확장 기능 관리 방법](https://support.immutable.com/hc/en-us/articles/5160531224079-Managing-multiple-wallet-extensions-for-Immutable)을 확인하십시오.
:::


![다중-지갑](/img/link-setup/multiple-wallets.png "다중-지갑")

For more information about user wallet registration, see [User Registration](/docs/how-to-register-users) and [Account Management](/docs/account-management).

## 오류

오류 응답은 [여기](./link-errors.md#general-errors)를 확인하십시오.