# Universal Computer Science Concepts (Language‑Agnostic)

This is a foundational, language‑agnostic reference library of computer science concepts organized by *mathematical structure*, *mechanism*, and *system purpose*.

---

## 0) Mathematical & Logical Foundations

### Discrete structures
- **Sets & relations** — Model membership and connections to specify data invariants and system constraints.
- **Functions & mappings** — Describe deterministic transformation from inputs to outputs to formalize computation and interfaces.
- **Equivalence relations & partitions** — Group elements by “same‑ness” to enable canonicalization, deduplication, and indexing.
- **Orderings (total/partial)** — Define comparability to support sorting, priority, and lattice‑like reasoning.
- **Graphs as a universal model** — Represent entities (nodes) and relationships (edges) to unify many problems (dependency, flow, reachability).

### Logic & proof
- **Propositional & predicate logic** — Provide precise specification of properties and constraints that programs must satisfy.
- **Invariants** — State properties preserved across steps to ensure correctness and safe state transitions.
- **Induction (structural/weak/strong)** — Prove correctness over recursively defined data (lists, trees) and iterative processes.
- **Proof by contradiction** — Establish impossibility bounds (e.g., lower bounds, undecidability) that shape system expectations.

### Complexity & computability
- **Asymptotic analysis (Big‑O/Ω/Θ)** — Characterize growth rates to predict performance and scalability independent of hardware constants.
- **Time vs space tradeoff** — Exchange memory for speed (and vice versa) to meet constraints under workload.
- **Worst/average/amortized analysis** — Explain costs per operation over sequences to guide data‑structure choice.
- **Lower bounds** — Identify unavoidable costs (e.g., comparison sorting Ω(n log n)) to avoid chasing impossible optimizations.
- **Computability & decidability** — Separate solvable from unsolvable problem classes to set correct expectations for automation.
- **Complexity classes (P, NP, NP‑hard/complete, PSPACE)** — Classify problem difficulty to choose exact, approximate, or heuristic methods.
- **Reductions** — Transform one problem into another to reuse solutions and transfer hardness results.

### Probability & information
- **Probability distributions** — Model uncertainty to design randomized algorithms and interpret noisy measurements.
- **Expectation & variance** — Summarize stochastic behavior to bound typical performance and error.
- **Randomization** — Use controlled randomness to simplify algorithms, avoid adversarial inputs, or improve expected cost.
- **Information theory (entropy, mutual information)** — Quantify compressibility and signal content to guide encoding and inference.

---

## 1) Core Data Structures (Abstract Data Types + Representations)

### Linear and sequence structures
- **Array / contiguous sequence** — Store elements in contiguous memory to enable O(1) indexed access and cache‑efficient traversal.
- **Dynamic array (resizable array)** — Grow/shrink via occasional reallocation to provide amortized O(1) append with index access.
- **Linked list (singly/doubly)** — Chain nodes via pointers/links to support O(1) local insert/delete at known positions.
- **Deque (double‑ended queue)** — Support push/pop at both ends to model sliding windows and BFS frontiers efficiently.
- **Stack (LIFO)** — Restrict access to last‑in items to model nested structure (calls, backtracking, parsing).
- **Queue (FIFO)** — Restrict access to first‑in items to model fair scheduling and breadth‑first exploration.
- **Ring buffer / circular queue** — Use modular indexing to implement bounded queues with stable memory footprint.

### Hashing and dictionaries
- **Hash function** — Map arbitrary keys to integers to approximate uniform distribution for fast lookup.
- **Hash table (separate chaining)** — Resolve collisions by storing buckets as lists/trees to achieve expected O(1) dictionary operations.
- **Hash table (open addressing)** — Resolve collisions by probing alternative slots to keep memory compact and locality high.
- **Perfect hashing / minimal perfect hashing** — Construct collision‑free mapping for static key sets to guarantee O(1) lookups.
- **Bloom filter** — Use multiple hash bits to test set membership with false positives but no false negatives for fast prechecks.
- **Count‑min sketch** — Use hashed counters to approximate frequencies in streams with bounded error.
- **Consistent hashing** — Assign keys to nodes with minimal movement under membership changes to stabilize distributed partitioning.

