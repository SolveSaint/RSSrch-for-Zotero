---
updated: 08/27/2026 7:04 PM
title: Preview and Rule Testing
description: Test RSSrch Admission and Relevance Scoring rules against feed items, inspect detailed diagnostics, and audit rejected papers before committing rule changes.
siteurl:
tags:
  - preview
  - diagnostics
  - rule-testing
  - admission
  - scoring
  - rules
  - rssrch
---

RSSrch provides several tools for testing a research model before relying on it during normal feed triage.

The primary tool is the **Preview** workspace in the [[Rule Manager]].

Preview evaluates RSSrch rules against existing feed items without changing those items.

It can be used to answer questions such as:

- Are relevant papers passing Admission?
- Are irrelevant papers being filtered?
- Are scoring concepts activating when expected?
- Are important papers receiving appropriately high scores?
- Are broad conditions producing false positives?
- Are narrow conditions producing false negatives?
- Which exact field values and terms caused a rule to match?

Preview is designed to make the research model inspectable rather than treating rule decisions as a black box.

## Open Preview

In Zotero, open:

**Tools → RSSrch → Rule Manager…**

Then select:

**Preview**

The Preview workspace is described as:

**Test without changing items**

Its purpose is to:

> Evaluate the current scope against feed items without changing any items.

You can also run Preview directly from the Rule Manager footer by clicking:

**Preview**

RSSrch automatically switches to the Preview workspace while the evaluation runs.

## What Preview evaluates

Rule Manager Preview evaluates two parts of the RSSrch model:

1. **Admission**
2. **Relevance Score**

Conceptually:

```text
Feed item
↓
Evaluate Include
↓
Evaluate Exclude
↓
Admission result
↓
Calculate Relevance Score
↓
Display result
```

Preview therefore tests the behavior documented in:

- [[Include and Exclude Rules]]
- [[Relevance Scoring]]

## Preview does not execute Actions

Preview does **not** execute [[Actions]].

Running Preview will not:

- show real Action alerts
- add feed items to My Library
- add Action tags
- execute automatic Action effects

This remains true even if the current rule scope contains enabled Action rules.

Preview is intended to test the Admission and Score values that Actions may later depend on.

For example, if an Action requires:

```text
Minimum Score:
+8
```

Preview can verify whether a paper:

```text
passes Admission
AND
receives Score ≥ +8
```

but Preview does not simulate or execute the Action itself.

## Preview can test unsaved changes

One of the most useful properties of Rule Manager Preview is that it can evaluate the **current editor state before you save it**.

For example:

```text
Saved rules
↓
Edit Include condition
↓
Change scoring weight
↓
Add new concept
↓
Click Preview
```

RSSrch evaluates the edited rules currently shown in the Rule Manager.

You do not need to save those changes first.

This makes Preview useful as a safe rule-development workspace.

If the results are poor, you can continue editing without first committing the experimental configuration.

## Preview does not save rules

Clicking:

**Preview**

does not itself save the current rules.

The Rule Manager provides separate controls:

- **Preview**
- **Save**
- **Save + Preview**

Their behavior differs.

| Control | Saves rules | Runs Preview |
|---|---:|---:|
| Preview | No | Yes |
| Save | Yes | No |
| Save + Preview | Yes | Yes |

Use **Preview** when you want to test experimental changes without persisting them.

Use **Save + Preview** when you are ready to persist the current rule state and immediately verify it.

## Rule scope determines what Preview tests

The Rule Manager scope selector controls which rules are currently being edited.

A scope can be:

- **Global Rules**
- an individual Zotero feed

Preview evaluates the corresponding feed corpus and combines the current scope with the applicable saved rules from the other scope.

This distinction is important.

## Global Rules Preview

When the selected scope is:

**Global Rules**

Preview evaluates the current Global rule configuration across Zotero feeds.

Conceptually:

```text
Current Global rules
including unsaved Global edits
+
each feed's saved feed-specific rules
↓
evaluate feed items across the feed library
```

This allows you to test a change to the Global research model while preserving the feed-specific rules already configured for individual sources.

For example, if you add a new Global scoring concept and run Preview, RSSrch can show how that Global change affects papers across the feed environment while each feed continues contributing its saved local rules.

## Individual feed Preview

When the selected scope is an individual feed, Preview evaluates that feed using:

