from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.schemas.auth import RegisterRequest

def register_user(
    db: Session,
    user_data: RegisterRequest
) -> User:
    existing_user = db.scalar(
        select(User).where(User.email==user_data.email)
    )

    if existing_user:
        raise ValueError("Email already exists!")

    hashed_password = hash_password(user_data.password)

    user = User(
        email=user_data.email,
        password_hash=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
