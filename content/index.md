---
created: 2026-08-24
updated: 08/26/2026 6:39 PM
title: RSSrch for Zotero
description: A Zotero plugin for organizing RSS feeds, applying research rules, scoring relevance, and discovering papers aligned with your research goals.
siteurl: https://solvesaint.github.io/RSSrch-for-Zotero/
tags:
  - rssrch
  - zotero
  - research
  - plugin
aliases:
  - RSSrch
---

**RSSrch** is a Zotero 10 plugin that transforms Zotero RSS feeds into a research-focused discovery system with feed folders, automatic tagging, filtering rules, relevance scoring, and AI-assisted research model development.

![RSSrch v1.0.0](<assets/images/RSSrch v1.0.0 release.png>)

## Features

### Organize RSS feeds with folders

Create nested folders to organize Zotero RSS feeds into research areas, projects, topics, or other domains.

Selecting a folder displays items from the feeds contained within that folder and its descendants.

![RSSrch Folders](<assets/images/RSSrch - Folders Example.png>)

RSSrch also provides a folder dashboard with information about the selected research domain.

![RSSrch Folder Panel](<assets/images/RSSrch - Folder Panel.png>)

### Automatic tag generation and folder tag discovery

RSSrch can automatically generate Zotero tags from article keywords.

When a folder is selected, RSSrch also displays the tags found across the items in that folder, providing a quick view of the topics and terminology appearing throughout that research domain.

### Filter incoming research

Create customizable Include and Exclude rules to determine which articles are relevant to a research scope and which should be filtered out.

![RSSrch Include and Exclude Rules](<assets/images/RSSrch - Rule Manager - Include Exclude.png>)

### Score papers by research relevance

Create weighted scoring concepts that rank incoming papers according to how closely they match your research goals.

![RSSrch Scoring Rules](<assets/images/RSSrch - Rule Manager - Score.png>)

RSSrch adds relevance scores directly to the Zotero item list so papers can be sorted and prioritized.

![RSSrch Score Column](<assets/images/RSSrch - Item List - Score Column Example.png>)

### Research-focused reader workflow

RSSrch integrates research information directly into the Zotero reader workflow and offers multiple reader themes.

![RSSrch Reader Panel](<assets/images/RSSrch - Reader Panel.png>)

### AI-assisted research rules

RSSrch can export an AI Setup/Refinement Package containing information about your research environment and current rules.

The package can be analyzed by an AI system to help create or refine a complete RSSrch research model.

![RSSrch AI Rule Export](<assets/images/RSSrch - Menu - Export AI Rule Setup Package.png>)

RSSrch also includes a Research Setup Wizard to guide the setup and refinement process.

![RSSrch Research Setup Wizard](<assets/images/RSSrch - Wizard.png>)

## Installation

Download the latest plugin [release](https://github.com/SolveSaint/RSSrch-for-Zotero/releases/latest) and install the `.xpi` file in Zotero 10.

> [!warning] First initialization
> RSSrch must process and enrich existing feed items when it is first initialized. Large RSS libraries can take a significant amount of time to complete this initial pass. This is expected.

## At a glance

RSSrch provides:

- Nested folders for organizing Zotero RSS feeds
- Combined folder views containing descendant feed items
- Folder dashboards and research-domain information
- Automatic Zotero tag generation from article keywords
- Aggregated tag discovery across items in a selected folder
- Customizable Include and Exclude filtering rules
- Weighted research relevance scoring
- Relevance scores directly in the Zotero item list
- Research-focused reader integration
- AI-assisted research rule creation and refinement
- Research Setup Wizard
- Folder-level RSSrch Active controls
- Integration with Zotero's existing RSS feed system

## Download

**[Download the latest RSSrch release](https://github.com/SolveSaint/RSSrch-for-Zotero/releases/latest)**