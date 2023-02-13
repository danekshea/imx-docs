---
title: "Asset transfers"
slug: "/how-to-enable-asset-transfers"
keywords: [imx-wallets]
---

import ListAdmonition from '@site/src/components/ListAdmonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A user might want to transfer their asset from one wallet to another for various reasons, ie. sending the asset as a gift.

<ListAdmonition label="Guides">
    <ul>
        <li><a href="#core-sdk">Core SDK</a></li>
        <li><a href="./linktransfer">Link SDK</a></li>
    </ul>
</ListAdmonition>

## Core SDK

### 1. Initialize the Core SDK
In order to use the Core SDK, you need to [initialize it](../install-initialize/index.md#core-sdk).

### 2. Generate signers
Transferring an asset requires a user's signature, so your application will need to [generate signers](../generate-signers/index.md).

### 3. Set the transfer params
The transfer request requires:
1. ETH and Stark signers (see [previous step](#2-generate-signers))
2. [Token type](#token-types-that-can-be-transferred-and-details-required), and token amount/details to be transferred
3. Address of receiving account

#### Token types that can be transferred and details required:
* ETH - `amount`
* ERC20 - `amount`, `tokenAddress`
* ERC721 - `tokenAddress`, `tokenId`

| Param | Description |
| --- | --- |
| `amount` | The amount of the token required. If token is ETH, the amount is denominated in wei |
| `tokenAddress` | The address of the smart contract from which the token originates |
| `tokenId` | The token ID of a non-fungible token (only for ERC721 token types) |

<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/types/index.unsignedtransferrequest">unsignedTransferRequest</a></li>
    </ul>
</ListAdmonition>

Example request params for the different token types:

```ts title="ETH"
const unsignedTransferRequest = {
  type: "ETH",
  amount: "100000000", // Denominated in wei
  receiver: "RECEIVER'S ETH ADDRESS",
}
```

```ts title="ERC20"
const unsignedTransferRequest = {
  type: "ERC20",
  amount: "100000000",
  tokenAddress: '0x...'
  receiver: "RECEIVER'S ETH ADDRESS",
}
```

```ts title="ERC721"
const unsignedTransferRequest = {
  type: "ERC721",
  tokenId: '1',
  tokenAddress: '0x...',
  receiver: "RECEIVER'S ETH ADDRESS",
}
```
  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

<ListAdmonition label="SDK reference">
    <ul>
        <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.model/-asset-model/index.html">AssetModel</a></li>
        <ul>
            <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.model/-erc20-asset/index.html">Erc20Asset</a></li>
            <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.model/-erc721-asset/index.html">Erc721Asset</a></li>
            <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk.model/-eth-asset/index.html">EthAsset</a></li>
        </ul>
    </ul>
</ListAdmonition>

Example request params for the different token types:

```kotlin title="ETH"
val token = EthAsset(
  quantity = "100000000"
)
```

```kotlin title="ERC20"
val token = Erc20Asset(
  tokenAddress = "0x...",
  decimals = 18,
  quantity = "100000000"
)
```

```kotlin title="ERC721"
val token = Erc721Asset(
  tokenAddress = "0x...",
  tokenId: "1"
)
```

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/createtransferrequest">createTransferRequest</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx/api#GetSignableTransferRequestV1">GetSignableTransferRequestV1</a></li>
          <li>Token type models:</li>
          <ul>
              <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/tokens.go#L21-L28">SignableETHToken</a></li>
              <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/tokens.go#L32-L40">SignableERC20Token</a></li>
              <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/tokens.go#L44-L52">SignableERC721Token</a></li>
          </ul>
      </ul>
  </ListAdmonition>

```go
import (
  "github.com/immutable/imx-core-sdk-golang/imx"
  "github.com/immutable/imx-core-sdk-golang/tokens"
  "github.com/immutable/imx-core-sdk-golang/examples/workflows/utils"
)

var l1signer imx.L1Signer

// ETH token
transferRequest := api.GetSignableTransferRequestV1{
  Token: *tokens.SignableETHToken(),
  // Amount to be transferred, denominated in wei
  Amount: "100000000",
  // Sender's ETH address
  Sender: l1signer.GetAddress(),
  // Receiver's ETH address
  Receiver: "UPDATE WITH RECEIVER'S ETH ADDRESS",
}

// ERC20 token
transferRequest := api.GetSignableTransferRequestV1{
  // Pass in decimals and token address
  Token: *tokens.SignableERC20Token(18, "0x..."),
  Amount: "100000000",
  Sender: l1signer.GetAddress(),
  Receiver: "UPDATE WITH RECEIVER'S ETH ADDRESS",
}

// ERC721 token
transferRequest := api.GetSignableTransferRequestV1{
  // Pass in token address and token ID
  Token: *tokens.SignableERC721Token("0x...", "1"),
  Sender: l1signer.GetAddress(),
  Receiver: "UPDATE WITH RECEIVER'S ETH ADDRESS",
}
```

#### See also:
  <ListAdmonition label="Example">
      <ul>
          <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/transfer/main.go">Transfer</a></li>
      </ul>
  </ListAdmonition>
  </TabItem>
</Tabs>

### 4. Create the transfer
<Tabs>
  <TabItem value="typescript" label="Typescript Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-ts/1.0.0-beta.3/classes/immutablex.immutablex#transfer">transfer</a></li>
      </ul>
  </ListAdmonition>

```ts
const walletConnection = { ethSigner, starkSigner }

// Transfers the asset
const response = await client.transfer(
  walletConnection,
  unsignedTransferRequest,
);

// Print out the response
console.log(response);
```

#### Example response:
```ts
interface CreateTransferResponseV1 {
  /**
  * [deprecated] Sent signature
  * @type {string}
  */
  'sent_signature': string;
  /**
  * [deprecated] The status of transfer
  * @type {string}
  */
  'status': string;
  /**
  * [deprecated] Time of the transfer
  * @type {number}
  */
  'time': number;
  /**
  * ID of the transfer
  * @type {number}
  */
  'transfer_id': number;
}
```

  </TabItem>
  <TabItem value="kotlin" label="Kotlin (JVM) Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-kotlin/0-6-0/imx-core-sdk-kotlin-jvm/com.immutable.sdk/-immutable-x-core/transfer.html">transfer</a></li>
      </ul>
  </ListAdmonition>

```kotlin
import com.immutable.sdk.ImmutableXCore.transfer
import com.immutable.sdk.Signer
import com.immutable.sdk.StandardStarkSigner
import com.immutable.sdk.model.Erc20Asset
import jdk.jpackage.internal.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.future.await
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking

fun main(): Unit = runBlocking {
    launch(Dispatchers.Default) {
        val signer : Signer
        val starkSigner : StandardStarkSigner

        try {
            // Token to be transferred
            val token = Erc20Asset(
                tokenAddress = "0x...",
                decimals = 18,
                quantity = "100000000"
            )
            
            // Executes the transfer workflow
            val createTransferResponse = transfer(
                token = token,
                recipientAddress = "UPDATE WITH RECEIVER'S ETH ADDRESS",
                signer = signer,
                starkSigner = starkSigner
            ).await()
            
            // Prints the response
            Log.verbose(createTransferResponse.toString())
        } catch (e: Exception) {
            throw e
        }
    }
}
``` 

#### Example response:
```kotlin
data class CreateTransferResponse (
    /* List of transfer IDs */
    @Json(name = "transfer_ids")
    val transferIds: kotlin.collections.List<kotlin.Int>
)
```

  </TabItem>
  <TabItem value="Swift" label="Swift Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://docs.x.immutable.com/sdk-references/core-sdk-swift/0-4-0/documentation/immutablexcore/transfersapi/createtransfer(ximxethaddress:ximxethsignature:createtransferrequestv2:)">createTransfer</a></li>
      </ul>
  </ListAdmonition>

  </TabItem>
  <TabItem value="go" label="Golang Core SDK">

  <ListAdmonition label="SDK reference">
      <ul>
          <li><a href="https://pkg.go.dev/github.com/immutable/imx-core-sdk-golang@v0.2.1/imx#Client.Transfer">Transfer</a></li>
      </ul>
  </ListAdmonition>

```go
// Transfer asset workflow example
package transferexample

import (
  "context"
  "log"

  "github.com/immutable/imx-core-sdk-golang/generated/api"
  "github.com/immutable/imx-core-sdk-golang/imx"
  transfersWorkflow "github.com/immutable/imx-core-sdk-golang/workflows/transfers"
)

func main() {
  var ctx context.Context
  var apiClient imx.Client
  var l1signer imx.L1Signer
  var l2signer imx.l2signer
  var transferRequest api.GetSignableTransferRequestV1

  // Executes the transfer workflow
  response, err := transfersWorkflow.CreateTransfer(ctx, apiClient, l1signer, l2signer, transferRequest)
  if err != nil {
    log.Panicf("error in executing the transfer workflow: %v\n", err)
  }

  // Prints out the response
  log.Printf("Response: %v", response)
}
```

#### Example response:
```go
type CreateTransferResponseV1 struct {
  // [deprecated] Sent signature
  SentSignature string `json:"sent_signature"`
  // [deprecated] The status of transfer
  Status string `json:"status"`
  // [deprecated] Time of the transfer
  Time int32 `json:"time"`
  // ID of the transfer
  TransferId int32 `json:"transfer_id"`
}
```

#### See also:
  <ListAdmonition label="Example">
      <ul>
          <li><a href="https://github.com/immutable/imx-core-sdk-golang/blob/main/imx/examples/transfer/main.go">Transfer</a></li>
      </ul>
  </ListAdmonition>
  </TabItem>
</Tabs>


