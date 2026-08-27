---
updated: 08/27/2026 7:25 PM
title: Actions
description: Respond to newly added admitted feed items with score thresholds, rule conditions, Zotero alerts, automatic My Library saves, and manual tags.
siteurl: https://solvesaint.github.io/RSSrch-for-Zotero/actions
tags:
  - actions
  - alerts
  - automation
  - rules
  - research-workflow
  - rssrch
---

RSSrch **Actions** respond to newly added feed items after those items have passed Admission.

Actions can:

- show a Zotero alert
- add a feed item to **My Library**
- add a manual Zotero tag to the feed item

Action rules can also require:

- a minimum [[Relevance Scoring|Relevance Score]]
- additional rule conditions
- or both

Actions are the third stage of the main RSSrch rule workflow:

```text
Admission
↓
Relevance Scoring
↓
Actions
```

An Action cannot override Admission.

If an item fails an Include gate or matches an Exclude veto, Actions do not run for that item.

## Actions apply to new feed items

Actions are designed for **newly added Zotero feed items**.

When Zotero receives a new feed item, RSSrch can evaluate it and perform any matching Action rules.

Creating or changing an Action rule does **not** scan the existing feed library and apply that Action retroactively.

For example, creating:

```text
Minimum Score:
+8

Effect:
Add to My Library
```

does not add every existing +8 paper to My Library.

It applies to newly added feed items processed after the Action is configured.

This behavior is intentional. Action-only rule changes are saved without launching a feed rescan or historical Action backfill.

## Where Actions fit in processing

For a newly added feed item, the normal processing path is:

```text
New Zotero feed item
↓
RSSrch Active?
↓
Metadata enrichment required?
├── Yes → complete queued enrichment
└── No  → continue
↓
Evaluate Admission
↓
Admitted?
├── No  → stop
└── Yes
    ↓
Calculate final Relevance Score
    ↓
Evaluate Global Actions
+
Evaluate feed-specific Actions
    ↓
Execute matching effects
```

This order matters.

Actions evaluate the item's Admission result and final Relevance Score before determining whether an Action rule matches.

## Open the Actions workspace

In Zotero, open:

**Tools → RSSrch → Rule Manager…**

Then select:

**3 Actions**

The Actions workspace is described as:

**Respond to new admitted items**

Each Action rule can define its own trigger criteria and one or more effects.

## Anatomy of an Action rule

An Action rule contains:

```text
Enabled

Action label

Minimum Score
optional

Conditions
optional

Effects
one or more
```

The available effects are:

```text
Show Zotero alert

Add to My Library

Add manual tag
```

A rule might therefore look conceptually like:

```text
Action:
Save high-value mechanism papers

Enabled:
Yes

Minimum Score:
+8

When:
ALL conditions must match

Conditions:
Target mechanism
Target disease context

Effects:
Add to My Library
Show Zotero alert
Add manual tag
```

## Enabled

Each Action rule can be enabled or disabled independently.

A disabled Action remains in the rule configuration but is skipped during Action evaluation.

This can be useful when temporarily testing or suspending a workflow without deleting the rule.

## Action label

The **Action label** gives the rule a readable name.

Examples:

```text
High-value paper alert

Automatically save core papers

Tag strong mechanism matches

Priority review queue
```

The label does not determine whether the rule matches.

RSSrch uses it to identify matching Actions in places such as notifications and diagnostics.

If no label is supplied, RSSrch can fall back to the applicable rule scope when presenting a match.

Use descriptive labels so that it is clear why an Action occurred.

## Minimum Score

An Action can require a minimum Relevance Score.

The field is optional.

If it is blank, the Action has no Score requirement.

If a threshold is configured, the comparison is inclusive:

```text
Minimum Score: +8
```

means:

```text
Score +7
→ does not satisfy threshold

Score +8
→ satisfies threshold

Score +9
→ satisfies threshold
```

Conceptually:

```text
Score ≥ Minimum Score
```

## Which Score does an Action use?

The threshold uses the item's **final RSSrch Relevance Score**.

That score can contain:

```text
Article-Type Score
+
Global Scoring Concepts
+
Feed Scoring Concepts
```

For example:

```text
Article-Type Score          -1
Global concepts             +8
Feed concepts               +4
                            ──
Final Relevance Score       +11
```

