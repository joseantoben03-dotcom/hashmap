# IIT Ropar Case Study: Engineering an O(1) Campus Registry

An interactive, dual-workbench educational case study that teaches **how Hash Maps work under the hood** while **indirectly teaching Python programming and internals** (dictionaries, `hash()`, key immutability, collision resolution, safe lookups, and standard library superpowers).

---

## The Case Study Scenario

You step into the role of a systems engineer on the **IIT Ropar Academic Portal** team. During course registration week, thousands of concurrent requests freeze the portal because course records are kept in linear lists ($O(n)$ scan). The mission is to re-architect the registry into a constant-time ($O(1)$) system using hash maps and Python dictionaries (`dict`).

---

## 6 Engineering Milestones & Python Curriculum

| Milestone | Case Study Action | Data Structure Mechanic | Python Internals & Syntax Taught |
|---|---|---|---|
| **1. The Bottleneck** | Diagnosis of the slow portal | Array vs. Hash Map direct indexing | Python `list` $O(n)$ scan vs. `dict` $O(1)$ key lookup |
| **2. The Dispatcher** | Computing course code memory slots | Sum-of-codes modulo table capacity | Built-in `hash()`, why keys MUST be immutable (`tuple` vs `list`), `TypeError: unhashable type` |
| **3. Enrolling Records** | Enrolling courses (`CS101`, `EE201`, etc.) | Direct memory insertion & key overwriting | `registry[key] = val`, key uniqueness, `.update()`, and `in` operator |
| **4. Collision Chaos** | Handling slot clashes (`CS101` & `CS011`) | Separate chaining vs open addressing | How CPython handles collisions (perturbation sequence, load factor, table doubling at ~66%) |
| **5. Query & Drop** | Students querying and dropping electives | Chain traversal, probe counting, node removal | Preventing `KeyError`, safe access with `dict.get()`, `del` vs `dict.pop()` |
| **6. Production Scale** | System benchmark & advanced patterns | Average $O(1)$ vs worst-case $O(n)$ | `collections.defaultdict`, `collections.Counter`, Dict Comprehensions, insertion ordering |

---

## Features

- **Side-by-Side Workbench**:
  - **Left Pane**: Case study narrative, interactive inputs, quick course enrollment chips, and visual memory slot drawers (`BucketWall`).
  - **Right Pane (`PythonConsole`)**:
    - **Interactive Code**: Live editable Python code snippets with run simulation and output terminal.
    - **Under the Hood**: In-depth explanations connecting visual actions to CPython runtime mechanics.
    - **Quick Challenge**: Interactive concept checks with instant feedback.
- **Offline-First Persistence**: Progress is saved immediately in `localStorage` and synchronized with the Express + MongoDB backend whenever reachable.

---

## Running Locally

### 1. Frontend (`python/hashmap`)

```bash
cd hashmap
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### 2. Backend (`python/backend`) — Optional

```bash
cd backend
npm install
# Configure MONGODB_URI in .env
npm run dev
```
