from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.connection import get_db
from app.models.travel_profile import TravelProfile
from app.schemas.travel_profile import (
    TravelProfileCreate,
    TravelProfileResponse
)

from app.schemas.travel_profile import (
    TravelProfileCreate,
    TravelProfileResponse,
    TravelProfileUpdate  # Add this!
)


router = APIRouter(
    prefix="/api/profile",
    tags=["Travel Profile"]
)


@router.post(
    "",
    response_model=TravelProfileResponse,
    status_code=status.HTTP_201_CREATED
)
def create_profile(
    profile_data: TravelProfileCreate,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    existing_profile = (
        db.query(TravelProfile)
        .filter(TravelProfile.user_id == int(user_id))
        .first()
    )

    if existing_profile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Travel profile already exists"
        )

    new_profile = TravelProfile(
        user_id=int(user_id),
        travel_type=profile_data.travel_type,
        budget_min=profile_data.budget_min,
        budget_max=profile_data.budget_max,
        interests=profile_data.interests,
        preferred_transport=profile_data.preferred_transport,
        hotel_type=profile_data.hotel_type,
        food_preference=profile_data.food_preference
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.get(
    "",
    response_model=TravelProfileResponse
)
def get_profile(
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = (
        db.query(TravelProfile)
        .filter(TravelProfile.user_id == int(user_id))
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Travel profile not found"
        )

    return profile


@router.put(
    "",
    response_model=TravelProfileResponse
)
def update_profile(
    profile_data: TravelProfileCreate,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = (
        db.query(TravelProfile)
        .filter(TravelProfile.user_id == int(user_id))
        .first()
    )

    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Travel profile not found"
        )

    profile.travel_type = profile_data.travel_type
    profile.budget_min = profile_data.budget_min
    profile.budget_max = profile_data.budget_max
    profile.interests = profile_data.interests
    profile.preferred_transport = profile_data.preferred_transport
    profile.hotel_type = profile_data.hotel_type
    profile.food_preference = profile_data.food_preference

    db.commit()
    db.refresh(profile)

    return profile