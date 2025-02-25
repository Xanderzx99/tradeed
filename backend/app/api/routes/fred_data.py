from fastapi import APIRouter, Depends
from fredapi import Fred
from app.core.config import settings

router = APIRouter()
fred = Fred(api_key=settings.FRED_API_KEY)

@router.get("/economic-indicators")
def get_economic_indicators():
    gdp = fred.get_series('GDP')
    unemployment = fred.get_series('UNRATE')
    inflation = fred.get_series('CPIAUCSL')
    
    return {
        "gdp": gdp.to_dict(),
        "unemployment": unemployment.to_dict(),
        "inflation": inflation.to_dict()
    }
