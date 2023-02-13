---
title: "Get data"
slug: "/how-to-get-data"
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import {
  useVersions,
  useActiveDocContext,
  // @ts-ignore eslint-ignore
} from '@docusaurus/plugin-content-docs/client';

This guide provides information on how to get data about events on ImmutableX. Typically, this data is about current state (ie. asset ownership, open orders) or past transactions (ie. trades, asset transfers).

#### Examples of the types of data typically obtained include:
* Assets, or details of a particular asset
* Token balances for a particular user
* Orders, or details about a particular order
* Historical trades and asset transfers

Getting most forms of data is read-only, so [user authentication or getting user signatures](../generate-signers/index.md) to update blockchain state are not required.

<ListAdmonition label="Guides">
    <ul>
        <li>Core SDK:</li>
          <ul>
            <li><a href="#projects">Projects (requires user signature)</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#assets">Assets</a></li>
            <li><a href="#orders">Orders</a></li>
            <li><a href="#transfers">Transfers</a></li>
            <li><a href="#tokens">Tokens</a></li>
            <li><a href="#trades">Trades</a></li>
            <li><a href="#users">Users</a></li>
          </ul>
        <li>JS SDK:</li>
          <ul>
            <li><a href="./personal-inventory">Personal inventory</a></li>
            <li><a href="./marketplaces">Marketplaces</a></li>
          </ul>
    </ul>
</ListAdmonition>

## Projects
This is the only section that requires user signatures - specifically, project owner signatures. This is because only project owners can list projects they own, or get details about each one. Follow [this guide](../generate-signers/index.md) to generate the signers required to obtain user signatures.

### Get list of projects
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getProjects">getProjects</a></li>
      </ul>
  </ListAdmonition>

### Request

Get the list of projects belonging to the signer account.

```ts
const getProjects = async (ethSigner: EthSigner) => {
  const response = await client.getProjects(ethSigner);
  return response;
};

getProjects(ethSigner)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      id: 145, // The project ID
      name: 'Test writer guild', // The project name
      company_name: 'Test Immutable company', // The company name
      contact_email: 'immutabletest@example.com', // The project contact email
      mint_remaining: 0, // The number of mint operation remaining in the current period
      mint_limit_expires_at: '2022-10-01T17:41:44.650487Z', // The current period expiry date for mint operation limit
      mint_monthly_limit: 0,  // The total monthly mint operation limit
      collection_remaining: 0, // The number of collection remaining in the current period
      collection_limit_expires_at: '2022-10-01T17:41:44.650487Z', // The current period expiry date for collection
      collection_monthly_limit: 0 // The total monthly collection limit
    },
   // Other projects returned
    ...
  ],
  cursor: 'eyJwcm9qZWN0X2lkIjoxNDUsIm5hbWUiOiJUZXN0IHdyaXRlciBndWlsZCIsImNvbXBhbnlfbmFtZSI6IlRlc3QgSW1tdXRhYmxlIGNvbXBhbnkiLCJjb250YWN0X2VtYWlsIjoiaW1tdXRhYmxldGVzdEBleGFtcGxlLmNvbSIsIm1pbnRfcmVtYWluaW5nIjowLCJtaW50X2xpbWl0X2V4cGlyZXNfYXQiOiIyMDIyLTEwLTAxVDE3OjQxOjQ0LjY1MDQ4N1oiLCJtaW50X21vbnRobHlfbGltaXQiOjAsImNvbGxlY3Rpb25fcmVtYWluaW5nIjowLCJjb2xsZWN0aW9uX2xpbWl0X2V4cGlyZXNfYXQiOiIyMDIyLTEwLTAxVDE3OjQxOjQ0LjY1MDQ4N1oiLCJjb2xsZWN0aW9uX21vbnRobHlfbGltaXQiOjB9',
  // Remaining results
  remaining: 0
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
    <ul>
      <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-projects-api/get-projects.html">getProjects</a></li>
    </ul>
  </ListAdmonition>


  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
    <ul>
      <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/projectsapi/getprojects(imxsignature:imxtimestamp:pagesize:cursor:orderby:direction:)">getProjects</a></li>
    </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
    <ul>
      <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetProjects">GetProjects</a></li>
    </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get details about a project
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

<ListAdmonition label="SDK reference">
    <ul>
      <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getProjects">getProject</a></li>
    </ul>
</ListAdmonition>

### Request

Get details about a project with a given ID:
```ts
const getProject = async (ethSigner: EthSigner, id: string) => {
  const response = await client.getProject(ethSigner, id);
  return response;
};
getProject(ethSigner, '145')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
    id: 145, // The project ID
    name: 'Test writer guild', // The project name
    company_name: 'Test Immutable company', // The company name
    contact_email: 'immutabletest@example.com', // The project contact email
    mint_remaining: 0, // The number of mint operation remaining in the current period
    mint_limit_expires_at: '2022-10-01T17:41:44.650487Z', // The current period expiry date for mint operation limit
    mint_monthly_limit: 0,  // The total monthly mint operation limit
    collection_remaining: 0, // The number of collection remaining in the current period
    collection_limit_expires_at: '2022-10-01T17:41:44.650487Z', // The current period expiry date for collection
    collection_monthly_limit: 0 // The total monthly collection limit
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-projects-api/get-project.html">getProject</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/projectsapi/getproject(id:imxsignature:imxtimestamp:)">getProject</a></li>
      </ul>
  </ListAdmonition>
  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetProject">GetProject</a></li>
      </ul>
  </ListAdmonition>

