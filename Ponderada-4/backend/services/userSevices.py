from datetime import datetime, timedelta
import bcrypt
from fastapi import HTTPException
import jwt
from model.userModel import create_user, get_user_by_email, get_user_by_id, get_all_user
import os
from dotenv import load_dotenv
load_dotenv()

# Class User
class User:
    # Constructor
    def __init__(self, name: str, email: str, password: str):
        if not name:
            self.name = None
        self.name = name
        self.email = email
        self.password = password

    # This function registers a user with the provided details and returns a user.
    async def register(self):
        try:
            password = str(self.password)
            password = password.encode('UTF_8')
            password_crypt = bcrypt.hashpw(password, bcrypt.gensalt(10))
            password_crypt = password_crypt.decode("utf-8")

            response = await create_user(name=self.name, email=self.email, password=password_crypt)
            return response.__dict__, 200
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    async def login(email:str, password: str):
        try:
            user = await get_user_by_email(email=email)
            if user:
                if bcrypt.checkpw(password=str(password).encode('UTF_8'),
                                  hashed_password=str(user.password).encode('UTF_8')):
                    payload_data = {'id': user.id, "exp": datetime.utcnow() + timedelta(hours=2)}
                    secret_key = os.getenv("SECRET_KEY")
                    token = jwt.encode(payload=payload_data, key=secret_key, algorithm='HS256')

                    return  {"token":str(token)}, 200
                else:
                    raise NameError("Incorrect password!")
            else:
                raise NameError("User does not exists!")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    # This function gets the user with the provided id and returns a user.
    def get_user(self, id: str):
        user = get_user_by_id(id=id)
        return user

    async def get_all():
        numer_users = await get_all_user()
        return {"number_users":str(numer_users)}, 200