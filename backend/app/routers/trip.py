from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.connection import get_db
from app.models.trip import Trip
from app.schemas.trip import TripCreate, TripResponse, TripUpdate

router = APIRouter(
    prefix="/api/trips",
    tags=["Trips"]
)


@router.post(
    "",
    response_model=TripResponse,
    status_code=status.HTTP_201_CREATED
)
def create_trip(
    trip_data: TripCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    new_trip = Trip(
        user_id=int(current_user_id),
        start_place=trip_data.start_place,
        destination=trip_data.destination,
        start_date=trip_data.start_date,
        end_date=trip_data.end_date,
        number_of_people=trip_data.number_of_people,
        budget=trip_data.budget,
        travel_type=trip_data.travel_type.value,
        interests=trip_data.interests,
        preferred_transport=trip_data.preferred_transport.value,
        hotel_type=trip_data.hotel_type.value,
        food_preference=trip_data.food_preference.value,
        status=trip_data.status.value,
    )
    db.add(new_trip)
    db.commit()
    db.refresh(new_trip)
    return new_trip


@router.get(
    "",
    response_model=List[TripResponse]
)
def get_my_trips(
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    trips = (
        db.query(Trip)
        .filter(Trip.user_id == int(current_user_id))
        .order_by(Trip.created_at.desc())
        .all()
    )
    return trips


@router.get(
    "/{trip_id}",
    response_model=TripResponse
)
def get_trip_by_id(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    trip = (
        db.query(Trip)
        .filter(Trip.id == trip_id, Trip.user_id == int(current_user_id))
        .first()
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found"
        )
    return trip


@router.put(
    "/{trip_id}",
    response_model=TripResponse
)
def update_trip(
    trip_id: int,
    trip_data: TripUpdate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    trip = (
        db.query(Trip)
        .filter(Trip.id == trip_id, Trip.user_id == int(current_user_id))
        .first()
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found"
        )

    update_data = trip_data.model_dump(exclude_unset=True)

    # Handle enum values to store string
    for field in ["travel_type", "preferred_transport", "hotel_type", "food_preference", "status"]:
        if field in update_data and update_data[field] is not None:
            # Enum -> store its value
            val = update_data[field]
            if hasattr(val, "value"):
                update_data[field] = val.value

    # Validate dates when only one is updated: ensure final end_date >= start_date
    new_start = update_data.get("start_date", trip.start_date)
    new_end = update_data.get("end_date", trip.end_date)
    if new_end < new_start:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="end_date must not be before start_date"
        )

    for key, value in update_data.items():
        setattr(trip, key, value)

    db.commit()
    db.refresh(trip)
    return trip


@router.delete(
    "/{trip_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    trip = (
        db.query(Trip)
        .filter(Trip.id == trip_id, Trip.user_id == int(current_user_id))
        .first()
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found"
        )

    db.delete(trip)
    db.commit()
    return None