See [GetProject example](https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/project/main.go#L28-L29) from our SDK repo.
  </TabItem>
</Tabs>

## Collections

### Get list of collections
The list of collections returned can be filtered by passing in parameters to this function.

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listCollections">listCollections</a></li>
      </ul>
  </ListAdmonition>

### Request
Get a list of collections with "NFT" in the collection name or description:
```ts
const getListCollections = async (keyword: string) => {
  const response = await client.listCollections({
    keyword,
  });

  return response.result;
};

getListCollections('NFT')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response
```ts
{
  result: [
     {
      address: '0x61e506cec264d5b2705f10e5a934dc5313a56a6e', // Contract address of the collection
      name: 'The ARK NFTs',
      description: 'Find all the NFTs Created on the ARK Marketplace',
      icon_url: 'https://cloudflare-ipfs.com/ipfs/bafkreiadl5kmdwy4tum4tgny4avxedlif33x2awux35c75j4exnz5s7xjm',
      collection_image_url: '',
      project_id: 92,
      project_owner_address: '0x59bb6d1b896a9a139380bf2b8d828819f0cf1409',
      metadata_api_url: 'https://api.thearknft.io/v1/nft',
      created_at: '2022-09-28T12:01:20.479636Z',
      updated_at: '2022-09-28T13:35:07.59868Z'
    },
    // Other collections returned
    ...
  ],
  cursor: "eyJuYW1lIjoiSnVqdSBNaW50cyIsImFkZHJlc3MiOiIweDIzZGIwZTcyYmQ3NzM4ZGEwZDBhZmU3YmNjYjQxMDlmNWYwNWVkY2YiLCJwcm9qZWN0X2lkIjoyNCwiY3JlYXRlZF9hdCI6IjIwMjItMDktMjJUMjM6MTI6NTcuNjY0NDU2WiIsInVwZGF0ZWRfYXQiOiIyMDIyLTA5LTIyVDIzOjEyOjU3LjY2NDQ1NloifQ",
  // Remaining results
  remaining: 1
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-collections-api/list-collections.html">listCollections</a></li>
      </ul>
  </ListAdmonition>

### Request
Get a list of collections ordered by name in ascending order:

```kotlin
val response = CollectionsApi().listCollections(
    pageSize = 20,
    orderBy = "name",
    direction = "asc"
)
``` 
  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/collectionsapi/listcollections(pagesize:cursor:orderby:direction:blacklist:whitelist:keyword:)">listCollections</a></li>
      </ul>
  </ListAdmonition>

### Request
Get a list of collections ordered by name in ascending order:
```swift
let collections = try await CollectionsAPI.listCollections(
    pageSize: 20,
    orderBy: .name,
    direction: "asc"
)
```
  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.0/imx#Client.ListCollections">ListCollections</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/collectionsapi#listcollections">ListCollections</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get details about a collection
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.2/classes/immutablex.immutablex#getCollection">getCollection</a></li>
      </ul>
  </ListAdmonition>

### Request
Get details of a collection at a given contract address:
```ts
const getCollection = async (address: string) => {
  const response = await client.getCollection({
    address,
  });

  return response;
};

getCollection('0x61e506cec264d5b2705f10e5a934dc5313a56a6e')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response
```ts
{
  address: '0x61e506cec264d5b2705f10e5a934dc5313a56a6e', // Contract address of the collection
  name: 'The ARK NFTs',
  description: 'Find all the NFTs Created on the ARK Marketplace',
  icon_url: 'https://cloudflare-ipfs.com/ipfs/bafkreiadl5kmdwy4tum4tgny4avxedlif33x2awux35c75j4exnz5s7xjm',
  collection_image_url: '',
  project_id: 92,
  project_owner_address: '0x59bb6d1b896a9a139380bf2b8d828819f0cf1409',
  metadata_api_url: 'https://api.thearknft.io/v1/nft',
  created_at: '2022-09-28T12:01:20.479636Z',
  updated_at: '2022-09-28T13:35:07.59868Z'
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-collections-api/get-collection.html">getCollection</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/collectionsapi/getcollection(address:)">getCollection</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetCollection">GetCollection</a></li>
      </ul>
  </ListAdmonition>

See [GetCollection example](https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/collection/main.go) in our SDK repo.
  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/collectionsapi#getcollection">GetCollection</a></li>
      </ul>
  </ListAdmonition>
  </TabItem>
</Tabs>

## Assets

When details about assets are returned, there is a `status` property that indicates its current location (L1 or L2) or state (depositing, withdrawable, etc.). Assets can have one of the following statuses:

| Status | Description |
| --- | --- |
| `imx` | The asset is in the ImmutableX L2 environment. |
| `eth` | The asset is on the main Ethereum blockchain. |
| `pendingWithdrawal` | A withdrawal has been requested for this asset, and it will be included in an upcoming batch. |
| `withdrawable` | The asset has been included in a published batch, and can now be withdrawn from the ImmutableX smart contract. |
| `burned` | The asset has been [permanently removed from circulation.](../../advanced-guides/asset-burning.md) |

### Get list of assets
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listAssets">listAssets</a></li>
      </ul>
  </ListAdmonition>

### Request
Get a list of assets at a particular collection address ordered by `name`:

```ts
const getListAssets = async (
  collectionAddress: string,
  orderBy: 'updated_at' | 'name'
) => {
  const response = await client.listAssets({
    collection: collectionAddress,
    orderBy: orderBy,
  });
  return response.result;
};
getListAssets('0x23db0e72bd7738da0d0afe7bccb4109f5f05edcf', 'name')
  .then((result) => {
    //print the result
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      token_address: '0x23db0e72bd7738da0d0afe7bccb4109f5f05edcf', // Address of the ERC721 contract
      token_id: '1', // ERC721 Token ID of this asset
      user: '0xd5aefc1fed909da9a5409594d758e3bdd055634c', // Ethereum address of the user who owns this asset
      status: 'imx', // Status of this asset (where it is in the system)
      uri: null, // URI to access this asset externally to ImmutableX
      name: '1st NFT', // Name of this asset
      description: 'This is your 1st nft', // Description of this asset
      image_url: 'https://gateway.pinata.cloud/ipfs/QmS7p34oVDHB3VBE2d9bMqrbNFxdmxtwJ8BYcuHa9yNQHz', // URL of the image which should be used for this asset
      metadata: { // Metadata of this asset
        name: 'Juju Mints',
        icon_url: 'https://media-exp1.licdn.com/dms/image/C4E03AQFB06seGq_MGA/profile-displayphoto-shrink_100_100/0/1597970079587?e=1669248000&v=beta&t=hd0P3T5102HzRvsSK4TBtjhLJLaivuh0u3Qlu57g7lk'
      },
      collection: { // Details of the collection
        name: '1st NFT',
        class: 'EnumValue1',
        attack: 123,
        image_url: 'https://gateway.pinata.cloud/ipfs/QmS7p34oVDHB3VBE2d9bMqrbNFxdmxtwJ8BYcuHa9yNQHz',
        collectable: true,
        description: 'This is your 1st nft'
      },
      created_at: '2022-09-23T14:32:59.876942Z' // Timestamp of when the asset was created
      updated_at: '2022-09-23T14:34:01.793638Z',  // Timestamp of when the asset was updated
  },
  // Other assets returned
  ...
  ],
  cursor: "eyJpZCI6IjB4OTkzNzQyNzhiMThjM2YyNTA5MTFhZjVjMWM2ZGE1OGIxZmMxZjVkZDk1ZjBhYzFkYjA3MTgwOWI2MWM0M2E0ZCIsIm5hbWUiOiIxc3QgTkZUIiwidXBkYXRlZF9hdCI6IjIwMjItMDktMjNUMTQ6MzQ6MDEuNzkzNjM4WiJ9",
  // Remaining results
  remaining: 1,
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-assets-api/list-assets.html">listAssets</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/assetsapi/listassets(pagesize:cursor:orderby:direction:user:status:name:metadata:sellorders:buyorders:includefees:collection:updatedmintimestamp:updatedmaxtimestamp:auxiliaryfeepercentages:auxiliaryfeerecipients:)">listAssets</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.ListAssets">ListAssets</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/assetsapi#listassets">ListAssets</a></li>
      </ul>
  </ListAdmonition>

  See also [listAssets example](https://github.com/immutable/imx-core-sdk-csharp/blob/main/Src/Examples/ListAssets/Program.cs) in the Core SDK.
  </TabItem>
</Tabs>

### Get details about an asset
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getAsset">listAssets</a></li>
      </ul>
  </ListAdmonition>

### Request
Get details of an asset from a particular collection with ID of `1`:

```ts
const getAsset = async (
  tokenAddress: string,
  tokenId: string,
  includeFees: boolean
) => {
  const response = await client.getAsset({
    tokenAddress,
    tokenId,
    includeFees,
  });
  return response;
};
getAsset('0x23db0e72bd7738da0d0afe7bccb4109f5f05edcf', '1', true)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
      token_address: '0x23db0e72bd7738da0d0afe7bccb4109f5f05edcf', // Address of the ERC721 contract
      token_id: '1', // ERC721 Token ID of this asset
      user: '0xd5aefc1fed909da9a5409594d758e3bdd055634c', // Ethereum address of the user who owns this asset
      status: 'imx', // Status of this asset (where it is in the system)
      uri: null, // URI to access this asset externally to ImmutableX
      name: '1st NFT', // Name of this asset
      description: 'This is your 1st nft', // Description of this asset
      image_url: 'https://gateway.pinata.cloud/ipfs/QmS7p34oVDHB3VBE2d9bMqrbNFxdmxtwJ8BYcuHa9yNQHz', // URL of the image which should be used for this asset
      metadata: { // Metadata of this asset
        name: 'Juju Mints',
        icon_url: 'https://media-exp1.licdn.com/dms/image/C4E03AQFB06seGq_MGA/profile-displayphoto-shrink_100_100/0/1597970079587?e=1669248000&v=beta&t=hd0P3T5102HzRvsSK4TBtjhLJLaivuh0u3Qlu57g7lk'
      },
      collection: { // Details of the collection
        name: '1st NFT',
        class: 'EnumValue1',
        attack: 123,
        image_url: 'https://gateway.pinata.cloud/ipfs/QmS7p34oVDHB3VBE2d9bMqrbNFxdmxtwJ8BYcuHa9yNQHz',
        collectable: true,
        description: 'This is your 1st nft'
      },
      created_at: '2022-09-23T14:32:59.876942Z' // Timestamp of when the asset was created
      updated_at: '2022-09-23T14:34:01.793638Z',  // Timestamp of when the asset was updated
      fees: [  // Royalties to pay on this asset operations
        {
          type: 'protocol',
          address: '0xc8714f989ce817e5d21349888077aa5db4a9bcf6',
          percentage: 2
        }
      ]
  }
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-assets-api/get-asset.html">get-asset</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/assetsapi/getasset(tokenaddress:tokenid:includefees:)">getasset</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetAsset">GetAsset</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/assetsapi#getasset">GetAsset</a></li>
      </ul>
  </ListAdmonition>

  See also [listAssets example](https://github.com/immutable/imx-core-sdk-csharp/blob/main/Src/Examples/ListAssets/Program.cs) in the Core SDK.
  </TabItem>
</Tabs>

## Orders

### Get list of orders
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listOrders">listOrders</a></li>
      </ul>
  </ListAdmonition>

### Request
Get a list of active orders from a particular collection that are listed in `ETH` and sorted by `name`:

```ts
const getListOrders = async (
  status: 'active' | 'filled' | 'cancelled' | 'expired' | 'inactive',
  orderBy:
    | 'created_at'
    | 'expired_at'
    | 'sell_quantity'
    | 'buy_quantity'
    | 'buy_quantity_with_fees'
    | 'updated_at',
  sellTokenAddress: string,
  buyTokenType: string
) => {
  const response = await client.listOrders({
    status,
    orderBy,
    sellTokenAddress,
    buyTokenType,
  });
  return response;
};
getListOrders(
  'active',
  'buy_quantity_with_fees',
  '0x61e506cec264d5b2705f10e5a934dc5313a56a6e',
  'ETH'
)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      order_id: 1506, // ID of the order
      status: 'active', // Status of the order
      user: '0x192f36ee2bd12cf90571e464a3d28e76b8462c87', // Ethereum address of the user who submitted the order
      sell: { // Details about the asset in sale
        type: 'ERC721', // Type of this asset (ETH/ERC20/ERC721), it used to buy the asset
        data: {
          token_id: '271', // ERC721 Token ID
          token_address: '0x61e506cec264d5b2705f10e5a934dc5313a56a6e', // Address of ERC721/ERC20 contract
          quantity: '1',  // Quantity of this asset - inclusive of fees for buy order in v1 API and exclusive of fees in v3 API
          quantity_with_fees: '',  // Quantity of this asset with the sum of all fees applied to the asset
          properties: { // Properties of the asset in sale
            name: 'CityEscape #1',
            image_url: 'https://ipfs.thearknft.io/ipfs/bafkreibq3wnukid4fdfdugjjefjsom553mjloealius5cidqvtktvxf4va',
            collection: [Object]
          }
        }
      },
      buy: {  // Details about the asset used to buy
        type: 'ETH',  // Type of this asset (ETH/ERC20/ERC721), it used to buy the asset
        data: {
          token_address: '', // Address of ERC721/ERC20 contract. If the type is ETH, no address is required
          decimals: 18, // Number of decimals supported by this asset
          quantity: '530000000000000000', // Quantity of this asset - inclusive of fees for buy order in v1 API and exclusive of fees in v3 API
          quantity_with_fees: '530000000000000000' // Quantity of this asset with the sum of all fees applied to the asset
        }
      },
      amount_sold: null, // Amount of the asset already sold by this order
      expiration_timestamp: '2121-09-28T13:00:00Z', // Expiration timestamp of this order
      timestamp: '2022-09-28T13:26:26.327782Z', // Timestamp this order was created
      updated_timestamp: '2022-09-28T13:26:26.327782Z' // Updated timestamp of this order
    },
    // Other orders returned
    ...
  ],
 cursor: 'eyJvcmRlcl9pZCI6MTU0Niwic2VsbF9xdWFudGl0eSI6IjEiLCJidXlfcXVhbnRpdHkiOiI4MDAwMDAwMDAwMDAwMDAwMCIsImJ1eV9xdWFudGl0eV9pbmNsdXNpdmVfZmVlcyI6IjgzMjAwMDAwMDAwMDAwMDAwIiwiZXhwaXJlZF9hdCI6IjIxMjEtMDktMjlUMDA6MDA6MDBaIiwiY3JlYXRlZF9hdCI6IjIwMjItMDktMjlUMDA6NDc6MTMuODA2NjU2WiIsInVwZGF0ZWRfYXQiOiIyMDIyLTA5LTI5VDAwOjQ3OjEzLjgwNjY1NloiLCJ0c19zb3J0X3JhbmsiOm51bGx9',
  // Remaining results
  remaining: 0
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-orders-api/list-orders.html">listOrders</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/ordersapi/listorders(pagesize:cursor:orderby:direction:user:status:mintimestamp:maxtimestamp:updatedmintimestamp:updatedmaxtimestamp:buytokentype:buytokenid:buyassetid:buytokenaddress:buytokenname:buyminquantity:buymaxquantity:buymetadata:selltokenty-6jspr">listOrders</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.ListOrders">ListOrders</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/ordersapi#listorders">ListOrders</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get details about an order
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getOrder">getOrder</a></li>
      </ul>
  </ListAdmonition>

### Request

Get details about an order with ID `1506`, including fees:

```ts
const getOrder = async (id: string, includeFees: boolean) => {
  const response = await client.getOrder({
    id,
    includeFees,
  });
  return response;
};
getOrder('1506', true)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
      order_id: 1506, // ID of the order
      status: 'active', // Status of the order
      user: '0x192f36ee2bd12cf90571e464a3d28e76b8462c87', // Ethereum address of the user who submitted the order
      sell: { // Details about the asset in sale
        type: 'ERC721', // Type of this asset (ETH/ERC20/ERC721), it used to buy the asset
        data: {
          token_id: '271', // ERC721 Token ID
          token_address: '0x61e506cec264d5b2705f10e5a934dc5313a56a6e', // Address of ERC721/ERC20 contract
          quantity: '1',  // Quantity of this asset - inclusive of fees for buy order in v1 API and exclusive of fees in v3 API
          quantity_with_fees: '',  // Quantity of this asset with the sum of all fees applied to the asset
          properties: { // Properties of the asset in sale
            name: 'CityEscape #1',
            image_url: 'https://ipfs.thearknft.io/ipfs/bafkreibq3wnukid4fdfdugjjefjsom553mjloealius5cidqvtktvxf4va',
            collection: [Object]
          }
        }
      },
      buy: {  // Details about the asset used to buy
        type: 'ETH',  // Type of this asset (ETH/ERC20/ERC721), it used to buy the asset
        data: {
          token_address: '', // Address of ERC721/ERC20 contract. If the type is ETH, no address is required
          decimals: 18, // Number of decimals supported by this asset
          quantity: '530000000000000000', // Quantity of this asset - inclusive of fees for buy order in v1 API and exclusive of fees in v3 API
          quantity_with_fees: '530000000000000000' // Quantity of this asset with the sum of all fees applied to the asset
        }
      },
      amount_sold: null, // Amount of the asset already sold by this order
      expiration_timestamp: '2121-09-28T13:00:00Z', // Expiration timestamp of this order
      timestamp: '2022-09-28T13:26:26.327782Z', // Timestamp this order was created
      updated_timestamp: '2022-09-28T13:26:26.327782Z' // Updated timestamp of this order
      fees: [  // Fees info
        {
          type: 'protocol',
          address: '0xa6c368164eb270c31592c1830ed25c2bf5d34bae',
          token: [Object],
          amount: '10000000000000000'
        },
        {
          type: 'royalty',
          address: '0x192f36ee2bd12cf90571e464a3d28e76b8462c87',
          token: [Object],
          amount: '10000000000000000'
        },
        {
          type: 'royalty',
          address: '0x59bb6d1b896a9a139380bf2b8d828819f0cf1409',
          token: [Object],
          amount: '10000000000000000'
        }
      ]
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-orders-api/get-order.html">getOrder</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/ordersapi/getorder(id:includefees:auxiliaryfeepercentages:auxiliaryfeerecipients:)">getOrder</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetOrder">GetOrder</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/ordersapi#getorder">GetOrder</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

## Transfers

### Get list of transfers
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listTransfers">listTransfers</a></li>
      </ul>
  </ListAdmonition>

### Request

Get the list of the last 5 transfers made on ImmutableX:

```ts
const getListTransfers = async (
  orderBy:
    | 'transaction_id'
    | 'updated_at'
    | 'created_at'
    | 'sender_ether_key'
    | 'receiver_ether_key',
  pageSize: number
) => {
  const response = await client.listTransfers({
    orderBy,
    pageSize,
  });
  return response;
};
getListTransfers('updated_at', 5)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      transaction_id: 56779, // Sequential transaction ID
      status: 'success', // Status of the transaction
      user: '0xd1a147a26a6f2b414694d2a7161515bdbd97ddbe',       // Ethereum address of the user  who submitted this transfer
      receiver: '0x0000000000000000000000000000000000000000', // Ethereum address of the user who received this transfer
      token: { // Token info
        type: 'ERC721',  // Type of this asset (ETH/ERC20/ERC721), it used to buy the asset
        data: {
          token_id: '482', // Token ID
          token_address: '0x2d5ac360eaf14d11b442383e06159a3c8afea8ea', // Address of ERC721/ERC20 contract. If the type is ETH, no address is required
          decimals: 0, // Number of decimals supported by this asset
          quantity: '1', // Quantity of this asset - inclusive of fees for buy order in v1 API and exclusive of fees in v3 API
          quantity_with_fees: '' // Quantity of this asset with the sum of all fees applied to the asset
        }
      },
      // Timestamp of the transfer
      timestamp: '2022-09-30T12:36:47.115017Z'
    },
    // Other transfers returned
    ...
  ],
  cursor: 'eyJ0cmFuc2FjdGlvbl9pZCI6NTY3NzUsInN0YXR1cyI6InN1Y2Nlc3MiLCJzZW5kZXJfZXRoZXJfa2V5IjoiMHg1YjQxNjIxOTFkNjA0ZWZlYmViYjQzMDQ5MWQ2NjE1NGRmMWQ1ODU5IiwicmVjZWl2ZXJfZXRoZXJfa2V5IjoiMHhlNGY2M2UxNTUyMTk2OWVkMWY4ODAyMWM0YWZmZTIyNTAzYWQyOTE5IiwiVHlwZSI6IkVSQzcyMSIsIklEIjoiMHhjYjE3ZDMzODBiNjk5ZTFmYTZmZjYxNmU4ZTU0MDhmZTU5ZWFkMWRkMzY0MTBmYjc0YmNjMWRiMzkzMDJiYThiIiwiRVJDNzIxVG9rZW5JRCI6IjI4NzI4IiwiQ29udHJhY3RBZGRyZXNzIjoiMHhhOGVlZGViMmEyMzEwNTQzMGJlOGIxNGFhMWMzN2VkMDI3ZDY3MmRhIiwiRGVjaW1hbHMiOjAsIlF1YW50aXR5IjoiMSIsIkJhdGNoSUQiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDIyLTA5LTMwVDExOjU0OjExLjU4OTMyNloifQ',
  // Remaining results
  remaining: 1
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-transfers-api/list-transfers.html">listTransfers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/transfersapi/listtransfers(pagesize:cursor:orderby:direction:user:receiver:status:mintimestamp:maxtimestamp:tokentype:tokenid:assetid:tokenaddress:tokenname:minquantity:maxquantity:metadata:)">listTransfers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.ListTransfers">ListTransfers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/transfersapi#listtransfers">ListTransfers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get details about a transfer
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getTransfer">listTransfers</a></li>
      </ul>
  </ListAdmonition>

### Request

Get details about a transfer with ID `56779`:

```ts
const getTransfer = async (id: string) => {
  const response = await client.getTransfer({
    id,
  });
  return response;
};
getTransfer('56775')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
    transaction_id: 56779, // Sequential transaction ID
    status: 'success', // Status of the transaction
    user: '0xd1a147a26a6f2b414694d2a7161515bdbd97ddbe',       // Ethereum address of the user  who submitted this transfer
    receiver: '0x0000000000000000000000000000000000000000', // Ethereum address of the user who received this transfer
    token: { // Token info
      type: 'ERC721',  // Type of this asset (ETH/ERC20/ERC721), it used to buy the asset
      data: {
        token_id: '482', // Token ID
        token_address: '0x2d5ac360eaf14d11b442383e06159a3c8afea8ea', // Address of ERC721/ERC20 contract. If the type is ETH, no address is required
        decimals: 0, // Number of decimals supported by this asset
        quantity: '1', // Quantity of this asset - inclusive of fees for buy order in v1 API and exclusive of fees in v3 API
        quantity_with_fees: '' // Quantity of this asset with the sum of all fees applied to the asset
      }
    },
    // Timestamp of the transfer
    timestamp: '2022-09-30T12:36:47.115017Z'
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-transfers-api/get-transfer.html">listTransfers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/transfersapi/gettransfer(id:)">getTransfer</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetTransfer">GetTransfer</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/transfersapi#gettransfer">GetTransfer</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

## Tokens

### Get list of tokens
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listTokens">listTokens</a></li>
      </ul>
  </ListAdmonition>

Get a list of tokens ordered by `contract_address`:

### Request

```ts
const getListTokens = async (
  orderBy: 'contract_address' | 'name' | 'symbol'
) => {
  const response = await client.listTokens({
    orderBy,
  });
  return response;
};
getListTokens('contract_address')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      name: 'Gods Unchained', // Full name of the token (e.g. Ether)
      image_url: 'https://design-system.immutable.com/hosted-for-ds/currency-icons/currency--gods.svg', // Url for the icon of the token
      token_address: '0x5c9f1680bb6a4b4fc698e0cf702e0cc34aed91b7', // Address of the ERC721 contract
      symbol: 'GODS', // Ticker symbol for token (e.g. ETH/USDC/IMX)
      decimals: '18', // Number of decimals for token
      quantum: '100000000'  // Quantum for token
    },
    // Other tokens returned
    ...
  ],
  cursor: 'eyJuYW1lIjoiRXRoZXJldW0iLCJzeW1ib2wiOiJFVEgifQ'
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-tokens-api/list-tokens.html">listTokens</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/tokensapi/listtokens(address:symbols:)">listTokens</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.ListTokens">ListTokens</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/TokensApi.html#listtokens">ListTokens</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get details about a token
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getToken">getToken</a></li>
      </ul>
  </ListAdmonition>

### Request

Get details about the token with address `0x1facdd0165489f373255a90304650e15481b2c85`:

```ts
const getToken = async (address: string) => {
  const response = await client.getToken({
    address,
  });
  return response;
};
getToken('0x1facdd0165489f373255a90304650e15481b2c85')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
    name: 'ImmutableX Token',  // Full name of the token (e.g. Ether)
    image_url: 'https://design-system.immutable.com/hosted-for-ds/currency-icons/currency--imx.svg', // Url for the icon of the token
    token_address: '0x1facdd0165489f373255a90304650e15481b2c85', // Address of the ERC721 contract
    symbol: 'IMX', // Ticker symbol for token (e.g. ETH/USDC/IMX)
    decimals: '18', // Number of decimals for token
    quantum: '100000000' // Quantum for token
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-tokens-api/get-token.html">getToken</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/tokensapi/gettoken(address:)">getToken</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetToken">GetToken</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/TokensApi.html#gettoken">GetToken</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

## Trades

### Get list of trades
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listTrades">listTrades</a></li>
      </ul>
  </ListAdmonition>

### Request

Get the last 5 trades made with `ETH` on ImmutableX:

```ts
const getListTrades = async (partyATokenType: string, pageSize: number) => {
  const response = await client.listTrades({
    partyATokenType,
    pageSize,
  });
  return response;
};
getListTrades('ETH', 5)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      transaction_id: 56408, // Sequential ID of this trade within ImmutableX
      status: 'success', // Status of this trade
      a: {  // Buy object
        order_id: 1581, // The ID of the order involved in the trade
        token_type: 'ETH', // The type of the token that this trade sold
        sold: '10000000000000000' // The amount of that order\'s asset this trade sold in wei
      },
      b: { // Sell object
        order_id: 1579, // The ID of the order involved in the trade
        token_type: 'ERC721', // The type of the token that this trade sold
        token_id: '1507', // The ID of the token that this trade sold
        token_address: '0x72ec08386b4bbf0c344238b1bb892b2b279f1dcf', // The contract address of the token that this trade sold
        sold: '1'  // The amount of that order\'s asset this trade sold
      },
      timestamp: '2022-09-29T10:33:26.39022Z' // Time this trade occurred
    },
    // Other trades returned
    ...
  ],
  cursor: 'eyJ0cmFuc2FjdGlvbl9pZCI6NTY0MDgsInN0YXR1cyI6InN1Y2Nlc3MiLCJwYXJ0eV9hX29yZGVyX2lkIjoxNTYzLCJwYXJ0eV9hX2V0aGVyX2tleSI6IjB4MGEyMDU3NDRkYTMzZWY4Y2Y2NjY0OWM1OGFhYmFmZGZiY2E3NGFkMSIsInBhcnR5X2Ffc29sZF90b2tlbl90eXBlIjoiRVRIIiwicGFydHlfYV9zb2xkX3Rva2VuX2lkIjoiIiwicGFydHlfYV9zb2xkX3Rva2VuX2FkZHJlc3MiOiIiLCJwYXJ0eV9hX3NvbGRfcXVhbnRpdHkiOiIxMDAwMDAwMDAwMDAwMCIsInBhcnR5X2Jfb3JkZXJfaWQiOjExNzMsInBhcnR5X2JfZXRoZXJfa2V5IjoiMHg2YzQ0MzUxMGNmNmE0YTU2MzQxZDRjZTFhZWEzYjQzOTlhMTRmYmM3IiwicGFydHlfYl9zb2xkX3Rva2VuX3R5cGUiOiJFUkM3MjEiLCJwYXJ0eV9iX3NvbGRfdG9rZW5faWQiOiIxMCIsInBhcnR5X2Jfc29sZF90b2tlbl9hZGRyZXNzIjoiMHhiYzkxYTYxYzU2MWQ1ZDVlYzMxNmE0N2NlMjU1OGJiNjk0ZDUxNmQ1IiwicGFydHlfYl9zb2xkX3F1YW50aXR5IjoiMSIsImNyZWF0ZWRfYXQiOiIyMDIyLTA5LTI5VDEwOjMzOjI2LjM5MDIyWiJ9',
  // Remaining results
  remaining: 1
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-trades-api/list-trades.html">listTrades</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/tradesapi/listtrades(partyaorderid:partyatokentype:partyatokenaddress:partyborderid:partybtokentype:partybtokenaddress:partybtokenid:pagesize:cursor:orderby:direction:mintimestamp:maxtimestamp:)">listTrades</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.ListTrades">ListTrades</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/tradesapi#listtrades">ListTrades</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get details about a trade
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getTrade">getTrade</a></li>
      </ul>
  </ListAdmonition>

### Request

Get details about the trade with ID `56408`:

```ts
const getTrade = async (id: string) => {
  const response = await client.getTrade({
    id,
  });
  return response;
};
getTrade('56715')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
      transaction_id: 56408, // Sequential ID of this trade within ImmutableX
      status: 'success', // Status of this trade
      a: {  // Buy object
        order_id: 1581, // The ID of the order involved in the trade
        token_type: 'ETH', // The type of the token that this trade sold
        sold: '10000000000000000' // The amount of that order\'s asset this trade sold in wei
      },
      b: { // Sell object
        order_id: 1579, // The ID of the order involved in the trade
        token_type: 'ERC721', // The type of the token that this trade sold
        token_id: '1507', // The ID of the token that this trade sold
        token_address: '0x72ec08386b4bbf0c344238b1bb892b2b279f1dcf', // The contract address of the token that this trade sold
        sold: '1'  // The amount of that order\'s asset this trade sold
      },
      timestamp: '2022-09-29T10:33:26.39022Z' // Time this trade occurred
    }
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-trades-api/get-trade.html">getTrade</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/tradesapi/gettrade(id:)">getTrade</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetTrade">GetTrade</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/tradesapi#gettrade">GetTrade</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

## Users

### Get Stark keys for registered user
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getUser">getUser</a></li>
      </ul>
  </ListAdmonition>

### Request

Get Stark keys for user with the address `0x5D680Fbb3e60deCAbF62DfcACc56DB7d5964736a`:

```ts
const getUserStarkKeys = async (ethAddress: string) => {
  const response = await client.getUser(ethAddress);
  return response;
};
getUserStarkKeys('0x5D680Fbb3e60deCAbF62DfcACc56DB7d5964736a')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  // List of Stark keys
  accounts: [
    '0xd361e623760332811d06a976ceab515f3591b128f6ee15901991b69c9003b7',
  ];
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-users-api/get-users.html">getUsers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/usersapi/getusers(user:)">getUsers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetUsers">GetUsers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/usersapi#getusers">GetUsers</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get user balances
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#listBalances">listBalances</a></li>
      </ul>
  </ListAdmonition>

### Request 

Get list of tokens owned by the user with address `0x5D680Fbb3e60deCAbF62DfcACc56DB7d5964736a`:

```ts
const getListBalances = async (owner: string) => {
  const response = await client.listBalances({
    owner,
  });
  return response;
};
getListBalances('0x5D680Fbb3e60deCAbF62DfcACc56DB7d5964736a')
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
{
  result: [
    {
      token_address: '', // Address of the contract that represents this ERC20 token or empty for ETH
      symbol: 'ETH', // Symbol of the token
      balance: '100000000000000000', // Amount which is currently inside the exchange
      preparing_withdrawal: '0', // Amount which is currently preparing withdrawal from the exchange
      withdrawable: '0' // Amount which is currently withdrawable from the exchange
    }
  ],
  cursor: 'eyJfIjoiIiwic3ltYm9sIjoiRVRIIiwiY29udHJhY3RfYWRkcmVzcyI6IiIsImlteCI6IjEwMDAwMDAwMDAwMDAwMDAwMCIsInByZXBhcmluZ193aXRoZHJhd2FsIjoiMCIsIndpdGhkcmF3YWJsZSI6IjAifQ'
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-balances-api/list-balances.html">listBalances</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/balancesapi/listbalances(owner:)">listBalances</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.ListBalances">ListBalances</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/balancesapi#listbalances">ListBalances</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>

### Get specific balance for user
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#getBalance">getBalance</a></li>
      </ul>
  </ListAdmonition>

### Request

Get the balance of the token `0x1facdd0165489f373255a90304650e15481b2c85` owned by the user with address `0x1facdd0165489f373255a90304650e15481b2c85`:

```ts
const getBalanceToken = async (owner: string, address: string) => {
  const response = await client.getBalance({
    owner,
    address,
  });
  return response;
};
getBalanceToken(
  '0x5D680Fbb3e60deCAbF62DfcACc56DB7d5964736a',
  '0x1facdd0165489f373255a90304650e15481b2c85'
)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
```

### Example response

```ts
  {
      token_address: '0x1facdd0165489f373255a90304650e15481b2c85', // Address of the contract that represents this ERC20 token or empty for ETH
      symbol: 'IMX', // Symbol of the token
      balance: '100000000000000000', // Amount which is currently inside the exchange
      preparing_withdrawal: '0', // Amount which is currently preparing withdrawal from the exchange
      withdrawable: '0' // Amount which is currently withdrawable from the exchange
  }
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.api/-balances-api/get-balance.html">getBalance</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/balancesapi/getbalance(owner:address:)">getBalance</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.GetBalance">GetBalance</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="csharp" label="C# Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-csharp/0-1-1/apiclient/docs/balancesapi#getbalance">GetBalance</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
</Tabs>