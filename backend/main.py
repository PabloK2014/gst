from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import Column, Integer, String, select
from pydantic import BaseModel
from settings import DATABASE_URL
from typing import List

app = FastAPI()

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройка базы данных
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Базовый класс для моделей SQLAlchemy
class Base(DeclarativeBase):
    pass

# Модель SQLAlchemy
class CategoryDB(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(String(255), nullable=False)

# Модели Pydantic
class CategoryBase(BaseModel):
    name: str
    description: str

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# Зависимость для получения сессии базы данных
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session

# Создание таблиц при запуске
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

# API endpoints
@app.get("/categories", response_model=List[Category])
async def get_categories(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(CategoryDB))
    categories = result.scalars().all()
    return categories

@app.post("/categories", response_model=Category)
async def create_category(category: CategoryCreate, session: AsyncSession = Depends(get_session)):
    db_category = CategoryDB(**category.dict())
    session.add(db_category)
    await session.commit()
    await session.refresh(db_category)
    return db_category

@app.get("/categories/{category_id}", response_model=Category)
async def get_category(category_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(CategoryDB).filter(CategoryDB.id == category_id))
    category = result.scalar_one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    return category

@app.delete("/categories/{category_id}")
async def delete_category(category_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(CategoryDB).filter(CategoryDB.id == category_id))
    category = result.scalar_one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Категория не найдена")
    await session.delete(category)
    await session.commit()
    return {"message": "Категория успешно удалена"}
