---
id: "wallet-sdk-ui-guide"
title: "User wallet interactions"
slug: "/wallet-sdk-ui-guide"
sidebar_position: 1
keywords: [imx-wallets]
---

# User wallet interactions

This guide is aimed at providing clarity on the minimum requirements when implementing user wallet connections and interactions. 

Previously, applications using the [Link SDK](../link-sdk/index.md) did not have to worry about this because the Link SDK provided an opinionated UI that implemented our best practices. Now, when using the [Core SDK with the Wallet SDK](../../sdks.mdx#how-do-the-sdks-work-together), applications may need to implement their own design. Other than the must-haves outlined in this guide, the rest is up the application.

### Interactions:
* [Connect wallet](#connect-wallet)
* [Disconnect wallet](#disconnect-wallet)
* [List asset](#list-asset)
* [Buy asset](#buy-asset)
* [L1 to L2 deposit](#l1-to-l2-deposit)
* [L2 to L1 withdrawals](#l2-to-l1-withdrawals)
* [Fiat onramp](#fiat-onramp)
* [Crypto to fiat offramp](#crypto-to-fiat-offramp)
* [Error states](#error-states)
* [Transaction history](#transaction-history)

### Connect wallet

<table>
        <tr>
            <th>Flow</th>
            <th>Link UI / Immutable marketplace example</th>
            <th>Requirements</th>
        </tr>
        <tr>
            <td>Provider list</td>
            <td><a href="/img/wallet-sdk-ui-guide/list.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/list.png" alt="Provider List" width="85%" height="85%" /></a></td>
            <td>
                <ul>
                    <li>Provide a mechanism to surface the wallet options</li>
                    <li>Include user acceptance statement of Immutable’s T&C and privacy policy</li>
                </ul>    
            </td>
        </tr>
        <tr>
            <td>Email login</td>
            <td><a href="/img/wallet-sdk-ui-guide/email.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/email.png" alt="Email Login" width="85%" height="85%" /></a></td>
            <td>
                If an application chooses to provide the email wallet (provided by Magic) as an option, it must:
                <ul>
                    <li>Provide a field for the user to enter their email address</li>
                    <li>Include Magic’s T&C and privacy policy</li>
                </ul>    
            </td>
        </tr>
        <tr>
            <td>MetaMask + GameStop</td>
            <td><a href="/img/wallet-sdk-ui-guide/sign.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/sign.png" alt="Signature Request" width="85%" height="85%" /></a></td>
            <td>
                Not mandatory, but useful to include:
                <ul>
                    <li>An explanation of why there are multiple signature requests from the non-custodial wallet for:</li>
                    <ul>
                        <li>Connecting to a user wallet</li>
                        <li>Requesting for the user's signature</li>
                        <li>Setting up an ImmutableX layer 2 wallet key (only needed the first time a user connects with ImmutableX - this is user registration)</li>
                    </ul>
                    <li>If MetaMask and GameStop are both provided as wallet options, explain that having both plugins at the same time can create wallet connection issues (more information available <a href="https://support.immutable.com/hc/en-us/articles/5160531224079-Managing-multiple-wallet-extensions-for-Immutable">here</a>)</li>
                </ul>    
            </td>
        </tr>
        <tr>
            <td>Wallet connected</td>
            <td></td>
            <td>
                Not mandatory, but useful to include:
                <ul>
                    <li>User feedback that wallet is successfully connected</li>
                </ul>    
            </td>
        </tr>
</table>

### Disconnect wallet

<table>
    <tr>
            <th>Flow</th>
            <th>Link UI / Immutable marketplace example</th>
            <th>Requirements</th>
        </tr>
        <tr>
            <td>Disconnect wallet</td>
            <td><a href="/img/wallet-sdk-ui-guide/disconnect.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/disconnect.png" alt="Disconnect Wallet" width="85%" height="85%" /></a></td>
            <td>
                <ul>
                    <li>Provide an way for users to disconnect their wallets from the application</li>
                </ul>    
            </td>
        </tr>
</table>

### List asset

<table>
    <tr>
            <th>Flow</th>
            <th>Link UI / Immutable marketplace example</th>
            <th>Requirements</th>
        </tr>
        <tr>
            <td>Listing screen</td>
            <td>
                <a href="/img/wallet-sdk-ui-guide/list-1.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/list-1.png" alt="List asset 1" width="65%" height="65%" /></a><br/>
                <a href="/img/wallet-sdk-ui-guide/list-2.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/list-2.png" alt="List asset 2" width="85%" height="85%" /></a>
            </td>
            <td>
                <ul>
                    <li>Enable the user to input their listing price</li>
                    <li>Enable the user to select their listing currency (if multiple options are provided)</li>
                    <li>Provide breakdown of any maker and taker fees that apply</li>
                </ul>
                Not mandatory, but useful to have:
                <ul>
                    <li>Processing indicator when the user has initiated listing an asset and the transaction has not yet completed</li>
                    <li>Feedback when an asset has successfully been listed</li>
                </ul>    
            </td>
        </tr>
</table>

### Buy asset

<table>
    <tr>
            <th>Flow</th>
            <th>Link UI / Immutable marketplace example</th>
            <th>Requirements</th>
        </tr>
        <tr>
            <td>Asset screen</td>
            <td>
                <a href="/img/wallet-sdk-ui-guide/buy.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/buy.png" alt="Buy Asset Screen" width="85%" height="85%" /></a>
            </td>
            <td>
                <ul>
                    <li>Display the purchase price</li>
                    <li>Display the purchase currency</li>
                    <li>Provide breakdown of any maker and taker fees that apply</li>
                </ul>
                Not mandatory, but useful to have:
                <ul>
                    <li>User feedback that purchase was successful</li>
                    <li>Send users to an "add funds" flow if they have insufficient funds</li>
                </ul>    
            </td>
        </tr>
</table>

### L1 to L2 deposit

<table>
    <tr>
            <th>Flow</th>
            <th>Link UI / Immutable marketplace example</th>
            <th>Requirements</th>
        </tr>
        <tr>
            <td>Add funds flow</td>
            <td>
                <a href="/img/wallet-sdk-ui-guide/add-funds.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/add-funds.png" alt="Add Funds" width="65%" height="65%" /></a>
            </td>
            <td>
                <ul>
                    <li>Provide an "add funds" flow</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Deposit flow</td>
            <td>
                <a href="/img/wallet-sdk-ui-guide/deposit.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/deposit.png" alt="Deposit Screen" width="65%" height="65%" /></a>
            </td>
            <td>
                <ul>
                    <li>Provide a field for the user to input the currency type</li>
                    <li>Provide a field for the user to input the amount they want to deposit</li>
                </ul>
                Not mandatory, but useful to have:
                <ul>
                    <li>Icons representing different currency types</li>
                    <li>Available L1 balance to be deposited</li>
                    <li> Feedback when a deposit is successful</li>
                </ul>    
            </td>
        </tr>
</table>

### L2 to L1 withdrawals

<table>
    <tr>
        <th>Flow</th>
        <th>Link UI / Immutable marketplace example</th>
        <th>Requirements</th>
    </tr>
    <tr>
        <td>Withdraw flow</td>
        <td>
            <a href="/img/wallet-sdk-ui-guide/withdrawal-1.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/withdraw-1.png" alt="Withdraw Screen" width="65%" height="65%" /></a><br/>
            <a href="/img/wallet-sdk-ui-guide/withdrawal-2.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/withdraw-2.png" alt="Withdraw Confirmation" width="65%" height="65%" /></a>
        </td>
        <td>
            <strong>Partner must</strong>
            <ul>
                <li>Surface withdrawal flow</li>
                <li>Collect currency type (assuming multiple currencies available to be withdrawn)</li>
                <li>Collect amount to be withdrawn</li>
            </ul>
            Useful to have:
            <ul>
                <li>Icon for different currency types</li>
                <li>Available L2 balance to be deposited</li>
                <li>Notice that withdrawal will require L1 gas to be paid</li>
                <li>Notice that withdrawal has 2 stage: preparation & execution of withdrawal (more information available <a href="https://support.immutable.com/hc/en-us/articles/1500003550482">here</a>)</li>
            </ul>
        </td>
    </tr>
</table>

### Fiat onramp

:::note

_Fiat onramp_ is still under development and not available in the SDK yet.

:::

<table>
    <tr>
        <th>Flow</th>
        <th>Link UI / Immutable marketplace example</th>
        <th>Requirements</th>
    </tr>
    <tr>
        <td>Fiat onramp</td>
        <td>
            <a href="/img/wallet-sdk-ui-guide/fiat-onramp.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/fiat-onramp.png" alt="Add Funds" width="65%" height="65%" /></a>
        </td>
        <td>
            <ul>
                <li>Trigger the onramp flow (the MoonPay widget will take care of the rest)</li>
            </ul>
        </td>
    </tr>
</table>

### Crypto to fiat offramp

:::note

_Crypto to fiat offramp_ is still under development and not available in the SDK yet.

:::


<table>
    <tr>
        <th>Flow</th>
        <th>Link UI / Immutable marketplace example</th>
        <th>Requirements</th>
    </tr>
    <tr>
        <td>Crypto offramp</td>
        <td>
            <a href="/img/wallet-sdk-ui-guide/fiat-offramp.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/fiat-offramp.png" alt="Withdraw to bank account" width="65%" height="65%" /></a>
        </td>
        <td>
            <ul>
                <li>Trigger the offramp flow (the MoonPay widget will take care of the rest)</li>
            </ul>
            Not mandatory, but useful to have:
            <ul>
                <li>A note informing the user that the MoonPay offramp is only available to users in the US, UK, and EU.</li>
            </ul>
        </td>
    </tr>
</table>

### Error states

<table>
    <tr>
        <th>Flow</th>
        <th>Link UI / Immutable marketplace example</th>
        <th>Requirements</th>
    </tr>
    <tr>
        <td>Error states</td>
        <td>
            <a href="/img/wallet-sdk-ui-guide/errors.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/errors.png" alt="Error screens" width="65%" height="65%" /></a>
        </td>
        <td>
            <ul>
                <li>Provide user feedback about specific errors (full list of errors can be found <a href="https://docs.x.immutable.com/docs/link-errors/">here</a>)</li>
            </ul>
            Not mandatory, but useful to have:
            <ul>
                <li>Link to Immutable support page</li>
            </ul>
        </td>
    </tr>
</table>

### Transaction history

:::note

_Transaction history_ is still under development and not available in the SDK yet.

:::


<table>
    <tr>
        <th>Flow</th>
        <th>Link UI / Immutable marketplace example</th>
        <th>Requirements</th>
    </tr>
    <tr>
        <td>Transaction history</td>
        <td>
            <a href="/img/wallet-sdk-ui-guide/transaction-history.png" target="_blank"><img src="/img/wallet-sdk-ui-guide/transaction-history.png" alt="Transaction history screen" width="65%" height="65%" /></a>
        </td>
        <td>
            <ul>
                <li>Provide users with the ability to view their transaction history</li>
                <li>For each transaction, they must provide information about the transaction ID, asset details, type of transaction and the costs involved.</li>
            </ul>
        </td>
    </tr>
</table>