```text
Saved Global rules
+
current feed rules
including unsaved feed edits
```

Only the selected feed is evaluated.

This lets you test feed-specific changes in the context of the Global research model that would actually apply to that feed during normal processing.

## Preview evaluates the underlying feed items

Preview is not limited to the papers that currently happen to be visible after RSSrch filtering.

Filtered items must remain available to the testing system so that false negatives can be inspected.

For an individual feed, RSSrch evaluates the feed items available through Zotero's feed-item data layer.

For Global Preview, RSSrch evaluates items across the configured feeds.

This allows Preview to report both:

```text
INCLUDED
```

and:

```text
FILTERED
```

items even when native feed-view filtering would normally hide the rejected papers from the research view.

## Running Preview

Click:

**Preview**

RSSrch begins scanning the selected scope.

While the scan runs, the summary reports progress.

For an individual feed, the progress display shows the number of items evaluated.

For Global Rules, the display also reports the feed currently being processed.

The Preview button changes to:

**Cancel Preview**

while the scan is active.

Click it again if you need to stop the evaluation.

Changing Rule Manager scope or closing the Rule Manager also cancels an active Preview.

## Preview summary

After evaluation, RSSrch reports:

```text
total
included
filtered
```

For example:

```text
1,240 total
312 included
928 filtered
```

If result cards are displayed, the summary also reports how many of the highest-ranked results are currently shown.

This gives a quick picture of how selective the current Admission model is.

A large change in the included or filtered count after a rule edit can be an immediate signal that the change is broader than intended.

## Preview result cards

Each rendered result card contains:

- Admission status
- Relevance Score
- paper title
- **Diagnostics**

For example:

```text
INCLUDED   +12   Example paper title   Diagnostics
```

or:

```text
FILTERED   +8   Another paper title   Diagnostics
```

The presence of a Score on a filtered paper is intentional.

Relevance Score and Admission are separate systems.

A paper can score highly while still failing an Include gate or matching an Exclude veto.

Its Score cannot override that Admission result.

## Results are ranked by Score

Preview ranks results by Relevance Score.

Included and filtered results are ranked separately.

Within each group, higher-scoring papers appear first.

Conceptually:

```text
INCLUDED
highest Score
↓
lower Score

FILTERED
highest Score
↓
lower Score
```

This is particularly useful for two different kinds of testing.

Among **included** papers, it helps reveal whether the ranking model is prioritizing the right research.

Among **filtered** papers, it helps reveal potentially important false negatives.

A filtered paper with a very high Score deserves particular attention because the scoring model is detecting substantial research relevance while Admission is rejecting it.

## Preview does not render every result card at once

RSSrch evaluates the complete scope, but it intentionally limits how many detailed cards are initially rendered.

In v1.0.0, Preview displays up to:

```text
150 highest-scoring INCLUDED items
+
150 highest-scoring FILTERED items
```

for a maximum of 300 rendered result cards.

If additional evaluated items are not rendered, Preview reports how many result cards were suppressed.

This limit keeps large Global Preview runs responsive while still exposing the highest-priority results from both Admission classes.

The counts at the top still represent the complete evaluation, not only the rendered cards.

## Diagnostics are loaded on demand

Initial Preview cards are deliberately lightweight.

RSSrch does not construct full human-readable diagnostics for hundreds of papers during the initial scan.

Instead, each card provides:

**Diagnostics**

Click it when you need to understand an individual result.

RSSrch then performs a detailed evaluation of that paper and displays the rule evidence.

This keeps the initial Preview fast while still allowing deep inspection when necessary.

## Admission diagnostics

Detailed diagnostics can show the conditions evaluated for:

- Global Include
- Global Exclude
- Feed Include
- Feed Exclude

For each relevant condition, RSSrch can display information such as:

```text
GLOBAL INCLUDE
Condition label
Abstract / Summary
contains
MATCH
```

or:

```text
FEED EXCLUDE
Condition label
Publication / Source
contains whole word
NO MATCH
```

The diagnostic view distinguishes the Global and feed-specific parts of the Admission decision.

## Why a paper was filtered

For a rejected item, Diagnostics displays the Admission reason.

Possible reasons include:

```text
Global Include conditions did not pass
```

```text
Global Exclude conditions matched
```

