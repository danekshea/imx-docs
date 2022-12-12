---
description: Additional info about the Golang Core SDK
id: additional-info
slug: /additional-info
tags: [core-sdk-golang]
keywords: [imx-dx]
---

# Additional info

## Get data (on assets, orders, past transactions, etc.)

These methods allow you to read data about events, transactions or current state on Immutable X (layer 2). They do not require any user authentication because no state is being changed.

Examples of the types of data that are typically retrieved include:

- Assets or details of a particular asset
- Token balances for a particular user
- Orders or details about a particular order
- Historical trades and transfers

### Examples

#### Get all collections and get assets from a particular collection:

```go
listCollectionsRequest := c.NewListCollectionsRequest(context.TODO())
listCollectionsRequest.PageSize(2)

listCollectionsResponse, err := c.ListCollections(&listCollectionsRequest)
if err != nil {
    log.Panicf("error in ListCollections: %v\n", err)
}

collection := listCollectionsResponse.Result[0]

listAssetsRequest := c.NewListAssetsRequest(context.TODO())
listAssetsRequest.Collection(collection.Address)
listAssetsRequest.PageSize(10)

listAssetsResponse, err := c.ListAssets(&listAssetsRequest)
if err != nil {
    log.Panicf("error in ListAssets: %v\n", err)
}
```

## Operations requiring user signatures

There are two types of operations requiring user signatures:

1. Transactions that update blockchain state
2. Operations that Immutable X require authorization for