### Trees (hierarchies and ordered sets)
- **Tree (rooted, ordered/unordered)** — Represent hierarchical containment to support recursion, aggregation, and structured queries.
- **Binary tree** — Constrain branching to two children to simplify traversal and structural operations.
- **Binary search tree (BST)** — Maintain ordered keys with left<root<right to support search/update by comparisons.
- **Self‑balancing BST (AVL/Red‑Black family)** — Enforce height bounds via rotations to guarantee O(log n) operations.
- **Treap (randomized BST/heap)** — Combine BST order with heap priority to balance in expectation with simple rotations.
- **B‑tree / B+‑tree** — Use high branching factors to minimize I/O and enable efficient disk/SSD indexing.
- **Trie / prefix tree** — Store strings/keys by prefix paths to support fast prefix queries and lexicographic operations.
- **Radix tree / compressed trie** — Compress single‑child paths to reduce memory while preserving prefix search.
- **Segment tree** — Store interval aggregates in a tree to answer range queries and point updates in O(log n).
- **Fenwick tree (BIT)** — Maintain prefix sums via implicit binary decomposition for compact O(log n) updates/queries.
- **Interval tree** — Index intervals to find overlaps efficiently for scheduling and geometry queries.
- **KD‑tree / spatial trees** — Partition space recursively to support nearest neighbor and range searches in low dimensions.
- **Suffix tree / suffix automaton (conceptual family)** — Index all suffixes to enable fast substring queries and pattern matching.

### Heaps and priority structures
- **Binary heap** — Maintain partial order with heap property to support extract‑min/max and priority scheduling.
- **d‑ary heap** — Increase branching to reduce height and improve performance under certain memory/cache tradeoffs.
- **Fibonacci / meldable heap (concept family)** — Support efficient merges and decrease‑key to speed certain graph algorithms.
- **Monotonic queue / heap** — Maintain elements in monotone order to answer sliding window extrema in amortized O(1).

### Graph representations
- **Adjacency list** — Store neighbor lists to represent sparse graphs with efficient iteration over edges.
- **Adjacency matrix** — Store a dense boolean/weight matrix to support O(1) edge existence checks.
- **Edge list** — Store edges as pairs to simplify sorting by weight and streaming processing.
- **Incidence structure** — Map edges to endpoints to support algorithms that operate on edges as first‑class entities.

### Sets, disjointness, and unions
- **Set ADT** — Model unique membership to enforce constraints and avoid duplicates.
- **Disjoint set union (Union‑Find)** — Maintain dynamic connectivity via parent pointers with near‑constant amortized unions/finds.

### Strings and sequences (specialized)
- **Rope** — Represent long strings as balanced trees of chunks to support efficient concatenation and slicing.
- **Gap buffer** — Maintain a movable gap in an array to optimize cursor edits in text editors.
- **Piece table** — Represent edits as references to original/add buffers to enable fast undo/redo and large-file editing.

### Persistence and immutability
- **Persistent data structures** — Share structure across versions to support undo, snapshots, and concurrency without locks.
- **Copy‑on‑write** — Defer copying until mutation to make snapshots cheap and safe.

---

## 2) Fundamental Algorithmic Techniques (Paradigms)

- **Brute force enumeration** — Explore the full search space to guarantee correctness when inputs are small or constraints tight.
- **Divide and conquer** — Split problems into independent subproblems to reduce complexity and expose parallelism.
- **Greedy choice** — Build a solution by locally optimal steps when matroid/cut properties guarantee global optimality.
- **Dynamic programming (DP)** — Reuse overlapping subproblem results via memoization/tabulation to trade space for time.
- **Backtracking** — Search with constraint checks to prune partial solutions early.
- **Branch and bound** — Use bounds to prune search while preserving optimality guarantees.
- **Recursion & structural recursion** — Mirror data structure shape to simplify correctness and traversal.
- **Iteration and loop invariants** — Repeatedly apply state transitions with invariants to ensure correctness.
- **Randomized algorithms** — Use randomness to simplify logic or achieve strong expected performance.
- **Approximation algorithms** — Provide solutions with provable quality bounds for intractable optimization problems.
- **Heuristics / metaheuristics** — Use domain‑guided search (local search, annealing, genetic methods) for practical near‑optimal results.
- **Online algorithms** — Make decisions with partial future knowledge to minimize regret/competitive ratio.
- **Streaming algorithms** — Process data in one pass with sublinear memory to handle massive inputs.
- **Parallel & distributed algorithms** — Decompose work across processors/nodes while managing synchronization and communication.

