---
id: "link-errors"
title: "Link Errors"
slug: "/link-errors"
sidebar_position: 13
keywords: [imx-wallets]
---

Find below the list of errors that can be displayed in Link.

## General Errors

| Error Code | Likely Scenario                                             | Displayed Error Message                                                                    | Possible User Actions                                                            | Possible Developer Actions                      |
|------------|-------------------------------------------------------------|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------|
| 1000       | Failed to instantiate SDK IMX Client when connecting wallet | Something went wrong.                                                                      | Contact the Customer Support team.                                               | Check SDK Settings.                             |
| 1001       | Unable to retrieve tokens list                              | Something went wrong retrieving your tokens list: ${apiError}                              | Retry the operation/Refresh the page or Contact support team                     | Try to replicate the issue.                     |
| 1002       | Failed to retrieve the wallet address                       | Something went wrong when retrieving your wallet address. Check with your wallet provider. | Check wallet connection with IMX.Check wallet provider.Contact Customer Support. | Try to replicate the issue. Check console logs. |
| 1003       | Link forcibly closed by the user | Link window closed. | - | Give feedback on the Link closed to the user. |
| 1004       | Failed to open Link as iFrame due to 3rd party cookies blocked | There is no storage available. This is usually related to a 3rd party cookie-blocking policy. | Unblock the 3rd party cookies on the browser. | Give a feedback regarding 3rd party cookies to the user or change Link mode to be opened as popup. |
| :no_entry: ~~1005~~ <small><br/>`Obsolete`</small> | ~~Failed to open Link as iFrame due to application's domain not be whitelisted~~ | ~~Only whitelisted partners can currently embed link using an iframe. Please contact support@immutable.com and quote referrer ${address} for information.~~ | ~~Contact the Customer Support team.~~ | ~~Contact the Customer Support team.~~ |

## Deposits

| Error Code | Likely Scenario                       | Displayed Error Message                                                                    | Possible User Actions                                                   | Possible Developer Actions                      |
|------------|---------------------------------------|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|-------------------------------------------------|
| 2000       | Failed to retrieve the wallet address | Something went wrong when retrieving your wallet address. Check with your wallet provider. | Check wallet connection with IMX.Contact Customer Support.              | Try to replicate the issue. Check console logs. |
| 2001       | Provided invalid ERC20 token          | Token not available in IMX.                                                                | Retry the transaction.Contact support team to report the invalid token. | Try to replicate the issue. Check console logs. |
| 2002       | Insufficient funds                    | Insufficient funds.                                                                        | Add funds to L1 wallet.                                                 | N/A                                             |
| 2003 | API rejected deposits | The API rejected the deposit: ${details} | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## Complete Withdrawal

| Error Code | Likely Scenario                       | Displayed Error Message                                                                    | Possible User Actions                                                            | Possible Developer Actions                      |
|------------|---------------------------------------|--------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------|
| 4000       | Failed to retrieve the wallet address | Something went wrong when retrieving your wallet address. Check with your wallet provider. | Check wallet connection with IMX.Check wallet provider.Contact Customer Support. | Try to replicate the issue. Check console logs. |

## Buy

| Error Code | Likely Scenario                  | Displayed Error Message                                             | Possible User Actions                                                                           | Possible Developer Actions                      |
|------------|----------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------|
| 5000       | Failed to retrieve order details | Something went wrong.-Additional error message provided by the API. | Check wallet connection with IMX.Retry operation.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |
| 5001       | Failed to retrieve asset details | Something went wrong.-Additional error message provided by the API. | Check wallet connection with IMX.Retry operation.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |
| 5002       | Failed trade request             | Something went wrong.-Additional error message provided by the API. | Check wallet connection with IMX.Retry operation.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |
| 5003 | API rejected trades | The API rejected the purchase: ${details} | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## Sell

| Error Code | Likely Scenario                             | Displayed Error Message                                                     | Possible User Actions                                                                             | Possible Developer Actions                                                      |
|------------|---------------------------------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| 6000       | Unable to retrieve asset details            | Something went wrong.-Additional details/error message provided by the API. | Retry operation.If continue to fail, contact Customer Support.                                    | Try to replicate the issue. Check console logs.                                 |
| 6001       | Unable to list asset for sale               | Unable to list asset-Additional details/error message provided by the API.  | Retry operation.Check if asset is already listed.If continue to fail, contact Customer Support.   | Try to replicate the issue. Check console logs.                                 |
| 6002       | Asset is already listed for sale            | Asset is unavailable.                                                       | Retry operation.Confirm if asset is already listed.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs.                                 |
| 6003       | Invalid currency provided as query param    | Unknown currency.                                                           | Retry operation.If continue to fail, contact Customer Support.                                    | Confirm tokens available in IMX.Try to replicate the issue. Check console logs. |
| 6004       | Invalid asset price provided as query param | Price should be at least ${minPrice}                                        | Retry operation with different price.If continue to fail, contact Customer Support.               | N/A                                                                             |
| 6005 | API rejected listings | The API rejected the listing: ${details} | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## Transfer

