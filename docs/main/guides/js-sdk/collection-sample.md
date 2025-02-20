---
id: "collection-sample"
title: "Collection sample"
slug: "/collection-sample"
excerpt: "Code example of a sample collection"
sidebar_position: 5
keywords: [imx-games, imx-wallets]
---
## Code samples to work with a sample Collection
```javascript
//ImmutableXConnection.js
//Sample ImmutableX functions for collection interaction

import { ImmutableXClient, Link, ERC721TokenType, ETHTokenType } from '@imtbl/imx-sdk';

const linkAddress = 'https://link.x.immutable.com';
const apiAddress = 'https://api.x.immutable.com/v1';
// Goerli Testnet
//const linkAddress = 'https://link.sandbox.x.immutable.com';
//const apiAddress = 'https://api.sandbox.x.immutable.com/v1';

//The token address for the collection to be monitored. Currently set to Gods Unchained
const COLLECTION_ADDRESS = '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c';

const link = new Link(linkAddress);
const client = await ImmutableXClient.build({ publicApiUrl: apiAddress });

const WALLET_ADDRESS = 'WALLET_ADDRESS';
const STARK_PUBLIC_KEY = 'STARK_PUBLIC_KEY';

//////////////////////////////////////////////////////////////////////////////
//////////////////////// User Account Management /////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//Creates or logs a user into their ImmutableX account via web3 wallet
export async function setupAndLogin() {
   const { address, starkPublicKey } = await link.setup({});
   localStorage.setItem(WALLET_ADDRESS, address);
   localStorage.setItem(STARK_PUBLIC_KEY, starkPublicKey);
}

//Remove the local storage wallet address
export function logout() {
   localStorage.removeItem('WALLET_ADDRESS');
}

//Get the user balances
export async function getUserBalances() {
   const address = localStorage.getItem('WALLET_ADDRESS');
   return await client.getBalances({ user: address });
}

//Deposits ETH into ImmutableX
export async function depositEth(amountInEth) {
   await link.deposit({
      type: ETHTokenType.ETH,
      amount: amountInEth
   });
}

//Starts the withdrawal process from ImmutableX
export async function prepareWithdrawal(amountInEth) {
   await link.prepareWithdrawal({
      type: ETHTokenType.ETH,
      amount: amountInEth
   });
}

//Finishes the withdrawal process from ImmutableX
//Must wait for user balance to have ETH in the withdrawable state 
export async function completeWithdrawal() {
   await link.prepareWithdrawal({
      type: ETHTokenType.ETH
   });
}

//Show user history
export async function showUserHistory() {
   link.history({});
}

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Asset Management /////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Get the user's assets
 * @param {string} assetCursor - optional cursor parameter 
 * @returns Object containing the assets and a cursor if more assets remain to be retrieved
 */
export async function getUserAssets(assetCursor) {
   const address = localStorage.getItem('WALLET_ADDRESS');
   const assetsRequest = await client.getAssets({ user: address, cursor: assetCursor, status: 'imx', collection: COLLECTION_ADDRESS });
   return { assets: assetsRequest.result, cursor: assetsRequest.cursor };
}

//Opens the Link SDK popup to sell an asset as the specified price
export async function sellAsset(asset, priceInEth) {
   let sellParams = { amount: priceInEth, tokenId: asset.id, tokenAddress: asset.token_address };
   //Throws an error if not successful
   await link.sell(sellParams);
}

//Transfers an asset to another address
export async function transferERC721(asset, addressToSendTo) {
   await link.transfer({
      type: ERC721TokenType.ERC721,
      tokenId: asset.id,
      tokenAddress: asset.token_address,
      to: addressToSendTo
   });
}

//////////////////////////////////////////////////////////////////////////////
///////////////////////// Marketplace Management /////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * Get the cheapest active orders for the collection
 * @param {*} ordersCursor - optional cursor parameter 
 * @param {*} metadata - optional JSON string metadata to filter on 
 * @returns Object containing the cheapest orders and a cursor if more orders remain
 */
export async function getCheapestSellOrders(ordersCursor, metadata) {
   const ordersRequest = await client.getOrders({
      cursor: ordersCursor,
      status: 'active',
      sell_token_address: COLLECTION_ADDRESS,
      sell_metadata: metadata,
      order_by: 'buy_quantity',
      direction: 'asc'
   });
   return { orders: ordersRequest.result, cursor: ordersRequest.cursor };
}

//Opens the Link SDK popup to complete an order
export async function fillOrder(order) {
   await link.buy({ orderId: order.order_id });
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
```