An Action with:

```text
Minimum Score: +8
```

would satisfy its Score requirement.

See [[Relevance Scoring]] for details about how the final score is calculated.

## Conditions are optional

An Action does not require additional conditions.

If an Action has:

- no Action conditions
- but a Minimum Score

then its trigger is effectively:

```text
Admitted
AND
Score ≥ threshold
```

For example:

```text
Minimum Score:
+8

No extra conditions

Effect:
Show Zotero alert
```

means:

```text
New item
↓
Admitted
↓
Score ≥ +8
↓
Alert
```

If an Action has neither a Score threshold nor additional conditions, it applies to every newly processed admitted item within that rule scope.

For example:

```text
No Score threshold
No extra conditions

Effect:
Add to My Library
```

would attempt to save every newly added admitted item covered by that Action rule.

Configure broad Actions carefully.

## Action conditions

Actions can contain additional conditions beyond Admission and Score.

These conditions use the same rule-matching system described in [[Include and Exclude Rules]].

They can evaluate fields including:

- Title
- Abstract / Summary
- Author
- URL
- Publication / Source
- Publisher
- Section / Article Type
- Feed Subjects
- Tags
- Manual Tags
- DOI

They also use the same:

- matching operators
- ANY / ALL term logic
- case-sensitivity behavior
- acronym-safe whole-word matching

Action conditions are an additional trigger layer.

They do not replace Admission.

## ALL or ANY Action conditions

An Action rule can use:

**ALL conditions must match (AND)**

or:

**ANY condition may match**

### ALL conditions

Every active Action condition must match.

For example:

```text
Minimum Score:
+8

When:
ALL conditions must match

Condition 1:
Abstract contains ANY
ferroptosis
lipid peroxidation

Condition 2:
Abstract contains ANY
neurodegeneration
motor neuron
```

The Action requires:

```text
Score ≥ +8
AND
Condition 1
AND
Condition 2
```

### ANY condition

At least one active Action condition must match.

For example:

```text
When:
ANY condition may match

Condition 1:
Title contains
ferroptosis

Condition 2:
Abstract contains
ferroptosis
```

Either condition is sufficient once Admission and any configured Score threshold have also been satisfied.

Action condition groups support **ALL** and **ANY**.

They do not use the Admission group's **NONE of conditions** mode.

## Complete Action matching logic

A configured Action rule can therefore be understood as:

```text
RSSrch Active
AND
New feed item
AND
Admission passed
AND
Minimum Score satisfied, if configured
AND
Action conditions satisfied, if configured
↓
Execute configured effects
```

This keeps Admission, ranking, and automated response as separate parts of the research model.

## Global and feed-specific Actions

Actions can exist in:

- **Global Rules**
- individual feed rules

When a new item is processed, RSSrch evaluates applicable Action rules from both scopes.

Global and feed-specific Actions are additive.

RSSrch does not stop after the first matching Action.

For example, one paper could match:

```text
Global Action:
High-value paper alert

Global Action:
Add priority tag

Feed Action:
Automatically save core papers
```

All applicable matching Actions can contribute effects.

This allows Global Rules to define research-wide behavior while individual feeds add source-specific workflows.

## Multiple Action rules can match

Action rules are not an either/or list.

For an admitted paper, RSSrch evaluates all applicable enabled Action rules.

Conceptually:

```text
Action A matches
→ alert

Action B matches
→ manual tag

Action C matches
→ My Library
```

All three effects can occur for the same new paper.

This is different from a first-match rule system where processing stops after one rule succeeds.

## Available effects

Every functional Action rule needs at least one effect.

The available effects are:

1. **Show Zotero alert**
2. **Add to My Library**
3. **Add manual tag**

A single Action rule can enable one, two, or all three.

An Action with no configured effect has no executable behavior.

## Show Zotero alert

Enable:

**Show Zotero alert**

to notify you when a new feed item matches the Action.

The notification includes information such as:

- the paper title
- its Relevance Score
- the matching Action label or labels

For example:

```text
A new paper title · Score +12 · High-value mechanism paper
```

### Nearby alerts are grouped

RSSrch does not need to open a separate modal dialog for every paper arriving in the same feed-refresh burst.

Nearby matches are grouped into a Zotero notification.

For a single match, RSSrch presents a new rule-match notification.

