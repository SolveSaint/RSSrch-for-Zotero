---
updated: 08/26/2026 6:43 PM
title: Installation
description: Install RSSrch 1.0.0 in Zotero 10 and prepare RSSrch for first-time setup.
siteurl: https://solvesaint.github.io/RSSrch-for-Zotero/installation
tags:
  - getting-started
  - installation
  - zotero
  - rssrch
---

RSSrch 1.0.0 is a research workflow plugin for **Zotero 10**.

## Install RSSrch

1. Download the latest RSSrch `.xpi` file from the [RSSrch releases page](https://github.com/SolveSaint/RSSrch-for-Zotero/releases/latest).
    
2. Open **Zotero 10**.
    
3. Open **Tools → Plugins**.
    
4. Open the Plugins menu and choose **Install Plugin From File…**
    
5. Select the RSSrch `.xpi` file.
    
6. Restart Zotero if requested.
    

After installation, a new **RSSrch** submenu will appear under Zotero's **Tools** menu.

## First initialization

RSSrch may begin processing your existing feed library after installation.

For large RSS libraries, initial processing can take some time because RSSrch may need to build or refresh:

- feed-item metadata
    
- relevance and scoring data
    
- feed subjects and categories
    
- metadata enrichment information
    
- automatic tags
    
- deduplication data
    
- other local research indexes
    

This is expected.

RSSrch stores reusable local state so this work does not need to be repeated unnecessarily.

> [!warning] Large feed libraries  
> A large existing Zotero RSS library can take several minutes or longer to initialize. Allow RSSrch to complete its initial processing before assuming something is wrong.

## Next: Set up your research model

Installing RSSrch does not define what is important to **your** research.

RSSrch includes a guided setup system for this.

Open:

**Tools → RSSrch → Research Setup & Refinement…**

This launches the **Research Setup Wizard**.

➡️ Continue to [[First Steps]]