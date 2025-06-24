from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status, Body
from sqlalchemy.orm import Session
import datetime
from jose import jwt
from models import User
from config import AVATARS_DIR as UPLOAD_DIR
from database import get_session
from schemas import UserCreate, UserLogin, UserProfile
from pathlib import Path
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional, List
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

VALID_ROLES: List[str] = ["user", "admin"]

router = APIRouter(tags=["users"])  

SECRET_KEY = "gst200"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 60 * 24 * 7 


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")




def create_access_token(data: dict, expires_delta: datetime.timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.datetime.utcnow() + expires_delta
    else:
        expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: Optional[str] = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=UserProfile)
async def read_user_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me")
async def update_user_me(
    user_data: dict = Body(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    name = user_data.get('name')
    phone = user_data.get('phone')
    email = user_data.get('email')
    if name is not None:
        current_user.name = name
    if phone is not None:
        current_user.phone = phone
    if email is not None:
        current_user.email = email
    
    db.commit()
    db.refresh(current_user)
    

    access_token = create_access_token(data={"sub": current_user.email})
    
    return {
        "user": {
            "email": current_user.email,
            "name": current_user.name,
            "phone": current_user.phone,
            "avatar": current_user.avatar,
            "role": current_user.role,
            "created_at": current_user.created_at
        },
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post('/register', status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_session)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email уже зарегистрирован"
        )
    
    hashed_password = pwd_context.hash(user.password)
    new_user = User(
        email=user.email,
        password=hashed_password,
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
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Такого пользователя не существует"
        )
    
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Логин или пароль неверный"
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
    
    hashed_password = pwd_context.hash(new_password)
    db_user.password = hashed_password
    db.commit()
    
    return {"message": "Пароль успешно сброшен"}

@router.get('/users', response_model=dict)
def get_users(
    search: str = None,
    page: int = 1,
    per_page: int = 10,
    db: Session = Depends(get_session)
):
    
    query = db.query(User)
    
    if search:
        query = query.filter(
            (User.email.ilike(f'%{search}%')) |
            (User.phone.ilike(f'%{search}%'))
        )
    
    total = query.count()
    if total == 0:
        return {
            "items": [],
            "total": 0,
            "page": page,
            "per_page": per_page,
            "total_pages": 0
        }
    
    total_pages = (total + per_page - 1) // per_page
    page = min(page, total_pages)
    
    users = query.offset((page - 1) * per_page).limit(per_page).all()
    
    return {
        "items": [{
            "id": user.id,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
            "username": user.name
        } for user in users],
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }

VALID_ROLES = ['user', 'admin']

@router.patch('/users/{user_id}/role')
async def update_user_role(
    user_id: int,
    role_data: dict = Body(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    role = role_data.get('role')
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Пользователь не найден"
        )
    
    if role not in VALID_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Недопустимая роль. Допустимые значения: {', '.join(VALID_ROLES)}"
        )
    
    user.role = role
    db.commit()
    db.refresh(user)
    
    return {
        "message": "Роль пользователя успешно обновлена",
        "user_id": user.id,
        "new_role": user.role
    }

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
    
    avatar_url = f"/static/avatars/{filename}"
    current_user.avatar = avatar_url
    db.commit()
    
    return {
        "message": "Фото профиля успешно загружено",
        "avatar_url": avatar_url
    }
