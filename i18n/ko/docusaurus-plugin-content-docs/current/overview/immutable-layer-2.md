---
title: "What are its layer 2 solutions?"
slug: "/immutable-layer-2"
sidebar_position: 2
---

# ImmutableX's layer 2 solutions

## What is layer 2?
"Layer 2" is a term used to describe mechanisms that process batches of transactions independently of layer 1 and only periodically reports them to the main chain. This decreases the total number of transactions that have to be validated on layer 1. Layer 2s are also known as "execution layers" or "rollups".

ImmutableX offer [two execution layers](#layer-2s-on-immutablex), both of which use the [ZK rollup](#how-do-zk-rollups-work) batching mechanism.

### How do ZK rollups work?
ZK rollups consist of two main components:
1. **Off-chain batching mechanism (virtual machine)** - generates a cryptographic proof from a batch of transactions in a highly compressed form together with the previous state root and the new state root.
2. **On-chain contract:**
    * Stores the current state root of the rollup.
    * Verifies that the previous state root in the batch matches the current state root. If so, it switches the state root to the new state root.

#### How it works:
1. A collection of layer 2 transactions are sent to the batching mechanism which generates a cryptographic proof from the transactions, previous state root and the new state root.
2. This proof is sent to the layer 1 smart contract to verify.
3. The layer 1 smart contract checks that the proof's previous state root is the same as its current state root.
4. If it does, then it updates its current state root to the new state root of the batch.

#### For more information:
* [***An Incomplete Guide to Rollups***](https://vitalik.ca/general/2021/01/05/rollup.html) - by Vitalik Buterin
* [***Layer 2***](https://ethereum.org/en/layer-2/) and [***ZK rollups***](https://ethereum.org/en/developers/docs/scaling/zk-rollups/) explanations - by the Ethereum Foundation

## Layer 2s on ImmutableX
ImmutableX currently provides two layer 2 solutions:

| | How does it work? | Who can use it? | How does Immutable provide<br/>access to it? |
| --- | --- | --- | --- |
| [StarkEx](https://starkware.co/starkex/) | Provides a service that batches certain types of transactions. The StarkEx service is created and maintained by the company, Starkware. Only transactions that are built for this service can be processed. | Applications (like ImmutableX) must sign up to use this service. | ImmutableX allows other applications to submit, via API endpoints, accepted types of transactions to be processed. |
| [StarkNet](https://starknet.io/what-is-starknet/) | Smart contract platform where any developer can write and deploy smart contracts permissionlessly. | Anyone. | 🚧 ***Coming soon*** - ImmutableX will have  smart contracts on StarkNet that enable certain functionality (ie. trade settlement contracts) that other applications can permissionlessly send transactions to. |