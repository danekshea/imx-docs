---
title: "What can you build on it?"
slug: "/what-can-you-build"
sidebar_position: 3
---

import Admonition from '@theme/Admonition';

ImmutableX allows you to create applications on layer 2 by interacting with its [API](../reference) and [developer tools](../sdks.mdx). It provides the key functionality you'll need to build web3 games or NFT applications without having to deploy your own complicated smart contracts.

Before starting to build on ImmutableX, it's important to understand:
* [What functionality does your application need?](#what-functionality-do-web3-games-and-applications-typically-need)
* [Does ImmutableX provide this functionality?](#what-functionality-does-immutablex-provide)

## What functionality do web3 games and applications typically need?

#### There are two main types:
1. [Facilitate user transactions](#1-facilitate-user-transactions)
2. [Retrieve data about current state and historical transactions](#2-retrieve-data-about-current-state-and-historical-transactions)

### 1. Facilitate user transactions
These enable users to _do things_ that update state on the blockchain. These transactions include:
* Buying and selling assets
* Minting NFTs
* Transferring assets to other users
* Depositing assets to L2 (ie. ERC20 tokens)

These transactions require user signatures to authorize because they update state on the blockchain (as opposed to simply reading data).

#### Examples and use cases:
<table>
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
      <th>Use cases</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Minting assets</td>
      <td>Minting assets simply means to call a function in a token smart contract that brings into existence new tokens.
      <br/><br/>
      Users can mint an asset either for themselves, or another user.</td>
      <td>
        <ul>
          <li>Creators can launch a collection of NFTs on a website that users can mint from</li>
          <li>Games can release a new category of in-game items and allow players to mint them</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Creating orders</td>
      <td>An order is a sale listing. It can be created by users who want to sell an asset that they own. They can specify things like price, sale period, etc.</td>
      <td>
        <ul>
          <li>A marketplace wanting to allow users to put their assets up for sale so that other users can buy them.</li>
          <li>Games can create their own in-game marketplace, allowing players to sell in-game items that they own.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Creating trades</td>
      <td>A trade is simply filling an order. A user executes a trade by agreeing to purchase an asset at the terms specified in the order and then becomes the new owner of the asset.</td>
      <td>
        <ul>
          <li>An NFT marketplace can display assets for sale and enable users to buy them.</li>
          <li>An exchange can allow users to trade their fungible (ERC-20) tokens.</li>
          <li>Games can allow players to buy assets from other players in their own in-game marketplace.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Transfers</td>
      <td>A user can transfer the ownership of an asset that they own to another user.</td>
      <td>
        <ul>
          <li>Games may allow players to give assets to each other.</li>
          <li>Games might mint a collection of in-game items and transfer them to players based on the fulfilment of certain achivements.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Deposit assets from L1 to L2</td>
      <td>
        Deposits are when users transfer assets that they own on layer 1 to layer 2 (ie. ETH or ERC20 tokens)<br/>
      </td>
      <td>
        <ul>
          <li>An NFT marketplace can implement a 'bridging mechanism' which allows users to transfer ETH that they own from L1 to L2 so that they can purchase assets on L2</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### 2. Retrieve data about current state and historical transactions
Applications often need to provide information about the current state (ie. who owns which assets) and historical transactions (ie. past owners of an asset, previous sales of an asset) on a blockchain. This information can be used for analysis purposes, or to provide users with the information they need in order to execute a transaction (ie. an NFT marketplace application providing information on current sale orders enables users to be able to create a trade that fills the order - purchases the asset).

#### Examples and use cases:
<table>
  <thead>
    <tr>
      <th>Example</th>
      <th>Description</th>
      <th>Examples of use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Asset data</td>
      <td>Details about non-fungible tokens on ImmutableX, like metadata, image URL, current owner, etc.</td>
      <td>
        <ul>
          <li>NFT marketplaces display the details of an asset that is listed for sale so that buyers know what they are purchasing</li>
          <li>Game mechanics utilize the attributes of an in-game asset in order to know what action to execute</li>
        </ul>
      </td>
    </tr>
     <tr>
      <td>Order data</td>
      <td>Details about orders, like sale price, sale period, etc.</td>
      <td>
        <ul>
          <li>NFT marketplaces will list orders in order to show buyers what is for sale and provide them with the opportunity to purchase</li>
        </ul>
      </td>
    </tr>
     <tr>
      <td>User data</td>
      <td>Details about users, like the types of tokens they own and the balance of each token.</td>
      <td>
        <ul>
          <li>Wallet applications can display to their users their token balances</li>
          <li>Marketplaces can let users know that an attempt to purchase an asset will fail because the user has insufficient tokens to fulfil the order</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## What functionality does ImmutableX provide?
Our [basic guides](../guides/basic-guides/overview/index.md) cover the key functionality provided for by the ImmutableX platform.

For the full list of functionality, please see our [API reference](../reference).

### ⚒️ Get started building
Immutable provide SDKs which are a wrapper around the API functions and make it easy for developers to integrate ImmutableX with their application's particular language or framework.

For more information on the SDKs that we have and how they work together, please see [here](../sdks.mdx).

<Admonition type="info" title="Guides:" icon="">
    📘 <a href="/docs/launch-collection">Launch a collection</a>
    <br/>
    📘 <a href="/docs/basic-guides">Basic guides</a>
</Admonition>