---
created: 2026-08-24
updated: 09/14/2026 8:05 PM
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

**RSSrch** is a Zotero 10 plugin that transforms Zotero RSS feeds into a research-focused discovery system with feed folders, library-aware triage, metadata enrichment, filtering rules, relevance scoring, automated actions, duplicate management, and AI-assisted research model development.

RSSrch works with Zotero's existing RSS system. Zotero remains responsible for feed subscriptions, retrieval, storage, refresh, and native item management, while RSSrch adds research-oriented organization, evaluation, prioritization, and triage.

![RSSrch v1.0.0](<assets/images/RSSrch v1.1.1 release.png>)

## What's new in 1.1.1

RSSrch 1.1.1 improves selection stability when adding feed articles to My Library while **Hide library items** is enabled.

The selected article now remains stable while library membership and metadata updates refresh the item list, preventing temporary jumps to neighboring articles during the save.

**[Download RSSrch 1.1.1](https://github.com/SolveSaint/RSSrch-for-Zotero/releases/latest)**

## Features

### Keep Feeds separate from My Library

RSSrch can provide a persistent **Feeds** workspace beside **My Library**.

Each workspace keeps its own source selection, search, tag filters, sort state, selected items, and scroll position. This keeps research discovery separate from normal library management while preserving Zotero's native workflow.

Enable the separate workspace from **View → Feeds in Separate Tab**.

![RSSrch Feeds Tab](<assets/images/RSSrch - Feeds Tab - Processed.png>)

### Focus on papers that are new to your library

RSSrch can determine whether feed articles are already represented in **My Library**.

A compact item filter provides three views:

- **Hide library items**
- **Show all items**
- **Only library items**

Matched feed items display **In My Library** directly in the item list, and RSSrch can take you to the corresponding library item.

This makes it possible to focus on genuinely new research without losing visibility into papers you have already saved.

![RSSrch Library Filtering](<assets/images/RSSrch - Library Filtering.png>)

### Organize RSS feeds with folders

Create nested folders to organize Zotero RSS feeds into research areas, projects, topics, journals, or other domains.

Selecting a folder displays items from the feeds contained within that folder and its descendants.

![RSSrch Folders](<assets/images/RSSrch - Folders Example.png>)

RSSrch also provides a folder dashboard with information about the selected research domain and its effective RSSrch processing state.

![RSSrch Folder Panel](<assets/images/RSSrch - Folder Panel.png>)

See [[Feed Folders]].

### Hide duplicate feed articles

RSSrch can collapse exact duplicate feed articles across Feeds, individual subscriptions, and RSSrch folders without deleting the underlying Zotero feed items.

Duplicate handling preserves the selected eligible copy when possible and prefers useful item states such as unread copies.

### Feed subjects and tag discovery

RSSrch uses Zotero's existing tag system to expose structured subject metadata from feeds and [[Metadata Enrichment|metadata enrichment]].

Feed Subjects can include publisher categories, article keywords, and other accepted subject metadata.

When an RSSrch folder is selected, Zotero's Tag Selector can represent tags across the feeds contained within that folder and its descendants.

See [[Feed Subjects and Tags]].

### Filter incoming research

Create customizable **Include** and **Exclude** rules to determine which articles belong in a research scope.

Include rules act as admission gates, while Exclude rules provide hard vetoes.

![RSSrch Include and Exclude Rules](<assets/images/RSSrch - Rule Manager - Include Exclude.png>)

Rules can evaluate metadata such as title, abstract, authors, publication, article type, Feed Subjects, tags, and DOI.

See [[Include and Exclude Rules]].

### Score papers by research relevance

Create weighted scoring concepts that rank papers according to how strongly they match your research priorities.

![RSSrch Scoring Rules](<assets/images/RSSrch - Rule Manager - Score.png>)

RSSrch combines Article-Type Scoring, Global scoring concepts, and feed-specific scoring concepts.

Relevance Scores appear directly in Zotero's item list and can be used to prioritize incoming research.

![RSSrch Score Column](<assets/images/RSSrch - Item List - Score Column Example.png>)

See [[Relevance Scoring]].

### Automate responses to important papers

RSSrch [[Actions]] can respond automatically when newly added feed items pass Admission and meet configured research criteria.

Actions can show a Zotero alert, add a paper to My Library, or add a manual Zotero tag.

Actions can also require a minimum Relevance Score and additional rule conditions.

See [[Actions]].

### Preview and test the research model

The Rule Manager Preview can test Admission and Relevance Scoring against existing feed items without changing those items.

Preview can evaluate unsaved changes, while detailed diagnostics show why an item was included or filtered and which scoring concepts contributed to its Score.

See [[Preview and Rule Testing]].

### Enrich sparse feed metadata

RSS feeds vary considerably in metadata quality.

RSSrch can supplement sparse feed items with research-useful metadata such as abstracts, creators, DOI information, publication metadata, article type, subjects, and keywords.

Enriched metadata can then improve filtering, scoring, duplicate handling, and research triage.

See [[Metadata Enrichment]].

### Research-focused Reader workflow

RSSrch integrates an abstract-focused research Reader directly into Zotero's feed workflow and offers multiple Reader themes.

![RSSrch Reader Panel](<assets/images/RSSrch - Reader Panel.png>)

The Reader brings together effective metadata, Include-rule highlights, Feed Subjects, tags, Relevance Score, Score Breakdown, read controls, article opening, copying, and Add to My Library.

Library-aware filtering is integrated with this workflow so a selected article remains stable while it is added to My Library and the feed view refreshes.

See [[Reader Workflow]].

### AI-assisted research rules

RSSrch can export an **AI Setup/Refinement Package** containing information about your research environment, feeds, current rules, and research model.

The package can be analyzed by an AI system to help create or refine a complete RSSrch research model.

![RSSrch AI Rule Export](<assets/images/RSSrch - Menu - Export AI Rule Setup Package.png>)

RSSrch also includes a **Research Setup Wizard** to guide initial setup and later refinement.

![RSSrch Research Setup Wizard](<assets/images/RSSrch - Wizard.png>)

See [[First Steps]] for the setup workflow and [[Rule Manager]] for manual rule management.

## Getting started

### 1. Install RSSrch

Download the latest plugin [release](https://github.com/SolveSaint/RSSrch-for-Zotero/releases/latest) and install the `.xpi` file in Zotero 10.

See [[Installation]].

### 2. Complete the initial setup

Use the Research Setup Wizard to establish or import your initial research model.

See [[First Steps]].

### 3. Open the Feeds workspace

If you want Feeds separated from My Library, enable **View → Feeds in Separate Tab**.

The Feeds workspace preserves its own navigation, filters, sorting, selection, and scroll state.

### 4. Organize your feeds

Create RSSrch Feed Folders around your research areas and projects.

See [[Feed Folders]].

### 5. Configure the research model

Use the [[Rule Manager]] to configure:

- [[Include and Exclude Rules|Admission]]
- [[Relevance Scoring]]
- [[Actions]]

### 6. Test the model

Use [[Preview and Rule Testing]] to inspect Admission and Relevance Scoring behavior before committing major changes.

### 7. Review incoming research

Use the Feeds workspace, library membership filter, [[Reader Workflow]], and Zotero's item list to triage papers, inspect rule evidence, review relevance scores, collapse duplicate feed entries, and save valuable articles to My Library.

## Initial preparation and background processing

> [!note] Background processing
> RSSrch avoids unnecessary whole-library work during Zotero startup. Some features prepare or validate data when they are first used, so large RSS libraries can still require additional background processing.

Background preparation can include metadata inspection, enrichment, subject processing, score restoration, deduplication preparation, diagnostics, and local cache generation.

Where possible, RSSrch performs this work in bounded batches and yields between operations so Zotero remains responsive.

See [[Metadata Enrichment]] for more information.

## At a glance

RSSrch provides:

- A separate **Feeds** workspace beside My Library
- Independent Feeds and My Library navigation state
- **Hide library items**, **Show all items**, and **Only library items** views
- **In My Library** status directly in the Zotero item list
- Direct navigation from matched feed items to My Library
- Duplicate collapsing across feeds and folders
- [[Feed Folders|Nested folders]] for organizing Zotero RSS feeds
- Combined folder views containing descendant feed items
- Folder dashboards and RSSrch Active controls
- [[Feed Subjects and Tags|Feed Subjects and folder-scoped tag discovery]]
- [[Metadata Enrichment|Metadata enrichment]] for sparse feed items
- [[Include and Exclude Rules|Customizable Admission rules]]
- [[Relevance Scoring|Weighted research relevance scoring]]
- Relevance Scores directly in the Zotero item list
- [[Actions|Automatic alerts, My Library saves, and workflow tags]]
- [[Preview and Rule Testing|Rule preview and detailed diagnostics]]
- [[Reader Workflow|Research-focused Reader integration]]
- AI-assisted research rule creation and refinement
- A guided [[First Steps|Research Setup Wizard]]
- Integration with Zotero's existing RSS feed system

## Documentation

### Getting started

- [[Installation]]
- [[First Steps]]
- [[Feed Folders]]
- [[Rule Manager]]

### Research model

- [[Include and Exclude Rules]]
- [[Relevance Scoring]]
- [[Actions]]
- [[Preview and Rule Testing]]

### Metadata and research workflow

- [[Feed Subjects and Tags]]
- [[Metadata Enrichment]]
- [[Reader Workflow]]

## Download

**[Download RSSrch 1.1.1](https://github.com/SolveSaint/RSSrch-for-Zotero/releases/latest)**