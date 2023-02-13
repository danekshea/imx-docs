---
id: "zero-to-hero-nft-minting"
title: "NFT minting tutorial"
slug: "/zero-to-hero-nft-minting"
sidebar_position: 1
keywords: [imx-growth]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

*Estimated completion time: 20 mins*

This tutorial provides a step by step guide on how to mint an NFT on ImmutableX. It is designed for developers building on Web3 for the first time, so anyone can follow along regardless of prior experience. This has been simplified for educational purposes and we are working on expanding the content. 

By the end of this tutorial you will have:

- Prepared an NFT collection
- Deployed a smart contract for your NFT collection 
- Minted and listed an NFT 

If you get stuck at any point, reach out on the dev-faq and dev-discussion channels in our [Discord](https://discord.gg/TkVumkJ9D6). Click [here](https://docs.google.com/forms/d/e/1FAIpQLSdTLIXldLRZQB4i2YTHtQwxmrDbTkHphuxtLoVe7j-YVU7VYw/viewform) to provide feedback on the tutorial or let us know what topics you'd like to see in our documentation.

## Step 1: Prerequisites 
There are a few tools required for this tutorial: 

** [Homebrew](https://brew.sh/) **

:::info 
Homebrew is only needed for Mac OS.
:::

Homebrew installs the packages needed for this tutorial. Copy the command on the [Homebrew website](https://brew.sh/), then run in the terminal. 

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


**[Visual Studio Code](https://code.visualstudio.com/)
**

Visual Studio Code is the code editor we will be using for this tutorial.

## Step 2: Setup MetaMask 
To trade cryptocurrencies and NFTs, we need a wallet. For this tutorial, we will use Metamask. 

1. Open [metamask.io](https://metamask.io/download/) to install the browser extension
2. Follow the steps in the plugin to create a new wallet, then record and store your seed phrase in a safe location
3. Ensure you display test networks
4. Change the network selection from **Ethereum Mainnet** to **Goerli Test Network**
5. Note down your [private key](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) and [public key ](https://metamask.zendesk.com/hc/en-us/articles/360015289512-How-to-copy-your-MetaMask-account-public-address-)

Changing the network enables us to deploy on a testnet where we can experiment using test Eth. To learn more about transactions on Ethereum work, check out [this page](https://ethereum.org/en/developers/docs/transactions/) from the Ethereum foundation.

## Step 3: Obtain GoerliETH
To deploy our smart contract to the Goerli test network, we’ll need some test Eth. To get test Eth you can go to the [Goerli faucet](https://goerlifaucet.com/) and enter your Goerli account address, then click “Send Me ETH.” It may take a few minutes for the goerliETH to arrive.

If this faucet doesn't work, try these alternative faucets:

- [Faucet 1](https://goerli-faucet.mudit.blog/)
- [Faucet 2](https://goerli-faucet.pk910.de/)

## Step 4: Setup Pinata
Pinata is a service that allows users to host files on the [InterPlanetary File System](https://docs.ipfs.io/concepts/what-is-ipfs/#decentralization) (IPFS) network. We use Pinata to store our NFT metadata as it ensures the authenticity of the file will be verifiable and the file will always be accessible. Follow the steps below to prepare your collection: 

:::info 
You can use the free version for this tutorial, however consider creating a paid account for your real collection to ensure your images can be loaded. Be aware that your images will be publicly hosted on IPFS. 
:::

1. Sign up to [Pinata](https://www.pinata.cloud/)
2. Prepare 3 images for your NFTs 
3. Upload an image by pressing Upload and selecting the file

![Pinata1](/img/zero-to-hero/Pinata1.png 'Pinata1')

4. Upload the remaining 2 images
5. Note down the URL for each file

![Pinata2](/img/zero-to-hero/Pinata2.png 'Pinata2')

Your URLs should have the format `https://gateway.pinata.cloud/ipfs/QmWfjs6CVu4ENgXGNfdPhgaSdzEhCsCfB5XEFUosPFGsNV`

## Step 5: Create Metadata

[NFT Metadata](https://docs.x.immutable.com/docs/asset-metadata) contains information about the characteristics and properties of an NFT. 

1. Open Visual Studio Code
2. Create New Folder (Open Folder --> New Folder)
3. Press the page icon 3x to create 3 files
4. Name the files **1,2 & 3**. These are our Token IDs.

![FileCreation](/img/zero-to-hero/step5_filecreation.png 'FileCreation')
   
:::warning
Ensure the files are named **1, 2 & 3** or you may run into errors later.
:::

Populate each file with the metadata for the corresponding NFT. You can use the following metadata for your test collection, however make sure to replace each `image_URL` with the URLs that you created earlier to host your NFT images.

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

Ensure you press **save** before uploading the folder into Pinata. Double check this by closing the file and re opening - make sure that the values have saved. 

![Upload Folder](/img/zero-to-hero/pinata3-folder.png 'Upload Folder')

Click on the folder name to obtain your ** metadata API URL**. This endpoint is used by the metadata crawler to add metadata to your NFTs when they are minted. Note this down. 


![Folder Appearance](/img/zero-to-hero/Step5_Metadata.png 'Folder Appearance')

The resulting URL should have the format `https://gateway.pinata.cloud/ipfs/QmWfKt2pXLnQ2AB5jfS2KYB9K2hxFtgcMNxyndkSGT3yuj`. 

:::info Check your work
Click on your metadata API URL and ensure that there are 3 files named 1,2 & 3. Click into each file and confirm the data is correct. If any of them are empty, you will need to reupload your folder.
:::

## Step 6: Create Etherscan API Key

An Etherscan API Key is necessary to verify that you're the owner of the smart contract that you're trying to publish. Follow the steps below: 

1. Navigate to [Etherscan](https://etherscan.io/)
2. Sign in (or create a new account) 
3. Navigate to `API-KEYS` and add a new key
4. Note down the generated API key

![Etherscan API Key](/img/zero-to-hero/Etherscan1-no-arrow.png 'Etherscan API Key')
![Etherscan API Key2](/img/zero-to-hero/Etherscan2.png 'Etherscan API Key')

## Step 7: Create NFT contract

Next we will need to update the variables for our smart contract. 

1. Clone or download the [imx-contracts](https://github.com/immutable/imx-contracts) code from github.
2. Unzip the file and open it in Visual Studio Code (File--> Open Folder)
3. Rename the `.env.example` to `.env` 

![Env file](/img/env.png 'Env file')

4. Fill in the following details: 

<table>
  <thead>
  <tr>
    <th>
      Field Name
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>Etherscan API Key</code>
    </td>
    <td>
      Etherscan API Key from previous step
    </td>
  </tr>
  <tr>
    <td>
      <code>CONTRACT_OWNER_ADDRESS</code>
    </td>
    <td>
     Metamask wallet address also known as public key
    </td>
  </tr>
  <tr>
    <td>
      <code>DEPLOYER_TESTNET_PRIVATE_KEY
       DEPLOYER_MAINNET_PRIVATE_KEY</code>
    </td>
    <td>
      Metamask wallet private key
    </td>
  </tr>
  <tr>
    <td>
      <code>CONTRACT_NAME</code>
    </td>
    <td>
      Name of your NFT collection eg "Spaghetti Adventures"
    </td>
  </tr>
  <tr>
    <td>
      <code>CONTRACT_SYMBOL</code>
    </td>
    <td>
      This is a shortened version of your collection name eg "SPAG"
    </td>
  </tr>
  </tbody>
</table>

:::info Alchemy API Key
Note down the `ALCHEMY_API_KEY`. We do not need to update this value now, but we will use this value later. 
:::

## Step 8: Install Dev library
Next we will need to install packages needed for deploying our smart contract. 

1. Right click on any file in the explorer
2. Select 'Open in Integrated Terminal'

![Open the integrated terminal](/img/zero-to-hero/Integrated-Terminal.png 'Open the integrated terminal')

3. Run `npm install --include=dev` and wait until the installation is completed
4. Save your work

## Step 9: Deploy Contract
Before we can mint on Layer 2, we need to deploy a smart contract on Layer 1 to ensure assets can be withdrawn to Layer 1. Click [here](https://docs.x.immutable.com/docs/ethereum-scalability) to learn more about the differences between Layer 1 and Layer 2. 

1. Run `yarn hardhat run deploy/asset.ts --network sandbox`
2. It will take ~5 minutes to deploy your contract to Goerli Etherscan 
3. Copy the deployed contract address 

![Step9_Deploying the contract](/img/zero-to-hero/Step9DeployContract.png 'Deploying the contract')

:::info Check your work
Paste your contract address into [Goerli Etherscan](https://goerli.etherscan.io/). It should say **contract** in the upper left. If this says address, ensure you are on the correct network
:::

## Step 10: Add your NFT Collection to ImmutableX

After deploying your contract to Layer 1, you will need to [register](https://docs.x.immutable.com/docs/onboarding) it with ImmutableX by creating a project and a collection. 

1. Download the [imx-examples repo](https://github.com/immutable/imx-examples)
2. Open the folder in Visual Studio Code
3. Rename `.env.example` to `.env` and save 
4. Fill in the following: 

<table>
  <thead>
  <tr>
    <th>
      Field Name
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>ALCHEMY_API_KEY</code>
    </td>
    <td>
      <code>AlCHEMY_API_KEY</code> from step 7
    </td>
  </tr>
  <tr>
    <td>
      <code>OWNER_ACCOUNT_PRIVATE_KEY</code>
    </td>
    <td>
     Metamask private key  from step 2
    </td>
  </tr>
  <tr>
    <td>
      <code>COLLECTION_CONTRACT_ADDRESS</code>
    </td>
    <td>
       Deployed contract address from previous step
    </td>
  
  </tr>
  </tbody>
</table>


![Step10_1](/img/zero-to-hero/Step10_1.png 'Step10_1')

1. Save 
2. Run `npm install`

## Step 11: Register as a User

Before you can create a project, you will need to register as a user. Registering as a user creates a Layer 2 wallet and enables us to make transactions on Layer 2. 

1. Navigate to the [Sandbox Test Marketplace](https://market.sandbox.immutable.com/)
2. Press `Connect Wallet`
3. Follow the prompts 

## Step 12: Register your Email Address 

Register with your email address at the [Immutable Developer Hub](https://hub.immutable.com) to access the ability to create projects on Immutable via the [Public API](https://docs.x.immutable.com/reference#/operations/createProject) or the CLI in the [imx-examples repo](https://github.com/immutable/imx-examples).

You must first have a project in order to create collections that you can mint assets from on Immutable (L2).

## Step 13: Create Project

 A [project](https://docs.x.immutable.com/docs/guides/onboarding/project-registration) is an admin level entity associatied with an owner wallet address. This address is needed to make changes like creating or updating collections. Begin by navigating to **src/onboarding/2-create-project.ts**.

![Onboarding Project](/img/zero-to-hero/Step12_1.png 'Onboarding Project')

1. Fill in `name`, `company_name` and `contact_email`
2. Press save 
3. Run `npm run onboarding:create-project`
4. Copy the Project ID from the output
5. Use this to populate the `COLLECTION_PROJECT_ID` in the .env file and press save

![Step12](/img/zero-to-hero/Step12_2.png 'Step12')


## Step 14: Register Collection
  A [collection](https://docs.x.immutable.com/docs/collection-registration) is a group of NFTs that share a smart contract and each collection belongs to a project. Collections are displayed on the marketplace to end users, eg Gods Unchained. 

 Navigate to the ***src/onboarding/3-create-collections.ts*** file and populate the following values:


<table>
  <thead>
  <tr>
    <th>
      Field Name
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>name</code>
    </td>
    <td>
      Name of your collection on the marketplace
    </td>
  </tr>
  <tr>
    <td>
      <code>description</code>
    </td>
    <td>
    The description for your collection
    </td>
  </tr>
  <tr>
    <td>
      <code>icon_url</code>
    </td>
    <td>
      Icon that displays for your collection
    </td>
  </tr>
  <tr>
    <td>
      <code>metadata_api_url</code>
    </td>
    <td>
      Metadata API URL that we generated earlier (ensure there is no trailing /s)
    </td>
  </tr>
  <tr>
    <td>
      <code>collection_image_url</code>
    </td>
    <td>
      Image of your collection that displays on the marketplace
    </td>
  </tr>
  </tbody>
</table>


To register the collection, run the command `npm run onboarding:create-collection`. 

:::info
Remember to remove the prepending double slashes ”//” in relation to the fields described below as these comment out the code.
:::

## Step 15: Create Metadata Schema

A collection's metadata schema describes the properties of the NFTs it can mint, as well as the potential values and types of those properties. These fields can be used as filters in the marketplace later on. Click [here](https://docs.x.immutable.com/docs/metadata-schema-registration) to learn more about Metadata Schema.



Navigate to **src/onboarding/4-add-metadata-schema.ts** and update metadata on line 43:

![Add Metadata](/img/zero-to-hero/add-metadata.png 'Add Metadata')

You can use the example metadata schema provided here, or use your own. Copy and paste the code below into line 43, as shown in the above image. 

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

To add metadata schema to the collection, run the command `npm run onboarding:add-metadata-schema` in the integrated terminal. 

## Step 16: Mint NFT

Now that we have added our contract to ImmutableX, the final step is to add our assets to the blockchain by minting them. 

1. Navigate to the .env file 
2. Fill in the follow under the 'Bulk Minting' section 


![Specify Metadata](/img/zero-to-hero/Step15_1.png 'Specify Metadata')

<table>
  <thead>
  <tr>
    <th>
      Field name
    </th>
    <th>
      Description
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      <code>PRIVATE_KEY1</code>
    </td>
    <td>
      MetaMask Private Key - Copy from 'Onboarding' section.
    </td>
  </tr>
  <tr>
    <td>
      <code>TOKEN_ID</code>
    </td>
    <td>
    Enter 1 as the <code>TOKEN_ID</code> if this is the first time you’re minting from your collection. If you have already minted a few NFTs, then take the TOKEN_ID of the last minted NFT, and increment it by 1 and enter it here.
    </td>
  </tr>
  <tr>
    <td>
      <code>TOKEN_ADDRESS</code>
    </td>
    <td>
      Same as <code>COLLECTION_CONTRACT_ADDRESS</code> - Copy from 'Onboarding' section.
    </td>
  </tr>
  <tr>
    <td>
      <code>BULK_MINT_MAX</code>
    </td>
    <td>
    Enter 50 for this tutorial. This allows us to configure the maximum number of NFTs that can be minted in bulk in one go.
    </td>
  </tr>
  </tbody>
</table>


:::info Save
Don't forget to press save after updating the values
:::


**To Mint**
1. Run `npm run bulk-mint -- -n <number of tokens to mint> -w <your wallet address>` where
 * `<number of tokens to mint>`  is the number of NFTs you wish to mint. In this tutorial, this number is 3. 
 * `<your wallet address>` is the MetaMask wallet you’re minting your NFTs to. For each contract (in other words, for each TOKEN_ADDRESS) you are minting tokens for, remember to set the TOKEN_ID in .env to the latest incremented index.

## Step 17: List your NFT 

Our assets will now be accessible in our Goerli Wallet. However, for other users to see them we will need to list them on the marketplace. 

1. Visit the [Sandbox IMX Marketplace](https://market.sandbox.immutable.com/) 
2. Click Connet Wallet and follow the prompts
3. Click My Assets --> Select an NFT
4. Press List for Sale
   
## Conclusion 

Congratulations on minting and listing an NFT on the Goerli test network!

:::info Feedback
 This tutorial covered the simplest implementation of minting, however we are continuing to build out the workflow. Feel free to leave any feedback [here](https://docs.google.com/forms/d/e/1FAIpQLSdTLIXldLRZQB4i2YTHtQwxmrDbTkHphuxtLoVe7j-YVU7VYw/viewform).
:::


If you'd like to reuse these steps for a mainnet launch, note the following changes:

<table>
  <thead>
  <tr>
    <th>
      Step
    </th>
    <th>
      Change
    </th>
  </tr>
  </thead>
  <tbody>
      <tr>
    <td>
      Step 2
    </td>
    <td>
     Metamask Network should use Ethereum Mainnet 
    </td>
  </tr>
  <tr>
    <td>
      Step 9.1
    </td>
    <td>
    <code>yarn hardhat run deploy/asset.ts --network mainnet</code>
    </td>
  </tr>
  <tr>
    <td>
      Step 10
    </td>
    <td>
      Set <code>ETH_NETWORK</code> to mainnet in the .env file
    </td>
  </tr>
  <tr>
    <td>
      Step 10
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
