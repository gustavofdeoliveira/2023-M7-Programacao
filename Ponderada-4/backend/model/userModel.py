from fastapi import HTTPException
from prisma import Prisma

# This function creates a user with the provided details and returns a user.
async def create_user(name: str, email: str, password: str) -> Prisma.user:
    
    data = {
        'name': name,
        'email': email,
        'password': password
    }
    # Checking if the user already exists

    response = await get_user_by_email(email=email)
    if response:
        raise Exception(f"User already exists with the email: {email}")
    else:
        prisma = Prisma()
        await prisma.connect()
        user = await prisma.user.create(data=data)
        await prisma.disconnect()
        user.createdAt = user.createdAt.strftime("%d-%m-%Y %H:%M:%S")
        return user

    

# This function gets all the users in the database and returns a list of users.
async def get_user_by_email(email: str) -> Prisma.user:

    prisma = Prisma()
    await prisma.connect()
    user = await prisma.user.find_first(where={'email': email})
    await prisma.disconnect()

    if not user:
        return None

    return user


# This function gets all the users in the database and returns a list of users.
async def get_user_by_id(id: str) -> dict:
    prisma = Prisma()
    await prisma.connect()
    user = await prisma.user.find_first(where={'id': id})
    await prisma.disconnect()
    if user:
        user.createdAt = user.createdAt.strftime("%d-%m-%Y %H:%M:%S")
        return user.__dict__
    raise Exception(f"User does not exists with the id: {id}")

async def get_all_user():
    prisma = Prisma()
    await prisma.connect()
    users = await prisma.user.find_many()
    await prisma.disconnect()
    if users:
        numer_users = len(users)
        return numer_users
    raise Exception(f"User does not exists with the id: {id}")

