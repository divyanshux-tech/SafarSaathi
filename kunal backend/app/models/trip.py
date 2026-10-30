from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship

from app.database.base import Base


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    # Core trip fields
    start_place = Column(String(255), nullable=False)
    destination = Column(String(255), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    number_of_people = Column(Integer, nullable=False)
    budget = Column(Integer, nullable=False)

    # Preferences (stored as strings, validated in schemas)
    travel_type = Column(String(20), nullable=False)  # Solo, Couple, Family, Friends, Other
    interests = Column(String(500), nullable=True)  # comma-separated or free text, optional
    preferred_transport = Column(String(20), nullable=True)  # Flight, Train, Bus, Car, Bike, Any
    hotel_type = Column(String(20), nullable=True)  # Budget, Standard, Luxury, Hostel, Any
    food_preference = Column(String(20), nullable=True)  # Veg, Non-Veg, Jain, Vegan, Any
    status = Column(String(20), nullable=False, default="Planning")  # Planning, Confirmed, Completed, Cancelled

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationship
    user = relationship("User", back_populates="trips")
