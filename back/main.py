from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from settings import DATABASE_URL
from models import Base
from database import engine
from categoryes_router import router as category_router
from product_routes import router as product_router
from order_routes import router as order_router
from config import PRODUCTS_DIR, AVATARS_DIR
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Workshop API", version="1.0.0")


app.mount("/static/products", StaticFiles(directory=str(PRODUCTS_DIR)), name="products")
app.mount("/static/avatars", StaticFiles(directory=str(AVATARS_DIR)), name="avatars")

Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://gst-workshop.ru",
    "http://gst-workshop.ru",
    "https://gst-workshop.wuaze.com",
    "https://*.up.railway.app",
    "http://xn----8sbhk7a0acdfe.xn--p1ai/",
    "http://гст-мастер.рф/",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Ошибка: {str(exc)} для запроса {request.url}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Внутренняя ошибка сервера"},
    )

@app.get('/')
async def root():
    return {'message': 'Сервер запущен', 'status': 'ok'}

@app.get("/static/products/{filename}")
async def serve_product_image(filename: str):
    file_path = PRODUCTS_DIR / filename
    if file_path.exists():
        return FileResponse(
            file_path,
            headers={
                "Cache-Control": "public, max-age=86400",
                "Access-Control-Allow-Origin": "*"
            }
        )
    raise HTTPException(status_code=404, detail="Файл не найден")

from user_routes import router as user_router
app.include_router(user_router, prefix='/users')
app.include_router(category_router, prefix='/api/v1', tags=['categories'])
app.include_router(product_router, prefix='/api')
app.include_router(order_router, prefix='/api/v1', tags=['orders'])

@app.middleware("http")
async def log_requests(request: Request, call_next):
    origin = request.headers.get('origin')
    logger.info(f"[{request.method}] {request.url} from {origin} at {request.scope.get('client')}")
    if request.method == "OPTIONS":
        logger.info(f"OPTIONS headers: {request.headers}")
        headers = {
            "Access-Control-Allow-Origin": origin or "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
        }
        return JSONResponse(status_code=200, headers=headers, content={})
    response = await call_next(request)
    logger.info(f"Response: {response.status_code} for {request.url}")
    return response

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)