---
updated: 08/26/2026 6:51 PM
title: Feed Folders
description: Organize Zotero RSS feeds into nested research folders and work with combined folder views in RSSrch.
tags:
  - feed-folders
  - organization
  - feeds
  - getting-started
  - rssrch
---

# Feed Folders

RSSrch Feed Folders let you organize Zotero RSS subscriptions into a hierarchy built around your research.

They provide structure for large feed libraries without creating Zotero collections or changing how Zotero manages RSS subscriptions.

![[RSSrch - Folder Panel.png]]

## How Feed Folders work

RSSrch folders are an organizational layer placed inside Zotero's **Feeds** tree.

For example:

```text
Feeds
└── Neurology
    ├── ALS Research
    │   ├── Motor Neurons
    │   └── Excitotoxicity
    ├── Ferroptosis
    └── Mitochondria
```

A folder can contain:

- Zotero RSS feeds
    
- RSSrch subfolders
    
- both feeds and subfolders
    

RSSrch supports nested folders up to 16 levels deep.

> [!important]  
> RSSrch Feed Folders are not Zotero collections. Moving a feed into an RSSrch folder does not move articles into a collection or alter the underlying Zotero feed subscription.

## Create a folder

There are several ways to create Feed Folders.

### From the Feeds tree

Right-click **Feeds** and choose:

**Add folder…**

Enter a name for the folder.

### From the RSSrch menu

Open:

**Tools → RSSrch → Feed Folders → New Folder…**

### Create a subfolder

Select an existing RSSrch folder and either:

- right-click it and choose **New Subfolder…**
    
- open **Tools → RSSrch → Feed Folders → New Subfolder in Selected Folder…**
    

The new folder is created beneath the selected folder.

## Add feeds to folders

The easiest way to organize existing feeds is with drag and drop.

Drag a Zotero feed from the Feeds tree onto an RSSrch folder.

RSSrch moves the feed into that folder's position in the tree without changing the actual Zotero subscription.

### Move several feeds at once

You can select multiple Zotero feeds and drag the selection into a folder.

RSSrch moves all selected feeds together.

### Create a folder from selected feeds

Select one or more feeds, right-click the selection, and choose:

**Add to folder…**

RSSrch prompts for a new folder name and places the selected feeds into the new folder.

## Move feeds between folders

Drag a feed from one RSSrch folder onto another folder.

The feed's RSSrch organization changes immediately.

The Zotero feed itself remains unchanged.

## Remove a feed from a folder

Right-click a feed that is currently inside an RSSrch folder and choose:

**Remove from folder**

The feed returns to the top-level **Feeds** area.

Removing a feed from an RSSrch folder does not unsubscribe from the feed and does not delete its items.

## Move folders

RSSrch folders themselves can also be dragged.

Drag one folder onto another folder to make it a subfolder.

RSSrch prevents moves that would:

- place a folder inside itself
    
- place a folder inside one of its own descendants
    
- exceed the maximum nesting depth
    

## Expand and collapse folders

RSSrch folders behave as expandable containers in Zotero's Feeds tree.

Double-click a folder to expand or collapse it.

You can also use:

|Key|Action|
|---|---|
|`+`|Expand the selected folder|
|`-`|Collapse the selected folder|
|`F2`|Rename the selected folder on Windows|
|`Delete`|Delete the selected RSSrch folder|

Folder expansion state is remembered by RSSrch.

## Selecting a folder

Selecting an RSSrch folder creates a combined view of the articles contained in its feeds.

Importantly, the view includes feeds inside **descendant subfolders**, not only feeds directly attached to the selected folder.

Using the previous example:

```text
Neurology
├── ALS Research
│   ├── Motor Neurons
│   └── Excitotoxicity
├── Ferroptosis
└── Mitochondria
```

Selecting **Neurology** displays feed items from all of those research areas.

Selecting **ALS Research** displays items from:

- feeds directly inside ALS Research
    
- Motor Neurons
    
- Excitotoxicity
    

This allows a folder to function as a research scope.

## Folder tags

When an RSSrch folder is selected, RSSrch also expands Zotero's Tag Selector to the feeds represented by that folder.

This means the Tag Selector can show the combined tags associated with articles across the selected folder and its descendant feeds.

This makes it possible to explore the terminology appearing across an entire research area instead of examining one feed at a time.

