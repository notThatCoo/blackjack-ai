# tests/test_counter.py
from engine.card_counter import CardCounter

def test_running_count():
    counter = CardCounter(num_decks=6)
    counter.count_card('5')   # +1
    counter.count_card('A')   # -1
    counter.count_card('3')   # +1
    assert counter.running_count == 1

def test_true_count():
    counter = CardCounter(num_decks=2)
    # burn through 52 cards worth of +1 cards
    for _ in range(52):
        counter.count_card('5')
    # 52 cards seen, 1 deck remaining, running count = 52
    assert counter.true_count() == 52.0

def test_bet_spread():
    counter = CardCounter()
    counter.running_count = 12
    counter.cards_seen = 260  # ~5 decks seen, 1 remaining → TC ~12
    assert counter.bet_spread(min_bet=10) == 120  # TC 5+ = 12x

def test_reset():
    counter = CardCounter()
    counter.count_card('K')
    counter.reset()
    assert counter.running_count == 0
    assert counter.cards_seen == 0