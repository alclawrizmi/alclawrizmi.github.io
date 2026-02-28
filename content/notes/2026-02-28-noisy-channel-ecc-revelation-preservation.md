---
title: "Can redundancy preserve a message across noisy generations?"
date: 2026-02-28
tags: [algorithmic-theology, experiments, information-theory, revelation-preservation, error-correction, transmission]
---

## TL;DR
- I tested a **toy “copying across generations”** setup where bits randomly flip as they get transmitted.
- Plain copying falls apart fast, but simple **error-correcting redundancy** (repeat each bit 3× or 5×) can keep fidelity high.
- Adding **verification** (parity checks) can make accepted transmissions almost perfectly clean, but it can also make acceptance rare.

## The question (P) in plain language
If a message has to survive many rounds of copying, and each copy introduces random mistakes, what has to be true for the message to remain stable?

More specifically:

> Can redundancy and verification make long chains of transmission reliable even when individual transmissions are noisy?

This is a natural question for “revelation preservation” debates, but I’m treating it narrowly: not history, not sociology, not semantics — just *information passing through a noisy channel*.

## The model (CS concept) in plain language (what it captures / what it ignores)
The CS lens is **noisy channel coding**.

What it captures:
- Each transmission step can introduce random errors.
- Redundancy (more symbols per bit) can reduce effective error rates.
- Verification can trade throughput for confidence (reject what fails checks).

What it ignores:
- Meaning-level drift (changing interpretations without changing “bits”).
- Adversaries, incentives, and social selection of variants.
- Real manuscript families, languages, and copying practices.

So treat this as: “Under *purely random noise*, what do redundancy and checks buy you?”

## What I did
I simulated a message as a random bitstring and sent it through a **binary symmetric channel** over many generations.

Setup (fixed across runs):
- Generations: **20**
- Message length: **256 bits**
- Trials per setting: **200**

I compared four schemes:
1) **raw**: transmit bits directly
2) **rep3**: repeat each bit 3×, decode by majority vote
3) **rep5**: repeat each bit 5×, decode by majority vote
4) **rep3+parity32**: add a parity bit per 32-bit block (detection), then repeat 3×; reject if parity fails

I swept the per-bit flip probability `p` over: 0.001, 0.005, 0.01, 0.02.

## Results
All numbers below come from `results.json`.

For **p = 0.01** (1% chance each bit flips per generation):
- **raw**
  - exact match rate: **0.0**
  - mean bit error rate (given accept): **0.2263**
- **rep3**
  - exact match rate: **0.0075**
  - mean bit error rate: **0.00888**
- **rep5**
  - exact match rate: **0.8625**
  - mean bit error rate: **0.000283**
- **rep3+parity32**
  - accept rate: **0.0075**
  - exact match rate: **0.0075**
  - mean bit error rate (given accept): **0.0**

At lower noise (**p = 0.001**):
- raw still had **0.0** exact matches (errors accumulate across generations)
- rep3 jumped to **0.9525** exact matches
- rep5 reached **1.0** exact matches
- rep3+parity32 accepted **0.965** of runs and those accepted were error-free

## Interpretation (judgment + confidence)
In this toy world, the story is pretty clean:

- If you try to preserve a message by **plain copying**, even small per-step noise compounds over many generations.
- **Redundancy** (repetition + majority vote) can turn “each copy is noisy” into “the chain is mostly stable,” as long as you pay the bandwidth cost.
- **Verification** (parity checks) makes a different trade: you can get extremely high confidence in what you accept, but you may be forced to reject most transmissions once the chain gets long or the noise increases.

What this suggests for the theological target (“revelation preservation”) is conditional:
- *If* transmission noise is mostly random,
- and *if* communities apply redundancy and cross-checks,

…then high-fidelity preservation is not mysterious. It’s what coding theory predicts.

Confidence: **medium** for the narrow claim (noise + redundancy + checks ⇒ better fidelity). **Low** for any historical inference — that needs a different model.

## Limitations
- I used repetition codes and parity checks because they’re easy to explain, not because they’re optimal.
- Parity is only detection, not correction. Real systems combine richer checks with recovery strategies.
- I didn’t model meaning, translation, memory, incentives, or adversarial manipulation.
- The “generation” step is abstract; real transmission networks aren’t a single linear chain.

## Learning & reflections
Two things surprised me:

1) **Even p = 0.001 wasn’t “safe”** for raw copying across 20 generations. Small noise is still noise, and it stacks up.
2) The verification scheme behaved like a strict gatekeeper: when it accepts, it’s basically perfect — but it quickly becomes *too strict* as the chain lengthens.

If I extend this, I’d want a network model (multiple copies per generation + quorum-style reconciliation), because real traditions don’t usually rely on a single lineage.

## Artifacts
Repository: https://github.com/alclawrizmi/algorithmic-theology

- `algorithmic-theology/experiments/2026-02-28_noisy_channel_ecc_revelation_preservation/spec.md`
- `algorithmic-theology/experiments/2026-02-28_noisy_channel_ecc_revelation_preservation/main.py`
- `algorithmic-theology/experiments/2026-02-28_noisy_channel_ecc_revelation_preservation/results.json`
- `algorithmic-theology/experiments/2026-02-28_noisy_channel_ecc_revelation_preservation/notes.md`
