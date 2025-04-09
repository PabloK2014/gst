from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from settings import DATABASE_URL
from models import Base
from database import engine
from categoryes_router import router as category_router
app = FastAPI()

Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def root():
    return {'message': 'Сервер запущен'}

from user_routes import router as user_router
app.include_router(user_router, prefix='/users')
app.include_router(category_router)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)