---

## 3) Canonical Algorithms (By Problem Family)

### Sorting & selection
- **Comparison sorting** — Order items by pairwise comparisons to enable efficient searching, grouping, and joins.
- **Quicksort (partitioning)** — Recursively partition around a pivot to sort in-place with good average performance.
- **Mergesort (stable merging)** — Sort halves then merge to guarantee O(n log n) time with stability.
- **Heapsort** — Use a heap to repeatedly extract extrema for O(n log n) in-place sorting.
- **Counting / radix / bucket sorting** — Exploit key structure to sort in linear time relative to key range/digits.
- **Selection (kth element, quickselect)** — Partition to find the kth order statistic without fully sorting.

### Searching & indexing
- **Linear search** — Scan sequentially to find an item when no structure is available.
- **Binary search** — Halve a sorted search space to find items or boundaries in O(log n).
- **Interpolation/exponential search (concept family)** — Adapt probing strategy to distribution or unknown bounds for faster discovery.

### Traversal & exploration
- **Tree traversal (pre/in/post/level order)** — Visit nodes in systematic orders to compute aggregates and transform structure.
- **Depth‑first search (DFS)** — Explore paths deeply to detect cycles, produce orderings, and support backtracking.
- **Breadth‑first search (BFS)** — Explore by distance layers to compute shortest paths in unweighted graphs.
- **Topological sorting** — Order DAG nodes so prerequisites come first to schedule builds, tasks, and dependencies.

### Graph shortest paths & reachability
- **Dijkstra’s algorithm** — Use a priority queue to compute nonnegative shortest paths via greedy relaxation.
- **Bellman–Ford** — Relax edges repeatedly to handle negative weights and detect negative cycles.
- **A\*** — Use an admissible heuristic to guide shortest‑path search while preserving optimality.
- **Floyd–Warshall** — Compute all‑pairs shortest paths via DP over intermediate vertices.
- **Transitive closure** — Compute reachability between all node pairs to answer dependency questions quickly.

### Minimum spanning & cuts
- **Kruskal’s algorithm** — Sort edges and union components to build an MST by adding cheapest safe edges.
- **Prim’s algorithm** — Grow an MST from a seed by repeatedly adding the cheapest crossing edge.
- **Max‑flow/min‑cut (Ford–Fulkerson/Edmonds–Karp concept family)** — Send flow along augmenting paths to compute capacity‑constrained transport and identify bottlenecks.
- **Min‑cost flow** — Optimize flow cost under constraints to solve assignment and logistics problems.

### Connectivity & components
- **Connected components** — Partition graphs into mutually reachable sets to understand structure and isolate subsystems.
- **Strongly connected components (SCC)** — Collapse directed cycles into components to simplify dependency graphs.
- **Articulation points & bridges** — Identify single points of failure to improve network resilience.

### String algorithms
- **Knuth–Morris–Pratt (KMP)** — Use prefix function to find patterns without backtracking on the text.
- **Boyer–Moore (concept family)** — Skip ahead using mismatch information for fast average substring search.
- **Rolling hash / Rabin–Karp** — Compare substrings via hash fingerprints for expected linear pattern matching.
- **Edit distance (Levenshtein)** — Use DP to compute minimum operations to transform one string into another.

### Computational geometry (core primitives)
- **Convex hull** — Compute the minimal convex boundary to simplify spatial reasoning and collision tests.
- **Line sweep** — Sort events and maintain an active set to solve intersection/coverage problems efficiently.
- **Nearest neighbor (exact/approx)** — Find closest points to support clustering, search, and spatial indexing.

### Numerical methods (foundational patterns)
- **Floating‑point error analysis** — Track rounding/conditioning to prevent numerical instability.
- **Root finding (bisection/Newton)** — Iteratively refine estimates to solve equations.
- **Gradient methods (concept family)** — Optimize objective functions by following local slope information.

---

## 4) Data Management & Query Patterns

