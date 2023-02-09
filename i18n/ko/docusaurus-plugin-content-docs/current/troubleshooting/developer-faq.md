---
id: "developer-faq"
title: "FAQ"
slug: "/developer-faq"
sidebar_position: 2
keywords:
  - imx-games
  - imx-dx
---

## 일반
**How is asset custody managed in ImmutableX? **

ImmutableX is a self-custodial protocol, meaning all users are responsible for their own security. 사용자들은 자신의 개인 키를 관리하고 자신의 자산에 대한 온전한 통제권을 유지하거나 보관 지갑 플로우를 선택할 수 있습니다. 사용자들은 프로토콜에서 언제든 자산을 입금 및 인출할 수 있습니다. 모든 트랜잭션은 사용자의 서명을 필요로 하며, 이뮤터블은 사용자를 대신해 어떤 작업도 승인하지 못합니다.

**Does ImmutableX have a block explorer? 사용자 인벤토리를 계속 추적하려면 어떻게 해야 하나요?**

[Immutascan](https://immutascan.io/) is a block explorer where ImmutableX transactions can be viewed.

또한 이뮤터블은 사용자가 수신할 수 있는 API 엔드 포인트를 보유하고 있습니다. We recommend polling our mints, transfers, trades, etc endpoints at regular intervals to listen on events within ImmutableX, and these endpoints can be filtered depending on your requirements.

**How do I port or build smart contract logic on ImmutableX?**

현재 지원되지 않으나, 대부분의 NFT 프로젝트는 일반 연산이 필요하지 않습니다. For example, game-related NFTs can have off-chain events and interactions within the client’s application, and only need to interact with ImmutableX for minting, transferring, burning, updating metadata, etc. 현재 일반 연산은 ZK-롤업의 한계이나, 이 문제는 이뮤터블의 파트너인 StarkWare에 의해 빠르게 해결되고 있습니다.

## 메타데이터

**Can I update the metadata of an ERC721 token on Layer 2?**

There are [two ways](../key-concepts/deep-dive-metadata.md#on-l2-immutablex) of storing token metadata on ImmutableX: Providing a `metadata_api_url` when creating a collection and providing a `blueprint` string when minting a token on L2.

***The `blueprint` cannot be changed:*** When a token which has been minted on L2 with a `blueprint` string is withdrawn to L1, the L1 smart contract is updated with this value, thus making it immutable. ImmutableX does not allow updates to a token's blueprint value on L2.

***The `metadata_api_url` can be updated:*** Updating the `metadata_api_url` of a collection can be done via our [API](https://docs.x.immutable.com/reference/#/operations/updateCollection).

Currently, our metadata crawler only runs once at the time of minting so if you make changes to the off-chain metadata that we retrieve from your endpoint, you need to [trigger a metadata refresh](https://docs.x.immutable.com/docs/asset-metadata-refreshes) so it can be updated on ImmutableX.

## 오더

**Does ImmutableX automatically match buy and sell orders for NFTs of the same value?**

There is currently no automatic matching of orders as ImmutableX only supports the maker/taker model at present. NFT는 메이커에 의해 특정 가격으로 매도를 위해 상장되며, 거래는 테이커가 이 오더를 수용할 때 일어납니다. 메타데이터 속성에 매수 오더를 넣을 수 있는 메타데이터 오더 구현을 진행 중이기 때문에 앞으로 이것은 변경될 것이며, 이는 기능적으로 동일한 NFT에 더 큰 유동성을 가져다줄 것입니다.

**다른 사람들이 나를 대신해 매수/매도 오더를 생성할 수 있게 승인할 수 있나요? **

ImmutableX is a self-custodial protocol, and every transaction requires a signature from the owner of the wallet. (이뮤터블을 포함한) 어떤 제3자도 사용자의 개인 키에 대한 접근권 없이 사용자의 자산을 건드릴 수 없습니다.

## NFT

**Is it possible to transfer assets between ImmutableX and Ethereum freely?**

물론입니다. 바로 그것이 레이어2 스케일링 솔루션의 핵심 혜택입니다. Even if ImmutableX (the company) ceases to exist, users will always have the ability to withdraw all assets back to mainnet. Currently the ImmutableX marketplace has yet to implement the withdrawals of NFTs on our frontend, however it is possible to withdraw NFTs using the ImmutableX APIs.

**If I mint an NFT on ImmutableX, does it exist on-chain? 메인넷으로 인출하면 어떻게 되나요?**

If your NFT started off on mainnet Ethereum and was deposited into ImmutableX, the asset will be locked in our L1 smart contract and will now be tradable on L2. 자산이 성공적으로 인출되면, 자산은 스마트 컨트랙트에서 풀려나 인출하는 사용자의 지갑으로 전송됩니다.

If your NFT was minted directly on to ImmutableX (for no gas cost!), the asset will have Layer 1 representation, immutability, and cryptographic security via the merkle tree construct, but won’t be an ERC721 on mainnet ethereum until withdrawn from ImmutableX. At the time of withdrawal, the asset will be minted onto L1.

## 스마트 컨트랙트

**Does ImmutableX support ERC1155s?**

No, ImmutableX does not support or recommend the use of ERC1155. 이뮤터블은 가능한 한 적은 수의 스마트 컨트랙트를 사용하고 스마트 컨트랙트의 통합을 고려하여 NFT가 어떤 스마트 컨트랙트에서 나왔는지 보다 메타데이터로 NFT를 차별화할 것을 권장합니다. ImmutableX supports ERC721 smart contracts and recommends that you create a new ERC721 contract for each meaningfully different type of asset.
