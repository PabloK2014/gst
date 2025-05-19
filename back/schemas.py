from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from decimal import Decimal

class UserProfile(BaseModel):
    id: int
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


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    image: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True  

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class OrderBase(BaseModel):
    user_id: int
    product_id: int
    total_amount: float

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        orm_mode = True

class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int  

    class Config:
        orm_mode = True


class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    image: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True

class ProductShort(BaseModel):
    name: str
    description: str
    image: Optional[str]
    price: float

    class Config:
        orm_mode = True

class OrderResponse(OrderBase):
    id: int
    status: str
    created_at: datetime
    product: ProductShort 

    class Config:
        orm_mode = True

