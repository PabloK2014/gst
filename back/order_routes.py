from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from database import get_session
from models import Order, User, Product, OrderStatus
from schemas import OrderCreate, OrderResponse
from datetime import datetime
from sqlalchemy import or_, text
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/orders/test")
async def test_db(db: Session = Depends(get_session)):
    try:
        result = db.execute(text("SELECT name FROM sqlite_master WHERE type='table';")).fetchall()
        tables = [row[0] for row in result]
        return {"status": "OK", "tables": tables}
    except Exception as e:
        logger.error(f"Ошибка в test_db: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/orders/", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Session = Depends(get_session)):
    try:
        db_order = Order(
            user_id=order.user_id,
            product_id=order.product_id,
            status="pending",
            total_amount=order.total_amount,
            comment=order.comment,
            created_at=datetime.utcnow()
        )
        db.add(db_order)
        db.commit()
        db.refresh(db_order)
        return db_order
    except Exception as e:
        logger.error(f"Ошибка в create_order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders/user/{user_id}", response_model=List[OrderResponse])
async def get_user_orders(user_id: int, db: Session = Depends(get_session)):
    try:
        orders = (
            db.query(Order)
            .join(Product, Order.product_id == Product.id)
            .options(joinedload(Order.product))
            .filter(Order.user_id == user_id, Order.is_deleted == False)
            .all()
        )
        return orders
    except Exception as e:
        logger.error(f"Ошибка в get_user_orders: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders/all", response_model=List[OrderResponse])
async def get_all_orders(
    id: Optional[int] = None,
    phone: Optional[str] = None,
    name: Optional[str] = None,
    db: Session = Depends(get_session)
):
    try:
        query = db.query(Order).join(Product, Order.product_id == Product.id).options(
            joinedload(Order.product),
            joinedload(Order.user)
        ).filter(Order.is_deleted == False)

        if id:
            query = query.filter(Order.id == id)
        if phone:
            query = query.join(User, Order.user_id == User.id).filter(User.phone.ilike(f"%{phone}%"))
        if name:
            query = query.join(User, Order.user_id == User.id).filter(User.name.ilike(f"%{name}%"))

        orders = query.order_by(Order.created_at.desc()).all()
        logger.debug(f"Получено {len(orders)} заказов")
        return orders
    except Exception as e:
        logger.error(f"Ошибка в get_all_orders: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/orders/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, db: Session = Depends(get_session)):
    try:
        order = (
            db.query(Order)
            .join(Product, Order.product_id == Product.id)
            .options(joinedload(Order.product), joinedload(Order.user))
            .filter(Order.id == order_id, Order.is_deleted == False)
            .first()
        )
        if not order:
            raise HTTPException(status_code=404, detail="Заказ не найден")
        return order
    except Exception as e:
        logger.error(f"Ошибка в get_order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/orders/{order_id}/delete", status_code=status.HTTP_204_NO_CONTENT)
async def soft_delete_order(order_id: int, db: Session = Depends(get_session)):
    try:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Заказ не найден")
        order.is_deleted = True
        db.commit()
        return {"message": "Заказ успешно удалён (мягкое удаление)"}
    except Exception as e:
        logger.error(f"Ошибка в soft_delete_order: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/orders/{order_id}/status")
async def update_order_status(order_id: int, status: str, db: Session = Depends(get_session)):
    try:
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            raise HTTPException(status_code=404, detail="Заказ не найден")
        if status not in [e.value for e in OrderStatus]:
            raise HTTPException(status_code=400, detail="Недопустимый статус")
        order.status = status
        db.commit()
        return {"message": "Статус заказа успешно обновлён"}
    except Exception as e:
        logger.error(f"Ошибка в update_order_status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))