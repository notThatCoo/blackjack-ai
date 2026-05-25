# The Illustrious 18 — Count-Based Strategy Deviations

## What Are Deviations?

Basic strategy gives you the optimal play assuming a neutral, unbiased deck. But when the true count is significantly positive or negative, the deck composition shifts — and some plays change.

The "Illustrious 18" (coined by Don Schlesinger in *Blackjack Attack*) are the 18 most valuable deviations from basic strategy based on the true count. Learning these on top of basic strategy captures the majority of additional EV available from count-based play.

Each deviation has an **index number** — the true count at which you switch from the basic strategy play to the deviation play.

---

## The Illustrious 18 (Hi-Lo, 6-Deck)

| # | Hand | vs Dealer | Basic Strategy | Deviation Play | Index |
|---|------|-----------|---------------|----------------|-------|
| 1 | Insurance | Any | Never take | Take insurance | +3 |
| 2 | 16 | 10 | R/H | Stand | 0 |
| 3 | 15 | 10 | R/H | Stand | +4 |
| 4 | 10,10 | 5 | Stand | Split | +5 |
| 5 | 10,10 | 6 | Stand | Split | +4 |
| 6 | 10 | 10 | H | Double | +4 |
| 7 | 12 | 3 | H | Stand | +2 |
| 8 | 12 | 2 | H | Stand | +3 |
| 9 | 11 | A | H (H17) | Double | +1 |
| 10 | 9 | 2 | H | Double | +1 |
| 11 | 10 | A | H | Double | +4 |
| 12 | 9 | 7 | H | Double | +3 |
| 13 | 16 | 9 | R/H | Stand | +5 |
| 14 | 13 | 2 | S | Hit | -1 |
| 15 | 12 | 4 | S | Hit | 0 |
| 16 | 12 | 5 | S | Hit | -2 |
| 17 | 12 | 6 | S | Hit | -1 |
| 18 | 13 | 3 | S | Hit | -2 |

---

## How to Read the Index

- **Index +3** means: make the deviation play when the true count is **+3 or higher**
- **Index -1** means: make the deviation play when the true count is **-1 or lower**
- **Index 0** means: make the deviation play at any count that is 0 or above

---

## The Most Important Deviations Explained

### 1. Insurance at True Count +3
Insurance is normally a sucker bet. But at TC +3, there are enough 10-value cards remaining that insurance becomes mathematically profitable. This is the single highest-value deviation.

**Rule**: Take insurance when TC ≥ +3. Never take it below that, no matter what you are holding.

### 2. Hard 16 vs 10 — Stand at TC 0
Basic strategy says surrender (or hit if no surrender). At a neutral or positive count, standing becomes correct — the deck is richer in 10s, making the dealer more likely to bust on their hidden card.

**Rule**: Stand on hard 16 vs dealer 10 when TC ≥ 0.

### 3. Hard 15 vs 10 — Stand at TC +4
Same logic as above, but 15 requires a higher count to justify standing.

**Rule**: Stand on hard 15 vs dealer 10 when TC ≥ +4.

### 4 & 5. Ten-Ten vs 5 or 6 — Split at High Counts
Normally you never split tens. But at a very high count, the dealer is so likely to bust that splitting your 20 into two hands starting with a 10 becomes profitable. This play looks unusual and draws casino attention — use with caution.

**Rule**: Split T,T vs dealer 5 at TC ≥ +5, vs dealer 6 at TC ≥ +4.

### 9. Hard 11 vs Ace — Double at TC +1 (H17 games)
In a standard 6-deck H17 game, basic strategy says hit 11 vs Ace. Once the true count reaches +1, doubling becomes correct.

**Rule**: Double hard 11 vs Ace when TC ≥ +1.

### 14-18. Hitting Stiff Hands at Negative Counts
Basic strategy tells you to stand on 12/13 vs low dealer upcards because the dealer is likely to bust. But when the count goes negative (deck is rich in low cards), the dealer is less likely to bust and hitting becomes correct.

**Examples**:
- Hit hard 13 vs dealer 2 when TC ≤ -1
- Hit hard 12 vs dealer 5 when TC ≤ -2
- Hit hard 12 vs dealer 6 when TC ≤ -1

---

## The Fab 4 Surrenders

Beyond the Illustrious 18, the "Fab 4" are the most valuable count-based surrender plays:

| Hand | vs Dealer | Surrender When |
|------|-----------|---------------|
| 14   | 10        | TC ≥ +3 |
| 15   | 10        | Always (basic strategy) |
| 15   | 9         | TC ≥ +2 |
| 15   | A         | TC ≥ +1 |

Only apply these if the casino offers late surrender.

---

## Practical Advice for Using Deviations at a Live Table

1. **Master basic strategy first.** Deviations add roughly 0.1–0.15% to your edge. Basic strategy reduces the house edge by ~1.5%. Get the big win first.

2. **Prioritize the top deviations.** Deviations 1–9 account for the majority of the EV gain. If you only learn a few, start with Insurance, 16 vs 10, and 15 vs 10.

3. **Keep your cool.** At a live table, you have seconds to make decisions. You need to know your true count and the index without hesitating or looking uncertain.

4. **Avoid telegraphing.** Making a wild play like splitting tens will get a pit boss's attention fast. Reserve extreme deviations for when you are already planning to move on from the table.