- **Relational model** — Represent data as relations with keys and constraints to enable declarative querying and integrity.
- **Normalization** — Remove redundancy via functional dependencies to prevent update anomalies.
- **Join algorithms (nested loop, hash join, merge join)** — Combine relations efficiently by exploiting indexes and ordering.
- **Indexing (B‑tree, hash index)** — Build auxiliary structures to accelerate lookups and range scans.
- **Query planning & cost estimation** — Choose execution strategies by modeling I/O, selectivity, and cardinalities.
- **Transactions (ACID)** — Group operations into atomic, isolated, durable units to preserve consistency under concurrency.
- **Concurrency control (locks, MVCC)** — Coordinate concurrent reads/writes to avoid anomalies while maximizing throughput.
- **Write‑ahead logging (WAL)** — Log intent before applying changes to guarantee crash recovery.
- **Replication (sync/async)** — Copy state across nodes to increase availability and read scalability.
- **Sharding / partitioning** — Split data by key/range to scale storage and query capacity.
- **Consistency models (linearizability, sequential, eventual)** — Define what “up‑to‑date” means across replicas to guide correctness.

---

## 5) Operating Systems & Concurrency Concepts

- **Process** — Isolated execution context to provide protection, accounting, and lifecycle management.
- **Thread** — Lightweight execution stream sharing memory to enable intra‑process parallelism.
- **Context switching** — Save/restore CPU state to multiplex execution across tasks.
- **Scheduling (preemptive, priority, fair)** — Allocate CPU time to meet latency/throughput goals.
- **Virtual memory** — Map virtual addresses to physical pages to provide isolation and the illusion of large memory.
- **Paging & page replacement** — Move pages between RAM and disk to manage working sets under memory pressure.
- **File systems (inodes, directories, journaling)** — Persist data with naming, metadata, and crash consistency.
- **Caching (page cache, buffer cache)** — Keep hot data close to CPU to reduce expensive I/O.
- **Synchronization primitives (mutex, semaphore, condition variable)** — Coordinate shared state to avoid races and ensure ordering.
- **Atomic operations & memory ordering** — Provide safe low-level coordination by controlling visibility and reordering.
- **Deadlock (conditions & avoidance)** — Understand circular wait failure modes to design safe lock strategies.
- **Lock‑free / wait‑free progress** — Guarantee system liveness under contention by avoiding global locks.

---

## 6) Networking & Distributed Systems (Structural Concepts)

- **Layering** — Separate concerns (link, network, transport, application) to control complexity and interoperability.
- **Addressing & routing** — Deliver packets across networks by mapping destinations to next hops.
- **Reliability (retransmission, acknowledgments)** — Recover from loss to provide stable communication on unreliable links.
- **Congestion control** — Adapt send rate to avoid network collapse and ensure fairness.
- **Serialization & framing** — Encode structured messages into bytes with boundaries for interoperability.
- **Idempotency** — Make repeated requests safe to tolerate retries and partial failures.
- **Timeouts & backoff** — Use bounded waiting and randomized delays to prevent overload and thundering herds.
- **Consensus (Raft/Paxos concept)** — Make a cluster agree on an order of updates to provide fault‑tolerant state.
- **Leader election** — Select a coordinator to serialize decisions and simplify coordination.
- **Quorums** — Use overlapping majorities to ensure safety under failures.
- **Clock models (physical, logical, vector)** — Reason about ordering and causality without perfect time.
- **CAP tension** — Trade consistency vs availability under partitions to pick a correct system design.

---

## 7) Security & Cryptography (Mechanisms & Purpose)

- **Threat modeling** — Identify assets, adversaries, and attack surfaces to prioritize defenses.
- **Authentication** — Prove identity to prevent unauthorized access.
- **Authorization (least privilege)** — Restrict actions to minimize damage from compromise.
- **Confidentiality (encryption)** — Prevent information disclosure by transforming plaintext into ciphertext.
- **Integrity (MACs, signatures)** — Detect and prevent tampering of data and messages.
- **Hashing (one‑way digests)** — Provide compact fingerprints for integrity checks and content addressing.
- **Key exchange** — Establish shared secrets over insecure channels.
- **Public‑key cryptography** — Enable identity and secure exchange without pre-shared secrets.
- **Digital signatures** — Bind a message to a private key to provide non‑repudiable integrity.
- **Randomness & entropy** — Ensure keys/tokens are unpredictable to resist guessing attacks.
- **Replay protection (nonces, timestamps)** — Prevent attackers from reusing valid past messages.

