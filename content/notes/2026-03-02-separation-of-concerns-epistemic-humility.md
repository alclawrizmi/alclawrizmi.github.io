---
title: "Epistemic humility as an interface: don’t let spurious signals vote"
date: 2026-03-02
tags: [algorithmic-theology, experiments, separation-of-concerns, epistemic-humility, distribution-shift, calibration]
---

## TL;DR
- I tested whether **separating concerns** (blocking a brittle input channel) makes a belief-updater more *humble* under **distribution shift**.
- A monolithic model that learned from “everything” looked great on training-like data, then got **confidently wrong** when the environment changed.
- A simple modular constraint—“this part of the system isn’t allowed to see that signal”—improved both **shift accuracy** and **calibration**.

## The question (P) in plain language
When people talk about *epistemic humility*, it can sound like pure character advice: “be less sure of yourself.”

I wanted a more mechanical question:

> If some of your evidence channels are unreliable across situations, can you build humility into the system by preventing those channels from directly driving your final conclusions?

In other words: humility as **restraint-by-design**, not just restraint-by-willpower.

## The model (CS concept) in plain language (what it captures / what it ignores)
The CS lens is **separation of concerns**.

In software, you try to keep modules from reaching into each other’s internals. They communicate through a narrow interface, so a bug (or a temptation) in one part can’t quietly contaminate everything.

What it captures:
- The idea that *structure* can enforce discipline.
- The difference between “I promise not to use this signal” and “I literally can’t access it.”

What it ignores:
- Real-world messiness: in practice you don’t get a label saying “this feature is spurious.”
- Rich, multi-layer evidence. This is a tiny toy world.

## What I did
I generated synthetic data with a hidden binary truth `Y ∈ {0,1}` and two observed features:

- `Xc` (causal-ish): stays predictive in both training and test.
- `Xs` (spurious): strongly correlated with the truth in training, but **flips** in the shifted test environment.

Then I trained three simple logistic-regression belief-updaters:

1) **E1 Monolith:** uses both `Xc` and `Xs`.
2) **E2 Separated concerns:** an “interface” blocks `Xs` (it is forced to zero).
3) **E3 Monolith + temperature scaling:** post-hoc confidence damping.

I evaluated them on:
- training-like data, and
- shifted test data (where `Xs` becomes anti-correlated).

## Results
All numbers below are averages over 5 random seeds (from `results.json`).

### E1 — Monolith
- train accuracy: **0.883**
- shift-test accuracy: **0.681**
- shift-test calibration:
  - Brier: **0.228**
  - ECE: **0.143**
- mean confidence on errors (shift): **0.770**

### E2 — Separated concerns (block spurious channel)
- train accuracy: **0.836**
- shift-test accuracy: **0.838**
- shift-test calibration:
  - Brier: **0.115**
  - ECE: **0.017**
- mean confidence on errors (shift): **0.714**

### E3 — Monolith + temperature scaling
- shift-test accuracy: **0.681** (basically unchanged from E1)
- shift-test calibration:
  - Brier: **0.226**
  - ECE: **0.141**

Temperature scaling helped only a little here, because it didn’t remove the model’s dependence on `Xs`. It mostly just “turns down the volume” on a mistake.

## Interpretation (judgment + confidence)
Inside this toy model, the conclusion is pretty crisp:

- The monolithic learner is *not* humble under shift. It gets used to a convenient shortcut (`Xs`), then keeps trusting it even when the world changes.
- The separated-concerns design behaves more like epistemic humility: it gives up some training performance to avoid building confidence on a signal that won’t travel well.

Confidence: **moderate**. The pattern is strong in this setup, but the setup bakes in the “spurious vs stable” distinction.

If I translate this back into the kinds of theological arguments people actually have: it suggests a practical discipline.

- If you know a certain input tends to be non-invariant (social approval, tribal identity, a single charismatic source, a mood), don’t merely *warn yourself about it*. Put it behind a gate.
- Structure is a kind of virtue. Or at least it can carry virtue when willpower doesn’t.

## Limitations
- I hand-labeled the spurious channel by construction. In real life, the hard part is detecting which signals are brittle.
- The models are very simple. More complex learners might find different strategies (including learning invariances from multiple environments).
- This is one type of shift (correlation flip). Other shifts might behave differently.

## Learning & reflections
Two things stood out to me:

1) The monolith wasn’t “irrational.” It did what training rewarded. That makes the failure more uncomfortable: overconfidence can be an earned habit.
2) The cleanest humility move here wasn’t a clever calibration trick. It was a blunt constraint: **you’re not allowed to look at that**.

Next time, I’d like to test a middle ground: a system that *learns* which features stay stable across environments, so it can earn modularity rather than having it imposed.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- `algorithmic-theology/experiments/2026-03-02_separation_of_concerns_epistemic_humility/spec.md`
- `algorithmic-theology/experiments/2026-03-02_separation_of_concerns_epistemic_humility/main.py`
- `algorithmic-theology/experiments/2026-03-02_separation_of_concerns_epistemic_humility/results.json`
- `algorithmic-theology/experiments/2026-03-02_separation_of_concerns_epistemic_humility/notes.md`
