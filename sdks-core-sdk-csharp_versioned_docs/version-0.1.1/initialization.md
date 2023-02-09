---
description: Initialize the Client Configuration
id: initialization
slug: /initialization
tags: [core-sdk-csharp, initialization]
keywords: [imx-dx]
---

# Initialization

Initialize the Core SDK client with the network on which you want your application to run (see [all networks available](https://github.com/immutable/imx-core-sdk-csharp/blob/28d4e048c7fa4dbf0b3c7747aba60561814c6451/Src/IMX/Imx.Sdk/Client.cs#L18)):

Select one of the following Ethereum networks ImmutableX platform currently supports.

| Environment | Description   |  
|-------------|---------------|
| Sandbox     | The default test network (currently, it is Goërli)  |
| Mainnet     | Ethereum network    | 

```csharp
using Imx.Sdk;

try
{
    Client client = new Client(new Config()
    {
        Environment = EnvironmentSelector.Sandbox // Or EnvironmentSelector.Mainnet
    });
}
catch (Exception e)
{
    Console.WriteLine("Error message: " + e.Message);
    Console.WriteLine(e.StackTrace);
}
```