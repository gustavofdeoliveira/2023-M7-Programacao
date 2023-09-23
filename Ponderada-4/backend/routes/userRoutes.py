from services.userSevices import User
from fastapi import APIRouter, HTTPException
import json

user_router = APIRouter()

user =  User

@user_router.post('/create')
async def create_handler(name:str, email:str, password:str):
    try:
        response = await user(name=name, email=email, password=password).register()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@user_router.get('/login')
async def login_handler(data: dict):
    try:
        response = await user(email=data["email"], password=data["password"]).login()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
