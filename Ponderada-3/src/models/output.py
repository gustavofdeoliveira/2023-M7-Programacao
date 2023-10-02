from pydantic import BaseModel  # Import BaseModel from pydantic for defining input/output models

class OutputModel(BaseModel):
    prediction: float