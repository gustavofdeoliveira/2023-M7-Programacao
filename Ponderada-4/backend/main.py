# Import necessary modules and libraries
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes.userRoutes import user_router
from routes.predictionRoutes import prediction_router
from jinja2 import Environment, FileSystemLoader, select_autoescape

# Create a FastAPI instance
app = FastAPI()

# Add Cross-Origin Resource Sharing (CORS) middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # You can specify allowed origins here
    allow_credentials=True,         # Allow credentials to be sent with requests
    allow_methods=["*"],            # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allow all headers in requests
)

# Include user and prediction routers with specified prefixes and tags
app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(prediction_router, prefix="/prediction", tags=["Prediction"])

# Start the FastAPI application using Uvicorn if this script is executed
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
