---
title: "Deep dive into minting"
slug: "/deep-dive-minting"
sidebar_position: 2
keywords: [imx-dx]
---

import ListAdmonition from '@site/src/components/ListAdmonition';

<ListAdmonition>
    <ul>
        <li>What is minting, generally?</li>
        <li>What does minting on ImmutableX mean, and how does it work with minting on Ethereum L1?</li>
    </ul>
</ListAdmonition>

## What is minting?

Minting means to create new tokens and bring them into circulation.

Tokens are created by, and information about who owns them are stored in, **smart contracts**.

### How are smart contracts and tokens related?

A smart contract is a class of code that deployed to and runs on the blockchain. There are standards for smart contracts for different purposes, including smart contracts that govern the issuance of tokens. The two most common standards for these token smart contracts are [ERC-721](https://eips.ethereum.org/EIPS/eip-721) (for non-fungible tokens) and [ERC-20](https://eips.ethereum.org/EIPS/eip-20) (for fungible tokens).

_For more information about these contract types, see: [Anatomy of smart contract](../key-concepts/anatomy-smart-contract.md)._

#### There are two main components of token smart contracts that enable minting:
1. The ability to store information about token ownership:
    * **ERC-20 contracts**:<br/>As these contracts generate fungible tokens which are identical to each other and do not contain token-specific information like ID or metadata, what is important is knowing how many of these tokens a given user owns. These contracts store a mapping of `address -> token amount`, like: `{ 0xb794f5e...: 10, 0xfba7427...: 3 }`. In order to retrieve this information, the [ERC-20 token standard](https://eips.ethereum.org/EIPS/eip-20#methods) requires a function called `balanceOf` to be implemented, which takes in an `address` and returns the number of tokens that this address owns.
    * **ERC-721 contracts**:<br/>As these contracts generate unique tokens, each with their own token ID, it is important to know who owns a particular token ID. These contracts store a mapping of `token ID -> address`, like: `{ 1: 0xb794f5e..., 2: 0xfba7427... }`. In order to retrieve this information, the [ERC-721 token standard](https://eips.ethereum.org/EIPS/eip-721#specification) requires a function called `ownerOf` to be implemented, which takes in a token ID and returns the address of its owner.
2. A `mint` function that authorised users can call to create tokens. This function operates differently for ERC-20 and ERC-721 contracts:
    * **ERC-20 contracts**:
      <br/>1. The <code>totalSupply</code> of tokens for that contract should be specified.
      <br/>2. The <code>mint</code> function is called with the address of the user to which to mint the tokens to, and the amount of tokens.
      <br/>3. When new tokens are minted, the <code>totalSupply</code> is decremented by the amount.
      <br/>4. If the mint function is called with an amount of tokens to mint that exceeds the remaining total supply, then it will fail.
      <br/>5. When minting is successful, the mapping <code>address -> token amount</code> is updated.
    * **ERC-721 contracts**:
      <br/>1. The <code>mint</code> function takes in a token ID and the address of the user to which to mint the tokens to.
      <br/>2. It will then attempt to update mapping <code>token ID -> address</code>.
      <br/>3. If the token ID already exists in the mapping (which means that a token has already been minted), then minting will fail.
      <br/>4. If not, then a new token ID is created and the mapping updated with the address of the token ID owner.

## What is minting on ImmutableX?

Minting on ImmutableX is an _extension_ of minting on L1. It extracts some of the computational work of minting to L2, however, the ultimate result is the same - the proof that a certain token ID has been minted and is owned by a certain user address is published on L1. 

***However, there is a time-delay..*** One thing to note is that at the time of minting on L2, the token has not yet been created (minted) on L1. It is only when this token is withdrawn to L1 that the `mint` function on the L1 contract is called and the token is finally created on L1.

### L1 contract requirements

In addition to the general requirements [here](#there-are-two-main-components-of-token-smart-contracts-that-enable-minting), for an L1 contract to facilitate minting of its tokens on L2, it needs the following additional function implementations:
1. `mintFor` function that allows an approved user (this will be ImmutableX's Stark contract on L1) to mint the tokens (ie. call its `mint` function and add new token IDs to the mapping) that was minted on L2 on L1 (when those tokens are withdrawn to L1).
2. `owner` function that ImmutableX can call to verify the contract's owner.

### Process of minting on ImmutableX:
1. **Deploy smart contract on L1:** There must be a existing mintable token smart contract (see requirements [here](#there-are-two-main-components-of-token-smart-contracts-that-enable-minting) and [here](#l1-contract-requirements)) deployed on Ethereum L1
2. **Register smart contract as a collection on L2:** The smart contract is registered as a collection (see [API reference](/reference#/operations/createCollection) or [do this from the command line](../launch-collection/register-collection/index.mdx)) with Immutable. This simply stores information about the contract (ie. its name, description, metadata, etc.) on Immutable's databases so that it can be used and displayed by marketplaces and other applications on ImmutableX
3. **Minting on L2:** Minting on ImmutableX means that an [asset](/reference#/operations/listAssets), which contains information about the contract to which it belongs, its ID and other data, is created in the Immutable databases to represent a token on the L1 contract. At this point, the L1 contract still has no knowledge of the asset on L2. To ensure that an asset is not minted on L2 with the same token ID as an existing L1 token, a nominal call is made to the L1 contract's `mintFor` function for a small % of minted tokens to check whether the ID already exists. If it does, the minting will fail on L2.
4. **NFT Metadata** After you've successfully minted a NFT on L2 ImmutableX will retrieve offchain metadata for your asset through the metata API URL of the associated collection. ImmutableX will retry several times for up to one hour after mint in case of failure. If after one hour your asset still does not have metadata please check that the URL you provided is correct and returns metadata for your asset. You can request a [metadata refresh](../guides/advanced-guides//asset-metadata-refreshes.md) after resolving any issues with your metadata API.
5. **Withdraw minted L2 token to L1:** When the owner of a minted L2 asset decides that they want to [withdraw](../guides/basic-guides/deposits-withdrawals/index.md) this token to L1, this is the point at which the L1 contract needs to know about this token. Remember, at this point, the L1 contract does not yet know that this token exists. This is when the `mintFor` function on the L1 contract is called, which actually mints the token on L1.

### Key things to note:
* Minting on L2 only stores information about a minted token in Immutable's databases
* Only the L1 contract owner can mint tokens on L2 from it (of course, they can mint the tokens for other users)

### Can't a token be minted simultaneously on L1 and L2?
This describes the scenario where a token is minted on L2 but it has not yet been minted on L1 (so the L1 contract knows nothing about it). It is possible for an authorized minter to mint the same token on L1, thus, when the L2 token is withdrawn (ie. minted on L1), it will fail because the token ID already exists on L1.

**Steps to prevent this:**
* At the time of L2 minting, ImmutableX makes a nominal call is made to the L1 contract's `mintFor` function for a small % of minted tokens to check whether the ID already exists
* Only the contract owner can mint on L2 so it is up to them to keep track of token IDs and ensure duplicates are not made
* Because smart contracts are public on the blockchain, before purchasing an L2 token, users can always check its contract address on L1 to ensure that they are not buying a duplicate token

For more information on how to mint on L2, see our [asset minting guide](../guides/basic-guides/mint-assets/index.md).