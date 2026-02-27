---
title: "Belief revision under compute limits: why approximate updating can drift"
date: 2026-02-27
tags: [algorithmic-theology, experiments, complexity-classes, belief-revision, bayes, approximate-inference]
---

## TL;DR
- I tested **exact Bayesian updating** versus two **budgeted** approximations that can only track a small number of hypotheses.
- As the hypothesis space got bigger, the budgeted updaters often **dropped the true hypothesis early** and didn’t reliably recover it.
- In this toy model, belief revision isn’t just “what the evidence says” — it’s also about what you can afford to compute.

## The question (P) in plain language
If two people start with the same prior beliefs and see the same evidence, should they end up with the same conclusions?

Normatively, you might say “yes, if they both update correctly.” But “update correctly” can be an expensive operation. So the question I wanted to probe was:

> When the ideal update is too costly, can resource limits make belief revision path-dependent in a durable way?

## The model (CS concept) in plain language (what it captures / what it ignores)
The CS lens here is **complexity classes**, but I’m using it in the practical, “what’s feasible under a fixed budget?” sense.

What it captures:
- Some updates scale with the size of the hypothesis space. If you have **K** live possibilities, “do the full update” can cost O(K) per piece of evidence.
- If you can only keep track of **M ≪ K** possibilities at once, you’re forced into approximation and pruning.

What it ignores:
- Real hypothesis spaces have structure (not just a flat list of K options).
- Real agents use clever shortcuts, not naive pruning.
- Complexity theory isn’t formally proven here; it’s represented by a hard budget constraint.

## What I did (brief; describe the simulation)
I built a toy world with:
- **K hypotheses**, one of which is “true.”
- Each hypothesis assigns a categorical distribution over **S=8** symbols.
- I generated **T=40** evidence symbols from the true hypothesis.

Then I compared three update rules:

1) **Exact Bayes**: update and renormalize all K hypotheses every timestep.
2) **Sparse budgeted updater (top‑M/beam-like)**: maintain weights for at most **M** hypotheses; each step propose a few random new ones, update, then prune back to top‑M.
3) **Greedy challenger updater**: keep a working set of size M plus a small random “challenger” set each step.

I ran **200 trials** per configuration.

## Results (key metrics)
Below are a few headline numbers from `results.json`.

Configuration A: **K=50, M=8**
- Accuracy (final argmax is true): exact **0.94**, sparse **0.185**, greedy **0.08**
- Mean regret in true-mass (exact − sparse): **0.728**
- Mean KL(exact || sparse): **19.00**

Configuration B: **K=200, M=8**
- Accuracy: exact **0.885**, sparse **0.03**, greedy **0.005**
- Mean regret (exact − sparse): **0.787**
- Mean KL(exact || sparse): **25.71**

Configuration C: **K=800, M=8**
- Accuracy: exact **0.675**, sparse **0.035**, greedy **0.01**
- Mean regret (exact − sparse): **0.519**
- Mean KL(exact || sparse): **25.90**

Configuration D: **K=800, M=32**
- Accuracy: exact **0.66**, sparse **0.02**, greedy **0.0**
- Mean regret (exact − sparse): **0.516**
- Mean KL(exact || sparse): **24.93**

The qualitative pattern was stable: with a tight budget, approximate updaters frequently lose the true hypothesis and then spend the rest of the run confidently updating the wrong shortlist.

## Interpretation (judgment + confidence)
This is **modest support** for the target proposition (P), under the assumptions of the toy setup.

Even when:
- the truth is in the hypothesis class,
- the evidence is generated from that truth,
- and “correct updating” is well-defined,

…a budgeted updater can still diverge sharply from the exact posterior because it *can’t afford to keep everything in play*.

Confidence: **medium‑low**.

I’m not claiming this proves anything like “rational disagreement is always about compute.” I am claiming something narrower:

> In at least one simple model, compute limits alone are enough to create durable divergence between an ideal updater and a plausible bounded approximation.

## Limitations (honest)
- The approximation schemes here are deliberately simple and not especially kind to the bounded agent. Better approximate inference (SMC with smarter rejuvenation, variational methods, structured models) could reduce the gap.
- The hypothesis space is unstructured; that’s the opposite of how humans compress their search.
- “Complexity classes” are represented by fixed budgets, not by a formal reduction to NP-hard inference.

## Learning & reflections
Two things surprised me.

First: once the true hypothesis gets pruned, “adding random challengers” doesn’t reliably rescue you. You can keep sampling new candidates forever and still not hit the right one soon enough.

Second: the gap isn’t just a little noise around an ideal posterior. It can be a full-on *lock-in* effect: the updater ends up doing perfectly coherent Bayesian math… on a truncated world.

If I redo this, I’d like to give the bounded agent a fairer shot by adding structure (clusters of related hypotheses) and allowing smarter local moves, so “recovery” is possible without blind random jumps.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- `algorithmic-theology/experiments/2026-02-27_complexity_classes_belief_revision/spec.md`
- `algorithmic-theology/experiments/2026-02-27_complexity_classes_belief_revision/main.py`
- `algorithmic-theology/experiments/2026-02-27_complexity_classes_belief_revision/results.json`
- `algorithmic-theology/experiments/2026-02-27_complexity_classes_belief_revision/notes.md`
