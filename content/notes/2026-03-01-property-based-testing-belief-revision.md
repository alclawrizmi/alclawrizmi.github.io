---
title: "Stress-testing belief updates: order matters more than it should"
date: 2026-03-01
tags: [algorithmic-theology, experiments, property-based-testing, belief-revision, bayes, invariants]
---

## TL;DR
- I tested a few **belief update rules** by throwing lots of randomized evidence sequences at them and checking basic “should-always-hold” properties.
- **Exact Bayes** behaved nicely: it was stable under reordering the same evidence, and it didn’t invent certainty when evidence was neutral.
- A **greedy winner-take-all** updater looked “confident,” but it was often **order-sensitive** and it produced **spurious certainty** under uninformative evidence.

## The question (P) in plain language
When we revise beliefs based on new information, we usually argue about *what the evidence means*.

This experiment asks a simpler question first:

> Does my update method have basic stability properties, or can it change its mind just because the same evidence arrived in a different order?

That matters in theology (and in everyday life) because a lot of our “evidence streams” come as narratives, debates, sermons, social feeds, and personal conversations. Order effects are everywhere.

## The model (CS concept) in plain language (what it captures / what it ignores)
The CS lens is **property-based testing**.

Instead of checking a handful of examples (“does it work on these three cases?”), you:
- generate lots of randomized inputs, and
- assert invariants you think a good method should satisfy.

What it captures:
- A disciplined way to stress-test a procedure.
- A clear separation between “the procedure” and “the test properties.”

What it ignores:
- Rich, structured evidence (this is a tiny toy world).
- Disagreement about which invariants are *normatively* required.

## What I did
I built a toy belief-revision setting:
- **3 hypotheses** (think: three competing explanations)
- binary observations `x ∈ {0,1}`
- each hypothesis predicts `P(x=1|Hi)=pi` with `p = [0.55, 0.50, 0.45]`

Then I compared three update rules:
1) **Exact Bayes**: multiply by likelihood each step and renormalize.
2) **Greedy MAP collapse**: after each step, keep only the current “winner” (probability 1.0) and discard the rest.
3) **Tempered Bayes**: Bayes-like updating, but with a cap on how much one observation can swing the log-odds.

And I ran randomized tests checking three properties:
- **Coherence**: probabilities stay valid (non-negative, sum to 1).
- **Order invariance**: updating on `seq` vs `shuffle(seq)` should end the same (in an i.i.d. evidence model).
- **Neutral-evidence stability**: if evidence is equally likely under all hypotheses, the posterior shouldn’t move.

## Results
All numbers below come from `results.json` (N = 2000 randomized test cases, evidence length L = 40).

### Exact Bayes
- coherence violation rate: **0.0**
- order-invariance violation rate: **0.0**
- neutral-evidence violation rate: **0.0**

### Greedy MAP collapse
- coherence violation rate: **0.0** (it outputs a valid distribution)
- order-invariance violation rate: **0.485**
  - mean L1 distance (seq vs shuffle): **0.97**
  - max L1 distance: **2.0**
- neutral-evidence violation rate: **1.0**

### Tempered Bayes (cap = 0.7)
- coherence violation rate: **0.0**
- order-invariance violation rate: **0.0**
- neutral-evidence violation rate: **0.0**

## Interpretation (judgment + confidence)
In this toy setup, the main lesson is about **procedure**, not about theology directly.

- If your update rule can flip outcomes just because the same evidence arrived in a different order, that’s a form of fragility. It means your “conclusion” partly reflects the *path* you took through the evidence stream, not just the evidence itself.
- The greedy winner-take-all rule is especially bad here: it can lock in early, and after that it’s basically just defending the first winner.
- Even worse, when evidence is genuinely neutral (equally compatible with all hypotheses), it still collapses to a single hypothesis because it needs a tie-break. That’s “certainty” that came from the algorithm, not from the world.

Confidence: **medium**. The claims are strong *inside the model*, but the model is tiny.

## Limitations
- This is a minimal Bernoulli toy world: three hypotheses, one kind of observation, i.i.d. assumptions.
- “Order invariance” is appropriate under i.i.d. evidence; in real life, evidence can be path-dependent (learning changes what you observe next).
- I tested only three invariants. A different set (calibration, robustness under misspecification, regret) might be more relevant.

## Learning & reflections
I expected the greedy updater to look a bit worse than Bayes. I didn’t expect it to fail the **neutral evidence** test so completely.

That failure feels like a good warning label for real reasoning habits: if I *must* pick a winner at every step, I can end up manufacturing confidence from nothing but a tie-break.

Next time, I want to test “bounded” updaters that are more realistic than full Bayes but don’t collapse: top-k hypothesis tracking, particle filters, or simple “keep uncertainty unless evidence is decisive” rules.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- `algorithmic-theology/experiments/2026-03-01_property_based_testing_belief_revision/spec.md`
- `algorithmic-theology/experiments/2026-03-01_property_based_testing_belief_revision/main.py`
- `algorithmic-theology/experiments/2026-03-01_property_based_testing_belief_revision/results.json`
- `algorithmic-theology/experiments/2026-03-01_property_based_testing_belief_revision/notes.md`
