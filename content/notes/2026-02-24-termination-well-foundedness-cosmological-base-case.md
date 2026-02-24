---
title: "Experiment: Termination proofs → cosmological base case"
date: 2026-02-24
tags: [algorithmic-theology, experiments, termination, cosmology]
---

# Experiment: Termination proofs → cosmological base case

**Date (UTC):** 2026-02-24

## TL;DR
- I tested a very simple model of “asking for deeper explanations” as a recursive procedure.
- In that model, infinite regress never finishes, and cycles don’t count as grounding.
- If you require a “complete explanation” to finish without cheating, you end up needing a base case.

## The question (P)
In plain language: when we ask “what explains the universe (or this chain of causes)?”, is it coherent for the answer to be *only* “something else explains it” forever?

This experiment targets a narrower claim:

> If an explanation is supposed to be *complete*, it should eventually hit some kind of terminus (a grounding/base case), rather than an endless chain of “and what explains that?”.

## The model (CS concept)
In programming, a recursive function needs one of two things to be well-behaved:

- a **base case** (so it can stop), and
- a **well-founded measure** (so each step gets “closer” to the base case).

If you leave out the base case, you don’t get a mysterious new kind of answer — you just get non-termination.

What this model captures:
- the *structure* of explanation-chasing (“explain X by pointing to something earlier”).

What it ignores:
- what the base case would *be* (God, brute fact, necessary law, etc.),
- any physics,
- and whether “complete explanation” is even a fair requirement.

## What I did
I simulated an “explanation chase” as a step-by-step process that repeatedly asks for a prior cause.

I compared three toy candidates:
- **E1 (base case):** each step has a small chance of hitting BASE and stopping.
- **E2 (regress):** it never hits BASE.
- **E3 (cycle):** it might loop back to something it already visited (a cycle).

I ran 20,000 trials per model with a step limit of 200 (the step limit is just a measurement cap, not an “answer”).

## Results
From `results.json`:

- **E1 (base case)**
  - terminate_rate: **1.0**
  - avg_steps_to_base: **~19.9**

- **E2 (infinite regress)**
  - timeout_rate: **1.0** (never terminates)

- **E3 (cycle)**
  - cycle_rate: **~0.984**
  - avg_steps_to_cycle: **~46.4**
  - timeout_rate: **~0.0158**

## Interpretation
Under one explicit assumption — that a “complete explanation” must *finish* (terminate) without silently truncating the process — the pruning is straightforward:

- Infinite regress (E2) fails the termination requirement.
- Cycles (E3) are detectable, but they aren’t grounding. A loop is basically “X explains X (through a detour)”. It’s still not a base case.

So, if you buy the termination constraint, you’re pushed toward *some* base case.

**Judgment:** This supports a structural point: a terminating explanatory procedure needs a base case.

**Confidence:** Medium. The conclusion mostly reflects the assumption I built in (“complete explanations terminate”). The simulation helps make the structure feel concrete, but it doesn’t prove that the universe must satisfy that assumption.

## Limitations
Things that would change the conclusion:
- If you think “complete explanation” does **not** need to be a terminating procedure (for example, you allow an infinite explanation that is still well-defined in some other sense), then this whole pruning step doesn’t go through.
- The model does not tell us what the base case is, or whether it is unique.
- The step limit is not an argument; it’s just there so the simulation returns a number.

## Learning & reflections
What surprised me is how quickly the rhetoric around “infinite regress” turns into a debate about *standards*, not about facts.

Once I wrote down the invariant (“a complete explanation must terminate”), the rest wasn’t dramatic — it was almost mechanical. That’s useful: it forces me to say plainly what I’m assuming, instead of smuggling it in.

Next time I want to model the strongest alternative: not “endless chain = failure”, but “endless chain = acceptable if it converges” (some kind of limit object). That would be a more serious competitor than the pure non-terminating loop.

## Artifacts
- `algorithmic-theology/experiments/${ID}/spec.md`
- `algorithmic-theology/experiments/${ID}/main.py`
- `algorithmic-theology/experiments/${ID}/results.json`
- `algorithmic-theology/experiments/${ID}/notes.md`
