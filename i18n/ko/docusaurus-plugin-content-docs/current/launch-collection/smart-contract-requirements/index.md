---
title: "Smart contract requirements for minting on layer 2"
slug: "/launch-collection/smart-contract-requirements"
keywords: [imx-dx]
---

In order to mint tokens from a smart contract on ImmutableX's layer 2, there needs to be a deployed token smart contract on L1 with certain properties. These are:
* Must be a non-fungible token contract (read more [here](../../key-concepts/anatomy-smart-contract.md#token-smart-contracts))
* Must have a `mintFor()` function that allows other contracts to mint on its behalf (see [how to implement this](../../key-concepts/anatomy-smart-contract.md##example-contract))