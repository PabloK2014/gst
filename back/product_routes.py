from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, status, Form
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from models import Product
from schemas import ProductCreate, Product as ProductSchema
from database import get_session
from typing import List
from config import PRODUCTS_DIR as UPLOAD_DIR
import logging
import shutil
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

MAX_FILE_SIZE = 5 * 1024 * 1024 
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "gif"}

@router.post("/products", response_model=ProductSchema)
async def create_product(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    category_id: int = Form(...),
    custom_price_text: str = Form(None), 
    image: UploadFile = File(None),
    session: Session = Depends(get_session)
):
    logger.info(f"Создание продукта: {name}, категория: {category_id}")
    if image and image.size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Файл слишком большой, максимум 5 МБ")
    
    if image:
        file_extension = image.filename.split(".")[-1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Недопустимый формат изображения")

    db_product = Product(
        name=name,
        description=description,
        price=price,
        category_id=category_id,
        custom_price_text=custom_price_text
    )
    
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    
    if image:
        filename = f"product_{db_product.id}.{file_extension}"
        file_location = UPLOAD_DIR / filename
        
        logger.info(f"Сохранение изображения: {file_location}")
        try:
            with open(file_location, "wb") as f:
                shutil.copyfileobj(image.file, f)
            db_product.image = f"/static/products/{filename}"
            session.commit()
            logger.info(f"Изображение сохранено: {db_product.image}")
        except Exception as e:
            logger.error(f"Ошибка сохранения изображения: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Ошибка сохранения изображения: {str(e)}")
    
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
    custom_price_text: str = Form(None), 
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
    product.custom_price_text = custom_price_text 
    
    if image:
        if image.size > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="Файл слишком большой, максимум 5 МБ")
        file_extension = image.filename.split(".")[-1].lower()
        if file_extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Недопустимый формат изображения")
        
        if product.image:
            image_path = product.image.replace("/static/products/", "")
            old_image_path = UPLOAD_DIR / image_path
            if os.path.exists(old_image_path):
                os.remove(old_image_path)
        
        filename = f"product_{product_id}.{file_extension}"
        file_location = UPLOAD_DIR / filename
        
        logger.info(f"Обновление изображения: {file_location}")
        try:
            with open(file_location, "wb") as f:
                shutil.copyfileobj(image.file, f)
            product.image = f"/static/products/{filename}"
            session.commit()
            logger.info(f"Изображение обновлено: {product.image}")
        except Exception as e:
            logger.error(f"Ошибка обновления изображения: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Ошибка обновления изображения: {str(e)}")
    
    session.commit()
    return product

@router.delete("/products/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session)):
    try:
        result = session.execute(select(Product).filter(Product.id == product_id))
        product = result.scalar_one_or_none()
        if product is None:
            raise HTTPException(status_code=404, detail="Товар не найден")
        
        if product.image:
            image_path = product.image.replace("/static/products/", "")
            image_file_path = UPLOAD_DIR / image_path
            if os.path.exists(image_file_path):
                os.remove(image_file_path)
        
        session.delete(product)
        session.commit()
        return {"message": "Товар успешно удален"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Ошибка при удалении товара: {str(e)}")