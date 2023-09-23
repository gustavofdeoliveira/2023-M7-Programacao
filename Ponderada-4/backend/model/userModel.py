from fastapi import HTTPException
from prisma import Prisma

# This function creates a user with the provided details and returns a user.
async def create_user(name: str, email: str, password: str) -> str:
    
    data = {
        'name': name,
        'email': email,
        'password': password
    }
    # Checking if the user already exists
    try:
        response = get_user_by_email(email=email)
        if response:
            raise Exception(f"User already exists with the email: {email}")
        else:
            prisma = Prisma()
            await prisma.connect()
            prisma.user.create(data=data)
            await prisma.disconnect()
            return f"User: {name}, created successfully"
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

# This function gets all the users in the database and returns a list of users.
async def get_user_by_email(email: str) -> Prisma.user:
    try:
        prisma = Prisma()
        await prisma.connect()
        user = prisma.user.find_unique(where={'email': email})
        await prisma.disconnect()
        if user:
            return user
        raise Exception(f"User does not exists with the email: {email}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# This function gets all the users in the database and returns a list of users.
async def get_user_by_id(id: str) -> dict[str, str]:
    try:
        prisma = Prisma()
        await prisma.connect()
        user = prisma.user.find_unique(where={'id': id})
        await prisma.disconnect()
        if user:
            user.createdAt = user.createdAt.strftime("%d-%m-%Y %H:%M:%S")
            user.updatedAt = user.updatedAt.strftime("%d-%m-%Y %H:%M:%S")
            return user.__dict__
        raise Exception(f"User does not exists with the id: {id}")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
