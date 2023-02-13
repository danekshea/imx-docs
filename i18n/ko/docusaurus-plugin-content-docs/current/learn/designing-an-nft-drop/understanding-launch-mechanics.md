---
sidebar_position: 2
title: "Understanding launch mechanics"
slug: "/learn/understanding-launch-mechanics"
keywords: [imx-growth]
---

import ListAdmonition from '@site/src/components/ListAdmonition';

<ListAdmonition>
    <ul>
        <li>What are 'launch mechanics'</li>
        <li> Examples of launch mechanics</li>
        <li> Trade offs in launch mechanics </li>
     </ul>
</ListAdmonition>

## Introduction

In our [designing an NFT drop introduction](../designing-an-nft-drop/overview.md), we discussed why success is important and why you should specify launch goals. The next step is to understand the design decisions and trade-offs that can be made in designing your launch. These design decisions are called " **mechanics**" - they are key mechanics to consider when designing your launch are:

1. **NFT utility and target user segment:** what are you actually selling? Why would someone buy it? Who would buy it?
2. **Pricing:** What will the assets cost? What is the mechanism of the sale?
3. **Scarcity:** How many assets are there?
4. **Access and transparency:** Who can buy them? How defined are the mechanisms and utility for the public?

Generally, for each mechanic in this article, we'll discuss options as if they are binary. In reality, they are not binary and should be considered ends of a multi-dimensional spectrum. The mechanics presented are suggestions and thought starters based on our experience rather than a definitive guide.

New launch mechanics are being defined in Web3 all the time, which is why it's important to..

# Check the meta

Crypto trends change daily, and certain launch trends emerge and die. When defining your launch mechanics, check against prevailing trends. Is one of your mechanics on-trend, that you can lean into? Is one of them dying, and would a change position you better in the market (or do you need to actively differentiate on why it works for you)?

For example, whitelists, tied to 'grind to level' activity and referrals in Discord, were the prevailing access method through 2021. Sentiment has generally turned against grinding or whitelists allocated without transparency. While they can still be valuable, consider pro-community methods of allocation.

When designing your launch, always consider the meta to maximize success.

# Mechanic 1: NFT Utility and Target User Segment

What are you actually selling? Why would someone buy it? Who would buy it? You have likely already defined your NFT utility and target user segments, but it's worthwhile to re-examine them so you can validate them against your launch goals and adjust as required. These mechanics are more open-ended as they depend on your project's overall design.

## NFT Utility

### Define what you are selling

It may seem straightforward, but make sure you are clear on exactly what you are selling. Once you've done this, check that what you are selling is aligned with your launch goals. For example, free minted in-game items can focus on community building, however since they can be minted at no cost, there may be less demand for them.

### Define the utility

Be clear on why a customer would want to buy your NFT. For example, an in game asset can impact the appearance of a character, provide special access to an area, or connect to other forms of game utility. However, it's important to check that your utility matters to your target segment. This is important as demand for an asset will only be as valuable as the utility that a segment associates with it.

## Target user segments

To target your launch, define who you are selling to. This is your target user segment. There may be a mix of segments, but generally, you should have one primary target in mind. As you go about defining your mechanics, make sure that they make sense for your primary target.

Here are a few examples of user segments: Early adopters and Players.

**Early adopters**

Early adopters aim to be the first to gain access to an offering. They can benefit in various ways including prestige, becoming an influencer, or getting exclusive rewards.

**Players**

Players buy to use. They can deploy less capital and are more utility-focused. They can be seeking gameplay benefits and utility within the community, such as status or early access.

# Mechanic 2: Pricing

When designing your launch, pricing is likely to be top of mind. These days, crypto audiences are highly sensitive to anything they perceive as a money grab, so you should be careful in designing your pricing strategy. The two key pricing elements are the mechanism (how the price will change, if at all, over the launch) and the value (what the drop will cost).

## Pricing mechanism

There are primarily three strategies we can compare when considering pricing: Fixed price, Auctions and Raffles.

|  | Description    | Pros | Cons | 
| ------| ----------- | ----------- | ---|
| Fixed price | Price is set by you ahead of time    | <ul><li>Simplest execution</li><li>Can engineer a sellout and build buying habits by slightly lower prices</li><li>Transparency for buyers and predictability for the project</li></ul> | <ul><li>May leave money on the table. Vulnerable to botting</li></ul> | 
| Auctions | A Dutch or English auction where customers bid to set the price  | <ul><li>Finds market price, no money on the table</li></ul>   | <ul><li>Complex to execute</li><li>Unpredictable revenue</li><li>No money left on the table for buyers to benefit - stalls secondary trading</li></ul> |    | --- |
| Raffles | A customer buys a chance to obtain an asset  | <ul><li>Increased potential revenue by raffle either whitelist or the asset itself</li></ul> | <ul><li>Complex to execute</li><li>Unpredictable revenue, vulnerable to under pricing if few tickets sold</li><li>Risks negative sentiment for those missing out and can lead to distrust</li></ul> |        | --- |


## Price value