```text
Feed Include conditions did not pass
```

```text
Feed Exclude conditions matched
```

This identifies which stage of Admission caused the rejection.

You can then inspect the individual condition rows to determine why that stage matched or failed.

## Condition diagnostics

For an evaluated condition, RSSrch can show:

- condition label
- metadata field
- matching operator
- MATCH or NO MATCH
- list mode
- number of parsed terms
- whether the tested field was empty
- tested field length
- matching explanation
- matched terms
- unmatched required terms

For example:

```text
Condition:
Motor neuron terminology

Field:
Abstract / Summary

Operator:
contains

List mode:
ANY

Result:
MATCH

Matched terms:
motor neuron
amyotrophic lateral sclerosis
```

For an **ALL terms** condition that fails, Diagnostics can identify the required terms that were not found.

For example:

```text
Unmatched required terms:
glutamate
motor neuron
```

This is useful when an apparently reasonable rule is actually too restrictive.

## Inspect the tested field value

Each condition diagnostic also provides:

**Show tested [field] value**

This exposes the actual metadata value RSSrch evaluated.

For example:

```text
Show tested Abstract / Summary value
```

lets you inspect the abstract text that the condition saw.

For literal and regular-expression matches, matching text can be highlighted in the displayed field value.

This is useful for diagnosing cases where:

- a feed supplies unexpected metadata
- a term appears in an unintended context
- a term is absent despite appearing elsewhere in the article
- an acronym matches differently than expected
- a regular expression captures an unexpected span

Rule testing should be based on the data RSSrch actually evaluated, not assumptions about what metadata ought to have been present.

## Score diagnostics

Diagnostics also displays the matched contributions that produced the item's Relevance Score.

For example:

```text
Score:
+8 Core mechanism
+4 Oxidative stress
-2 Article type: Review
```

The breakdown can include:

- Article-Type Scoring
- Global scoring concepts
- feed-specific scoring concepts

Only matched scoring contributions add to the final total.

See [[Relevance Scoring]] for the complete scoring model.

## Multi-condition scoring diagnostics

When a scoring concept contains multiple context conditions, Diagnostics can expose those conditions individually.

For example:

```text
+8 Stress-linked glutamatergic dysregulation
ALL context satisfied
2/2 conditions matched
```

The individual **SCORE CONTEXT** conditions can then be inspected.

This is particularly useful for relationship concepts such as:

```text
stress context
AND
glutamatergic mechanism
```

because you can determine whether the concept activated for the intended relationship rather than because of an overly broad term.

## Preview uses a fast scan and a detailed cross-check

RSSrch uses an optimized compiled evaluator for the initial Preview scan.

This allows large rule scopes to be evaluated without building detailed diagnostic structures for every item.

When you click **Diagnostics**, RSSrch evaluates that specific item using the detailed rule evaluator.

It then cross-checks:

- Admission result
- Relevance Score

against the result from the fast Preview scan.

Conceptually:

```text
Fast Preview result
↓
Diagnostics requested
↓
Detailed evaluation
↓
Compare Admission + Score
```

The two evaluation paths are expected to agree.

## Fast/detail mismatch warning

If RSSrch detects a difference between the fast Preview result and the detailed evaluation, it displays a warning:

```text
Fast/detail mismatch detected; detailed result shown.
```

The card is then updated to reflect the detailed result.

This is a correctness safeguard.

A mismatch indicates that the optimized Preview evaluator and the detailed evaluator did not produce identical semantics for that item.

Such a warning is useful diagnostic information and should not be ignored when validating a rule model.

Under normal operation, the two paths should agree.

## Preview becomes Stale after rule changes

After a Preview has been run, changing rules does not automatically rerun it.

Instead, RSSrch marks the existing result:

**Stale**

The Preview workspace reports that the rules have changed since the previous evaluation.

Conceptually:

```text
Run Preview
↓
Results current
↓
Edit rule
↓
Results marked STALE
↓
Run Preview again
```

The existing cards may remain visible, but they no longer represent the current editor state.

Run Preview again before drawing conclusions from them.

## A useful iterative testing cycle

Preview is designed for repeated rule refinement.

A typical cycle is:

```text
Edit rule
↓
Preview
↓
Inspect counts
↓
Inspect high-ranked INCLUDED papers
↓
Inspect suspicious FILTERED papers
↓
Open Diagnostics
↓
Adjust rule
↓
Preview again
```

