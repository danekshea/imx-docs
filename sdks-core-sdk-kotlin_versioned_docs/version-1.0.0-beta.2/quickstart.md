---
description: How to make a first SDK request
id: quickstart
slug: /quickstart
tags: [core-sdk-kotlin, quickstart]
keywords: [imx-wallets]
---

# Quickstart

## Standard API Requests

The Core SDK includes classes that interact with the Immutable X APIs.

e.g. Get a list of collections ordered by name in ascending order

```kt
val response = immutableX.listCollections(
        pageSize = 20,
        orderBy = "name",
        direction = "asc"
)
```
OR
```kt
val response = immutableX.collectionsApi.listCollections(
    pageSize = 20,
    orderBy = "name",
    direction = "asc"
)
```

View the [OpenAPI spec](https://github.com/immutable/imx-core-sdk-kotlin-jvm/blob/main/openapi.json) for a full list of API requests available in the Core SDK.
