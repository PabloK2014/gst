from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Enum, Boolean
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime
import enum

Base = declarative_base()

class OrderStatus(enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    phone = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    role = Column(String, default='user')
    created_at = Column(DateTime, default=datetime.utcnow)


class CategoryDB(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    image = Column(String, nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    category = relationship("CategoryDB", back_populates="products")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    status = Column(Enum(OrderStatus), default=OrderStatus.pending)
    total_amount = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    comment = Column(String)

    user = relationship("User")
    product = relationship("Product")
