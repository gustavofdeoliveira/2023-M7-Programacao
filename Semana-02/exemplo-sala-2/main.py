from typing import Union, Dict

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root() -> Dict:
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None) -> Dict:
    return {"item_id": item_id, "q": q}

