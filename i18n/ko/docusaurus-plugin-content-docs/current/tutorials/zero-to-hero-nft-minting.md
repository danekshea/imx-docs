---
id: "zero-to-hero-nft-minting"
title: "NFT minting tutorial"
slug: "/zero-to-hero-nft-minting"
sidebar_position: 1
keywords:
  - imx-growth
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

*예상 완료 시간: 20분*

This tutorial provides a step by step guide on how to mint an NFT on ImmutableX. It is designed for developers building on Web3 for the first time, so anyone can follow along regardless of prior experience. 이 가이드는 교육 목적으로 쉽게 만들어졌으며 콘텐츠 확장 작업을 하고 있습니다.

이 튜토리얼이 끝날 때면, 다음 사항들이 완료되어 있을 것입니다.

- NFT 컬렉션 준비
- NFT 컬렉션의 스마트 컨트랙트 배포
- NFT 민팅 및 상장

막히는 지점이 있다면, [디스코드](https://discord.gg/TkVumkJ9D6)의 개발자 FAQ 및 개발자 토론 채널로 연락하십시오. 튜토리얼에 대한 피드백을 제공하거나 우리 문서에서 보고 싶은 주제에 대해 알려 주려면 [여기](https://docs.google.com/forms/d/e/1FAIpQLSdTLIXldLRZQB4i2YTHtQwxmrDbTkHphuxtLoVe7j-YVU7VYw/viewform)를 클릭하십시오.

## 1단계: 사전 준비
이 튜토리얼에 필요한 도구가 몇 가지 있습니다.

** [Homebrew](https://brew.sh/) **

:::info 
Homebrew는 Mac OS에서만 필요합니다.
:::

Homebrew는 이 튜토리얼에 필요한 패키지를 설치합니다. [Homebrew 웹사이트](https://brew.sh/)에서 커맨드를 복사한 다음 단말기에서 실행하십시오.

**  [Node.js](https://nodejs.org/)**

Node.js allows us to use JavaScript to build and run applications.

:::danger Node.js Version
Ensure that you get the latest LTS version or you may experience issues following the turorial.
:::

<Tabs>
  <TabItem value="Windows" label="Windows" default>

For **Windows** users, check that NodeJS is working by opening powershell or command line and executing the command:

```shell
npm -v
```

** Yarn**

Yarn is an open source package manager. Follow the steps below to install: 

Run the following command in powershell.
```shell
npm install yarn -g
```


  </TabItem>
  <TabItem value="macOS" label="macOS">

For **Mac** users, open up the terminal and run 
```shell
brew install node@16
``` 

Run the following command in the terminal.
```shell
brew install yarn
```
  </TabItem>
</Tabs>

**[Visual Studio Code](https://code.visualstudio.com/) **

Visual Studio Code는 이 튜토리얼에서 사용할 코드 편집기입니다.

## 2단계: MetaMask 설정
암호 화폐와 NFT를 거래하려면 지갑이 필요합니다. 이 튜토리얼에서는 Metamask를 사용할 것입니다.

1. Open [metamask.io](https://metamask.io/download/) to install the browser extension
2. Follow the steps in the plugin to create a new wallet, then record and store your seed phrase in a safe location
3. 테스트 네트워크를 표시합니다.
4. Change the network selection from **Ethereum Mainnet** to **Goerli Test Network**
5. [개인 키](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key)와 [공개 키](https://metamask.zendesk.com/hc/en-us/articles/360015289512-How-to-copy-your-MetaMask-account-public-address-)를 기록합니다.

네트워크를 변경하면 테스트 ETH를 사용해 실험할 수 있는 테스트넷에서의 배포가 가능해집니다. 이더리움 작업에서 트랜잭션에 관해 더 알고 싶다면, 이더리움 재단에서 [이 페이지](https://ethereum.org/en/developers/docs/transactions/)를 확인하십시오.

## Step 3: Obtain GoerliETH
To deploy our smart contract to the Goerli test network, we’ll need some test Eth. To get test Eth you can go to the [Goerli faucet](https://goerlifaucet.com/) and enter your Goerli account address, then click “Send Me ETH.” It may take a few minutes for the goerliETH to arrive.

이 수도꼭지가 작동하지 않는다면, 여기 다른 수도꼭지들을 시도해 보십시오.

- [수도꼭지 1](https://goerli-faucet.mudit.blog/)
- [수도꼭지 2](https://goerli-faucet.pk910.de/)

## 4단계: Pinata 설정
Pinata는 사용자들이 [InterPlanetary File System](https://docs.ipfs.io/concepts/what-is-ipfs/#decentralization) (IPFS) 네트워크에서 파일을 호스팅할 수 있게 해주는 서비스입니다. Pinata를 사용해 NFT 메타데이터를 저장하는데, 이는 Pinata가 파일의 진위를 식별할 수 있고 파일에 항상 접근할 수 있게 만들어주기 때문입니다. 아래의 단계를 따라 컬렉션을 준비하십시오.

:::info 
이 튜토리얼의 무료 버전을 사용할 수 있습니다. 하지만 이미지를 로드할 수 있도록 실제 컬렉션의 유료 계정을 생성하는 것을 고려하십시오. 이미지는 IPFS에서 공개적으로 호스팅된다는 점에 유의하십시오.
:::

1. [Pinata](https://www.pinata.cloud/)에 가입합니다.
2. NFT를 위한 이미지 3개를 준비합니다.
3. Upload를 누르고 파일을 선택해 이미지를 업로드합니다.

![Pinata1](/img/zero-to-hero/Pinata1.png "Pinata1")

4. 남은 이미지 2개를 업로드합니다.
5. 각 파일의 URL을 적어둡니다.

![Pinata2](/img/zero-to-hero/Pinata2.png "Pinata2")

URL은 `https://gateway.pinata.cloud/ipfs/QmWfjs6CVu4ENgXGNfdPhgaSdzEhCsCfB5XEFUosPFGsNV` 형식이어야 합니다.

## 5단계: 메타데이터 생성

[NFT 메타데이터](https://docs.x.immutable.com/docs/asset-metadata)는 NFT의 특징과 속성에 대한 정보를 담고 있습니다.

1. Visual Studio Code를 엽니다
2. 새 폴더를 생성합니다(Open Folder--> New Folder)
3. 페이지 아이콘을 3번 눌러 3개의 파일을 생성합니다
4. **1,2 & 3**으로 파일명을 입력합니다. 이것이 토큰 ID입니다.

![FileCreation](/img/zero-to-hero/step5_filecreation.png "FileCreation")

:::warning
파일 이름은 반드시 **1, 2 & 3**으로 지어주십시오. 그렇지 않으면 나중에 오류가 발생할 수 있습니다.
:::

각 파일에 해당하는 NFT의 메타데이터를 덧붙여 주십시오. 테스트 컬렉션에 다음의 메타데이터를 사용할 수 있습니다. 단, 각 `image_URL`을 NFT 이미지를 호스팅하기 위해 앞서 만들어 놓은 URL로 바꿔 주십시오.

```json "Metadata File 1"
{
  "name": "1st NFT",
  "description": "This is your 1st nft",
  "image_url":"<replace this with your own IPFS picture link>",
  "attack": 123,
  "collectable": true,
  "class": "EnumValue1"   
}
```
```json "Metadata File 2"
{
  "name": "2nd NFT",
  "description": "This is your 2nd nft",
  "image_url":"<replace this with your own IPFS picture link>",
  "attack": 223,
  "collectable": true,
  "class": "EnumValue2"   
}
```

```json "Metadata File 3"
{
  "name": "3rd NFT",
  "description": "This is your 3rd nft",
  "image_url":"<replace this with your own IPFS picture  link>",
  "attack": 323,
  "collectable": true,
  "class": "EnumValue3"   
}
```

폴더를 Pinata에 업로드하기 전에 반드시 **저장(save)**을 눌러 주십시오. 파일을 닫았다 다시 열어 저장이 되었는지 두 번 확인해 주십시오. 그 값이 저장되었는지 확인하십시오.

![폴더 업로드](/img/zero-to-hero/pinata3-folder.png "폴더 업로드")

폴더명을 클릭하여 ** 메타데이터 API URL**을 가져오십시오. 이 엔드 포인트는 민팅 시 NFT에 메타데이터를 추가하기 위해 메타데이터 크롤러가 사용합니다. 이것을 적어 두십시오.


![폴더 모양](/img/zero-to-hero/Step5_Metadata.png "폴더 모양")

결과 URL은 `https://gateway.pinata.cloud/ipfs/QmWfKt2pXLnQ2AB5jfS2KYB9K2hxFtgcMNxyndkSGT3yuj` 형식이어야 합니다.

:::info 작업 확인
메타데이터 API URL을 클릭하여 1,2 & 3이라는 이름을 가진 파일 3개가 있는지 확인하십시오. 각각의 파일을 클릭하여 데이터가 올바른지 확인하십시오. 하나라도 비어 있다면 폴더를 다시 업로드해야 합니다.
:::

## Step 6: Create Etherscan API Key

Etherscan API 키는 퍼블리싱을 시도 중인 스마트 컨트랙트의 소유자임을 인증하는 데 필요합니다. 아래의 단계를 따르십시오.

1. [Etherscan](https://etherscan.io/)으로 이동합니다.
2. 로그인(또는 새 계정을 생성)합니다.
3. `API-KEYS`로 이동해 새 키를 추가합니다.
4. Note down the generated API key

![이더스캔 API 키](/img/zero-to-hero/Etherscan1-no-arrow.png "이더스캔 API 키") ![이더스캔 API 키2](/img/zero-to-hero/Etherscan2.png "이더스캔 API 키")

## 7단계: NFT 컨트랙트 생성

다음으로 스마트 컨트랙트의 변수를 업데이트해야 합니다.

1. GitHub에서 [imx-contracts](https://github.com/immutable/imx-contracts) 코드를 복제 또는 다운로드합니다.
2. 파일을 풀어 Visual Studio Code (File--> Open Folder)에서 엽니다.
3. `.env.example`를 `.env`로 이름을 변경합니다.

![Env 파일](/img/env.png "Env 파일")

4. 다음 세부 사항을 입력합니다.

<table>
  <thead>
  <tr>
    <th>
      필드명
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>Etherscan API Key</code>
    </td>
    <td>
      이전 단계의 Etherscan API 키
    </td>
  </tr>
  <tr>
    <td>
      <code>CONTRACT_OWNER_ADDRESS</code>
    </td>
    <td>
     공개 키로도 알려진 Metamask 지갑 주소
    </td>
  </tr>
  <tr>
    <td>
      <code>DEPLOYER_TESTNET_PRIVATE_KEY
       DEPLOYER_MAINNET_PRIVATE_KEY</code>
    </td>
    <td>
      Metamask 지갑 개인 키
    </td>
  </tr>
  <tr>
    <td>
      <code>CONTRACT_NAME</code>
    </td>
    <td>
      'Spaghetti Adventures'와 같은 NFT 컬렌션명
    </td>
  </tr>
  <tr>
    <td>
      <code>CONTRACT_SYMBOL</code>
    </td>
    <td>
      'SPAG'와 같은 컬렉션명의 축약형
    </td>
  </tr>
  </tbody>
</table>

:::info Alchemy API 키
`ALCHEMY_API_KEY`를 적어두십시오. 현재는 이 값을 업데이트할 필요가 없지만 나중에 사용하게 될 것입니다.
:::

## 8단계: Dev 라이브러리 설치
다음으로 스마트 컨트랙트 배포에 필요한 패키지를 설치해야 합니다.

1. 익스플로러에서 아무 파일이나 우클릭합니다.
2. 'Open in Integrated Terminal'를 선택합니다.

![통합된 단말기 열기](/img/zero-to-hero/Integrated-Terminal.png "통합된 단말기 열기")

3. Run `npm install --include=dev` and wait until the installation is completed
4. 작업을 저장합니다.

## 9단계: 컨트랙트 배포
레이어 2에서 민팅할 수 있으려면 그 전에 자산이 레이어1로 인출될 수 있도록 만들기 위해 레이어1에 스마트 컨트랙트를 배포해야 합니다. 레이어1과 레이어2의 차이점에 대해 더 알아보려면 [여기](https://docs.x.immutable.com/docs/ethereum-scalability)를 클릭하십시오.

1. Run `yarn hardhat run deploy/asset.ts --network sandbox`
2. It will take ~5 minutes to deploy your contract to Goerli Etherscan
3. 배포된 컨트랙트 주소를 복제합니다.

![9단계_컨트랙트 배포하기](/img/zero-to-hero/Step9DeployContract.png "컨트랙트 배포하기")

:::info Check your work
Paste your contract address into [Goerli Etherscan](https://goerli.etherscan.io/). 좌측 상단에 **contract**라고 표시되어야 합니다. address라고 표시되는 경우, 올바른 네트워크에 있는지 확인하십시오
:::

## Step 10: Add your NFT Collection to ImmutableX

After deploying your contract to Layer 1, you will need to [register](https://docs.x.immutable.com/docs/onboarding) it with ImmutableX by creating a project and a collection.

1. [imx-examples repo](https://github.com/immutable/imx-examples)를 다운로드합니다.
2. Visual Studio Code에 폴더를 엽니다.
3. `.env.example`를 `.env`로 이름을 바꾸고 저장합니다.
4. 다음을 입력합니다.

<table>
  <thead>
  <tr>
    <th>
      필드명
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>ALCHEMY_API_KEY</code>
    </td>
    <td>
      7단계의 <code>AlCHEMY_API_KEY</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>OWNER_ACCOUNT_PRIVATE_KEY</code>
    </td>
    <td>
     2단계의 Metamask 개인 키
    </td>
  </tr>
  <tr>
    <td>
      <code>COLLECTION_CONTRACT_ADDRESS</code>
    </td>
    <td>
       이전 단계에서 배포된 컨트랙트 주소
    </td>
  
  </tr>
  </tbody>
</table>

![10_1단계](/img/zero-to-hero/Step10_1.png "10_1단계")

1. 저장합니다.
2. `npm install`을 실행합니다.

## 11단계: 사용자로 등록

프로젝트를 생성하려면 그전에 사용자로 등록해야 합니다. 사용자로 등록하면 레이어2 지갑이 생성되고 레이어2에서 트랜잭션을 할 수 있게 됩니다.

1. Navigate to the [Sandbox Test Marketplace](https://market.sandbox.immutable.com/)
2. `Connect Wallet`을 누릅니다.
3. 프롬프트창을 따릅니다.

## Step 12: Register your Email Address

Register with your email address at the [Immutable Developer Hub](https://hub.immutable.com) to access the ability to create projects on Immutable via the [Public API](https://docs.x.immutable.com/reference#/operations/createProject) or the CLI in the [imx-examples repo](https://github.com/immutable/imx-examples).

You must first have a project in order to create collections that you can mint assets from on Immutable (L2).

## Step 13: Create Project

 [프로젝트](https://docs.x.immutable.com/docs/guides/onboarding/project-registration)는 소유자 지갑 주소와 관련된 관리 수준의 개체입니다. 이 주소는 컬렉션의 생성이나 업데이트같은 변경 작업에 필요합니다. **src/onboarding/2-create-project.ts**로 이동하여 시작하십시오.

![프로젝트 온보딩](/img/zero-to-hero/Step12_1.png "프로젝트 온보딩")

1. `name`, `company_name` 및 `contact_email`을 입력합니다.
2. 저장을 누릅니다.
3. `npm run onboarding:create-project`를 실행합니다.
4. 출력에서 프로젝트 ID를 복사합니다.
5. 이것을 사용해 .env파일에서 `COLLECTION_PROJECT_ID`를 추가하고 저장을 누릅니다.

![12단계](/img/zero-to-hero/Step12_2.png "12단계")


## Step 14: Register Collection
  [컬렉션](https://docs.x.immutable.com/docs/collection-registration)은 스마트 컨트랙트를 공유하는 NFT의 그룹이며 각 컬렉션은 하나의 프로젝트에 속합니다. 컬렉션은 예를 들어 Gods Unchained처럼 최종 사용자에게 마켓플레이스에서 표시됩니다.

 ***src/onboarding/3-create-collections.ts*** 파일로 이동해 다음 값을 추가하십시오.


<table>
  <thead>
  <tr>
    <th>
      필드명
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>name</code>
    </td>
    <td>
      마켓플레이스에서 컬렉션의 이름
    </td>
  </tr>
  <tr>
    <td>
      <code>description</code>
    </td>
    <td>
    컬렉션에 대한 설명
    </td>
  </tr>
  <tr>
    <td>
      <code>icon_url</code>
    </td>
    <td>
      컬렉션을 표시하는 아이콘
    </td>
  </tr>
  <tr>
    <td>
      <code>metadata_api_url</code>
    </td>
    <td>
      앞에서 생성한 메타데이터 API URL(후행 /s가 없도록 확인)
    </td>
  </tr>
  <tr>
    <td>
      <code>collection_image_url</code>
    </td>
    <td>
      마켓플레이스에서 표시되는 컬렉션의 이미지
    </td>
  </tr>
  </tbody>
</table>

컬렉션을 등록하려면, `npm run onboarding:create-collection` 커맨드를 실행하십시오.

:::info
아래에 묘사된 필드와 관련해 앞에 오는 더블 슬래시 "//"는 코드를 주석 처리하므로 제거하는 것을 잊지 마십시오.
:::

## Step 15: Create Metadata Schema

컬렉션의 메타데이터 스키마는 민팅할 수 있는 NFT의 속성뿐만 아니라 잠재적인 값과 그러한 속성의 유형을 설명합니다. 이러한 필드는 이후 마켓플레이스에서 필터로 사용될 수 있습니다. 메타데이터 스키마에 대해 더 알아보려면 [여기](https://docs.x.immutable.com/docs/metadata-schema-registration)를 클릭하십시오.



**src/onboarding/4-add-metadata-schema.ts**로 이동하여 43번째 줄의 메타데이터를 업데이트하십시오.

![메타데이터 추가](/img/zero-to-hero/add-metadata.png "메타데이터 추가")

여기서 제공된 메타데이터 스키마 예시를 사용하거나 자신의 스키마를 사용할 수 있습니다. 위의 이미지와 같이 아래의 코드를 복사해 43번째 줄에 붙여넣기하십시오.

```js title="Example Metadata Schema"
{
  name :  'name' ,
  type :  MetadataTypes.Text
},
{
  name :  'description' ,
  type :  MetadataTypes.Text  
},
{
  name :  'image_url' ,
  type :  MetadataTypes.Text  
},
{
  name :  'attack' ,
  type :  MetadataTypes.Discrete,
  filterable : true
},
{
  name :  'collectable' ,
  type :  MetadataTypes.Boolean,
  filterable : true
},
{
  name : 'class' ,
  type :  MetadataTypes.Enum ,
  filterable : true
}
```

메타데이터 스키마를 컬렉션에 추가하려면, 통합된 단말기에 `npm run onboarding:add-metadata-schema` 커맨드를 실행하십시오.

## Step 16: Mint NFT

Now that we have added our contract to ImmutableX, the final step is to add our assets to the blockchain by minting them.

1. .env파일로 이동합니다.
2. 'Bulk Minting' 섹션 아래의 다음을 작성합니다.


![메타데이터 지정](/img/zero-to-hero/Step15_1.png "메타데이터 지정")

<table>
  <thead>
  <tr>
    <th>
      필드명
    </th>
    <th>
      설명
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>PRIVATE_KEY1</code>
    </td>
    <td>
      MetaMask 개인 키 - 'Onboarding' 섹션에서 복사합니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>TOKEN_ID</code>
    </td>
    <td>
    컬렉션에서 처음으로 민팅하는 경우 <code>TOKEN_ID</code>로 1을 입력합니다. 이미 몇 개의 NFT를 민팅한 경우라면 마지막으로 민팅한 NFT의 TOKEN_ID를 가지고 1씩 증가시켜 여기에 입력합니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>TOKEN_ADDRESS</code>
    </td>
    <td>
      <code>COLLECTION_CONTRACT_ADDRESS</code>와 동일 - 'Onboarding' 섹션에서 복사합니다.
    </td>
  </tr>
  <tr>
    <td>
      <code>BULK_MINT_MAX</code>
    </td>
    <td>
    이 튜토리얼에서는 50을 입력하십시오. 한 번에 대량으로 민팅할 수 있는 NFT의 최대 숫자를 구성할 수 있게 해줍니다.
    </td>
  </tr>
  </tbody>
</table>

:::info 저장
해당 값을 업데이트한 후 저장을 누르는 것을 잊지 마십시오.
:::


**민팅하기**
1. `npm run bulk-mint -- -n <number of tokens to mint> -w <your wallet address>`를 실행합니다.
 * `<number of tokens to mint>`은 민팅하고자 하는 NFT의 숫자입니다. 이 튜토리얼에서 그 개수는 3입니다.
 * `<your wallet address>`는 NFT를 민팅하는 MetaMask 지갑입니다. 토큰을 민팅하는 각 컨트랙트(다른 말로 TOKEN_ADDRESS)에 대해 최신 증분 지수로 .env의 TOKEN_ID를 설정하는 것을 기억하십시오.

## Step 17: List your NFT

Our assets will now be accessible in our Goerli Wallet. 하지만 다른 사용자들이 자산을 볼 수 있도록 자산을 마켓플레이스에 상장해야 합니다.

1. Visit the [Sandbox IMX Marketplace](https://market.sandbox.immutable.com/)
2. 지갑 연결을 클릭해 프롬프트창을 따릅니다.
3. 내 자산 클릭 --> NFT 선택
4. 판매를 위해 상장을 누릅니다.

## 마무리

Congratulations on minting and listing an NFT on the Goerli test network!

:::info 피드백
이 튜토리얼에서는 가장 간단한 민팅의 구현을 다루었으나 계속해서 워크플로우를 구축하고 있습니다. 어떤 피드백이든 [여기](https://docs.google.com/forms/d/e/1FAIpQLSdTLIXldLRZQB4i2YTHtQwxmrDbTkHphuxtLoVe7j-YVU7VYw/viewform)에 남겨주십시오.
:::


메인넷 출시에 이 단계를 재사용하고자 하는 경우, 다음의 변경 사항을 유념하십시오.

<table>
  <thead>
  <tr>
    <th>
      단계
    </th>
    <th>
      변경 사항
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      2단계
    </td>
    <td>
     Metamask 네트워크는 이더리움 메인넷을 사용해야 합니다. 
    </td>
  </tr>
  <tr>
    <td>
      9.1단계
    </td>
    <td>
    <code>yarn hardhat run deploy/asset.ts --network mainnet</code>
    </td>
  </tr>
  <tr>
    <td>
      10단계
    </td>
    <td>
      <code>ETH_NETWORK</code>를 .env 파일의 메인넷에 설정합니다.
    </td>
  </tr>
  <tr>
    <td>
      10단계
    </td>
    <td>
     Remove `sandbox` from the URL in <code>PUBLIC_API_URL</code> in the .env file
    </td>
  </tr>
    <tr>
    <td>
      N/A
    </td>
    <td>
     Set <code>STARK_CONTRACT_ADDRESS</code> and <code>REGISTRATION_ADDRESS</code> to the <a href='https://github.com/immutable/imx-contracts#immutable-contract-addresses'>mainnet addresses</a> in the .env file
       </td>
  </tr>
  </tbody>
</table>
