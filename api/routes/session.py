from fastapi import APIRouter, HTTPException
from api.models import CountRequest, CountResponse, CountStatus
from api.state import counter

router = APIRouter()


@router.post("/count/add", response_model=CountResponse)
def add_cards(req: CountRequest):
    for card in req.cards:
        try:
            counter.count_card(card)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
    return CountResponse(count_status=CountStatus(**counter.status()))


@router.post("/count/reset", response_model=CountResponse)
def reset_shoe():
    counter.reset()
    return CountResponse(count_status=CountStatus(**counter.status()))


@router.get("/count/status", response_model=CountResponse)
def get_status():
    return CountResponse(count_status=CountStatus(**counter.status()))