In order to get user signatures, applications need to [generate "signers"](#how-do-applications-generate-and-use-signers).

### What are transactions that update blockchain state?

A common transaction type is the transfer of asset ownership from one user to another (ie. asset sale). These operations require users to sign (approve) them to prove that they are valid.

### What are operations that require authorization?

These operations add to or update data in Immutable's databases and typically require the authorization of an object's owner (ie. a user creating a project on Immutable X).

### How do applications generate and use signers?

Signers are abstractions of user accounts that can be used to sign transactions. A user's private key is required to generate them.

There are two ways to get signers in your application:

1. [Generate your own by obtaining and using the user's private keys](#1-generate-your-own-signers)
2. [Use our Wallet SDK to connect to a user's wallet application](#2-generate-signers-using-the-wallet-sdk)

The first option, where an application obtains a user's private key directly, is risky because these keys allow anyone in possession of them full control of an account.

The second option provides an application with an interface to the user's account by prompting the user to connect with their wallet application (ie. mobile or browser wallet). Once connected the app can begin asking the user to sign transactions and messages without having to reveal their private key.

As Immutable X enables applications to execute signed transactions on both Ethereum (layer 1) and StarkEx (layer 2), signers are required for both these layers.

### 1. Generate your own signers

The Core SDK provides functionality for applications to generate Stark (L2) [private keys](https://github.com/immutable/imx-core-sdk-golang/blob/69af5db9a0be05afd9c91c6b371547cfe3bea719/imx/signers/stark/factory.go#L22) and [signers](https://github.com/immutable/imx-core-sdk-golang/blob/69af5db9a0be05afd9c91c6b371547cfe3bea719/imx/signers/stark/signer.go#L16).

#### 🚨🚨🚨 Warning 🚨🚨🚨
> If you generate your own Stark private key, you will have to persist it. The key is [randomly generated](https://github.com/immutable/imx-core-sdk-golang/blob/69af5db9a0be05afd9c91c6b371547cfe3bea719/imx/signers/stark/factory.go#L22) so **_cannot_** be deterministically re-generated.

```go
apiConfiguration := api.NewConfiguration()
cfg := imx.Config{
    APIConfig:     apiConfiguration,
    AlchemyAPIKey: YOUR_ALCHEMY_API_KEY,
    Environment:   imx.Sandbox,
}

// Create Ethereum signer
l1signer, err := ethereum.NewSigner(YOUR_PRIVATE_ETH_KEY, cfg.ChainID)
if err != nil {
    log.Panicf("error in creating L1Signer: %v\n", err)
}

// Endpoints like Withdrawal, Orders, Trades, Transfers require an L2 (stark) signer
// Create Stark signer
starkPrivateKey, err = stark.GenerateKey() // Or retrieve previously generated key
if err != nil {
    log.Panicf("error in Generating Stark Private Key: %v\n", err)
}

l2signer, err := stark.NewSigner(starkPrivateKey)
if err != nil {
    log.Panicf("error in creating StarkSigner: %v\n", err)
}
```

### 2. Generate signers using the Wallet SDK

The [Wallet SDK Web](https://docs.x.immutable.com/sdk-docs/wallet-sdk-web/overview) provides connections to Metamask and WalletConnect browser wallets.

See [this guide](https://docs.x.immutable.com/sdk-docs/wallet-sdk-web/quickstart) for how to set this up.

### Examples

#### Create a project (requires an Ethereum layer 1 signer)

```go
// Create a new project demo.
createProjectResponse, err := c.CreateProject(ctx, l1signer, "My Company", "Project name", "project@company.com")
if err != nil {
    log.Panicf("error in CreateProject: %v\n", err)
}

// Get the project details we just created.
projectId := strconv.FormatInt(int64(createProjectResponse.Id), 10)
getProjectResponse, err := c.GetProject(ctx, l1signer, projectId)
if err != nil {
    log.Panicf("error in GetProject: %v", err)
}
```

#### Deposit tokens from L1 to L2 (requires an Ethereum layer 1 signer)

```go
// Eth Deposit
ethAmountInWei := uint(500000000000000000) // Amount in wei
depositResponse, err := imx.NewETHDeposit(ethAmountInWei).Deposit(ctx, c, l1signer, nil)
if err != nil {
    log.Panicf("error calling Eth deposit workflow: %v", err)
}
```

#### Create an order (requires an Ethereum layer 1 and StarkEx layer 2 signer)

```go
// The amount (listing price) should be in Wei for Eth tokens,
// see https://docs.starkware.co/starkex-v4/starkex-deep-dive/starkex-specific-concepts
// and https://eth-converter.com/
createOrderRequest := &api.GetSignableOrderRequest{
    AmountBuy:  strconv.FormatUint(amount, 10),
    AmountSell: "1",
    Fees:       nil,
    TokenBuy:   imx.SignableETHToken(),                         // The listed asset can be bought with 
    TokenSell:  imx.SignableERC721Token(tokenID, tokenAddress), // NFT Token
    User:       l1signer.GetAddress(),                          // Address of the user listing for sale.
}
createOrderRequest.SetExpirationTimestamp(0)

// Create order will list the given asset for sale.
createOrderResponse, err := c.CreateOrder(ctx, l1signer, l2signer, createOrderRequest)
if err != nil {
    log.Panicf("error in CreateOrder: %v", err)
}
```


### Contract requests

ImmutableX is built as a ZK-rollup in partnership with StarkWare. We chose ZK-rollups because it is the only L2 scaling solution that has the same security guarantees as layer 1 Ethereum. The upshot of this is that you can mint or trade NFTs on ImmutableX with zero gas costs whilst not compromising on security -- the first true “layer 2” for NFTs on Ethereum.

The Core SDK provides interfaces for all smart contracts required to interact with the ImmutableX platform.

[See all smart contracts available in the Core SDK](#smart-contract-autogeneration)

```go
// This example is only to demonstrate using the generated smart contract clients
// We recommend using the Deposit method from https://github.com/immutable/imx-core-sdk-golang/blob/69af5db9a0be05afd9c91c6b371547cfe3bea719/imx/deposit.go to deposit NFT
func DepositNft(l1signer immutable.L1Signer, starkPublicKey, assetType, vaultID, tokenID *big.Int, overrides *bind.TransactOpts) (*types.Transaction, error) {
    apiConfiguration := api.NewConfiguration()
    cfg := imx.Config{
        APIConfig:     apiConfiguration,
        AlchemyAPIKey: YOUR_ALCHEMY_API_KEY,
        Environment:   imx.Sandbox,
    }
    client, err := imx.NewClient(&cfg)
    if err != nil {
        log.Panicf("error in NewClient: %v\n", err)
    }
    defer c.EthClient.Close()

    opts := c.buildTransactOpts(ctx, l1signer, overrides)
    transaction, err := client.CoreContract.DepositNft(opts, starkPublicKey, assetType, vaultID, tokenID)
    if err != nil {
        return nil, err
    }
    log.Println("transaction hash:", transaction.Hash())
    return transaction, nil
}
```

### Smart contract autogeneration

The Immutable Solidity contracts can be found in the `contracts` folder. Contract bindings in Golang are generated using [abigen](https://geth.ethereum.org/docs/dapp/native-bindings#abigen-go-binding-generator).

#### Core

The Core contract is Immutable's main interface with the Ethereum blockchain, based on [StarkEx](https://docs.starkware.co/starkex-v4).

[View contract](https://github.com/immutable/imx-core-sdk-golang/blob/632e4ed6975cf8da03e2dcb36291333391fe9f96/solidity/Core.sol)

#### Registration

The Registration contract is a proxy smart contract for the Core contract that combines transactions related to onchain registration, deposits and withdrawals. When a user who is not registered onchain attempts to perform a deposit or a withdrawal, the Registration combines requests to the Core contract in order to register the user first. Users who are not registered onchain are not able to perform a deposit or withdrawal.

For example, instead of making subsequent transaction requests to the Core contract, i.e. `registerUser` and `depositNft`, a single transaction request can be made to the proxy Registration contract - `registerAndWithdrawNft`.

[View contract](https://github.com/immutable/imx-core-sdk-golang/blob/632e4ed6975cf8da03e2dcb36291333391fe9f96/solidity/Registration.sol)

#### IERC20

Standard interface for interacting with ERC20 contracts, taken from [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#IERC20).

#### IERC721

Standard interface for interacting with ERC721 contracts, taken from [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721).
