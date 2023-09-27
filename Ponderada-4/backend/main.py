import uvicorn
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.userRoutes import user_router
from routes.predictionRoutes import prediction_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="../frontend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(prediction_router, prefix="/prediction", tags=["Prediction"])

app.mount("/js", StaticFiles(directory="../frontend/js"), name="js")
app.mount("/pages", StaticFiles(directory="../frontend/pages"), name="pages")
app.mount("/css", StaticFiles(directory="../frontend/css"), name="css")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    try:
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        print(f"Exceção: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