There are two ways to set the price of your NFTs: under-pricing, or marketing-pricing.

### Under Pricing

Especially for your first launch, it is worth considering under-pricing as a pricing strategy. By under-pricing, we mean setting a price under what could be considered "fair market price" (more on how to determine this later).

Under-pricing is a tactic that can be used to increase the likelihood of a sellout. This also builds a customer buying habit for future launches and pushes trade activity to the secondary market post-launch, which is a strong signal to the market.

 The main downside to this approach is that money is left on the table

### Using Market Price

Fair, i.e. market and price for your NFTs, can be a valuable strategy in some cases. This approach will maximize primary revenue, assuming that there is sufficient demand for your NFTs. The cons are the inverse of the pros for under-pricing; you risk not selling out and a stall in secondary trading.

### How to determine the market price

Whether you under-price or not, it's critical to know (or at the very least, approximate) the market price for your assets. In order of preference, we suggest determining the market price using the following tactics:

1. First principles: calculating the price of your NFT based on the value it gives to the customer
2. Project history: calculating the price of your NFTs based on data from demand for previous launches or current secondary trading volume
3. Community feedback: directly or indirectly ask your community how much they'd be willing to pay. You can ask for expressions of interest, conduct polls, or monitor community chatter
4. Market comparison: comparing the success of analogous drops in the market. For this to work, it's important to compare launches with similar NFT utility, launch mechanics, and community size.

# Mechanic 3: Scarcity

Scarcity drives excitement and FOMO, which seasoned Web3 players will know is a driver of success in the space. Conversely, over-supply risks losing (or worse, never gaining) sale momentum which can be disastrous. Scarcity comprises the number of available NFTs for a given drop and how distribution is phased.

## Available NFTs

Availability should be used as input based on community size/demand to engineer a sellout. In the absence of quantitative indication of demand from the community, a drop of no more than double community size might be a reasonable start for some projects.

### Volume cap

A volume cap is when there are a fixed number of NFTs for a given sale. The pros for this approach are clear: there is an explicit market signal when supply is exhausted, revenue is predictable, and buyer interest is piqued when the number of available NFTs dwindle (FOMO). The main drawback to this approach is that it's vulnerable to sentiment if users are out of timezone at launch. There is also the possibility of botting, which should be accounted for.

### Time cap

Having an unlimited supply that can only be accessed during a specific time frame can be valuable in some cases. The main pro is that it increases accessibility for a global customer base, which in turn may increase revenue. The flip side is that there is no clear market signal that the launch is going well or that it has sold out. This may cause buyers to "wait and see" which risks stalling an entire sale.

## Phasing

Launches can be phased, i.e. holding several launches to distribute an asset's total supply, or one-off. Each approach should be considered in light of the overall project goals.

### Phased

A phased approach is a good tactic that allows your project to calibrate mechanics based on progressive results. It also builds the buying habit and excitement for future drops. The downside is that it does not project a major sale figure vanity metric to the market.

Phasing is a particularly useful lever to drive sellouts and excitement even where total asset supply outweighs the current community size, because either the total supply is pre-defined by whitepaper/community commitment, or marketing has not grown community to expected sizes as launch approaches.

### One-off

Single drops are valuable when you have confidence that your launch will succeed. It allows you to project a flashy vanity metric to the market as all interest is driven to a single event. However, it is risky as it pins launch outcomes on a single event, so should be undertaken with caution.

# Mechanic 4: Access and Transparency

Access to the sale itself (for example, whitelisting), and to the information defining the sale, are key mechanics to tie to your launch goals.

## Access

In all cases, 'per-wallet' limits should be set to control for bots and for a small number of users buying many of the available NFTs. While this reduces potential sales, the sentiment impact and risk of price dumps are worth the tradeoff.

Access decisions are particularly susceptible to the meta and market conditions, so make sure this is taken into account when designing this mechanic.

### Open

An open sale allows anyone, whether previously engaged with your project or not, access the sale. This maximises revenue opportunity but is vulnerable to bots.

### Closed

A closed sale employs tactics that reward the community for their participation through whitelisting, pre-sales or some other approach. This is a lever to reward the community and can tie whitelisting to user acquisition and pro-community activity. This, in turn, creates emotional ties to the project and can drive FOMO. The downside is that it's vulnerable to sentiment (if a community perceives the mechanism of deciding access to be unfair) and limits the total number of possible buyers.

### Transparency

Transparency refers to the amount of information a project gives to potential buyers in the lead-up to a launch. In general, and especially in bearish market conditions, it may be worth considering an open approach, which provides users with relevant information on utility and sales mechanics (including any randomness). This builds trust with your community and avoids buyers dumping their NFTs after a disappointing purchase. The inverse approach is to obfuscate launch information to drive buyer speculation. The benefit of this approach is to drive sales activity based on speculation. This is a risky approach and should be implemented with caution - if the community is not sufficiently excited when the mystery is revealed you risk a post-sale dump.

# In the next article…

In the next (and final) article in the Launch Design series, we will be exploring how to put the pieces together, set launch targets and execute with the highest probability of success.