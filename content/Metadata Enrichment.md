---
updated: 08/27/2026 7:22 PM
title: Metadata Enrichment
description: Understand how RSSrch supplements sparse Zotero feed metadata with abstracts, creators, publication details, subjects, DOI information, and provenance-aware metadata from external sources.
siteurl: https://solvesaint.github.io/RSSrch-for-Zotero/metadata-enrichment
tags:
  - metadata
  - enrichment
  - abstracts
  - feed-subjects
  - doi
  - research-workflow
  - rssrch
---

RSS feeds often provide incomplete article metadata.

One publisher may supply a full abstract, DOI, authors, publication date, and subjects, while another may provide only a title and URL.

RSSrch **Metadata Enrichment** supplements sparse Zotero feed items with additional research-useful metadata when trustworthy information can be resolved.

Possible improvements include:

- DOI recovery
- abstract improvement
- creator recovery
- publication and publisher metadata
- publication date
- section or article type
- volume, issue, and page information
- ISSN and language
- subject and keyword metadata
- other structured article metadata

Metadata Enrichment is enabled by default.

## Enrichment supplements Zotero feeds

Zotero remains responsible for:

- RSS subscriptions
- feed retrieval
- native feed-item storage
- feed refresh
- native item management

RSSrch adds an enrichment layer on top of that data.

Conceptually:

```text
Zotero feed item
↓
Native feed metadata
+
RSSrch enrichment overlay
↓
Effective research metadata
```

Most enriched metadata is stored in RSSrch's persistent enrichment data rather than written back over Zotero's original feed fields.

This allows RSSrch to improve research presentation, rules, and scoring without taking ownership of Zotero's feed records.

## Enrichment does not create My Library items

Metadata Enrichment operates on Zotero **feed items**.

It does not automatically create normal Zotero library items.

For example:

```text
Feed item
↓
Metadata Enrichment
↓
Still a feed item
```

Adding a paper to **My Library** is a separate Zotero operation.

RSSrch can invoke that operation through [[Actions]] or through the Reader's **Add to My Library** control, but enrichment itself does not perform it.

## Feed metadata normally remains authoritative

RSSrch does not blindly replace feed metadata whenever an external source returns another value.

For ordinary scalar metadata fields, an existing useful native feed value generally takes precedence.

For example:

```text
Native publication title exists
↓
Use native publication title

Native publication title missing
+
enrichment provides one
↓
Use enriched publication title
```

This applies to fields such as publication metadata and date.

There are two important quality-aware exceptions:

- abstracts
- creators

RSSrch evaluates those fields more carefully because some feeds technically provide them but provide poor or malformed values.

## Abstract quality is evaluated

A feed-provided abstract is not treated as useful merely because the field is non-empty.

RSSrch evaluates abstract quality using characteristics such as:

- length
- word count
- title duplication
- obvious boilerplate
- whether the text appears to be only a short summary fragment

Internally, abstracts are classified broadly as:

```text
missing
weak
brief
usable
substantial
```

Examples of weak values can include:

```text
Abstract not available

View full text

Copyright ...

[article title repeated as the abstract]
```

RSSrch can reject an enrichment candidate that is itself too weak or looks like boilerplate.

## Better abstracts can replace weak feed abstracts

If the native feed abstract is already useful, RSSrch normally keeps it.

An enrichment candidate replaces the native abstract only when the candidate is materially better according to the quality comparison.

Conceptually:

```text
Useful feed abstract
+
similar enrichment abstract
↓
Keep feed abstract
```

but:

```text
Very short or weak feed abstract
+
substantially better article abstract
↓
Use enriched abstract
```

and:

```text
Missing feed abstract
+
usable enrichment abstract
↓
Use enriched abstract
```

This prevents enrichment from replacing useful feed text simply because another source happens to return an abstract.

## Creator recovery is also quality-aware

Author metadata can also be malformed in RSS feeds.

RSSrch evaluates creator lists for issues such as:

- missing creators
- placeholder-heavy creator lists
- unusable creator information
- apparent first-name / last-name inversion involving initials

