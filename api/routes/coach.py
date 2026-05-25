from fastapi import APIRouter, HTTPException
from api.models import AdviceRequest, AdviceResponse, CountStatus
from api.state import counter
from engine.basic_strategy import get_action, describe_action

router = APIRouter()


def card_value(c: str) -> int:
    c = c.upper()
    if c in ('J', 'Q', 'K'):
        return 10
    if c == 'A':
        return 11
    return int(c)


@router.post("/advice", response_model=AdviceResponse)
def get_advice(req: AdviceRequest):
    cards = [str(c).upper() for c in req.player_cards]

    is_pair = len(cards) == 2 and cards[0] == cards[1]

    values = [card_value(c) for c in cards]
    total = sum(values)
    is_soft = 'A' in cards
    if is_soft and total > 21:
        total -= 10
        is_soft = False

    try:
        action = get_action(
            player_total=total,
            dealer_upcard=req.dealer_upcard,
            is_soft=is_soft,
            is_pair=is_pair,
            pair_card=cards[0] if is_pair else None,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    for card in req.player_cards:
        counter.count_card(card)
    counter.count_card(req.dealer_upcard)

    return AdviceResponse(
        action=action,
        description=describe_action(action),
        count_status=CountStatus(**counter.status()),
    )