See [[Automatic Tags and Folder Tags]] for more information.

## Folder dashboard

Selecting an RSSrch folder also displays a folder dashboard in the reader area.

![RSSrch Folder Dashboard](https://chatgpt.com/g/g-p-6a89d799c62c81919861ccbeb3c89ce0-rssrch-for-zotero/c/assets/images/RSSrch%20-%20Folder%20Panel.png)

The dashboard provides information about the selected folder, including:

- folder name
    
- direct feeds in the folder
    
- combined item count across the folder scope
    
- RSSrch processing state
    
- effective RSSrch processing state
    
- relevance score metrics
    

### Score metrics

Folder score metrics are calculated on demand so normal navigation does not have to wait for scoring work.

Choose:

**Load Current Score**

to calculate metrics such as:

- Current Score
    
- Total Score
    
- Hit Rate
    
- High Value
    
- Max Score
    

After calculation, the button changes to **Reload Current Score**.

## RSSrch Active

Every RSSrch folder can control whether RSSrch processing applies to that research scope.

There are three states:

### Active

RSSrch processing is enabled for the folder.

### Inactive

RSSrch processing is disabled for the folder.

### Inherited

The folder uses the state of its parent folder.

New top-level RSSrch folders are enabled by default. New subfolders inherit their parent's state unless you give them an explicit override.

You can change the state from the folder dashboard or by right-clicking a folder and opening:

**RSSrch Active**

Choose:

- **On**
    
- **Off**
    
- **Inherit from Parent**
    

> [!important]  
> RSSrch Active controls **RSSrch processing only**. It does not enable or disable Zotero feed subscriptions, and it does not control Zotero's feed refresh behavior.

## Feed-level Active overrides

Individual feeds inside RSSrch folders can also override the folder state.

Right-click a feed and open:

**RSSrch Active**

You can choose:

- **On**
    
- **Off**
    
- **Inherit from Folder**
    

This makes it possible to keep a feed organized inside a research folder while excluding it from RSSrch processing when necessary.

## Rename a folder

Right-click the folder and choose:

**Rename…**

You can also select the folder and press `F2` on Windows.

Folder names do not change Zotero feed names.

## Delete a folder

Select the folder and choose:

**Delete Folder…**

or press `Delete`.

RSSrch asks for confirmation before deleting the folder.

> [!warning] Deleting an RSSrch folder does not delete Zotero feeds  
> RSSrch removes only its organizational folder. Zotero feed subscriptions and feed items are preserved.

If the deleted folder contains feeds or subfolders, RSSrch moves those contents up one level.

For example:

```text
Feeds
└── Neurology
    └── ALS
        ├── Feed A
        └── Mechanisms
```

Deleting **ALS** promotes its contents:

```text
Feeds
└── Neurology
    ├── Feed A
    └── Mechanisms
```

If a top-level folder is deleted, its contents are promoted back to the **Feeds** root.

## Automatic provider grouping

RSSrch can automatically organize previously ungrouped feeds when several feeds belong to the same provider family.

Open:

**Tools → RSSrch → Feed Folders → Auto-Group Ungrouped Feeds by Provider**

RSSrch examines ungrouped feeds and creates provider folders where appropriate.

Existing RSSrch organization is preserved.

## OPML and folder organization

RSSrch can export its feed-folder hierarchy as OPML.

Open:

**Tools → RSSrch → Setup & Export → Export Feed Folders as OPML…**

The exported OPML retains the RSSrch folder hierarchy and contained feeds.

Zotero remains responsible for normal feed subscription and OPML import behavior.

See [[OPML Import and Export]] for details.

## Feed Folders and research rules

Folders are more than visual organization.

They define useful research scopes that RSSrch can use when presenting and evaluating literature.

A folder can bring together:

- related journals
    
- related research topics
    
- multiple subfields
    
- broad and narrow research domains
    

Combined with [[Rule Manager|RSSrch Rules]], [[Relevance Scoring]], and [[Automatic Tags and Folder Tags]], Feed Folders let you move between broad research areas and narrowly focused literature without reorganizing the underlying Zotero library.

## Next

Once your feeds are organized, the next major step is understanding how RSSrch determines which incoming articles matter to your research.

➡️ Continue to [[Rule Manager]]