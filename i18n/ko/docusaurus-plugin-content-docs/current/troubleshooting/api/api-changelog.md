---
title: "Changelog"
slug: "/api-changelog"
sidebar_position: 2
---

# API changelog

This page is to provide information on:
- [API changelog](#api-changelog)
    - [Backwards compatible changes (non-breaking):](#backwards-compatible-changes-non-breaking)
  - [Upcoming breaking changes](#upcoming-breaking-changes)
  - [Changelog](#changelog)


Currently, we use resource versioning (URI-based), i.e. `/v1/<endpoint>`. While we aim to ensure that breaking changes (non-[backwards compatible changes](#backwards-compatible-changes-non-breaking)) are versioned, there are occasions where it is necessary for us to introduce a breaking change to an existing endpoint. This will be communicated to you in advance, and information about this will also be made available on this page.

### Backwards compatible changes (non-breaking):
* Adding new API resources.
* Adding new optional request parameters to existing API methods.
* Adding new properties to existing API responses.
* Changing the order of properties in existing API responses.
* Changing the length or format of opaque strings, such as object IDs, error messages, and other human-readable strings. This includes adding or removing fixed prefixes.

## Upcoming breaking changes

<!-- TODO - convert this to a HTML table -->
| Anticipated date of change | Description of change |
| -------------------------- | --------------------- |
|                            |                       |

## Changelog

<table>
  <tbody>
    <tr>
      <th>Date</th>
      <th>Non-breaking changes</th>
      <th>Breaking changes</th>
    </tr>
    <tr>
      <td>12 Dec 2022</td>
      <td></td>
      <td>
        <b>Developer Hub</b>
        <ul>
            <li>Release of <a href="https://hub.immutable.com" target="_blank">Immutable Developer Hub</a></li>
            <li>The <a href="https://docs.x.immutable.com/reference/#/operations/createProject" target="_blank">Create Project API</a> requires your email to be verified and you are fully onboarded via the Developer Hub</li>
            <li>Onboarding requires <a href="https://docs.x.immutable.com//docs/launch-collection/register-project#1-signup-to-the-immutable-developer-hub">sign-up to Developer Hub</a> to create projects</li>
        </ul>
      </td>
    </tr>    
    <tr>
      <td>3 Nov 2022</td>
      <td>
        <b>Exchange on and off-ramp APIs</b>
        <ul>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/createExchange">createExchange</a> - create an on-ramp or an off-ramp request</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/getExchange">getExchange</a> - Get exchange transaction details</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/getExchangeSignableTransfer">getExchangeSignableTransfer</a> - get the object for an exchange on or off-ramp transfer request</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/createExchangeTransfer">createExchangeTransfer</a> - Initiate the off-ramp request</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/getExchanges">getExchanges</a> - Gets a list of exchanges based on the request</li>
        </ul>
        <b>NFT primary sale card checkout APIs</b>
        <ul>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/registerNftPrimarySalesContract">registerNftPrimarySalesContract</a> - executes NFT primary sales contract registration</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/createNftPrimary">createNftPrimary</a> - create NFT primary sale transaction</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/getNftPrimaryTransaction">getNftPrimaryTransaction</a> - Get NFT primary sale transaction by id</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/getNftPrimaryTransactions">getNftPrimaryTransactions</a> - Get a list of NFT primary sale transactions</li>
            <li><a href="https://docs.x.immutable.com/reference/#/operations/getCurrenciesNFTCheckoutPrimary">getCurrenciesNFTCheckoutPrimary</a> - Get currencies with limits</li>
        </ul>
      </td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
    <tr>
      <td></td>
      <td>
        <ul>
        </ul>
      </td>
      <td>
        <ul>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
