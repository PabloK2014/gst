from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserProfile(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    role: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None  
    phone: Optional[str] = None  
    avatar: Optional[str] = None  

    class Config:
        orm_mode = True  

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int  

    class Config:
        orm_mode = True  
