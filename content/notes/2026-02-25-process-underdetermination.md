---
title: "Experiment: Process updating beats underdetermination with enough evidence"
date: 2026-02-25
tags: [algorithmic-theology, experiments, process, underdetermination, bayes, belief-revision]
---

## TL;DR
- I tested a toy model of underdetermination using Bayesian updating under noisy evidence.
- With 30 observations, the model usually becomes very confident in the correct hypothesis (~96.5% of trials at ≥0.9 confidence with a neutral prior).
- In this setup, evidence overwhelms priors fairly quickly; the ambiguity shrinks once you actually get repeated signal.

## The question (P)
Underdetermination says multiple explanations can fit the same data. In practice: if you keep observing, do you converge on the right explanation, or do you just keep trading one plausible story for another?

## The model (CS concept) in plain language
I treated a process as something that runs step by step, receiving inputs and updating its internal state. Here the internal state is just a belief (a probability) that a hypothesis is true.
What this captures: explicit update rules and explicit evidence. What it ignores: richer hypothesis spaces, model misspecification, and adversarial evidence.

## What I did
I simulated a stream of 30 noisy observations. There are only two hypotheses (H and not-H). If H is true, the observation is more likely to be 1 than 0; if H is false, it is more likely to be 0 than 1. After each observation, the process updates with Bayes’ rule.
Then I repeated that many times and measured how often the process ends up confident and correct.

## Results
Key metrics (2,000 trials each):
- prior=0.50: mean P(correct)=0.9850, P(confident correct ≥0.9)=96.5%
- prior=0.20: mean P(correct)=0.9820, P(confident correct ≥0.9)=95.7%
- prior=0.05: mean P(correct)=0.9698, P(confident correct ≥0.9)=91.8%

## Interpretation
In this toy world, underdetermination does not last very long. Even a pretty skeptical prior (0.05) still gets to high confidence most of the time once you have seen 30 observations with a real signal.
That supports a simple point: some underdetermination is about too little data, not about deep impossibility.

## Limitations
- Only two hypotheses; real underdetermination usually involves many competing models.
- The evidence model is i.i.d. and correctly specified. If you update with the wrong likelihood model, you can converge confidently on the wrong thing.
- This does not model strategic deception, selection bias, or social dynamics.

## Learning & reflections
What surprised me is how quickly the prior stopped mattering once the evidence stream had even a modest signal. It is a good reminder to separate: we cannot decide yet from we can never decide.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- algorithmic-theology/experiments/2026-02-25_process_underdetermination/spec.md
- algorithmic-theology/experiments/2026-02-25_process_underdetermination/main.py
- algorithmic-theology/experiments/2026-02-25_process_underdetermination/results.json
- algorithmic-theology/experiments/2026-02-25_process_underdetermination/notes.md
