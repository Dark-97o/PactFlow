# PactFlow RPT Voucher System (Redeem Shop)

## Overview
The RPT Voucher system allows workers and companies to exchange their accumulated on-chain reputation (RPT) for real-world rewards. This process happens **completely off-chain** via Firestore to ensure that a user's permanent on-chain Trust Badge score is not reduced by their "spending" habits.

## Technical Implementation

### Data Schema (Firestore)
- **`spentRpt`**: A numeric field in the `users` and `companies` collections tracking the total RPT exchanged for rewards.
- **`inventory`**: An array of objects tracking redeemed items:
  ```json
  {
    "id": "gc_amazon",
    "type": "Gift Card",
    "brand": "Amazon",
    "value": "$50 Credit",
    "cost": 281,
    "key": "PF-XXXX-XXXX-XXXX",
    "redeemedAt": "ISO-TIMESTAMP"
  }
  ```

### Balance Logic
- **Total RPT**: Fetched directly from the `ProofWork` contract via `get_rpt(address)`.
- **Spent RPT**: Read from Firestore profile.
- **Redeemable Balance**: `Total RPT - Spent RPT`.

### Key Generation
Activation keys are generated using a 12-character alphanumeric sequence prefixed with `PF-` (PactFlow).
Example: `PF-K9L2-M8N4-P1Q5`

## Visual Identity
The Redeem Shop utilizes high-resolution **Official Brand Logos** (stored locally in `/public/assets/img/company`) and a **Sticker-Style UI**. Each reward card features:
- A high-contrast "Sticker" container ensuring 100% brand visibility.
- Solid brand-specific background colors for each card header.
- High-contrast typography for maximum readability.

## Reward Catalog

### Gift Cards (5)
| Brand | Reward | RPT Cost |
| :--- | :--- | :--- |
| Amazon | $50 Credit | 281 |
| Netflix | 3 Months Subscription | 141 |
| Steam | $30 Wallet | 169 |
| Starbucks | $10 Card | 56 |
| Uber | $15 Credit | 85 |

### Vouchers (8)
| Brand | Reward | RPT Cost |
| :--- | :--- | :--- |
| Nike | 25% Discount | 113 |
| Adidas | 20% Discount | 101 |
| H&M | $10 Off | 56 |
| Walmart | $25 Voucher | 169 |
| Best Buy | $50 Voucher | 281 |
| IKEA | $40 Voucher | 225 |
| Sephora | 15% Discount | 113 |
| PlayStation | $25 Credit | 197 |

## Redemption Rules
1. **No Trust Penalty**: Redeeming RPT does NOT lower the Trust Badge tier (e.g., Bronze, Gold, Whale).
2. **Off-Chain Execution**: Redemption is an atomic Firestore operation.
3. **One-Way Exchange**: RPT once spent cannot be refunded.
4. **Immediate Delivery**: Activation keys are revealed immediately upon redemption.