If the native creator list is useful, RSSrch retains it.

If it is missing or clearly lower quality, an enrichment-derived creator list can be used instead.

Conceptually:

```text
Good feed creators
↓
retain feed creators
```

```text
Missing or poor feed creators
+
better enriched creators
↓
use enriched creators
```

RSSrch can also repair a recognizable inverted-initial pattern for effective feed presentation when appropriate.

## The enrichment overlay

A successful enrichment record can retain metadata such as:

```text
Abstract
DOI
Publication / Source
Publisher
Section / Article Type
Date
Volume
Issue
Pages
ISSN
Language
Rights
Creators
Subjects / Keywords
```

RSSrch also records provenance for resolved fields.

This allows the system to distinguish information obtained from sources such as:

```text
feed
publisher resolver
structured page metadata
PubMed / Europe PMC
Zotero DOI search
Zotero web translator
```

The RSSrch Reader can indicate that an item contains enriched metadata and identify the resolver or resolver chain that contributed it.

## Automatic subject tags are different

Most enrichment values remain in the RSSrch overlay.

Accepted subject and keyword metadata can also be applied to the Zotero feed item as **automatic Zotero tags** when Zotero automatic tags are enabled.

Conceptually:

```text
Publisher / structured subject metadata
↓
RSSrch validates subject term
↓
RSSrch enrichment overlay
↓
Zotero automatic tag
```

Those automatic tags become available through RSSrch's:

**Feed Subjects**

field.

See [[Feed Subjects and Tags]] for the distinction between:

- Feed Subjects
- Tags
- Manual Tags

## What triggers automatic enrichment

RSSrch does not automatically perform an expensive metadata lookup merely because any possible metadata field is empty.

Automatic enrichment focuses on research-useful deficiencies.

An item can be considered sparse when it has problems such as:

```text
Abstract missing
Abstract weak
Abstract brief

Creators missing
Creators low quality

Publication / Source missing

Publication date missing

Subject-tag enrichment unresolved
Subject tags discovered but not yet applied
```

The item must also provide enough external identity for lookup through:

- an article URL
- a DOI

If neither is available, RSSrch does not attempt normal automatic external enrichment.

## Some fields are recovered opportunistically

Not every missing field independently triggers an automatic enrichment request.

For example, a missing:

```text
DOI
Publisher
Section
Volume
Issue
Pages
ISSN
Language
```

does not necessarily cause an otherwise complete feed item to enter the automatic sparse-item queue by itself.

However, if the item is being enriched for another qualifying reason, RSSrch can recover those additional fields opportunistically.

For example:

```text
Weak abstract
↓
Item requires enrichment
↓
Resolver also finds:
DOI
Publisher
Volume
Issue
Subjects
↓
Those useful values can be retained too
```

This keeps automatic network processing focused on metadata gaps that materially affect the research workflow.

## New feed items are enriched automatically when needed

When Zotero receives a new feed item, RSSrch examines it through the new-item processing path.

Conceptually:

```text
New Zotero feed item
↓
RSSrch Active?
↓
Metadata Enrichment enabled?
↓
Does item need enrichment?
│
├── No → continue RSSrch processing
│
└── Yes
    ↓
    Queue metadata enrichment
    ↓
    Resolve available metadata
    ↓
    Refresh evaluation data
    ↓
    Admission
    ↓
    Relevance Score
    ↓
    Actions
```

This ordering is important.

If a new item is queued for enrichment, RSSrch waits for that enrichment operation before executing [[Actions]].

The item is then evaluated with the best effective metadata available from that processing pass.

## RSSrch Active also controls automatic enrichment

Automatic enrichment is part of RSSrch processing.

If a feed's effective **RSSrch Active** state is disabled:

```text
Zotero refreshes feed
↓
New feed item stored normally
↓
RSSrch processing disabled
↓
No automatic RSSrch enrichment
```

Zotero continues to manage the subscription and refresh it normally.

See [[Feed Folders]] for the RSSrch Active inheritance model.

## Enrichment can affect Admission and Score