You can repeat this cycle without saving until the model behaves as intended.

## Testing Admission

When evaluating [[Include and Exclude Rules]], examine both sides of the decision.

### False positives

A false positive is a paper that passes Admission but should probably have been filtered.

Look for:

- broad Include conditions
- ambiguous terminology
- missing Exclude contexts
- unexpected Feed Subjects
- acronym collisions
- conditions using the wrong metadata field

Open Diagnostics and inspect the exact matched condition and tested field value.

### False negatives

A false negative is a relevant paper that RSSrch filters.

These deserve particular attention because they remove research from the normal admitted view.

Look for:

- overly narrow Include vocabulary
- ALL logic that should be ANY
- unwanted Exclude matches
- missing synonyms
- missing feed metadata
- unexpected structured article-type values
- rules that assume information the feed did not provide

High-scoring filtered papers are especially useful false-negative candidates to inspect.

## Testing Relevance Scoring

For [[Relevance Scoring]], focus on ranking rather than only the absolute number.

Ask questions such as:

- Are the most important papers near the top?
- Are Core concepts activating on genuinely central research?
- Are broad Supporting concepts accumulating too much weight?
- Are penalties suppressing useful papers too strongly?
- Are the same signals being counted in both Global and feed rules?
- Is Article-Type Scoring creating an unintended duplicate penalty?

Use the Score breakdown to identify which concepts are driving an unexpected result.

## Test both Global and feed scopes

A research model can behave correctly in one feed but poorly in another.

Global rules apply broadly, while feed-specific rules add local behavior.

A useful testing process is therefore:

1. Preview the **Global Rules** scope.
2. Inspect results across the broader feed environment.
3. Select important individual feeds.
4. Preview their feed-specific scopes.
5. Check whether local rules improve precision without duplicating Global signals.

This is particularly important when feeds use different terminology, metadata conventions, or publication structures.

## Quick Rule Preview

RSSrch also provides a separate:

**Quick Rule Preview**

Open:

**Tools → RSSrch → Rules & Scoring → Quick Rule Preview**

Quick Rule Preview asks you to select an individual feed and evaluates that feed using its **saved** rules together with the saved Global rules.

It then copies a plain-text report to the clipboard.

The report includes:

- feed name
- feed URL
- total item count
- included count
- filtered count
- every included item
- every filtered item
- Admission condition results
- tested field values
- matched terms
- unmatched required terms where applicable
- rejection reasons

Quick Rule Preview is useful when you want a complete text report for an individual feed rather than the bounded visual card set in the Rule Manager.

## Quick Rule Preview uses saved rules

Unlike Rule Manager Preview, Quick Rule Preview does not operate on unsaved Rule Manager edits.

It loads the saved feed rules and saved Global rules.

Therefore:

```text
Unsaved Rule Manager changes
↓
Quick Rule Preview
↓
not included
```

If you want Quick Rule Preview to reflect a new configuration, save the rules first.

Use normal Rule Manager Preview when testing unsaved changes.

## Quick Rule Preview is primarily an Admission report

Quick Rule Preview provides detailed Include and Exclude diagnostics for the full selected feed.

It should not be confused with the richer per-item Score diagnostics available through the Rule Manager Preview cards.

Use:

**Rule Manager Preview + Diagnostics**

when you want interactive Admission and Score analysis.

Use:

**Quick Rule Preview**

when you want a complete saved-rule Admission report copied to the clipboard.

## Rejected Items Audit

RSSrch also provides a dedicated false-negative auditing tool:

**Rejected Items for Audit**

It evaluates rejected papers using the **saved** RSSrch rules and creates a detailed report specifically for Admission review.

From the Rule Manager, open:

**Export → Export Rejected Items for Audit…**

The same maintenance tools are also available under:

**Tools → RSSrch → Maintenance**

where you can:

- **Copy Rejected Items for Audit**
- **Export Rejected Items for Audit…**

## Audit scopes

The Rejected Items Audit can operate on the currently represented feed scope, including:

- an individual Zotero feed
- an RSSrch Feed Folder
- the top-level **Feeds** view

For an RSSrch Feed Folder, the audit can evaluate the feeds contained within that folder scope.

