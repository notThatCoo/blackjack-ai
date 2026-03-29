# engine/basic_strategy.py
# 6-deck, dealer hits soft 17 (H17) basic strategy

from typing import Optional

# Dealer upcard -> column index (2=0, 3=1, ..., 9=7, 10/J/Q/K=8, A=9)
DEALER_INDEX = {
    '2': 0, '3': 1, '4': 2, '5': 3, '6': 4,
    '7': 5, '8': 6, '9': 7,
    '10': 8, 'J': 8, 'Q': 8, 'K': 8,
    'A': 9,
}

# Actions:
#   H  = Hit
#   S  = Stand
#   D  = Double down (hit if can't double)
#   Ds = Double down (stand if can't double)
#   P  = Split
#   R  = Surrender (hit if surrender not offered)

# Hard totals — each tuple is (vs 2, 3, 4, 5, 6, 7, 8, 9, 10, A)
HARD = {
    5:  ('H','H','H','H','H','H','H','H','H','H'),
    6:  ('H','H','H','H','H','H','H','H','H','H'),
    7:  ('H','H','H','H','H','H','H','H','H','H'),
    8:  ('H','H','H','H','H','H','H','H','H','H'),
    9:  ('H','D','D','D','D','H','H','H','H','H'),
    10: ('D','D','D','D','D','D','D','D','H','H'),
    11: ('D','D','D','D','D','D','D','D','D','H'),
    12: ('H','H','S','S','S','H','H','H','H','H'),
    13: ('S','S','S','S','S','H','H','H','H','H'),
    14: ('S','S','S','S','S','H','H','H','H','H'),
    15: ('S','S','S','S','S','H','H','H','R','H'),
    16: ('S','S','S','S','S','H','H','R','R','R'),
    17: ('S','S','S','S','S','S','S','S','S','S'),
}

# Soft totals — key is the soft total value (soft 13 = A+2, soft 18 = A+7, etc.)
SOFT = {
    13: ('H', 'H', 'H', 'D', 'D', 'H',  'H',  'H', 'H', 'H'),   # A,2
    14: ('H', 'H', 'H', 'D', 'D', 'H',  'H',  'H', 'H', 'H'),   # A,3
    15: ('H', 'H', 'D', 'D', 'D', 'H',  'H',  'H', 'H', 'H'),   # A,4
    16: ('H', 'H', 'D', 'D', 'D', 'H',  'H',  'H', 'H', 'H'),   # A,5
    17: ('H', 'D', 'D', 'D', 'D', 'H',  'H',  'H', 'H', 'H'),   # A,6
    18: ('Ds','Ds','Ds','Ds','Ds','S',   'S',  'H', 'H', 'H'),   # A,7
    19: ('S', 'S', 'S', 'S', 'Ds','S',  'S',  'S', 'S', 'S'),   # A,8
    20: ('S', 'S', 'S', 'S', 'S', 'S',  'S',  'S', 'S', 'S'),   # A,9
}

# Pairs — key is the rank of each card in the pair
PAIRS = {
    'A':  ('P','P','P','P','P','P','P','P','P','P'),
    '2':  ('P','P','P','P','P','P','H','H','H','H'),
    '3':  ('P','P','P','P','P','P','H','H','H','H'),
    '4':  ('H','H','H','P','P','H','H','H','H','H'),
    '5':  ('D','D','D','D','D','D','D','D','H','H'),  # treat as hard 10
    '6':  ('P','P','P','P','P','H','H','H','H','H'),
    '7':  ('P','P','P','P','P','P','H','H','H','H'),
    '8':  ('P','P','P','P','P','P','P','P','P','P'),
    '9':  ('P','P','P','P','P','S','P','P','S','S'),
    '10': ('S','S','S','S','S','S','S','S','S','S'),
}


def get_action(
    player_total: int,
    dealer_upcard: str,
    is_soft: bool = False,
    is_pair: bool = False,
    pair_card: Optional[str] = None,
) -> str:
    """Return the correct basic strategy action for a 6-deck H17 game.

    Args:
        player_total: Hand total (e.g. 16, 18).
        dealer_upcard: '2'-'9', '10', 'J', 'Q', 'K', or 'A'.
        is_soft: True when the hand contains an ace counted as 11.
        is_pair: True when the first two cards are a pair.
        pair_card: The rank of the paired card (required when is_pair=True).

    Returns:
        One of: 'H', 'S', 'D', 'Ds', 'P', 'R'
    """
    upcard = str(dealer_upcard).upper()
    dealer_idx = DEALER_INDEX.get(upcard)
    if dealer_idx is None:
        raise ValueError(f"Unknown dealer upcard: {dealer_upcard!r}")

    # --- Pairs ---
    if is_pair and pair_card is not None:
        rank = str(pair_card).upper()
        if rank in ('J', 'Q', 'K'):
            rank = '10'
        if rank in PAIRS:
            return PAIRS[rank][dealer_idx]

    # --- Soft totals ---
    if is_soft and player_total in SOFT:
        return SOFT[player_total][dealer_idx]

    # --- Hard totals ---
    if player_total <= 8:
        return 'H'
    if player_total >= 17:
        return 'S'
    return HARD[player_total][dealer_idx]


ACTION_LABELS = {
    'H':  'Hit',
    'S':  'Stand',
    'D':  'Double down (hit if not allowed)',
    'Ds': 'Double down (stand if not allowed)',
    'P':  'Split',
    'R':  'Surrender (hit if not offered)',
}


def describe_action(action: str) -> str:
    """Return a human-readable label for an action code."""
    return ACTION_LABELS.get(action, action)
