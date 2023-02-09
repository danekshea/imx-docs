---
id: "immutable-x-sdk"
title: "Install and configure"
slug: "/immutable-x-sdk"
sidebar_position: 1
keywords:
  - imx-games
---

The ImmutableX JS SDK is a Javascript package created by Immutable to allow simple interfacing with ImmutableX’s API. The primarily used packages are Link SDK and the ImmutableX Client.

The ImmutableX Client is used for most backend operations, and the [Link SDK](../link-sdk/index.md) is used for frontend, user-facing interactions.

The IMX Client ('ImmutableXClient') is a module wrapping the REST requests in a method call. Using this package, developers can make sure their calls are up to date with the latest API standards.

The Link SDK provides a clean popup and UI to help users navigate through the final signing process with their wallets. While information about current market state and assets can be derived with web requests, the Link SDK handles the more complicated stark signature signing most developers should not need to code. Using the Link SDK also maintains a unified view for users, allowing them to be more comfortable during signing when using marketplaces powered by ImmutableX.

Applications monitoring the status of the assets will use the IMX Client to retrieve data. Marketplace and applications relying on user interaction will use both packages.

## Setting up the SDK
:::caution Note: If you are using the latest version of 'create-react-app'...
You will encounter a bunch of webpack errors when you try use the [@imbt/imx-sdk](https://www.npmjs.com/package/@imtbl/imx-sdk) SDK with your app.

Follow this guide: [How to resolve webpack errors](https://docs.x.immutable.com/docs/create-react-app-webpack-5-errors)
:::

For this tutorial we will assume Yarn is being used as the package manager. The following node modules need to be added to the project:
```bash
yarn add @imtbl/imx-sdk
```
## Importing the packages
The following imports are needed for the Link SDK and IMX Client packages:
```javascript
import { ImmutableXClient, Link } from '@imtbl/imx-sdk';
```

## Setting the connection urls
ImmutableX provides connection addresses for both the mainnet and testnet. Here we will default to the mainnet for the examples, but show the testnet connection strings as well.
```javascript
const linkAddress = 'https://link.x.immutable.com';
const apiAddress = 'https://api.x.immutable.com/v1';

// Goerli Testnet
//const linkAddress = 'https://link.sandbox.x.immutable.com';
//const apiAddress = 'https://api.sandbox.x.immutable.com/v1';
```
## Creating the link objects
Once the Link SDK and IMX Client are imported, they can be initialized. Note that the client library initialization is asynchronous.
```javascript
// Link SDK
const link = new Link(linkAddress);

// IMX Client
const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });
```
For more details, see the [Link SDK](../link-sdk/index.md) docs and the [package on NPM](https://www.npmjs.com/package/@imtbl/imx-sdk).