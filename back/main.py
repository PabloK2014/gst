from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from settings import DATABASE_URL
from models import Base
from database import engine
from categoryes_router import router as category_router
from product_routes import router as product_router
from order_routes import router as order_router

app = FastAPI(title="Workshop API", version="1.0.0")

app.mount("/static", StaticFiles(directory="static"), name="static")

Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://gst-worckshop.ru",
    "https://www.gst-worckshop.ru",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Внутренняя ошибка сервера"},
    )

@app.get('/')
async def root():
    return {'message': 'Сервер запущен', 'status': 'ok'}

from user_routes import router as user_router
app.include_router(user_router, prefix='/users')
app.include_router(category_router, prefix='/api/v1', tags=['categories'])
app.include_router(product_router, prefix='/api')
app.include_router(order_router, prefix='/api/v1', tags=['orders'])

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)