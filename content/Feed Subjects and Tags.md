---
updated: 08/27/2026 7:12 PM
title: Feed Subjects and Tags
description: Understand how RSSrch uses Zotero automatic tags, manual tags, feed subjects, enrichment-derived subjects, and folder-scoped tag browsing.
siteurl:
tags:
  - feed-subjects
  - tags
  - automatic-tags
  - metadata
  - feed-folders
  - rssrch
---

RSSrch uses Zotero's existing tag system to provide additional research context for feed items.

It does not maintain a separate RSSrch tag database.

RSSrch distinguishes three related rule fields:

| RSSrch field | Meaning |
|---|---|
| **Feed Subjects** | Zotero automatic tags |
| **Tags** | All Zotero tags |
| **Manual Tags** | Zotero non-automatic tags |

These distinctions are available throughout RSSrch in areas such as:

- [[Include and Exclude Rules]]
- [[Relevance Scoring]]
- Reader information
- rule diagnostics
- research exports

## Feed Subjects

In RSSrch, **Feed Subjects** means the automatic Zotero tags attached to a feed item.

These tags can represent research classifications obtained from several sources.

They may include:

- subject or category information supplied by an RSS or Atom feed
- structured publisher metadata
- article keywords
- subject classifications discovered through [[Metadata Enrichment]]

For example, a feed item might have automatic subject tags such as:

```text
Neuroscience
Motor Neuron Disease
Oxidative Stress
Mitochondria
```

RSSrch exposes those automatic tags through the **Feed Subjects** rule field.

> [!note]
> The name **Feed Subjects** describes how RSSrch uses these tags as research metadata. It does not mean every value necessarily came directly from the original RSS feed. Enrichment-derived article subjects can also appear there.

## Tags

The **Tags** rule field contains all Zotero tags attached to the item.

Conceptually:

```text
Tags
=
Automatic Tags
+
Non-Automatic Tags
```

So if an item contains:

```text
Automatic:
Neuroscience
Ferroptosis

Non-Automatic:
priority
reviewed
```

the **Tags** field can expose all four values.

Use **Tags** when the distinction between automatic research metadata and intentionally assigned non-automatic tags does not matter for the rule.

## Manual Tags

The **Manual Tags** rule field contains Zotero tags whose type is non-automatic.

These commonly include:

- tags created by the user
- tags added through RSSrch [[Actions]]
- other non-automatic Zotero tags

For example:

```text
rssrch:priority
important
follow-up
```

can be evaluated independently of automatic Feed Subjects.

> [!important]
> In RSSrch's implementation, **Manual Tags** means non-automatic Zotero tags. It should not be interpreted as proof that a particular tag was personally typed by the researcher.

This distinction is useful when intentional workflow tags should carry different meaning from publisher or enrichment metadata.

## Where Feed Subjects come from

RSSrch can populate automatic subject tags from more than one metadata path.

### Feed-provided subjects

RSS and Atom entries can contain category or subject information.

RSSrch captures available subject terms from the feed entry and preserves them as Zotero automatic tags when automatic tagging is enabled.

Depending on the feed format and provider, this may include information represented as:

- categories
- subjects
- structured feed classification fields

Feed quality varies considerably between publishers.

Some feeds provide useful article-level subjects, while others provide very little classification metadata.

### Metadata enrichment

RSSrch can also obtain subject and keyword metadata during enrichment.

When accepted subject metadata is found, RSSrch can add those terms to the feed item as Zotero automatic tags.

This means an item that originally arrived with sparse feed metadata can later gain useful research subjects after enrichment.

For example:

```text
Feed arrives
↓
Few or no useful subjects
↓
RSSrch metadata enrichment
↓
Publisher or article metadata resolved
↓
Accepted subject terms
↓
Zotero automatic tags
```

See [[Metadata Enrichment]] for how RSSrch resolves and applies additional metadata.

## RSSrch respects Zotero's automatic-tag setting

RSSrch does not bypass Zotero's automatic-tag preference.

When Zotero automatic tags are enabled, RSSrch can add:

- feed-supplied subjects
- enrichment-derived subject tags

as automatic Zotero tags.

