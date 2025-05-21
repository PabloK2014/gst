from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from sqlalchemy import update
from models import CategoryDB, Product
from schemas import CategoryCreate, Category
from database import get_session
from typing import List  

router = APIRouter()

@router.get("/categories", response_model=List[Category])
def get_categories(session: Session = Depends(get_session)):
    result = session.execute(select(CategoryDB))
    categories = result.scalars().all()
    return categories

@router.get("/categories/{category_id}", response_model=Category)
def get_category(category_id: int, session: Session = Depends(get_session)):
    result = session.execute(select(CategoryDB).filter(CategoryDB.id == category_id))
    category = result.scalar_one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    return category

@router.post("/categories", response_model=Category)
def create_category(category: CategoryCreate, session: Session = Depends(get_session)):
    db_category = CategoryDB(name=category.name, description=category.description)  
    session.add(db_category)
    session.commit()
    session.refresh(db_category)
    return db_category

@router.delete("/categories/{category_id}")
def delete_category(category_id: int, session: Session = Depends(get_session)):
    result = session.execute(select(CategoryDB).filter(CategoryDB.id == category_id))
    category = result.scalar_one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    
    stmt = update(Product).where(Product.category_id == category_id).values(category_id=None)
    session.execute(stmt)
    
    session.delete(category)
    session.commit()
    return {"message": "Категория успешно удалена"}
