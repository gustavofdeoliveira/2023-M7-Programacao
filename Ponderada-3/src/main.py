# Import necessary libraries
import pandas as pd  # Import Pandas library for data handling
from pycaret.regression import load_model, \
    predict_model  # Import functions from pycaret for model loading and prediction
from fastapi import FastAPI  # Import FastAPI library for creating the web API
import uvicorn  # Import uvicorn for running the web application
from models.input import InputModel  # Import the input Pydantic model
from models.output import OutputModel  # Import the output Pydantic model

# Create the FastAPI app instance
app = FastAPI()

# Load a pre-trained machine learning model (saved as "main")
model = load_model("main")

# Define a function for making predictions based on input data
@app.post("/predict", response_model=OutputModel)
def predict(data: InputModel):
    # Convert input data to a Pandas DataFrame
    data = pd.DataFrame([data.dict()])

    # Use the loaded model to make predictions on the input data
    predictions = predict_model(model, data=data)

    # Return the prediction as a response
    return {"prediction": predictions["prediction_label"].iloc[0]}


# Run the FastAPI application using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
