from pydantic import BaseModel
from typing import List


class AdviceRequest(BaseModel):
    player_cards: List[str]
    dealer_upcard: str


class CountRequest(BaseModel):
    cards: List[str]


class CountStatus(BaseModel):
    running_count: int
    true_count: float
    decks_remaining: float
    cards_seen: int
    recommended_bet: float


class AdviceResponse(BaseModel):
    action: str
    description: str
    count_status: CountStatus


class CountResponse(BaseModel):
    count_status: CountStatus
