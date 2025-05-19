from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List
from database import get_session
from models import Order, User, Product
from schemas import OrderCreate, OrderResponse
from datetime import datetime

router = APIRouter()

@router.post("/orders/", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Session = Depends(get_session)):
    db_order = Order(
        user_id=order.user_id,
        product_id=order.product_id,
        status="pending",
        total_amount=order.total_amount,
        created_at=datetime.utcnow()
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/orders/user/{user_id}", response_model=List[OrderResponse])
async def get_user_orders(user_id: int, db: Session = Depends(get_session)):
    orders = (
        db.query(Order)
        .options(joinedload(Order.product))
        .filter(Order.user_id == user_id, Order.is_deleted == False)
        .all()
    )
    return orders

@router.get("/orders/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, db: Session = Depends(get_session)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.post("/orders/{order_id}/delete", status_code=status.HTTP_204_NO_CONTENT)
async def soft_delete_order(order_id: int, db: Session = Depends(get_session)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.is_deleted = True
    db.commit()
    return {"message": "Order soft deleted successfully"}

@router.put("/orders/{order_id}/status")
async def update_order_status(order_id: int, status: str, db: Session = Depends(get_session)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    return {"message": "Order status updated successfully"}