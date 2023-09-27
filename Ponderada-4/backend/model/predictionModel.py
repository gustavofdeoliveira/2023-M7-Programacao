from fastapi import HTTPException
from prisma import Prisma
from model.userModel import get_user_by_id

# This function creates a user with the provided details and returns a user.
async def create_prediction(prediction: float, userId: int) -> Prisma.prediction:
    data = {'value': prediction, 'userId': userId}

    response = await get_user_by_id(id=userId)
    if response:
        prisma = Prisma()
        await prisma.connect()
        data_prediction = await prisma.prediction.create(data=data)
        await prisma.disconnect()
        data_prediction.createdAt = data_prediction.createdAt.strftime("%d-%m-%Y %H:%M:%S")
        return data_prediction
    else:
        raise Exception(f"User no exists with this id: {userId}")


# This function gets all the users in the database and returns a list of users.
async def get_predictions() -> list[Prisma.prediction]:
    prisma = Prisma()
    await prisma.connect()
    data_predictions = await prisma.prediction.find_many()
    await prisma.disconnect()
    
    if len(data_predictions) == 0:
        raise HTTPException(status_code=404, detail="No predictions found")
    
    for data_prediction in data_predictions:
        data_prediction.createdAt = data_prediction.createdAt.strftime("%d-%m-%Y %H:%M:%S")

    return data_predictions
