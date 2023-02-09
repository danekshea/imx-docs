---
title: "Deep dive into deposits and withdrawals"
slug: "/deep-dive-deposits-withdrawals"
keywords:
  - imx-dx
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Admonition from '@theme/Admonition';

<ListAdmonition>
    <ul>
        <li>What are deposits and withdrawals?</li>
        <li>How do deposits and withdrawals work on ImmutableX and what assets can be deposited and withdrawn?</li>
        <li>What is a mass exit scenario?</li>
    </ul>
</ListAdmonition>

Users may want to transfer assets between L1 and L2, depending on the layer on which they would like to transact with them. This allows them to take advantage of the cheaper transaction fees on L2 for actions such as buying or selling NFTs, and they can withdraw them to L1 anytime they decide they want to transact on that layer instead.

#### Terminology to note:
* "Deposits" - transferring an asset from L1 to L2 (depositing to L2)
* "Withdrawal" - transferring an asset from L2 to L1 (withdrawing to L1)
* "Bridging" - another term for transferring assets between different layers

### Supported asset types
:::note
Only ERC-721 assets **minted on ImmutableX L2** can be deposited and withdrawn on ImmutableX.
:::

| Token type                                            | Deposit | Withdrawal |
| ----------------------------------------------------- | ------- | ---------- |
| ERC-20 (fungible tokens, including ETH and IMX)       | ✅       | ✅          |
| ERC-721 (non-fungible tokens) minted on ImmutableX L2 | ✅       | ✅          |

### Example use cases

#### Depositing from L1 to L2
* A user wants to buy an NFT on L2 with ETH, however, does not have any ETH in their L2 wallet. They transfer ETH from their L1 wallet to L2 to enable them to purchase the NFT.

#### Withdrawing from L2 to L1
* A user has earned ETH from selling their NFT on L2, however, they want to use this ETH on L1 so they transfer it from their L2 to L1 wallet.
* A user has purchased an NFT on an Immutable marketplace, however, now wants to sell it on an L1 marketplace, so they withdraw it from L2 to L1 in order to do so.

## Deposits and withdrawals on ImmutableX

<Admonition type="info" title="Guide:" icon="">
    📘 <a href="./how-to-enable-deposits-withdrawals">How to facilitate asset deposits and withdrawals</a>
</Admonition>

### Deposits
Before a user can deposit an asset from L1 onto L2, [these pre-requisites](../guides/basic-guides/deposits-withdrawals/index.md#deposit-pre-requisites) must be met.

Here's what happens under the hood when a deposit is made on ImmutableX:
* Immutable allocates a vault to hold the user's asset on L1
* An asset identifier is created that represents the asset on L2, so that it can be utilized and transacted with on that layer

#### High-level overview of the asset depositing process:
![Asset Deposits](/img/AssetDeposits.png)

### Withdrawals
Here's what happens under the hood when a withdrawal is made on ImmutableX:
* Immutable returns the vault ID that is holding the user's asset on L1
* The withdrawal request is validated and submitted to the StarkEx contract to be included in the next batch of transactions
* When the batch including the withdrawal transaction has been posted to L1 (on-chain state update), the user can withdraw the asset

#### High-level overview of the asset withdrawal process:
![Asset Withdrawals](/img/Withdrawals.png)

### Mass exit scenario
This occurs when a user decides to request for a full withdrawal of their assets from an exchange. This kicks off a sequence of events known as a "mass exit scenario" where the exchange is given a timeframe (known as a "freeze grace period", ie. 7 days), to service the withdrawal request.

#### How does an exchange fulfil this request?
It submits a STARK proof indicating that the asset has been released from the L2 vault. Upon acceptance of the proof, the contract adds the withdrawn amount/tokens to the L1 (on-chain) vault. The user can then withdraw this amount from the on-chain vault into their account via a normal on-chain withdrawal request.

#### What if the exchange fails to fulfil this?
If the exchange fails to service the request (does not submit a valid proof within the given timeframe), the user is entitled to "freeze the contract", which indicates that this request was not serviced. They can then obtain a merkle tree path of their vault to be evicted with respect to the frozen vault tree root via the data availability committee (DAC) and submit the proof on-chain. If the proof is valid, the escape is successful and assets are added to an on-chain vault to be withdrawn only by the user.