Metadata Enrichment is not merely cosmetic.

Fields recovered by enrichment can participate in RSSrch rules.

For example, enrichment might provide:

```text
Abstract:
ferroptosis is associated with...

Feed Subject:
Oxidative Stress

Publication:
Journal of Neurochemistry
```

Those values can then affect:

- [[Include and Exclude Rules]]
- [[Relevance Scoring]]
- Reader highlights
- Score breakdowns
- subsequent [[Actions]]

After queued enrichment finishes, RSSrch invalidates the item's prior evaluation data so rules and scoring can use the updated metadata.

## Enrichment and Actions

For newly added feed items, Actions wait when enrichment has been queued.

For example:

```text
New item arrives
↓
Abstract is missing
↓
Enrichment queued
↓
Better abstract resolved
↓
Admission evaluated
↓
Final Score calculated
↓
Action conditions evaluated
```

This prevents an Action from firing prematurely based only on the sparse initial RSS payload when RSSrch already knows that additional metadata resolution is pending.

If enrichment finds no additional information, normal RSSrch processing still continues using the metadata that is available.

## Open the Enrichment menu

Open:

**Tools → RSSrch → Enrichment**

The normal release menu contains:

- **Enrich Feed Metadata + Subjects**
- **Enrich Selected Feed Metadata Now**
- **Enrich Feed Metadata + Subjects Now…**
- **Backfill Feed Subject Tags…**

Each command serves a different purpose.

## Enrich Feed Metadata + Subjects

The checkbox:

**Enrich Feed Metadata + Subjects**

controls normal automatic/background metadata enrichment.

It is enabled by default.

When enabled, RSSrch can automatically process sparse new feed items and maintain enrichment data.

When disabled, new automatic enrichment work is not queued.

Disabling enrichment does not erase enrichment data that RSSrch has already resolved.

It also does not remove automatic subject tags that have already been applied.

Existing enrichment information therefore remains available even when future automatic enrichment is turned off.

## Disabling enrichment cancels queued work

When automatic enrichment is disabled, RSSrch removes work that is still waiting in the enrichment queue.

An operation that is already actively resolving may still finish.

Conceptually:

```text
Disable enrichment
↓
Queued items cancelled
↓
No new automatic work queued

Already active lookup
↓
may finish
```

This avoids unnecessarily continuing a large waiting queue after the user has disabled the feature.

## Enabling enrichment can perform a bounded catch-up scan

When Metadata Enrichment is turned back on, RSSrch schedules a bounded scan for sparse feed metadata.

The scan considers RSSrch-active feeds and prioritizes eligible items requiring enrichment.

It does not launch an unbounded synchronous whole-library refresh.

This allows enrichment to resume progressively without blocking Zotero with a full rescan.

## Background priority

The automatic queue prioritizes items according to research usefulness and metadata need.

Higher priority is given to factors such as:

- unread items
- missing abstracts
- weak abstracts
- brief abstracts
- missing or poor creators
- missing publication information
- missing publication date
- unresolved subject-tag enrichment

This means an unread article with no useful abstract normally receives attention before an older item with only a minor metadata deficiency.

## Enrich Selected Feed Metadata Now

To explicitly refresh selected feed items, use:

**Tools → RSSrch → Enrichment → Enrich Selected Feed Metadata Now**

The same operation is also available from the feed-item context menu as:

**Enrich Feed Metadata Now**

Select one or more Zotero feed items first.

This command performs a **forced enrichment refresh** of the selected items.

Unlike normal automatic processing, it does not require the item to pass the sparse-metadata test.

This makes it useful when:

- metadata appears incorrect or incomplete
- a resolver has recently improved
- you want to retry a specific article
- you want the strongest available manual enrichment path

## Manual enrichment can run even when automatic enrichment is disabled

The selected-item command is an explicit user request.

For that reason, it uses the forced enrichment path.

The automatic **Enrich Feed Metadata + Subjects** toggle controls normal background processing, but it does not prevent an explicit selected-item forced refresh.

So:

