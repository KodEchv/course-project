from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router as api_router
from models.database import init_db

app = FastAPI(title="Course Project API")

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar la base de datos
init_db()

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Bienvenido a la API del curso 🚀"}