When Zotero automatic tags are disabled, RSSrch does not add these automatic subject tags.

Manual and other non-automatic tags remain separate from this setting.

Conceptually:

```text
Zotero automatic tags enabled
↓
RSSrch may add accepted Feed Subjects

Zotero automatic tags disabled
↓
RSSrch does not add automatic Feed Subjects
```

RSSrch therefore follows Zotero's tag model rather than implementing an independent automatic-tag system.

## Feed refresh and subject tags

Feed metadata can change over time.

When Zotero refreshes a feed, RSSrch rebuilds native feed-supplied subject tags from the current feed entry.

This allows obsolete feed categories to disappear when a publisher no longer supplies them.

At the same time, RSSrch protects enrichment-derived automatic subject tags that represent article-level metadata discovered separately from the feed payload.

Conceptually:

```text
Existing tags
↓
Preserve non-automatic tags
↓
Preserve protected enrichment subjects
↓
Rebuild native feed subjects from current feed metadata
```

This prevents stale feed categories from accumulating indefinitely while retaining useful article-level enrichment data.

## Manual tags are preserved

RSSrch feed processing does not discard existing non-automatic tags.

For example, if a feed item contains:

```text
Manual:
priority
```

and a later feed refresh supplies:

```text
Automatic:
Neuroscience
Motor Neuron Disease
```

the resulting item can retain:

```text
Manual:
priority

Automatic:
Neuroscience
Motor Neuron Disease
```

Feed refresh and subject enrichment are not intended to replace the user's tagging workflow.

## Manual tags take precedence over automatic duplicates

If an item already contains a non-automatic tag with the same name as an incoming automatic subject, RSSrch preserves the non-automatic form.

For example:

```text
Existing non-automatic tag:
Ferroptosis

Incoming automatic subject:
Ferroptosis
```

RSSrch does not replace the existing tag with an automatic version.

The non-automatic tag wins.

The same principle applies when enrichment discovers a subject whose name already exists as a non-automatic tag.

The existing tag still satisfies the subject semantically without being converted into an automatic tag.

## Subject cleanup

Metadata sources sometimes provide values that are technically present but useless as research subjects.

RSSrch rejects obvious placeholder values such as:

```text
N/A
none
null
unknown
undefined
not available
no keywords
no subject
```

RSSrch also contains targeted cleanup for known provider-specific boilerplate when that material cannot be established as trustworthy article-level subject metadata.

The goal is to retain research-relevant classifications rather than filling Zotero's Tag Selector with metadata placeholders or source boilerplate.

## Feed Subjects in rules

Feed Subjects can be used anywhere RSSrch conditions are supported.

For example:

```text
Field:
Feed Subjects

Operator:
contains whole word

Term:
Ferroptosis
```

A scoring concept could use:

```text
Concept:
Ferroptosis subject classification

Weight:
+4

Condition:
Feed Subjects contains whole word
Ferroptosis
```

Or an Admission rule might combine Feed Subjects with other metadata:

```text
ALL conditions

Feed Subjects contains
Neuroscience

Abstract / Summary contains
motor neuron
```

Because Feed Subjects can come from both native feed metadata and enrichment, they can provide structured context beyond title and abstract text.

See [[Include and Exclude Rules]] for condition behavior and [[Relevance Scoring]] for weighted scoring concepts.

## Manual Tags in rules

The **Manual Tags** field can be useful for intentional research workflow states.

For example, an RSSrch Action might add:

```text
rssrch:priority
```

A later rule can evaluate:

```text
Manual Tags
contains
rssrch:priority
```

This keeps intentional workflow tags distinguishable from automatic subject metadata.

Remember that [[Actions]] do not chain during the same new-item processing pass. A tag created by one Action does not cause another Action to become newly matched during that same pass.

## Folder-scoped tags

RSSrch Feed Folders do not own tags.

There is no separate collection of:

```text
Folder tags
```

stored on an RSSrch folder.

Instead, RSSrch extends the scope of Zotero's existing **Tag Selector** when an RSSrch folder is selected.

Suppose the folder structure is:

```text
Neurology
├── ALS Research
│   ├── Feed A
│   └── Feed B
└── Ferroptosis
    └── Feed C
```

