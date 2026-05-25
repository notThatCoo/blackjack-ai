# Basic Strategy — 6-Deck, Dealer Hits Soft 17 (H17)

## What Is Basic Strategy?

Basic strategy is the mathematically optimal way to play every possible blackjack hand against every possible dealer upcard. It was calculated by simulating billions of hands and finding the action that loses the least (or wins the most) in each situation. Playing perfect basic strategy reduces the house edge to roughly 0.5%.

This document covers the most common casino format: 6 decks, dealer hits soft 17 (H17).

---

## Action Key

| Code | Meaning |
|------|---------|
| H   | Hit |
| S   | Stand |
| D   | Double down (hit if not allowed) |
| Ds  | Double down (stand if not allowed) |
| P   | Split |
| R   | Surrender (hit if not offered) |

---

## Hard Totals

A "hard" hand has no ace, or has an ace counted as 1.

| Player Total | vs 2 | vs 3 | vs 4 | vs 5 | vs 6 | vs 7 | vs 8 | vs 9 | vs 10 | vs A |
|-------------|------|------|------|------|------|------|------|------|-------|------|
| 8 or less   | H | H | H | H | H | H | H | H | H | H |
| 9           | H | D | D | D | D | H | H | H | H | H |
| 10          | D | D | D | D | D | D | D | D | H | H |
| 11          | D | D | D | D | D | D | D | D | D | H |
| 12          | H | H | S | S | S | H | H | H | H | H |
| 13          | S | S | S | S | S | H | H | H | H | H |
| 14          | S | S | S | S | S | H | H | H | H | H |
| 15          | S | S | S | S | S | H | H | H | R | H |
| 16          | S | S | S | S | S | H | H | R | R | R |
| 17+         | S | S | S | S | S | S | S | S | S | S |

### Key Hard Total Rules to Remember
- **Hard 11**: Double against everything except an Ace. You are likely to land a 10-value card.
- **Hard 12**: Only stand against dealer 4, 5, 6 — their weakest upcards where they bust most often.
- **Hard 16 vs 9/10/A**: Surrender. This is the worst hand in blackjack. Giving up half your bet is better than playing it out.
- **Hard 17+**: Always stand. Never hit hard 17 or above.

---

## Soft Totals

A "soft" hand contains an ace counted as 11. You cannot bust by taking one card.

| Player Hand   | vs 2 | vs 3 | vs 4 | vs 5 | vs 6 | vs 7 | vs 8 | vs 9 | vs 10 | vs A |
|--------------|------|------|------|------|------|------|------|------|-------|------|
| Soft 13 (A,2) | H  | H  | H  | D  | D  | H  | H  | H  | H  | H  |
| Soft 14 (A,3) | H  | H  | H  | D  | D  | H  | H  | H  | H  | H  |
| Soft 15 (A,4) | H  | H  | D  | D  | D  | H  | H  | H  | H  | H  |
| Soft 16 (A,5) | H  | H  | D  | D  | D  | H  | H  | H  | H  | H  |
| Soft 17 (A,6) | H  | D  | D  | D  | D  | H  | H  | H  | H  | H  |
| Soft 18 (A,7) | Ds | Ds | Ds | Ds | Ds | S  | S  | H  | H  | H  |
| Soft 19 (A,8) | S  | S  | S  | S  | Ds | S  | S  | S  | S  | S  |
| Soft 20 (A,9) | S  | S  | S  | S  | S  | S  | S  | S  | S  | S  |

### Key Soft Total Rules to Remember
- **Soft 17 (A,6)**: Always hit or double — never stand. 17 is a weak total and the ace gives you a free re-roll.
- **Soft 18 (A,7)**: The trickiest soft hand. Double vs dealer 2–6, stand vs 7–8, hit vs 9/10/A.
- **Soft 19/20**: Stand almost always. You have a very strong hand.

---

## Pairs

Always evaluate pair splitting before anything else.

| Pair | vs 2 | vs 3 | vs 4 | vs 5 | vs 6 | vs 7 | vs 8 | vs 9 | vs 10 | vs A |
|------|------|------|------|------|------|------|------|------|-------|------|
| A,A  | P | P | P | P | P | P | P | P | P | P |
| 2,2  | P | P | P | P | P | P | H | H | H | H |
| 3,3  | P | P | P | P | P | P | H | H | H | H |
| 4,4  | H | H | H | P | P | H | H | H | H | H |
| 5,5  | D | D | D | D | D | D | D | D | H | H |
| 6,6  | P | P | P | P | P | H | H | H | H | H |
| 7,7  | P | P | P | P | P | P | H | H | H | H |
| 8,8  | P | P | P | P | P | P | P | P | P | P |
| 9,9  | P | P | P | P | P | S | P | P | S | S |
| T,T  | S | S | S | S | S | S | S | S | S | S |

### Key Pair Rules to Remember
- **Always split**: A,A and 8,8 — no exceptions, even vs an Ace.
- **Never split**: 5,5 (treat as hard 10 and double) and T,T (you have 20, don't break it up).
- **9,9**: Split against everything except 7, 10, and Ace. Against a dealer 7 you stand because your 18 likely beats the dealer's 17.

---

## The Dealer's Bust Probability by Upcard

| Dealer Upcard | Bust Probability |
|--------------|-----------------|
| 2  | 35% |
| 3  | 37% |
| 4  | 40% |
| 5  | 42% |
| 6  | 42% |
| 7  | 26% |
| 8  | 24% |
| 9  | 23% |
| 10 | 23% |
| A  | 17% |

Dealer upcards 2–6 are "weak" — they bust over a third of the time. Stand on stiff hands (12–16) against them and double aggressively. Upcards 7–A are "strong" — you need to act more aggressively to compete.
