import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes.userRoutes import user_router
from routes.predictionRoutes import prediction_router
from fastapi.staticfiles import StaticFiles
from jinja2 import Environment, FileSystemLoader, select_autoescape
from fastapi.responses import HTMLResponse
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
jinja2_env = Environment(
    loader=FileSystemLoader("../frontend"),
    autoescape=select_autoescape(["html", "xml"])
)

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(prediction_router, prefix="/prediction", tags=["Prediction"])

app.mount("/js", StaticFiles(directory="../frontend/js"), name="js")
app.mount("/css", StaticFiles(directory="../frontend/css"), name="css")
app.mount("/pages", StaticFiles(directory="../frontend/pages"), name="pages")

@app.get("/")
async def home(request: Request):
    template = jinja2_env.get_template("index.html")
    context = {"message": "Hello, FastAPI with Jinja2!"}
    content = template.render(**context)
    return HTMLResponse(content=content)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)
