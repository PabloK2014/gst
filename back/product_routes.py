from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status, Form
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from models import Product
from schemas import ProductCreate, Product as ProductSchema
from database import get_session
from typing import List
from pathlib import Path
import os

router = APIRouter()

UPLOAD_DIR = Path("static/products")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@router.post("/products", response_model=ProductSchema)
async def create_product(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category_id: int = Form(...),
    image: UploadFile = File(None),
    session: Session = Depends(get_session)
):
    db_product = Product(
        name=name,
        description=description,
        price=price,
        category_id=category_id
    )
    
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    
    if image:
        file_extension = image.filename.split(".")[-1]
        filename = f"product_{db_product.id}.{file_extension}"
        file_location = UPLOAD_DIR / filename
        
        with open(file_location, "wb") as f:
            f.write(await image.read())
        
        db_product.image = f"static/products/{filename}"
        session.commit()
    
    return db_product

@router.get("/products", response_model=List[ProductSchema])
def get_products(session: Session = Depends(get_session)):
    result = session.execute(select(Product))
    products = result.scalars().all()
    return products

@router.get("/products/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, session: Session = Depends(get_session)):
    result = session.execute(select(Product).filter(Product.id == product_id))
    product = result.scalar_one_or_none()
    if product is None:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return product

@router.put("/products/{product_id}", response_model=ProductSchema)
async def update_product(
    product_id: int,
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category_id: int = Form(...),
    image: UploadFile = File(None),
    session: Session = Depends(get_session)
):
    result = session.execute(select(Product).filter(Product.id == product_id))
    product = result.scalar_one_or_none()
    if product is None:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    product.name = name
    product.description = description
    product.price = price
    product.category_id = category_id
    
    if image:
        try:
            if product.image:
                image_path = product.image.replace("/static/products/", "")
                old_image_path = UPLOAD_DIR / image_path
                if os.path.exists(old_image_path):
                    os.remove(old_image_path)
            
            file_extension = image.filename.split(".")[-1]
            filename = f"product_{product_id}.{file_extension}"
            file_location = UPLOAD_DIR / filename
            
            image_content = await image.read()
            with open(file_location, "wb") as f:
                f.write(image_content)
            
            product.image = f"/static/products/{filename}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Ошибка при обновлении изображения: {str(e)}")
    
    try:
        session.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при обновлении товара: {str(e)}")
    
    return product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session)):
    try:
        result = session.execute(select(Product).filter(Product.id == product_id))
        product = result.scalar_one_or_none()
        if product is None:
            raise HTTPException(status_code=404, detail="Товар не найден")
        
        if product.image:
            try:
                image_path = product.image.replace("/static/products/", "")
                image_file_path = UPLOAD_DIR / image_path
                if os.path.exists(image_file_path):
                    os.remove(image_file_path)
            except Exception as e:
                raise HTTPException(status_code=500, detail=f"Ошибка при удалении изображения: {str(e)}")
        
        session.delete(product)
        session.commit()
        return {"message": "Товар успешно удален"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Ошибка при удалении товара: {str(e)}")