For multiple matches, the notification reports the number of new rule matches and lists the matched papers that fit in the notification.

When several alert Actions match the same paper, their labels can be combined in the same entry.

This makes alerts usable when several relevant papers arrive together.

## Add to My Library

Enable:

**Add to “My Library”**

to automatically send a matching feed item through Zotero's normal feed-item **Add to My Library** save path.

RSSrch does not implement a separate private paper importer for this Action.

It delegates the operation to Zotero.

Conceptually:

```text
Matching RSSrch Action
↓
Zotero feed-item translation/save path
↓
My Library
```

The destination is the user's Zotero **My Library**.

## Attachments and PDFs

Zotero's normal feed-item save path can perform web translation and attachment saving when supported by the source and available translator.

This can include translator-provided:

- item metadata
- attachments
- PDFs

when available.

When normal translation is unavailable, Zotero's own fallback behavior can apply.

RSSrch therefore does not guarantee that every automatic My Library save will contain a PDF.

Attachment behavior depends on what Zotero can retrieve for that feed item and source.

## Automatic My Library saves are queued

Zotero's feed-item translation path is a relatively expensive operation and can use shared browser and translation resources.

RSSrch therefore serializes automatic My Library translations instead of launching many of them concurrently.

If several new papers match automatic-save Actions at once, the translation operations are processed in sequence.

This is intended to preserve Zotero stability during feed bursts.

## Multiple save Actions do not launch duplicate translations in the same pass

A paper can match more than one Action rule requesting:

**Add to My Library**

For example:

```text
Global Action:
Add to My Library

Feed Action:
Add to My Library
```

RSSrch gathers the matching save effects and performs the My Library translation once for that feed item during the processing pass.

Successful completion can then be recorded for each matching Action rule.

This avoids launching one Zotero translation for every matching rule.

## Add manual tag

An Action can add one manual Zotero tag to the matching feed item.

For example:

```text
Add manual tag:
rssrch:priority
```

RSSrch applies this as a normal non-automatic Zotero tag.

It is therefore available through Zotero's normal tag system and can also be evaluated through RSSrch's **Manual Tags** rule field.

## Manual tags apply to the feed item

The **Add manual tag** effect applies to the original Zotero **feed item**.

Conceptually:

```text
Feed item
↓
Add manual Zotero tag
```

It does not mean:

```text
My Library copy
↓
Add tag
```

This distinction is important when one Action combines:

- Add to My Library
- Add manual tag

RSSrch performs the My Library translation separately and then applies the Action tag to the feed item.

The manual-tag effect should therefore not be interpreted as automatically tagging the My Library item created by the save effect.

## Existing manual tags are not duplicated

Before applying an Action tag, RSSrch checks the feed item's existing non-automatic Zotero tags.

If the same tag already exists, RSSrch treats that tag requirement as satisfied rather than adding another copy.

Likewise, if multiple matching Actions request the same manual tag during the same processing pass, the tag is effectively added once.

## Combining effects

A single Action can combine all three effects.

For example:

```text
Action:
Priority mechanism paper

Minimum Score:
+8

Effects:
✓ Show Zotero alert
✓ Add to My Library
✓ Add manual tag: rssrch:priority
```

When the rule matches, RSSrch can:

```text
Save through Zotero to My Library
+
Tag the feed item
+
Queue the alert
```

The effects are handled independently.

A failure in one effect does not automatically prevent RSSrch from attempting the other configured effects.

For example, if Zotero cannot complete an automatic My Library translation, the manual-tag and alert effects can still proceed.

## Enrichment happens before Actions when queued

New feed items do not always arrive with complete metadata.

RSSrch may queue an item for metadata enrichment before Action evaluation.

When that happens:

```text
New feed item
↓
Queue enrichment
↓
Enrichment completes
↓
Refresh evaluation data
↓
Evaluate Admission
↓
Calculate final Score
↓
Evaluate Actions
```

RSSrch deliberately waits for the queued enrichment job to finish before running Actions for that new item.

This gives Action conditions access to the updated metadata available after enrichment.

Possible relevant fields include:

- Abstract / Summary
- Feed Subjects
- DOI
- publication metadata
- other enriched fields used by rules

After enrichment completes, RSSrch invalidates any pre-enrichment evaluation snapshot before calculating Admission, Score, and Action conditions.

