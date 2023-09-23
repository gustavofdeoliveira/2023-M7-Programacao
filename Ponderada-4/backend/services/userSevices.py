from datetime import datetime, timedelta
import bcrypt
from fastapi import HTTPException
import jwt
from model.userModel import create_user, get_user_by_email, get_user_by_id

# Class User
class User:
    # Constructor
    def __init__(self, name: str, email: str, password: str):
        self.name = name
        self.email = email
        self.password = password

    # This function registers a user with the provided details and returns a user.
    def register(self) -> str:
        try:
            password = str(self.password)
            password = password.encode('UTF_8')
            password_crypt = bcrypt.hashpw(password, bcrypt.gensalt(10))
            password_crypt = password_crypt.decode("utf-8")

            create_user(name=self.name, email=self.email, password=password_crypt)

            return f"User: {self.name}, created successfully"
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    def login(self) -> tuple[str, str]:
        try:
            user = get_user_by_email(email=self.email)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        if bcrypt.checkpw(password=str(self.password).encode('UTF_8'),
                          hashed_password=str(user.password).encode('UTF_8')):
            payload_data = {'id': user.id, "exp": datetime.utcnow() + timedelta(hours=2)}
            token = jwt.encode(payload=payload_data, key='secret')

            return f"Thank you for login!", token

        raise NameError("Incorrect password!")
    
    # This function gets the user with the provided id and returns a user.
    def get_user(self, id: str) -> dict[str, str]:
        user = get_user_by_id(id=id)
        return user