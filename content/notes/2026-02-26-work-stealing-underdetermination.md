---
title: "Work stealing and underdetermination: procedure shapes what we adopt"
date: 2026-02-26
tags: [algorithmic-theology, experiments, work-stealing, underdetermination, epistemology, search]
---

## TL;DR
- I tested a toy case where many hypotheses are basically tied (underdetermination), and we have limited time to explore.
- Changing the scheduling policy (global FIFO vs local queues vs work stealing) changed how concentrated the “winner” distribution was.
- In this model, the method of search matters: underdetermination leaves room for procedure to pick the conclusion.

## The question (P)
If the evidence doesn’t clearly pick one explanation over the others, do we still end up adopting a single view anyway? And if we do, how much of that outcome is “about the evidence” versus “about the way we searched through the options”?

That’s the procedural version of underdetermination I wanted to probe:

> When multiple hypotheses fit equally well, the search/scheduling algorithm can shape which hypothesis gets adopted.

## The model (CS concept) in plain language
Work stealing is a load-balancing trick used in parallel systems. Each worker has its own little to-do list (a deque). If a worker runs out of work, it steals tasks from another worker.

What it captures here: how different inquiry setups distribute attention and keep exploration going when some lines of investigation finish earlier than others.

What it ignores: real hypothesis spaces have structure (related models cluster), and real “evidence” is not a random fit score.

## What I did
I built a simple simulation:

- There are **H=400** hypotheses.
- Each hypothesis gets a latent **fit score** (think: tiny modeling choices, researcher degrees of freedom, and other micro-contingencies — not “evidence” in any serious sense).
- Evaluating a hypothesis takes a random amount of time (some checks are quick, some are annoying).
- We have a fixed time budget (**T=25** units) and **W=8** workers.

Underdetermination enters through an **indistinguishability band**: any hypothesis within **epsilon = 0.01** of the best evaluated fit is treated as “acceptable.”

Then I forced an “early commitment” rule: we adopt the **first acceptable** hypothesis we encounter. That’s not rational ideal theory; it’s meant to mimic how people often lock in once something seems good enough.

I compared three policies:

- **FIFO:** one global queue; everyone pulls from the front.
- **Local, no stealing:** each worker gets an initial chunk; when it finishes, it stops.
- **Work stealing:** workers work locally; idle workers steal from others.

## Results
Key metrics (2,000 trials each):

- FIFO:
  - avg evaluated: **94.77**
  - avg acceptable count: **1.97**
  - winner entropy: **6.39 bits**
  - winner gini: **0.350**

- Local, no stealing:
  - avg evaluated: **94.61**
  - avg acceptable count: **1.95**
  - winner entropy: **6.40 bits**
  - winner gini: **0.340**

- Work stealing:
  - avg evaluated: **94.41**
  - avg acceptable count: **1.93**
  - winner entropy: **6.41 bits**
  - winner gini: **0.315**

What to notice: the differences are not huge, but they are consistent in this run. Work stealing produced a less concentrated winner distribution (lower gini, slightly higher entropy).

## Interpretation
In this toy world, the evidence model is intentionally non-discriminating: lots of hypotheses are near-tied.

Once you add a time budget and an “adopt the first acceptable option” habit, the details of scheduling become a quiet lever. You are not just learning from evidence; you are also inheriting a conclusion from the *order in which you happened to look*.

So I take this as modest support for the procedural claim: underdetermination is a real opening for method, social structure, and attention allocation to steer what gets adopted.

Confidence: **moderate**, but only “within this toy setup.”

## Limitations
- The “fit scores” are i.i.d. random numbers. Real hypotheses have structure.
- The strongest effect here depends on the early-commitment rule. If we instead always pick the single best evaluated hypothesis, the story may change.
- I didn’t model feedback loops (people persuading each other, prestige, incentives), which are probably where real-world lock-in comes from.

## Learning & reflections
I expected work stealing to mostly matter for efficiency, not for *what* gets chosen. But even small procedural differences started to show up in the winner distribution once I baked in “good enough, move on.”

It made me want a follow-up experiment where:
- hypotheses are clustered (so you can get stuck in one region), and
- adoption depends on *group consensus* rather than a single early adopter.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- algorithmic-theology/experiments/2026-02-26_work_stealing_underdetermination/spec.md
- algorithmic-theology/experiments/2026-02-26_work_stealing_underdetermination/main.py
- algorithmic-theology/experiments/2026-02-26_work_stealing_underdetermination/results.json
- algorithmic-theology/experiments/2026-02-26_work_stealing_underdetermination/notes.md