For the top-level Feeds view, it can evaluate across the configured feeds.

## Rejected Items Audit uses saved rules

The audit deliberately evaluates the saved RSSrch configuration.

It does not use unsaved edits currently sitting in the Rule Manager.

Therefore:

```text
Edit Admission rules
↓
Do not save
↓
Export Rejected Items for Audit
↓
audit still uses previously saved rules
```

If you want an audit to reflect the new configuration, save it first.

For experimental unsaved changes, use Rule Manager Preview.

## What the rejected audit contains

The Markdown audit includes metadata for each rejected item, such as available:

- feed
- title
- authors
- date
- publication or source
- publisher
- Section / Article Type
- Feed Subjects
- Manual Tags
- Zotero item type
- DOI
- ISSN
- volume
- issue
- pages
- language
- URL
- Zotero key
- Abstract / Summary

It then records the RSSrch Admission decision.

For example:

```text
Decision: REJECTED

Reason:
Global Include conditions did not pass

Global Include passed:
NO

Global Exclude matched:
NO

Feed Include passed:
YES

Feed Exclude matched:
NO
```

The report also includes the detailed Include and Exclude condition evaluations.

This makes it suitable for systematic false-negative review or for providing rejected research examples to an external analysis workflow.

## Preview, Quick Preview, and Rejected Audit compared

The three testing tools serve different purposes.

| Tool | Unsaved rules | Scope | Primary output |
|---|---|---|---|
| Rule Manager Preview | Yes, for current scope | Global or one feed | Interactive Admission + Score testing |
| Quick Rule Preview | No | One feed | Complete clipboard Admission report |
| Rejected Items Audit | No | Feed, RSSrch folder, or Feeds view | Detailed rejected-item Markdown audit |

All three are non-destructive with respect to feed items.

The main distinction is whether you are testing an experimental editor state or auditing the saved research model.

## Choosing the right tool

Use **Rule Manager Preview** when:

- developing rules
- testing unsaved changes
- tuning Score weights
- inspecting individual condition behavior
- checking exact tested metadata values
- comparing Included and Filtered rankings

Use **Quick Rule Preview** when:

- you want every item from one feed in a text report
- the rules are already saved
- you want complete Include and Exclude diagnostics on the clipboard

Use **Rejected Items Audit** when:

- investigating false negatives
- reviewing filtered papers systematically
- examining a feed folder or broader feed view
- exporting rejected papers for external analysis

## Reset Current Rules as a local test

The Rule Manager also provides:

**Reset Current Rules**

This resets the current editor state locally to the default empty rule set.

The reset is not persisted until you click **Save**.

This means you can, for example:

```text
Reset Current Rules
↓
Preview
```

to inspect how the scope behaves with the local default configuration before deciding whether to save anything.

Do not confuse this with:

**Clear Saved Rules**

which removes the persisted rules for the current scope.

## Rule testing does not replace research judgment

Preview tells you exactly how the configured rule model behaves.

It does not determine whether that behavior represents a good research model.

The testing process still requires examining real papers and asking whether the model is making useful distinctions.

A technically correct match can still represent a poor research decision if:

- the concept is too broad
- the weight is poorly calibrated
- an exclusion removes useful evidence
- the terminology does not represent the actual research goal
- metadata from one publisher behaves differently from another

The purpose of Preview is to expose those decisions clearly enough that they can be refined.

## Recommended rule-testing workflow

When developing or refining RSSrch rules:

1. Make the proposed rule changes.
2. Run **Preview** without saving.
3. Compare the total Included and Filtered counts.
4. Review the highest-ranked Included papers.
5. Review high-scoring Filtered papers for false negatives.
6. Open **Diagnostics** on unexpected results.
7. Inspect the exact field value RSSrch tested.
8. Check matched and unmatched terms.
9. Inspect the Score breakdown.
10. Adjust rules or weights.
11. Run Preview again.
12. Repeat until the model behaves as intended.
13. Click **Save + Preview** when you are ready to persist the configuration.
14. Use **Quick Rule Preview** for a complete saved-rule feed report when needed.
15. Use **Rejected Items for Audit** for systematic false-negative review.

## Next

RSSrch rules can evaluate automatic subject metadata and tags collected from feed items and metadata enrichment.

➡️ Continue to [[Automatic Tags and Folder Tags]]