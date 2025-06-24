from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# ----------- User Schemas -----------

class UserProfile(BaseModel):
    id: int
    email: EmailStr
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None
    role: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# ----------- Product Schemas -----------

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    category_id: Optional[int] = None
    custom_price_text: Optional[str] = None  
class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    image: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ProductShort(BaseModel):
    name: str
    description: str
    image: Optional[str]
    price: float
    custom_price_text: Optional[str] = None 

    class Config:
        from_attributes = True

# ----------- Category Schemas -----------

class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# ----------- Order Schemas -----------

class OrderBase(BaseModel):
    user_id: int
    product_id: int
    total_amount: float
    comment: Optional[str] = None

class OrderCreate(OrderBase):
    pass

class OrderResponse(OrderBase):
    id: int
    status: str
    created_at: datetime
    product: Optional[ProductShort] = None
    user: Optional[UserProfile] = None

    class Config:
        from_attributes = True