from sqlalchemy import Boolean, Column, Integer, String
from app.database.base import Base

from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    travel_profile = relationship(
    "TravelProfile",
    back_populates="user",
    uselist=False,
    cascade="all, delete-orphan"
    )

