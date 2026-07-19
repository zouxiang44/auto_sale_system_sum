# 售电管理系统入口
# 挂载路由、配置 CORS、启动时自动建表、关闭 Redis

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.conf_db import engine, Base
from utils.redis import close_redis
from routers.users import router as users_router


# 合并数据库和 Redis 生命周期
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await close_redis()
    await engine.dispose()


app = FastAPI(title="售电管理系统", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)


@app.get("/")
async def root():
    return {"message": "售电管理系统 API"}
