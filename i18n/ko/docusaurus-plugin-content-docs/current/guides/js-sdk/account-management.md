---
id: "account-management"
title: "Account management"
slug: "/account-management"
excerpt: "User wallet registration"
sidebar_position: 2
keywords: [imx-wallets]
---
Your web3 wallet (e.g. Metamask) is used to create, connect, and sign transactions on ImmutableX. Using Link SDK calls, we can handle account management activities.

## Security for your users
If you're integrating your application with ImmutableX, you must use the [Link SDK](../link-sdk/index.md) for registering new users. This ensures that the L2 key that is generated for the user’s wallet is created correctly, and will work across the ecosystem. Failing to create the key correctly may result in a key that cannot be used to deposit or withdraw tokens.

Link SDK must also be used when requesting a user’s signature for an action. Not generating the key with Link may result in security issues for your users.

## Set up wallet for user
Setting up a user’s account is a single call with the Link SDK. The function returns the user’s account information if setup / signed in was completed correctly.
```javascript
async function setupAccount(){
    const {address, starkPublicKey } = await link.setup({});
    //… save user session data
}
```
When called, the Link SDK popup will appear, guiding the user to setup/connect the currently active wallet address.

## Saving user session
Keeping track of the currently logged in user can be done in a variety of ways. One simple approach is to store the information in local storage.
```javascript
async function setupAccount(){
    const {address, starkPublicKey } = await link.setup({});
    localStorage.setItem('WALLET_ADDRESS', address);
    localStorage.setItem('STARK_PUBLIC_KEY', starkPublicKey);
}
```
Once stored, your application can access the user’s information to make other requests such as getting the user’s assets or viewing orders they purchased. Local storage is a good option if looking to persist the users data between web sessions. Retrieving the already setup user’s address on future requests is as simple as the following:
```javascript
const address = localStorage.getItem('WALLET_ADDRESS');
```
## Disconnect wallet
Tracking the user’s connection to ImmutableX should be performed by checking the user’s session. If the user’s session no longer contains the connection data, the setup function should be called again. With this pattern, disconnecting the wallet is done by removing the user’s address from the session. If using the local storage technique, use the following:
```javascript
localStorage.removeItem('WALLET_ADDRESS');
```