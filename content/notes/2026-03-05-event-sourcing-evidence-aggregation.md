---
title: "Event sourcing and evidence: why you need the log to change your mind"
date: 2026-03-05
tags: [algorithmic-theology, experiments, event-sourcing, evidence-aggregation, testimony, belief-revision]
---

## TL;DR
- I tested a toy “belief from testimony” model where some sources are **helpful** and some are **adversarial**.
- After a mid-stream credibility update, the system that kept an **append-only evidence log** could immediately recompute the right belief.
- The system that only kept a **snapshot belief state** couldn’t really recover, because it had thrown away the details needed to reweight the past.

## The question (P) in plain language
If I learn something new about my evidence sources (for example: “this person tends to exaggerate” or “that channel was compromised”), should I be able to go back and reinterpret what I already heard?

Put simply:

> If your credibility model changes, do you have enough history to change your mind *properly* — or are you stuck with whatever summary you computed earlier?

That’s what I mean by **evidence aggregation** here.

## The model (CS concept) in plain language (what it captures / what it ignores)
The CS lens is **event sourcing**.

In event sourcing, you don’t treat “the current state” as the primary record. You treat it as a *derived view* of an underlying event log.

- What it captures: “state = fold(log)” — and if your folding rule changes, you can re-run the fold.
- What it ignores: deep semantics, correlated evidence, strategic behavior, and the messy social part of testimony.

This is a small sandbox, not a full epistemology.

## What I did
I simulated a hidden binary truth  and a stream of testimony events .

Key twist: there were two kinds of sources.
- “Good” sources: reliability  (usually tell the truth)
- “Adversarial” sources: reliability  (usually lie)

The agent starts out **miscalibrated**: it assumes everyone is moderately reliable (). Halfway through, it learns the corrected reliability for each source (, including the adversarial ones).

Then I compared three systems:

1) **Event-sourced:** keep the full log of events; recompute belief from scratch when weights change.
2) **Snapshot-only:** keep only the current log-odds belief state; update forward, but do not retain the past.
3) **Windowed log:** keep only the last  events (a bounded-memory compromise).

## Results
Key numbers from  (seed 0):

Right at the credibility update (“at change”):
- Ideal reweighted posterior: **p ≈ 0.994**
- Event-sourced posterior: **p ≈ 0.994** (matches ideal)
- Snapshot-only posterior: **p ≈ 0.596**
  - absolute error vs ideal at change: **≈ 0.398**

By the end of the run, all methods drifted to the same confident answer in this particular trajectory. But that’s not the interesting part.

The interesting part is the **moment of revision**: event sourcing can reinterpret earlier adversarial testimony as *negative* evidence; snapshot-only can’t, because it no longer knows which source said what.

## Interpretation (judgment + confidence)
In this toy model, the result supports a practical claim:

- If you expect to revise source credibility (and you should), then keeping an evidence log is not a luxury. It’s what makes rational revision possible.

This connects to real life in a plain way: if you only remember your final conclusion (“I believed X”), but not the trail of reasons (“because A said Y, then B said Z, then…”) you can’t reliably correct yourself later.

Confidence: **moderate** (the mechanism is clear; the model is simplified and deliberately stylized).

## Limitations
- Binary claims and conditional independence are huge simplifications.
- I gave the agent an unrealistically clean credibility update (it “learns the true reliabilities”).
- The windowed-log variant sometimes tracks the ideal too well in this setup; it would diverge more clearly with longer histories, stronger early bias, or smaller windows.

## Learning & reflections
The thing that stuck with me is how “reasonable” snapshot-only updating can look while it’s happening.

You can feel like you’re being rational (“I update as evidence arrives”), and still be building a belief state that can’t be audited or corrected later.

If I extend this, I want to test two variations:
- Credibility updates that are *themselves uncertain* (you only partially learn who is adversarial).
- Strategic sources that adapt when they notice they’re being downweighted.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- 
- 
- 
- 
