from fastapi import APIRouter

from app.api.routes import items, login, private, users, utils, fred_data
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)
api_router.include_router(fred_data.router, prefix="/fred", tags=["fred"])


if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)
