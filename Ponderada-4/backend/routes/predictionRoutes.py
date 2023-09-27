from services.predictionServices import Prediction
from fastapi import APIRouter, HTTPException, Depends, FastAPI, Header
from fastapi.responses import JSONResponse
import json
from pydantic import BaseModel
from pycaret.regression import load_model, predict_model
import pandas as pd

prediction_router = APIRouter()

prediction_model = Prediction


class InputModel(BaseModel):
    subscribers: float
    video_views: float
    category: float
    uploads: float
    country: float
    channel_type: float
    video_views_rank: float
    country_rank: float
    channel_type_rank: float
    video_views_last_30_days: float
    subscribers_last_30_days: float
    user_id: int


class OutputModel(BaseModel):
    prediction: float

def validate_token(Authorization: str = Header(None)):
    # Aqui você pode adicionar sua lógica de validação de token
    if not Authorization:
        raise HTTPException(status_code=401, detail="Token inválido")

@prediction_router.post('/predict', response_model=OutputModel)
async def create_handler(data: InputModel, validate_token: bool = Depends(validate_token)):
    try:
        model = load_model("./routes/main")
        userId = data.user_id
        data = pd.DataFrame([data.dict()])
        predictions = predict_model(model, data=data)
        prediction = predictions["prediction_label"].iloc[0]
        response, code = await prediction_model.register(prediction=prediction, userId=userId)
        return JSONResponse(content=response, status_code=code)
    except Exception as e:
        return JSONResponse(content={"error": e.detail}, status_code=e.status_code)

@prediction_router.get('/all')
async def get_handler(validate_token: bool = Depends(validate_token)):
    try:
        response, code = await prediction_model.get_all()
        return JSONResponse(content=response, status_code=code)
    except Exception as e:
        return JSONResponse(content={"error": e.detail}, status_code=e.status_code)
