# Graph Report - C:\Users\subhr\OneDrive\Documents\Programs\GitHub\PactFlow  (2026-04-25)

## Corpus Check
- 22 files · ~92,742 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 36 nodes · 25 edges · 12 communities detected
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `Contract` - 6 edges
2. `test()` - 6 edges
3. `useWallet()` - 3 edges
4. `Header()` - 2 edges
5. `Landing()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Header()` --calls--> `useWallet()`  [INFERRED]
  C:\Users\subhr\OneDrive\Documents\Programs\GitHub\PactFlow\src\components\Header.jsx → C:\Users\subhr\OneDrive\Documents\Programs\GitHub\PactFlow\src\context\WalletContext.jsx
- `Landing()` --calls--> `useWallet()`  [INFERRED]
  C:\Users\subhr\OneDrive\Documents\Programs\GitHub\PactFlow\src\pages\Landing.jsx → C:\Users\subhr\OneDrive\Documents\Programs\GitHub\PactFlow\src\context\WalletContext.jsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (1): test()

### Community 1 - "Community 1"
Cohesion: 0.29
Nodes (3): Header(), Landing(), useWallet()

### Community 2 - "Community 2"
Cohesion: 0.33
Nodes (1): Contract

### Community 3 - "Community 3"
Cohesion: 0.67
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 1.0
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (0): 

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 4`** (2 nodes): `App()`, `App.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (2 nodes): `Footer.jsx`, `Footer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (2 nodes): `DashAdmin.jsx`, `DashAdmin()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `DashCompany.jsx`, `DashCompany()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `DashWorker.jsx`, `DashWorker()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `main.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Contract` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `useWallet()` (e.g. with `Header()` and `Landing()`) actually correct?**
  _`useWallet()` has 2 INFERRED edges - model-reasoned connections that need verification._