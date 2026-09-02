from typing import Literal, Optional

from pydantic import BaseModel, Field


class TravelProfileCreate(BaseModel):
    travel_type: Literal[
        "Solo",
        "Couple",
        "Family",
        "Friends",
        "Other"
    ]

    budget_min: Optional[int] = Field(default=None, ge=0)
    budget_max: Optional[int] = Field(default=None, ge=0)

    interests: Optional[str] = None

    preferred_transport: Optional[str] = None

    hotel_type: Optional[str] = None

    food_preference: Optional[str] = None


class TravelProfileResponse(BaseModel):
    id: int
    user_id: int
    travel_type: Literal[
        "Solo",
        "Couple",
        "Family",
        "Friends",
        "Other"
    ]

    budget_min: Optional[int] = None
    budget_max: Optional[int] = None

    interests: Optional[str] = None

    preferred_transport: Optional[str] = None

    hotel_type: Optional[str] = None

    food_preference: Optional[str] = None

    class Config:
        from_attributes = True

class TravelProfileUpdate(BaseModel):
    travel_type: Optional[Literal["Solo", "Couple", "Family", "Friends", "Other"]] = None
    budget_min: Optional[int] = Field(default=None, ge=0)
    budget_max: Optional[int] = Field(default=None, ge=0)
    interests: Optional[str] = None
    preferred_transport: Optional[str] = None
    hotel_type: Optional[str] = None
    food_preference: Optional[str] = None