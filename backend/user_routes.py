from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status
from sqlalchemy.orm import Session
import jwt
import datetime
from models import User
from database import get_session
from schemas import UserCreate, UserLogin, UserProfile
from pathlib import Path
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional

router = APIRouter(tags=["users"])  

SECRET_KEY = "gst200"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 30  


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")
UPLOAD_DIR = Path("static/avatars")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)



@router.get("/me", response_model=UserProfile)
async def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserProfile)
async def update_user_me(
    name: Optional[str] = None,
    phone: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    if name is not None:
        current_user.name = name
    if phone is not None:
        current_user.phone = phone
    
    db.commit()
    db.refresh(current_user)
    return current_user

def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post('/register', status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_session)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email уже зарегистрирован"
        )
    
    new_user = User(
        email=user.email,
        password=user.password,
        name=user.name,
        phone=user.phone
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Пользователь успешно зарегистрирован"}

@router.post('/login')
def login_user(user: UserLogin, db: Session = Depends(get_session)):
    db_user = db.query(User).filter(User.email == user.email).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь не найден"
        )
    
    if db_user.password != user.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Неверный email или пароль"
        )

    access_token = create_access_token(data={"sub": db_user.email})

    return {
        "message": "Успешный вход",
        "access_token": access_token,
        "token_type": "bearer"  
    }

@router.post('/reset-password')
def reset_password(email: str, new_password: str, db: Session = Depends(get_session)):
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    db_user.password = new_password
    db.commit()
    
    return {"message": "Пароль успешно сброшен"}

@router.post('/upload-profile-picture')
async def upload_profile_picture(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    file_extension = file.filename.split(".")[-1]
    filename = f"{current_user.id}_avatar.{file_extension}"
    file_location = UPLOAD_DIR / filename
    
    with open(file_location, "wb") as f:
        f.write(await file.read())
    
    current_user.avatar = str(file_location) 
    db.commit()
    
    return {
        "message": "Фото профиля успешно загружено",
        "avatar_url": str(file_location)
    }