```text
Automatic enrichment:
OFF

User chooses:
Enrich Selected Feed Metadata Now

↓
explicit enrichment can still run
```

This allows automatic enrichment to remain disabled while individual papers are enriched on demand.

## Single-item manual enrichment has an additional fallback

RSSrch deliberately avoids expensive browser-based translation during automatic background enrichment.

However, when **one feed item** is explicitly selected for manual enrichment, RSSrch can use Zotero's browser-based web translator as a final fallback if lighter methods have not resolved the important metadata gaps.

Conceptually:

```text
Single selected item
↓
DOI / structured / publisher resolvers
↓
Important gaps still remain?
↓
Zotero web translator fallback
```

This is reserved for a deliberate single-item operation because browser translation is substantially more expensive than structured metadata requests.

## Multi-item enrichment avoids browser translation

If multiple feed items are selected:

```text
Multiple selected items
↓
Forced enrichment
↓
Lightweight DOI / structured / publisher resolution
↓
No HiddenBrowser web-translation fallback
```

This prevents a large manual selection from launching many expensive browser translation operations.

The same principle applies to normal automatic/background enrichment.

Automatic queues do **not** launch the browser translator.

## Enrich Feed Metadata + Subjects Now

Open:

**Tools → RSSrch → Enrichment → Enrich Feed Metadata + Subjects Now…**

RSSrch asks you to choose a feed.

It then identifies items in that feed that:

- currently need metadata enrichment
- do not already have a sufficiently fresh enrichment result

Those sparse items are prioritized and added to the normal enrichment queue.

This is useful when you want to process incomplete metadata for one particular feed without forcing a refresh of every item.

Unlike **Enrich Selected Feed Metadata Now**, this command respects the normal sparse-item and enrichment-cache logic.

## Backfill Feed Subject Tags

Open:

**Tools → RSSrch → Enrichment → Backfill Feed Subject Tags…**

This is a specialized enrichment maintenance operation for subject metadata.

It can:

- clean rejected automatic placeholder subjects
- complete stale subject-tag enrichment
- retry eligible still-untagged articles through a bounded subject fallback
- apply accepted terms as Zotero automatic tags

The backfill requires Metadata Enrichment to be enabled.

Manual Zotero tags are not removed or converted.

See [[Feed Subjects and Tags]] for the complete subject-tag model.

## How RSSrch resolves metadata

RSSrch uses several metadata strategies.

The exact sequence can vary according to the article source and the metadata already available.

Resolution can include:

```text
DOI metadata search
+
structured webpage metadata
+
publisher-specific resolvers
+
publisher or literature APIs
+
PubMed / Europe PMC metadata
+
manual-only Zotero web translation fallback
```

RSSrch combines useful results while tracking where individual fields originated.

## Structured page metadata

Many scholarly article pages expose structured metadata through sources such as:

- citation meta tags
- Dublin Core metadata
- PRISM metadata
- JSON-LD
- publisher keyword metadata

RSSrch contains a general structured-page resolver that can extract available research metadata without opening a full browser translator.

Possible values include:

```text
Title
Abstract
DOI
Publication
Publisher
Date
Volume
Issue
Pages
ISSN
Language
Creators
Subjects / Keywords
```

This is one of the primary lightweight enrichment paths.

## Publisher-specific resolvers

RSSrch also contains targeted resolver adapters for sources where a specialized path provides better or more efficient metadata.

RSSrch 1.0.0 includes specialized support involving sources such as:

- Europe PMC / PubMed
- bioRxiv
- medRxiv
- MDPI
- Cell Press

These adapters can use publisher APIs, XML, PubMed records, or other structured sources instead of relying entirely on large article webpages.

For example:

```text
bioRxiv / medRxiv
→ publisher API

MDPI
→ article XML

Europe PMC
→ PubMed metadata path
```

The resolver architecture is prioritized so a strong specialized source can satisfy the metadata need without unnecessary additional requests.

## DOI lookup

When a DOI is available, RSSrch can use Zotero's DOI metadata translation machinery to retrieve structured metadata.

The lookup is performed without saving an item to My Library and without downloading attachments.

