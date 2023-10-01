from services.userSevices import User
from fastapi import APIRouter, HTTPException, Depends, FastAPI, Header
from fastapi.responses import JSONResponse
from pydantic import BaseModel

user_router = APIRouter()

user =  User

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

@user_router.post('/create')
async def create_handler(data: UserCreate):
    try:
        response, code = await user(name=data.name, email=data.email, password=data.password).register()
        return JSONResponse(content=response, status_code=code)
    except Exception as e:
        return JSONResponse(content={"error": e.detail}, status_code=e.status_code)



@user_router.post('/login')
async def login_handler(data: UserLogin):
    try:
        response, code = await user.login(email=data.email, password=data.password)
        return JSONResponse(content=response, status_code=code)
    except Exception as e:
        return JSONResponse(content={"error": e.detail}, status_code=e.status_code)


def validate_token(Authorization: str = Header(None)):
    # Aqui você pode adicionar sua lógica de validação de token
    if not Authorization:
        raise HTTPException(status_code=401, detail="Token inválido")


@user_router.get('/all')
async def get_handler(validate_token: bool = Depends(validate_token)):
    try:
        response, code = await user.get_all()
        return JSONResponse(content=response, status_code=code)
    except Exception as e:
        return JSONResponse(content={"error": e.detail}, status_code=e.status_code)