Selecting:

```text
Neurology
```

allows Zotero's Tag Selector to represent tags from:

```text
Feed A
+
Feed B
+
Feed C
```

Selecting:

```text
ALS Research
```

limits that scope to:

```text
Feed A
+
Feed B
```

RSSrch determines the descendant feed libraries represented by the selected folder and supplies those feed-library scopes to Zotero's Tag Selector.

The Tag Selector itself remains Zotero's native tag interface.

## Top-level Feeds tag scope

RSSrch also extends tag support for Zotero's synthetic top-level:

**Feeds**

row.

Zotero does not normally provide a complete tag union for that synthetic aggregate row.

RSSrch supplies the aggregate feed-item scope so Zotero's Tag Selector can expose tags across the current feed libraries.

Conceptually:

```text
Feeds
↓
all current Zotero feed libraries
↓
Zotero Tag Selector
↓
combined available tags
```

RSSrch uses Zotero's own feed search results and Tags API for this behavior rather than maintaining a parallel tag index.

## Folder selection does not copy tags

Selecting an RSSrch folder does not:

- copy tags between feed items
- add tags to the folder
- create new Zotero tags
- merge the feed libraries
- change the underlying subscriptions

It only changes which feed libraries are represented by the Tag Selector scope.

This makes folder tag browsing a discovery feature rather than a metadata mutation.

See [[Feed Folders]] for the complete folder model.

## Backfill Feed Subject Tags

RSSrch provides a maintenance command for completing or repairing automatic subject metadata.

Open:

**Tools → RSSrch → Enrichment → Backfill Feed Subject Tags…**

Metadata enrichment must be enabled before the backfill can run.

RSSrch explains that the operation will:

- clean rejected placeholder subject tags
- finish incomplete subject-tag enrichment
- give still-untagged eligible items a bounded publisher or DOI subject fallback pass
- save accepted high-confidence subject terms as Zotero automatic tags

Manual tags are never removed or converted by this operation.

## What the backfill examines

The backfill scans Zotero feed items and identifies those whose subject-tag enrichment is incomplete or eligible for a bounded fallback attempt.

An item may be selected when RSSrch determines that:

- subject enrichment remains incomplete
- accepted cached subject data needs completion
- no accepted enrichment subjects are available
- sufficient article identity is available through a URL or DOI for a bounded fallback attempt

RSSrch prioritizes eligible items and processes them through the normal paced enrichment system.

For a large feed library, the operation can take time because resolving article-level subject metadata may require network requests.

## Placeholder cleanup during backfill

Before resolving new subjects, the backfill also cleans rejected automatic placeholder assignments and corresponding cached enrichment values.

For example, an automatic tag such as:

```text
Unknown
```

may be removed when it represents rejected placeholder metadata.

This cleanup applies to automatic subject metadata.

Non-automatic tags are protected.

## Backfill is not required for normal use

Normal RSSrch processing already captures and enriches subject metadata as new feed items are processed.

**Backfill Feed Subject Tags** is primarily useful when:

- RSSrch subject-tag behavior has been improved
- older feed items predate the current subject-tag enrichment system
- a library contains incomplete subject metadata
- rejected placeholder tags need cleanup
- existing items need one bounded attempt to obtain better subject classifications

It does not need to be run routinely after every feed refresh.

## Using tags for research discovery

Tags are most useful when their source and meaning are kept clear.

A practical model is:

```text
Feed Subjects
→ automatic research classification

Manual Tags
→ intentional workflow state

Tags
→ either type when distinction is unnecessary
```

RSSrch Feed Folders then provide a way to explore those tags across a larger research domain without changing the underlying metadata.

For example:

```text
Folder:
Neurodegeneration

Tag Selector:
Ferroptosis
Mitochondria
Oxidative Stress
Motor Neuron Disease
Microglia
```

can reveal recurring terminology across several feeds represented by that folder.

This makes Zotero's tag system useful not only for individual-paper organization but also for exploring the vocabulary of an incoming research stream.

## Next

Some Feed Subjects are available directly from RSS or publisher metadata, while others are discovered through RSSrch's enrichment pipeline.

➡️ Continue to [[Metadata Enrichment]]