If enrichment cannot obtain additional information, Action processing can still continue afterward using the data that is available.

## RSSrch Active controls Actions

The effective **RSSrch Active** state of a feed controls whether RSSrch performs its processing for newly received items.

If a feed is effectively disabled:

```text
New Zotero feed item
↓
RSSrch Active = Disabled
↓
No RSSrch Action processing
```

Zotero still owns the feed subscription, retrieval, and storage.

Disabling RSSrch processing does not disable Zotero feed refresh.

See [[Feed Folders]] for the RSSrch Active inheritance model.

## Admission still controls Actions when feed filtering is disabled

The setting that controls whether rejected items are hidden from Zotero's native feed view does not change Action eligibility.

If:

**Filter Native Feed View**

is disabled, a rejected item may remain visible in Zotero's item list.

It is still rejected by the RSSrch research model.

Therefore:

```text
Visible in native feed view
≠
Admitted
```

A rejected item does not trigger Actions merely because native feed filtering is disabled.

## Actions do not chain within a processing pass

RSSrch determines which Action rules match before applying their effects.

Conceptually:

```text
Evaluate applicable Action rules
↓
Determine matches
↓
Execute effects
```

It does not repeatedly modify the item and then re-evaluate the remaining Action rules after each effect.

For example:

```text
Action A:
Add manual tag "priority"

Action B:
When Manual Tags contains "priority"
→ Add to My Library
```

If the item did not already contain `priority` when Actions were evaluated, Action A adding that tag does not cause Action B to become newly matched during the same processing pass.

Action effects should therefore not be designed as a procedural chain where one Action creates the trigger for another Action on the same new-item event.

## Feed-item modifications do not normally rerun Actions

The Action workflow is triggered by the **addition of a new feed item**.

Ordinary later feed-item modifications do not launch a new general Action pass.

The enrichment workflow is a specific continuation of new-item processing: when a newly added item was deferred for enrichment, RSSrch runs its pending Actions after that enrichment job finishes.

This is another reason not to design Action rules as multi-step chains.

## Execution receipts

RSSrch stores persistent **Action execution receipts** to prevent the same completed effect from firing repeatedly for the same feed item and Action semantics.

Receipts track effects independently.

For example:

```text
Add to My Library
complete

Manual tag
complete

Alert
complete
```

The tracked effect types are:

- My Library save
- manual tag
- notification

This protects against duplicate notifier activity and repeated processing paths.

## Receipts are effect-specific

RSSrch does not treat an Action as one indivisible completed operation.

Each effect receives its own completion state.

For example:

```text
My Library save      complete
Manual tag           complete
Alert                pending
```

can be distinguished from:

```text
My Library save      complete
Manual tag           complete
Alert                complete
```

A completed effect does not need to be executed again simply because another effect on the same Action has not yet completed.

## Effects are marked complete only after success

RSSrch records completion after the relevant effect succeeds.

For example:

- the My Library receipt is recorded after Zotero's save operation completes
- the manual-tag receipt is recorded after the tag is satisfied and any required item save succeeds
- the alert receipt is recorded after the notification batch has been handed to a Zotero notification surface

A failed effect is not falsely marked as completed.

## Action labels and receipts

The human-readable Action label is used to explain and identify matches to the user.

It is not itself part of the Action's semantic receipt signature.

This means changing only an Action's display label is not treated as changing its underlying trigger and effect semantics for receipt identity.

The executable semantics include the Action's settings such as:

- enabled state
- Minimum Score
- condition mode
- conditions
- notification effect
- manual-tag effect
- My Library effect

This distinction lets labels remain descriptive without making them the mechanism used to determine whether an effect has already been completed.

## Changing Actions does not backfill old items

Execution receipts should not be confused with retroactive processing.

Changing a rule may change the Action semantics used for future matches, but RSSrch does not respond by scanning historical feed items and executing the modified Action on them.

Action-only changes are persisted without a feed rescan.

The model remains:

```text
Configure Action
↓
Future new feed item arrives
↓
Evaluate Action
```

not:

```text
Configure Action
↓
Rescan all historical feed items
↓
Run Action everywhere
```

## Preview and Actions

The Rule Manager **Preview** workspace is useful for testing the Admission and Relevance Score behavior that an Action depends on.

