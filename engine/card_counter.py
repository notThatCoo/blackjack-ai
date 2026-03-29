# engine/card_counter.py

# Hi-Lo card values
HI_LO_VALUES = {
    '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,   # low cards = +1
    '7': 0, '8': 0, '9': 0,                      # neutral = 0
    '10': -1, 'J': -1, 'Q': -1, 'K': -1, 'A': -1 # high cards = -1
}

class CardCounter:
    def __init__(self, num_decks=6):
        self.num_decks = num_decks
        self.running_count = 0
        self.cards_seen = 0

    def count_card(self, card):
        """Feed a card in, updates running count."""
        card = str(card).upper()
        if card not in HI_LO_VALUES:
            raise ValueError(f"Unknown card: {card}")
        self.running_count += HI_LO_VALUES[card]
        self.cards_seen += 1

    def decks_remaining(self):
        """Estimate decks left in the shoe."""
        cards_remaining = (self.num_decks * 52) - self.cards_seen
        return max(cards_remaining / 52, 0.5)  # never go below half deck

    def true_count(self):
        """True count = running count / decks remaining."""
        return round(self.running_count / self.decks_remaining(), 2)

    def bet_spread(self, min_bet=10):
        """Basic bet recommendation based on true count."""
        tc = self.true_count()
        if tc <= 1:
            return min_bet
        elif tc == 2:
            return min_bet * 2
        elif tc == 3:
            return min_bet * 4
        elif tc == 4:
            return min_bet * 8
        else:
            return min_bet * 12  # TC 5+

    def reset(self):
        """New shoe."""
        self.running_count = 0
        self.cards_seen = 0

    def status(self):
        """Snapshot of current count state."""
        return {
            "running_count": self.running_count,
            "true_count": self.true_count(),
            "decks_remaining": round(self.decks_remaining(), 1),
            "cards_seen": self.cards_seen,
            "recommended_bet": self.bet_spread()
        }