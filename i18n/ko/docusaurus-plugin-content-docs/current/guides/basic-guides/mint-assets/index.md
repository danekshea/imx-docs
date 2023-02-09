---
title: "Mint assets"
slug: "/how-to-mint-assets"
keywords:
  - imx-wallets
  - imx-dx
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Minting assets on ImmutableX means to bring into existence tokens from a smart contract. For more information on this concept, please see [Deep dive into minting](../../../key-concepts/deep-dive-minting.md).

In order for a user to mint tokens, they need:
1. A smart contract deployed on L1 (Ethereum) with [certain requirements](../../../launch-collection/smart-contract-requirements/index.md)
2. [To be registered as a user on ImmutableX](#1-register-user)
3. [To have registered an administrative entity, a project, on ImmutableX](#2-register-a-project)
4. [To have registered their collection (as represented by their smart contract) on ImmutableX](#3-register-a-collection)

<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
        <li><a href="./minting-with-royalties">JS SDK</a></li>
    </ul>
</ListAdmonition>

## Core SDK

Once you have verified that a user has a smart contract deployed on L1 and that they are the owner, then your application can start the process of enabling them to mint tokens on L2 from this contract.

### 1. Register user
Before a user can register a project or collection and mint tokens on ImmutableX, they must be registered as a user on ImmutableX. Follow [this guide](../register-users/index.md) to do this.

### 2. Register a project
A project is an administrative-level entity that is associated with an user. A project can have many collections, which are represented by smart contracts.

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#createProject">createProject</a></li>
      </ul>
  </ListAdmonition>

The `createProject` endpoint requires a signer (obtained in the [previous step](#1-register-user)) and a `createProjectRequest` object:
```ts
const createProjectRequest = {
  company_name: "company",
  contract_email: "email",
  name: "name"
}
```

Then, create a project:
```ts
const createProjectResponse = await client.createProject(ethSigner, createProjectRequest);

const projectId = createProjectResponse.id.toString();
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-projects-api/create-project.html">createProject</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/projectsapi/createproject(imxsignature:imxtimestamp:createprojectrequest:)">createProject</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.CreateProject">CreateProject</a></li>
      </ul>
  </ListAdmonition>

  <ListAdmonition label="Example">
      <ul>
          <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/project/main.go#L17-L26">CreateProject</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### 3. Register a collection
A collection refers to a deployed [token smart contract](https://docs.openzeppelin.com/contracts/4.x/tokens) that has been registered on Immutable. Once this has occured, its tokens can be transacted (ie. minted, traded, bought and sold) on ImmutableX.

Each collection belongs to a project.

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#createCollection">createCollection</a></li>
      </ul>
  </ListAdmonition>

Use the project ID returned from [registering a project](#2-register-a-project) to use in the request body of this section.

The `createCollection` endpoint requires a signer (obtained in the [first step](#1-register-user)) and a `createCollectionRequest` object:
```ts
const createCollectionRequest = {
  name: "name",
  contract_address: "address",
  project_id: "name",
  owner_public_key: "owner public key"
}
```

Then, create a collection:
```ts
const createCollectionResponse = await client.createCollection(ethSigner, createCollectionRequest);
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-collections-api/create-collection.html">createCollection</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/collectionsapi/createcollection(imxsignature:imxtimestamp:createcollectionrequest:)">createCollection</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.CreateCollection">CreateCollection</a></li>
      </ul>
  </ListAdmonition>

  <ListAdmonition label="Example">
      <ul>
          <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/collection/main.go">CreateCollection</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### 4. Mint tokens

:::note When setting [royalties](../../../overview/fees.md) in the order params
* You can set up to 50 royalty recipients
* You cannot set the same recipient more than once
* The royalty percentage for a single user cannot exceed 100% (however, the combined percentage for all recipients may exceed 100% - as this amount is calculated on top of the sale price)
* Individual percentage fees can’t be < 0%
:::

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#mint">mint</a></li>
      </ul>
  </ListAdmonition>

```ts
const mintResponse = await client.mint({
  "contract_address": "0xc6185055ea9891d5d9020c927ff65229baebdef2",
  // Specifying contract-wide royalty information
  "royalties": [
    {
      // Specifying the contract-wide royalty recipient's wallet address
      "recipient": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
      // Specifying the contract-wide royalty rate for this collection
      "percentage": 2.5
    }
  ],
  "users": [
    {
      "user": "0xc3ec7590d5970867ebd17bbe8397500b6ae5f690",
      "tokens": [
        {
          // Specific NFT token
          "id": "1",
          "blueprint": "my-on-chain-metadata",
          // Overriding the contract-wide royalty information with token-specific royalty information
          "royalties": [
            {
              // Same recipient's wallet address
              "recipient": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
              // Changed royalty rate for this specific token (i.e. 1% instead of the default 2.5%)                        
              "percentage": 1
            }
          ],
        }
      ]
    },
    {
      "user": "0xA91E927148548992f13163B98be47Cf4c8Cb3B16",
      "tokens": [
        {
          // Specific NFT token
          // No token-specific royalty information specified; contract-wide royalty infromation will be used
          "id": "2",
          "blueprint": "my-other-on-chain-metadata"
        }
      ]
    },
    ...
  ]
});
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-mints-api/mint-tokens.html">mintTokens</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/mintsapi/minttokens(minttokensrequestv2:)">mintTokens</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.Mint">Mint</a></li>
      </ul>
  </ListAdmonition>

  <ListAdmonition label="Example">
      <ul>
          <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/minting/main.go">Mint</a></li>
      </ul>
  </ListAdmonition>
  </TabItem>
</Tabs>