For example, Preview can help verify that a paper:

- passes Admission
- receives the expected Score
- reaches the intended Minimum Score threshold

However, normal Rule Manager Preview does **not** execute Action effects.

Running Preview will not:

- show real Action alerts
- add papers to My Library
- add Action tags to feed items

It should therefore be used to verify the upstream rule model without causing the automated effects themselves.

## Worked example

Suppose the following Action is configured:

```text
Action:
Save high-value mechanism papers

Enabled:
Yes

Minimum Score:
+8

When:
ALL conditions must match

Condition 1:
Abstract contains ANY
ferroptosis
lipid peroxidation

Condition 2:
Abstract contains ANY
neurodegeneration
motor neuron

Effects:
✓ Show Zotero alert
✓ Add to My Library
✓ Add manual tag: rssrch:priority
```

A new feed item arrives.

RSSrch processes it as follows:

```text
New feed item
↓
RSSrch Active
↓
Queued enrichment completes
↓
Admission passes
↓
Final Relevance Score = +12
↓
Minimum Score +8 satisfied
↓
Condition 1 matches
↓
Condition 2 matches
↓
Action matches
```

RSSrch can then perform:

```text
Zotero Add to My Library path
↓
My Library save succeeds

Feed item
↓
Add manual tag "rssrch:priority"

Notification queue
↓
Show matched paper with Score and Action label
```

After successful execution, RSSrch records the completed effects so duplicate processing does not simply perform them again.

## Example: Score-only alert

An Action can be much simpler.

```text
Action:
High-value paper alert

Minimum Score:
+8

No extra conditions

Effect:
Show Zotero alert
```

This means:

```text
New item
AND
Admitted
AND
Score ≥ +8
↓
Alert
```

This can be useful when the Relevance Scoring model already contains all of the research logic needed to identify high-priority papers.

## Example: condition-only Action

An Action can also omit the Score threshold.

```text
Action:
Tag papers from target journal

No Score threshold

Condition:
Publication / Source equals
Nature Neuroscience

Effect:
Add manual tag
target-journal
```

For a newly added admitted item:

```text
Publication matches
↓
Add manual tag
```

Its Relevance Score does not affect that Action.

## Designing useful Actions

Actions work best when they respond to clear research-workflow decisions.

### Use Admission for scope

Do not try to recreate the entire research boundary inside every Action.

First determine whether the paper belongs in the research model using [[Include and Exclude Rules]].

### Use Score for priority

If an Action should respond to overall research importance, use a Minimum Score.

For example:

```text
Score ≥ +8
→ alert

Score ≥ +12
→ Add to My Library
```

The appropriate thresholds depend on the research model.

### Use Action conditions for specific workflow requirements

Add conditions when a workflow needs something more specific than overall relevance.

For example:

```text
Score ≥ +8

AND

Publication / Source
contains
specific journal
```

or:

```text
Score ≥ +8

AND

Abstract
contains
target mechanism
```

### Keep destructive assumptions out of Actions

Actions automate workflow responses.

They do not change the underlying Zotero RSS subscription or delete the source feed item.

Use them for operations such as:

- notification
- saving a research candidate
- marking a feed item with an intentional tag

### Be cautious with very broad My Library rules

An Action with:

```text
No Score threshold
No extra conditions
Add to My Library
```

will attempt to save every newly added **admitted** item in that scope.

For broad feeds, that may create much more library material than intended.

A Score threshold, specific condition, or tighter Admission model can make automatic saves more selective.

## Recommended workflow

When creating an Action:

1. Configure and test Admission first.
2. Configure [[Relevance Scoring]] if the Action will use a Score threshold.
3. Open the **Actions** workspace.
4. Add an Action rule.
5. Give the Action a descriptive label.
6. Set a Minimum Score if overall research priority should be part of the trigger.
7. Add Action conditions if additional context is required.
8. Choose **ALL** or **ANY** condition logic.
9. Enable one or more effects.
10. Use Preview to verify the upstream Admission and Score behavior.
11. Save the rules.
12. Allow future new feed items to trigger the Action normally.
13. Review automatic-save and tagging behavior before making very broad Actions.

## Next

The final Rule Manager workspace lets you test Admission and Relevance Scoring without changing feed items.

➡️ Continue to [[Preview and Rule Testing]]