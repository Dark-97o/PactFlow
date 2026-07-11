# PactFlow Contract Registry (Stellar Testnet)

This document tracks the official deployment addresses, WASM hashes, and purposes of all PactFlow smart contracts.

---

## 🏗️ Active Contracts

### PactFlow Registry
- **Contract ID**: `CDICFUHEFDULYY46R7AUWLX6UYNQAVB2UPMOPE3K5K66IZ75M2QBLHMQ`
- **WASM Hash**: `d9e8...`
- **Source Account**: `subh`
- **Network**: `testnet`
- **Purpose**: Handles User (1,000 XLM) and Company (10,000 XLM) registration stakes and admin withdrawals.

### EscrowVault (v2.5 - redeployed fresh from source)
- **Contract ID**: `CBLV25B7NI7FUY7IYGVUOSMNN2GH4IXQP2SB5PXNFGGLD2DIAW5DAU6F`
- **Source Account**: `subh`
- **Network**: `testnet`
- **Purpose**: Escrow, payouts, and ICC to ProofWork.
- **Admin**: `GB5H54HNJMNINL4CURQ34YCH3BBUDNV3CMENBIAH4YO6F37S5E2MMAVV` (subh)
- **Linked ProofWork**: `CDITPAUJYQZZCKMPH6GGNWB6AGCITWCNYWX3CJSRNEKMUKXDJPSES23C`

### ProofWork (v2.2)
- **Contract ID**: `CDITPAUJYQZZCKMPH6GGNWB6AGCITWCNYWX3CJSRNEKMUKXDJPSES23C`
- **Purpose**: RPT tokens and trust badges.

---

## 🗂️ Deprecated Contracts
- **EscrowVault v2.4** (broken DataKey layout): `CDFCTLTSPSIS245OGCHTUWIUCSVUCWGF7CSBHS5FLK227JGUGCMJH4OS`
- **EscrowVault v1** (original): `CCGHJFHYMX43TNOR5JPGTDFEF7HZ7EEAR2TQ65N5L44WP6NNS4UKMDHP`
- **NFTMarketplace v1.0** (Original Genesis - 0% Fee): `CAF5KAQK3I5UY3E3UVF3LNJNNKXQKW4XR3YJ2QSACHQQJKBDZ7G7NKPE`

---

### NFTMarketplace (v2.0 — Transaction Fee Update)
- **Contract ID**: `CCHZEMKRQ7MJ6XZBUR5XTCF6X2G2A56ZSMKQZPTKXDPPH5CXETAPK444`
- **WASM Hash**: `bd126b51fd8376109740cfe95742286bf19209dfbc3d1f2b8d8254d592ca1781`
- **Source Account**: `subh`
- **Network**: `testnet`
- **Admin**: `GB5H54HNJMNINL4CURQ34YCH3BBUDNV3CMENBIAH4YO6F37S5E2MMAVV` (subh)
- **Treasury**: `GB5H54HNJMNINL4CURQ34YCH3BBUDNV3CMENBIAH4YO6F37S5E2MMAVV` (Protocol Treasury)
- **Token**: `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` (Native XLM)
- **Purpose**: Decentralized NFT marketplace with a **10% platform fee**. The remaining 90% is automatically routed to the seller (or treasury for primary sales).
- **Exported Functions**: `ping`, `init`, `mint`, `buy` (v2 logic), `relist` (v2 logic), `get_nft`, `get_counter`, `withdraw`
- **Deployment Tx**: `945110c212e4626bcd0ef15fa4490c687c82bcbcac09503df0b34e297eacb424`
- **Update Summary**: Successfully deployed and initialized. 10% network fee is live.
- **Incident Report**: During the initial batch minting (v2.0 rollout), a script crash caused a sequence desync, resulting in a "Ghost Mint" event (IDs 1-24). We have decided to **embrace these as "Glitched Legacy" assets** rather than hiding them.
- **Official Collection**: IDs **1 through 47** will now form the complete Genesis Registry. Metadata and unique artwork for the first 24 items are currently in restoration.

#### Genesis Collection v2.0 (Official — IDs 25-47)
| ID | Name | Rarity | Price | Mint Tx |
|---|---|---|---|---|
| 47 | Titan Core | LEGENDARY | 100,000 XLM | `8197cf4c...` |
| 25 | Neural Nexus | LEGENDARY | 90,000 XLM | `945110c2...` |
| 26 | Quantum Sentinel | LEGENDARY | 85,000 XLM | `945110c2...` |
| 27 | Cybernetic Aegis | RARE | 75,000 XLM | `945110c2...` |
| 28 | Orbital Relay | RARE | 70,000 XLM | `945110c2...` |
| 29 | Data Monolith | RARE | 65,000 XLM | `945110c2...` |
| 30 | Plasma Overdrive | RARE | 60,000 XLM | `945110c2...` |
| 31 | Void Singularity | RARE | 55,000 XLM | `945110c2...` |
| 32 | Neon Catalyst | RARE | 50,000 XLM | `945110c2...` |
| 33 | System Override | RARE | 45,000 XLM | `945110c2...` |
| 34 | Protocol Ghost | UNCOMMON | 40,000 XLM | `945110c2...` |
| 35 | Encryption Key Alpha | UNCOMMON | 35,000 XLM | `945110c2...` |
| 36 | Nano-Swarm | UNCOMMON | 30,000 XLM | `945110c2...` |
| 37 | Holo-Map | UNCOMMON | 25,000 XLM | `945110c2...` |
| 38 | Pulse Cannon | UNCOMMON | 20,000 XLM | `945110c2...` |
| 39 | Binary Sword | UNCOMMON | 18,000 XLM | `945110c2...` |
| 40 | Vector Shield | COMMON | 15,000 XLM | `945110c2...` |
| 41 | Static Pulse | COMMON | 12,000 XLM | `945110c2...` |
| 42 | Copper Link | COMMON | 8,000 XLM | `945110c2...` |
| 43 | Basic Uplink | COMMON | 5,000 XLM | `945110c2...` |
| 44 | Scrap Drone | COMMON | 2,500 XLM | `945110c2...` |
| 45 | Rusty Cipher | COMMON | 1,000 XLM | `945110c2...` |
| 46 | Patch-Work Shield | COMMON | 500 XLM | `945110c2...` |

---

## 🚀 Future Deployments
- [ ] **DeadDrop**: Secure file exchange protocol.
