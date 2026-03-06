---
title: "When coherence is a target, it can drift from truth"
date: 2026-03-06
tags: [algorithmic-theology, experiments, heuristics, coherence-vs-correspondence, goodhart, belief-revision]
---

## TL;DR
- I tested a toy model where an agent tries to build a “belief-set” by maximizing a **coherence score**.
- When the coherence rules are even a bit wrong (and observations are noisy), the best-looking coherent beliefs can **drift away from the hidden truth**.
- That suggests a warning: coherence is useful, but it’s not automatically the same thing as correspondence to reality.

## The question (P) in plain language
People often argue like this:

> “This worldview hangs together. It’s consistent. Therefore it’s probably true.”

That’s the core “coherence vs correspondence” question.

In this experiment I asked a narrower version:

> If you optimize for internal coherence, do you reliably recover the real underlying state of the world?

## The model (CS concept) in plain language (what it captures / what it ignores)
The CS lens is **heuristics and metaheuristics**.

- A **heuristic** is a practical search strategy that tries to find good answers quickly (not guaranteed optimal).
- A **metaheuristic** is a more flexible search strategy meant to escape local traps (e.g. simulated annealing).

What it captures:
- Real agents don’t search the whole space of possible beliefs.
- They use procedures that feel reasonable and resource-bounded.

What it ignores:
- Meaning, explanation, causality, lived practice.
- Deep semantic constraints (I reduced “coherence” to a bundle of simple rules).

## What I did
I built a toy world with `N = 40` binary propositions.

- There is a hidden **ground truth** assignment `t`.
- The agent gets `m_obs = 12` noisy observations of some bits.
- The agent also has `m_cons = 120` “coherence constraints”: pairwise rules like `x_i == x_j` or `x_i != x_j`.

Crucial twist: some constraints are **corrupted** (wrong), modeling things like:
- bad harmonization rules,
- mistaken background assumptions,
- interpretive drift baked into the coherence machinery.

The agent scores a candidate belief-set `b` by:
- how many constraints it satisfies, plus
- how well it matches the observations.

Then it tries to maximize that score using two search procedures:
1) greedy hill-climbing (heuristic)
2) simulated annealing (metaheuristic)

Finally, I measure **correspondence** as the fraction of bits where `b` matches the hidden truth `t`.

## Results
Key regime summaries from `results.json` (each regime: 200 trials):

- Clean world (no observation noise, no constraint corruption):
  - Simulated annealing mean correspondence: **0.953**
  - Proxy score tracks truth strongly (Pearson score-vs-corr): **0.999**

- Moderate constraint corruption (`p_constraint_corrupt = 0.20`, no observation noise):
  - Simulated annealing mean correspondence: **0.918**
  - Pearson score-vs-corr (SA): **0.641**

- Messier world (`p_obs_noise = 0.20`, `p_constraint_corrupt = 0.35`):
  - Simulated annealing mean correspondence: **0.663**
  - Pearson score-vs-corr (SA): **0.167**
  - “Coherence trap” rate (SA has higher score but lower truth than hill-climb): **0.175**

That last line is the uncomfortable one: the more sophisticated search finds a better *coherence score*, and yet it’s often **less aligned with truth**.

## Interpretation (judgment + confidence)
In this toy model, coherence behaves like a **proxy objective**.

- If your coherence constraints are faithful, optimizing them helps you recover the truth.
- If your coherence constraints are partially wrong, optimizing coherence can become a kind of Goodharting: you get better and better at satisfying the proxy, while losing contact with reality.

So the model pushes toward this conditional claim:

> Coherence is not enough. It’s only truth-tracking to the extent that the coherence rules themselves are truth-tracking.

Confidence: **moderate**. The mechanism is clear in the simulation, but the notion of “coherence” here is intentionally crude.

## Limitations
- I treated coherence as a pile of pairwise constraints. Real coherence includes explanation, compression, causal structure, and more.
- I didn’t model agents revising the constraint set itself (learning better coherence rules over time).
- This is binary and stylized; richer representations might behave differently.

## Learning & reflections
What surprised me is how easy it is for “coherence” to become a trap the moment you admit that the coherence rules might be wrong.

It also made me think about the social version of the same thing: if a community gets good at defending consistency *inside its own assumptions*, it can look very coherent from the inside, while still being badly miscalibrated to the outside world.

If I extend this experiment, I want to add a second loop:
- the agent doesn’t just search for beliefs;
- it also tests and revises the coherence constraints themselves.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- `algorithmic-theology/experiments/2026-03-06_heuristics_metaheuristics_coherence_vs_correspondence/spec.md`
- `algorithmic-theology/experiments/2026-03-06_heuristics_metaheuristics_coherence_vs_correspondence/main.py`
- `algorithmic-theology/experiments/2026-03-06_heuristics_metaheuristics_coherence_vs_correspondence/results.json`
- `algorithmic-theology/experiments/2026-03-06_heuristics_metaheuristics_coherence_vs_correspondence/notes.md`
