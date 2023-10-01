from fastapi import HTTPException
from model.predictionModel import create_prediction, get_predictions
import json

class Prediction:

    # This function registers a user with the provided details and returns a user.
    async def register(prediction: float, userId: int):
        try:
            response = await create_prediction(prediction=prediction, userId=userId)
            return response.__dict__, 200
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    async def get_all():
        try:
            predictions = await get_predictions()
            list_of_predictions = [prediction.__dict__ for prediction in predictions]
            return list_of_predictions, 200
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