Conceptually:

```text
DOI
↓
Zotero metadata search
↓
translated metadata
↓
RSSrch enrichment overlay
```

The DOI path is one enrichment source among several.

On specialized publisher domains, RSSrch can defer the DOI request when a direct resolver is expected to provide the same or better metadata more efficiently.

If the specialized resolver leaves important gaps, DOI lookup can still be attempted afterward.

## Identity protection

External metadata is not accepted merely because a resolver returned an article.

RSSrch performs identity checks before incorporating translated metadata.

The checks can use information such as:

- DOI agreement
- normalized article title
- substantial title overlap

For example:

```text
Feed DOI:
10.xxxx/example1

Returned DOI:
10.xxxx/example2
↓
Reject metadata
```

RSSrch also checks title similarity when appropriate.

This reduces the risk that a search, redirect, or publisher page produces metadata belonging to a different paper.

## Metadata from multiple resolvers can be combined

One resolver does not necessarily need to provide every field.

RSSrch can combine compatible metadata from multiple sources.

For example:

```text
Publisher resolver
→ Abstract
→ Subjects

DOI search
→ Publication
→ Volume
→ Issue

Structured page
→ Publisher
→ Language
```

These contributions can be merged into one enrichment record.

RSSrch records the contributing resolver or field source so provenance is not lost.

## Better enrichment candidates can replace weaker enrichment candidates

When several enrichment sources provide the same field, RSSrch does not simply allow the last resolver to overwrite everything.

Metadata merging considers source quality and field-specific rules.

For example, date selection considers:

- resolver priority
- available date precision

Abstract selection compares text quality.

Creator selection compares creator-list quality.

This allows specialized or authoritative sources to improve earlier generic results without indiscriminately replacing useful information.

## Subject terms are filtered before use

Publisher metadata can contain values that are technically classified as keywords or subjects but are not useful research tags.

RSSrch filters subject candidates before storing or applying them.

Examples of rejected material can include:

- placeholder values
- boilerplate
- excessively sentence-like values
- known source-specific noise

Accepted subjects are deduplicated case-insensitively before they are retained.

See [[Feed Subjects and Tags]] for more details.

## Caching avoids unnecessary repeated requests

RSSrch maintains a persistent enrichment cache.

Before performing a normal enrichment lookup, RSSrch checks whether a suitable recent result already exists.

Possible cached states include:

```text
success
no data
error
```

Successful enrichment, unsuccessful lookups, and failures use different retry behavior.

This prevents RSSrch from repeatedly requesting the same unavailable metadata every time an item is displayed or evaluated.

## Manual selected-item enrichment bypasses normal freshness

The explicit:

**Enrich Selected Feed Metadata Now**

command is different.

It uses a forced refresh.

So:

```text
Fresh cached result
+
normal background processing
↓
reuse cache
```

while:

```text
Fresh cached result
+
explicit selected-item enrichment
↓
perform forced refresh
```

This gives the user a direct way to retry an article without deleting enrichment state manually.

## Session request caching

During an active enrichment run, RSSrch also reuses identical requests where possible.

For example, repeated attempts to resolve the same:

- URL
- DOI
- DOI-to-PMID mapping

can reuse session state rather than immediately repeating the same network request.

RSSrch also remembers certain failed URLs and domains during the active session to reduce repeated requests to sources that are currently unavailable or blocking access.

## Network requests are paced

Enrichment uses bounded request lanes rather than launching all external lookups simultaneously.

Separate request classes can be paced independently for areas such as:

- DOI lookup
- structured metadata
- publisher APIs
- NCBI / PubMed APIs
- browser translation

The enrichment queue itself is also concurrency-limited.

This is intended to keep background metadata work from overwhelming Zotero or external services.

## Progress reporting

When queued or manual enrichment is running, RSSrch reports progress.

The status can distinguish outcomes such as:

```text
enriched
cached
no-data
errors
skipped
```

For a long operation, the progress display also reports how many items have completed and how many remain queued or active.

This is particularly useful for:

- feed-level enrichment
- selected multi-item enrichment
- subject-tag backfill