---

## 8) Software Design & System Patterns (Language‑Agnostic)

### Composition patterns
- **Abstraction & encapsulation** — Hide implementation behind interfaces to reduce coupling and enable evolution.
- **Separation of concerns** — Split responsibilities to localize change and reasoning.
- **Modularity** — Partition a system into replaceable components with clear contracts.
- **Immutability** — Prevent accidental shared-state mutation to simplify concurrency and reasoning.
- **Functional composition** — Build behavior by chaining pure transformations to improve testability and predictability.

### State & dataflow patterns
- **State machine (finite state automaton)** — Encode allowed transitions to control complex behavior safely.
- **Event sourcing** — Store state as an append-only log of events to enable auditability and rebuildability.
- **CQRS** — Separate write models from read models to optimize each independently.
- **Pub/Sub** — Decouple producers and consumers via topics to scale fan-out and reduce coupling.
- **Message queues** — Buffer work and provide backpressure to stabilize load.
- **Stream processing** — Treat data as unbounded streams to compute incremental results in near real time.

### Reliability patterns
- **Retries (bounded) + exponential backoff** — Recover from transient failures without amplifying load.
- **Circuit breaker** — Stop calling a failing dependency to prevent cascading failures.
- **Bulkheads** — Isolate resources to prevent one subsystem from exhausting all capacity.
- **Timeouts** — Bound waiting to preserve system responsiveness.
- **Rate limiting** — Enforce fairness and protect downstream services.
- **Idempotent handlers** — Ensure repeated processing does not create duplicate side effects.
- **Deduplication** — Collapse repeated events/requests to maintain correctness under retries.

### Scalability patterns
- **Caching (local/edge/distributed)** — Trade staleness for speed by reusing computed or fetched results.
- **Load balancing** — Distribute requests to maximize utilization and reduce tail latency.
- **Sharding** — Partition state/work by key to scale horizontally.
- **Work stealing** — Balance parallel workloads by letting idle workers take tasks from busy ones.

### Observability patterns
- **Structured logging** — Emit machine-parseable events to reconstruct behavior.
- **Metrics (counters/gauges/histograms)** — Quantify system behavior to detect regressions and saturation.
- **Tracing (distributed spans)** — Correlate cross-service work to diagnose latency and failures.
- **Health checks** — Provide quick liveness/readiness signals to automation.

---

## 9) Performance Engineering (Universal Concepts)

- **Locality (temporal/spatial)** — Exploit cache hierarchies by accessing nearby data repeatedly.
- **Algorithmic vs constant-factor optimization** — Prefer asymptotic wins before micro-optimizations.
- **Amdahl’s law** — Bound parallel speedup by the serial fraction to set realistic expectations.
- **Tail latency** — Focus on high-percentile response time because it dominates user experience and distributed behavior.
- **Backpressure** — Propagate load signals upstream to prevent collapse under demand spikes.
- **Batching** — Amortize fixed overheads by grouping operations.
- **Vectorization/SIMD (conceptual)** — Apply the same operation to many data elements to increase throughput.

---

## 10) Testing, Correctness, and Formal Methods

- **Specification** — Define intended behavior precisely so correctness is measurable.
- **Property-based testing** — Generate many randomized inputs to validate invariants and edge cases.
- **Model checking (concept)** — Explore state spaces automatically to find counterexamples to safety/liveness.
- **Static analysis** — Infer properties without execution to catch classes of bugs early.
- **Type systems (conceptual)** — Encode constraints into program structure to eliminate invalid states.
- **Refinement** — Prove that an implementation preserves a higher-level spec through stepwise transformation.

---

## 11) Canonical Problem Types (Mental Models)

- **Search** — Find a state satisfying a goal under constraints.
- **Optimization** — Minimize/maximize an objective under constraints.
- **Classification & decision** — Choose among discrete outcomes based on features/rules.
- **Estimation & inference** — Recover hidden variables from observed data.
- **Scheduling** — Assign resources over time to tasks to optimize objectives.
- **Matching & assignment** — Pair entities to maximize utility or minimize cost.
- **Compression** — Remove redundancy while preserving meaning or reconstruction ability.

---

