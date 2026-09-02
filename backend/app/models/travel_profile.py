from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database.base import Base


class TravelProfile(Base):
    __tablename__ = "travel_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    travel_type = Column(String(50), nullable=True)

    budget_min = Column(Integer, nullable=True)
    budget_max = Column(Integer, nullable=True)

    interests = Column(Text, nullable=True)

    preferred_transport = Column(String(50), nullable=True)

    hotel_type = Column(String(50), nullable=True)

    food_preference = Column(String(50), nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    user = relationship(
        "User",
        back_populates="travel_profile"
    )