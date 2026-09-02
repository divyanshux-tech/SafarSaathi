from datetime import date, datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field, model_validator


class TravelType(str, Enum):
    Solo = "Solo"
    Couple = "Couple"
    Family = "Family"
    Friends = "Friends"
    Other = "Other"


class PreferredTransport(str, Enum):
    Flight = "Flight"
    Train = "Train"
    Bus = "Bus"
    Car = "Car"
    Bike = "Bike"
    Any = "Any"


class HotelType(str, Enum):
    Budget = "Budget"
    Standard = "Standard"
    Luxury = "Luxury"
    Hostel = "Hostel"
    Any = "Any"


class FoodPreference(str, Enum):
    Veg = "Veg"
    NonVeg = "Non-Veg"
    Jain = "Jain"
    Vegan = "Vegan"
    Any = "Any"


class TripStatus(str, Enum):
    Planning = "Planning"
    Confirmed = "Confirmed"
    Completed = "Completed"
    Cancelled = "Cancelled"


class TripCreate(BaseModel):
    start_place: str = Field(..., min_length=1, description="Starting location")
    destination: str = Field(..., min_length=1, description="Destination")
    start_date: date
    end_date: date
    number_of_people: int = Field(..., gt=0, description="Must be greater than 0")
    budget: int = Field(..., ge=0, description="Must not be negative")
    travel_type: TravelType
    interests: Optional[str] = Field(None, description="Comma-separated interests e.g. Adventure, Nature")
    preferred_transport: PreferredTransport = PreferredTransport.Any
    hotel_type: HotelType = HotelType.Any
    food_preference: FoodPreference = FoodPreference.Any
    status: TripStatus = TripStatus.Planning

    @model_validator(mode="after")
    def validate_dates(self):
        if self.end_date < self.start_date:
            raise ValueError("end_date must not be before start_date")
        return self


class TripUpdate(BaseModel):
    start_place: Optional[str] = Field(None, min_length=1)
    destination: Optional[str] = Field(None, min_length=1)
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    number_of_people: Optional[int] = Field(None, gt=0)
    budget: Optional[int] = Field(None, ge=0)
    travel_type: Optional[TravelType] = None
    interests: Optional[str] = None
    preferred_transport: Optional[PreferredTransport] = None
    hotel_type: Optional[HotelType] = None
    food_preference: Optional[FoodPreference] = None
    status: Optional[TripStatus] = None

    @model_validator(mode="after")
    def validate_dates(self):
        if self.start_date and self.end_date:
            if self.end_date < self.start_date:
                raise ValueError("end_date must not be before start_date")
        return self


class TripResponse(BaseModel):
    id: int
    user_id: int
    start_place: str
    destination: str
    start_date: date
    end_date: date
    number_of_people: int
    budget: int
    travel_type: TravelType
    interests: Optional[str] = None
    preferred_transport: PreferredTransport
    hotel_type: HotelType
    food_preference: FoodPreference
    status: TripStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
