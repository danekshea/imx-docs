---
id: "link-easy-login"
title: "Link Easy Login"
slug: "/link-easy-login"
excerpt: "IMX SDK supports easy login through Magic.link"
sidebar_position: 13
keywords: [imx-wallets]
---

IMX SDK supports easy login and wallet management functionality through [Magic.link](https://magic.link/). This allows users to easily generate wallets and login through email without manual wallet generation and additional password management.

:::caution
This functionality is **only** supported for partners who are using Link UI.\nThis functionality is available in **SDK v1.3.8+**
:::


## Easy Login Sign In

With Link easy login, all users need to do to create their wallets is to provide an e-mail address. Once the e-mail is provided, the user will be prompted to check their e-mail. 

![magic_link](/img/link-setup/magic_link.png 'magic_link')

They will receive an e-mail similar to this:

![Easy Login Sign In](/img/link-easy-login/easy-login-signin.png 'Easy Login Sign In')

Upon confirmation, a new wallet will be setup for the user if that was the first time the user is login in with that e-mail or the user will just be authenticated with their already created wallet.

:::note

Once authenticated, a user's session will last for 7 days. During this period, the users will not be prompted to check their e-mail address again unless the cache is cleared or accessing through a different
device.

:::

:::tip

Each e-mail address will generate a different wallet address. 
To prevent any issues, please make sure you're using always the the same e-mail address to log in.

:::

## Configurations and setup

Please refer to the [Link Setup](./link-setup.md) for more details on the different options to display the Magic Easy Login prompt and provider configuration.