| Error Code | Likely Scenario                             | Displayed Error Message                                                                                     | Possible User Actions                                          | Possible Developer Actions                                                      |
|------------|---------------------------------------------|-------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|---------------------------------------------------------------------------------|
| 7000       | Failed to retrieve transfer token details   | Something went wrong retrieving token details.                                                              | Retry operation.If continue to fail, contact Customer Support. | Confirm tokens available in IMX.Try to replicate the issue. Check console logs. |
| 7001       | Failed to retrieve user token balance       | Something went wrong retrieving your ${tokenType} token balance                                             | Retry operation.If continue to fail, contact Customer Support. | Confirm tokens available in IMX.Try to replicate the issue. Check console logs. |
| 7002       | Invalid data found before starting transfer | Transfers have failed validation.The following validation errors were identified:${listOfFailedValidations} | Retry operation.If continue to fail, contact Customer Support. | Try to repliace the issue.Check error details.                                  |
| 7003 | API rejected transfers | The API rejected the transfer: ${details} | Retry the operation. If it continues failing, contact the Customer Support team. | Try to replicate the issue. Check the error details. |

## History

| Error Code | Likely Scenario                    | Displayed Error Message                                      | Possible User Actions                                                                  | Possible Developer Actions                      |
|------------|------------------------------------|--------------------------------------------------------------|----------------------------------------------------------------------------------------|-------------------------------------------------|
| 8000       | Failed to retrieve any transaction | Something went wrong retrieving the transactions: ${details} | Retry operation.Check wallet connection.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |

## Cancel

| Error Code | Likely Scenario                      | Displayed Error Message                            | Possible User Actions                                          | Possible Developer Actions                      |
|------------|--------------------------------------|----------------------------------------------------|----------------------------------------------------------------|-------------------------------------------------|
| 9000       | Failed to retrieve the order details | Something went wrong retrieving the order details. | Retry operation.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |
| 9001       | Failed to retrieve token details     | Something went wrong retrieving the token details. | Retry operation.If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |

## Onramp

| Error Code | Likely Scenario                    | Displayed Error Message | Possible User Actions                                          | Possible Developer Actions                 |
| ---------- | ---------------------------------- | ----------------------- | -------------------------------------------------------------- |--------------------------------------------|
| 10001      | Exchange status is failed          | Something went wrong.   | Retry operation.If continue to fail, contact Customer Support. | Check transaction status with IMX/MoonPay. |
| 10002      | Unable to retrieve exchange status | Connection Error.       | Retry operation.If continue to fail, contact Customer Support. | Check transaction status with IMX/MoonPay. |
| 10003      | Invalid crypto currencies          | Invalid currencies.     | Retry operation.If continue to fail, contact Customer Support. | Check supported tokens for Onramp.         |
| 10004      | Could not get currencies           | Something went wrong.   | Retry operation.If continue to fail, contact Customer Support. | Check supported tokens for Onramp. |

## Offramp

| Error Code | Likely Scenario                    | Displayed Error Message  | Possible User Actions                                                                | Possible Developer Actions                      |
| ---------- | ---------------------------------- | ------------------------ | ------------------------------------------------------------------------------------ |-------------------------------------------------|
| 11001      | Exchange status is failed          | Something went wrong.    | Retry operation.If continue to fail, contact Customer Support.                       | Check transaction status with IMX/MoonPay.      |
| 11002      | Unable to retrieve exchange status | Connection Error.        | Retry operation.If continue to fail, contact Customer Support.                       | Check transaction status with IMX/MoonPay.      |
| 11003      | Could not get currencies           | Something went wrong.    | Retry operation.If continue to fail, contact Customer Support.                       | Check supported tokens for Offramp.             |
| 11004      | No currencies left after filtering | Currencies not available | Retry operation.If continue to fail, contact Customer Support.                       | Check supported tokens for Offramp.      |
| 11005      | Invalid currency amount            | Invalid currency amount  | Retry operation with different amount.If continue to fail, contact Customer Support. | Check supported tokens for Offramp.      |
| 11006      | Incorrect transaction format       | Something went wrong.    | Retry operation.If continue to fail, contact Customer Support.                       | Try to replicate the issue. Check console logs. |


## NFT Checkout Primary

| Error Code | Likely Scenario                | Displayed Error Message            | Possible User Actions                                           | Possible Developer Actions                      |
|------------|--------------------------------|------------------------------------|-----------------------------------------------------------------|-------------------------------------------------|
| 12000      | Feature is disabled            | NFT Primary sale is not supported. | Try later, when a feature will be announced                     | Check that a feature should be enabled or not.  |
| 12001      | Cannot create a transaction    | Cannot create a transaction.       | Retry operation. If continue to fail, contact Customer Support. | Try to replicate the issue. Check console logs. |
| 12002      | Cannot connect to imx-exchange | Connection Error.                  | Retry operation. If continue to fail, contact Customer Support. | Check transaction status with IMX/MoonPay.      |
| 12003      | Polling error                  | Cannot retrieve status.            | Retry operation. If continue to fail, contact Customer Support. | Check logs why status polling is failing.       |
| 12004      | Transaction is failed          | Transaction failed.                | Retry operation. If continue to fail, contact Customer Support. | Check transaction status with IMX/MoonPay.      |

## Offers

| Error Code | Likely Scenario                    | Displayed Error Message  | Possible User Actions                                                                | Possible Developer Actions                      |
| ---------- | ---------------------------------- | ------------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| -      | Invalid parameters supplied to link route         | Invalid make offer parameters    | Retry operation. If continue to fail, contact Customer Support.                       | Check that the correct parameters are being passed to the link route and are valid     |
| -      | API is returning an error        | We have encountered an issue with our APIs while processing this request. Please try again. For further assistance please visit our support page.    | Retry operation. If continue to fail, contact Customer Support.                       | Try to replicate the issue. Check console logs.    |
