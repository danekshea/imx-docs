---
title: "Rate limits"
slug: "/api-rate-limiting"
keywords:
  - imx-core
sidebar_position: 3
---

# API rate limits

All calls to the API are allotted a specific number of requests per refresh period. Our rate limits depend on if you're an individual or project, as well as what environment of ours you are targeting. If you're a partner, your limit is determined by your project. Otherwise, your limit is determined on a per-IP-address basis.

We set the limits based on an analysis of the last quarter's traffic and review and update this quarterly. Once this threshold has been reached, we will return a status code `429` response.

Integrations with the API that do not contain an api-key (see below for an example), must not exceed 5 requests per second, per-IP-address. This is measured across all endpoints of the API.

## Integration
To have a higher rate limit, you will need to obtain an API key to use with all of your calls to our API. It also uniquely identifies your company project and should not be shared.

If you haven’t already, [register your project with us](/docs/launch-collection/register-project). This will provide you with a numeric project ID. To obtain an API key, [please contact support](/docs/contact) and quote your project ID. We'll evaluate if a higher rate limit with an API key can be granted.

:::info Increasing your rate limit
In the majority of applications a higher rate limit does not improve the usability of your application. Consider how frequently trades or mints are happening and how that impacts the user experience. Caching of data can be a great way to help you manage bursts of high traffic on your application and minimise your network load. This can also create a better user experience.
:::

The API key must be added to all calls to our API in the http header:
```curl
curl -is 'https://api.x.immutable.com/v1/orders/1337' --header 'x-api-key: xxx'
```

## Best practices
Here are some best practices to follow for a successful integration:
- **Limit your clients** - Proactively limiting your outgoing call rate will prevent you from being externally rate-limited and overall encourage you to handle those cases in which you are limited more gracefully. Additionally, if you build your clients with this logic then you can also sub-divide your aggregate limit more granularly (as appropriate for your project) so that none of them consume too much quota. For example, you might choose to subdivide your total limit by country, region or other.
- **Retry and back-off** - When you are rate-limited, retry your requests after waiting some time. Use an [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) to progressively increase this wait time.
- **Avoid polling** - Polling our API (especially "short polling", in which you do not wait for a response) is an anti-pattern and will quickly consume your quota.