---
title: "4. Register collection metadata schema"
slug: "/launch-collection/register-metadata-schema"
keywords: [imx-dx]
---

import ListAdmonition from '@site/src/components/ListAdmonition';

<ListAdmonition>
    <ul>
      <li><a href="#asset-metadata-and-how-its-used">Asset metadata and how it's used</a></li>
      <li><a href="#metadata-schema">Metadata schema</a></li>
      <li><a href="#register-a-collections-metadata-schema">How to register a collection's metadata schema</a></li>
    </ul>
</ListAdmonition>

## Asset metadata and how it's used

Assets belonging to a collection (tokens that have been minted from a smart contract) can contain metadata that specify attributes about the asset. The aim of metadata is to allow applications to utilize this data.

#### Examples of how games or applications can use asset metadata:
* An in-game asset has characteristics that allow its owner to wield certain advantages within the game, like being able to defeat opponents whose assets have lesser characteristics. The game needs to be able to read the attributes of the asset in order to execute the game mechanics accordingly.
* An NFT marketplace will want to display attributes of an asset that is for sale, like the asset's name, rarity, image (using the URL specified in the asset's metadata), etc.

Metadata is most commonly in JSON format.

#### Example metadata:
```json
{
  "name": "Rufus",
  "animation_url": "https://guildofguardians.mypinata.cloud/ipfs/QmQDee8BPDfAH2ykRX375AWJwYZcbbJQa8wHokrSnMLLUC/HLS/Base/CollectionAsset_Hero_Rufus_Base.m3u8",
  "animation_url_mime_type": "application/vnd.apple.mpegurl",
  "image_url": "https://gog-art-assets.s3-ap-southeast-2.amazonaws.com/Content/Thumbnails/Heroes/Rufus/Thumbnail_Hero_Rufus_Base.png",
  "attack": 4,
  "collectable": true,
  "god": "Ranged",
  "element": "Water",
  "product": 2,
  "rarity": 2,
  "type": 3
}
```

### Metadata standardization
One of the most common uses of metadata is for NFT marketplaces to display characteristics of an asset. Many marketplaces have certain formats in which they read metadata from assets. There are also wallets and other NFT tooling that have their own formats. This is something that you must consider when setting your asset's metadata.

The [Immutable Marketplace](https://market.immutable.com/) uses the following core properties:

| Property | Description | Mandatory |
| --- | --- | --- |
| `name`	| The display name for this asset. | No |
| `description`	| The description of this asset. | No |
| `image_url` |	The URL of the display image for this asset. This will be used as a video thumbnail in the Immutable Marketplace. | No |
| `image`	| Alternative field of `image_url`. | No |
| `animation_url` |	A URL to a multi-media attachment for the item. We highly recommend the use of the HLS format for streaming video over HTTP. This is generally used for video NFTs.<br/><br/>Applications are required to host their own video assets and expose their location via this URL. | No |
| `animation_url_mime_type` | Mime type of the file that `animation_url` points to. Immutable currently only supports these 3 mime types: `application/vnd.apple.mpegurl`, `video/mp4` and `video/webm`. | No, unless `animation_url` is specified. |
| `youtube_url` | A URL to a YouTube video. This playback method is currently not supported in the Immutable Marketplace, but third party support could be built. | No |

## Metadata schema
The metadata schema outlines the names of the metadata object properties and the values that are acceptable for each property.

When registering the metadata schema for an Immutable collection, you can assign the following value types for each property:

| Type | Description | Filterable? |
| --- | --- | --- |
| `enum` | Property with a defined enumeration of possible values (e.g. god = "nature" or "death"). | Yes |
| `text` | Property which contains arbitrary text. Should be searchable. | No |
| `boolean` | Property which can be either true or false. | Yes |
| `discrete` | Property which will usually be handled as a multi-select, e.g. values from 1-10 | Yes |

Additionally, a **filterable** attribute can be specified for each property in the metadata schema, which allows API consumers to filter assets that are returned by these values. Filterable cannot be true for `text` parameter types.

#### Example metadata schema for the [metadata example](#example-metadata) above:
```json
{
  "metadata": [
    {
      "name": "name",
      "type": "text"
    },
    {
      "name": "attack",
      "type": "discrete",
      "filterable": true
    },
    {
      "name": "collectable",
      "type": "boolean",
      "filterable": true
    },
    {
      "name": "god",
      "type": "enum",
      "filterable": true
    },
    {
      "name": "element",
      "type": "enum",
      "filterable": true
    },
    {
      "name": "product",
      "type": "discrete",
      "filterable": true
    },
    {
      "name": "type",
      "type": "discrete",
      "filterable": true
    }
  ]
}
```

<ListAdmonition title="Pre-requisites" icon="🤚" type="tip">    
    <ul>
        <li><a href="./register-as-user">Registering as a user</a></li>
        <li><a href="./register-project">Registering a project</a></li>
        <li><a href="./register-collection">Registering a collection</a></li>
    </ul>
</ListAdmonition>

### Steps:
1. [Create the metadata schema](#1-create-the-metadata-schema)
2. [Add metadata schema to a collection](#2-add-metadata-schema-to-a-collection)
3. [Update metadata schema](#3-update-metadata-schema)

## 1. Create the metadata schema
Only the project owner can add the metadata schema to a collection.

Each property of the metadata schema contains the following fields:

| Field | Required? | Type |
| --- | --- | --- |
| `name` | Yes | Text |
| `type` | No (default is `text`) | See values types in [this table](#metadata-schema) |
| `filterable` | No (default is `false`) | Boolean<br/><br/>If set to true, then the particular metadata's name will show up in the filters that are used by marketplaces and other applications |

See [example metadata schema](#example-metadata-schema-for-the-metadata-example-above).

## 2. Add metadata schema to a collection
Follow the [4. Add metadata schema to your collection](https://github.com/immutable/imx-examples/blob/main/docs/onboarding.md#4-add-metadata-schema-to-your-collection) steps in the imx-examples repository.

### Note:
* When specifying an `enum` type, you do not have to provide values. This is automatically generated based on the values in the metadata.
* When specifying the `discrete` type, a range is automatically generated based on the values provided in the metadata.

## 3. Update metadata schema
To add missing attributes to your collection's metadata schema that were not submitted in the original request, follow [these instructions](https://github.com/immutable/imx-examples/blob/main/docs/administration.md#update-collection-metadata-schema-by-name). Just add the missing attributes and they will be appended.

Submitting the same metadata schema attribute will result in the error:
```json
{
  "code": "metadata_key_already_exists",
  "message": "Metadata key(s) already exist"
}
```
### Note:
* You can update the **type** and **filterable** attributes of a metadata schema property
* Updating the **filterable** attribute of a metadata schema property to `true` is an expensive API call as it triggers a re-scan of all the assets in the collection to get up-to-date filter values