## No-data does not necessarily mean failure

A resolver can complete successfully without finding information that improves the item.

RSSrch distinguishes:

```text
success
```

from:

```text
no-data
```

and from:

```text
error
```

A **no-data** result means the enrichment paths completed without producing a useful improvement.

It does not necessarily indicate a network or resolver failure.

Likewise, an error may be cached temporarily so RSSrch does not immediately repeat an unsuccessful request.

## Enrichment requires usable external identity

Most network enrichment depends on an article URL or DOI.

An item with:

```text
No URL
No DOI
```

normally cannot enter automatic metadata enrichment because RSSrch lacks a sufficiently useful external lookup identity.

This does not prevent the feed item itself from being used in Zotero or evaluated with whatever native metadata it already contains.

## Enrichment does not guarantee complete metadata

Metadata Enrichment is opportunistic.

RSSrch cannot guarantee that every publisher exposes:

- an abstract
- complete creators
- subject terms
- a DOI
- publication metadata

Some sources:

- block automated requests
- provide incomplete structured metadata
- expose no useful external resolver
- omit article-level subjects
- return metadata that fails RSSrch's identity or quality checks

In those cases, RSSrch retains the available feed metadata rather than inventing missing values.

## Where enriched metadata appears

Enriched values can affect several parts of RSSrch.

### Reader

The RSSrch Reader uses effective metadata and can show:

- improved abstract
- effective creators
- publication information
- date
- DOI
- Feed Subjects
- enrichment provenance

A successful enrichment record is identified in the Metadata area as:

```text
Enriched via [resolver]
```

### Zotero feed item list

RSSrch can display effective enrichment-derived creator and date information in Zotero's native feed-item columns without rewriting the underlying feed fields.

This improves the feed list while preserving Zotero's native data record.

### Rules and scoring

Applicable enriched metadata is available to RSSrch's condition evaluation.

That means enrichment can improve the evidence available to:

- Admission
- Relevance Scoring
- Action conditions

### Feed Subjects

Accepted subject metadata can be applied as automatic Zotero tags and becomes available through the **Feed Subjects** field.

## Native data and effective data are different concepts

It is useful to distinguish:

```text
Native feed data
```

from:

```text
Effective RSSrch data
```

For example:

```text
Native abstract:
short publisher summary

Enrichment abstract:
full structured abstract

Effective RSSrch abstract:
full structured abstract
```

The native Zotero feed record can remain unchanged while RSSrch uses the better effective value for research processing and presentation.

This separation is central to the enrichment design.

## Recommended workflow

For normal use:

1. Leave **Enrich Feed Metadata + Subjects** enabled.
2. Allow new feed items to be enriched automatically when they contain research-relevant metadata gaps.
3. Use the RSSrch Reader and rule diagnostics to inspect the resulting effective metadata.
4. Use **Enrich Selected Feed Metadata Now** when a specific paper still appears incomplete.
5. Use the single-item manual command when the strongest browser-translation fallback may be useful.
6. Use **Enrich Feed Metadata + Subjects Now…** when one feed contains many sparse items that should be processed.
7. Use **Backfill Feed Subject Tags…** only when subject-tag completion or cleanup is needed.
8. Keep Zotero automatic tags enabled if enrichment-derived Feed Subjects should be written as automatic tags.

## Metadata Enrichment as part of the research pipeline

RSSrch uses enrichment to improve the information available to the rest of the research workflow.

Conceptually:

```text
Zotero RSS feed
↓
Native feed metadata
↓
RSSrch Metadata Enrichment
↓
Effective research metadata
↓
Admission
↓
Relevance Scoring
↓
Actions
↓
Reader workflow
```

Enrichment is therefore not intended to replace Zotero's RSS system.

Its purpose is to make the metadata already flowing through Zotero more useful for research discovery, filtering, ranking, and review.

## Next

RSSrch brings the effective metadata, Admission result, Relevance Score, subjects, tags, and research controls together in its integrated reading and triage interface.

➡️ Continue to [[Reader Workflow]]