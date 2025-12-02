from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router as api_router
from models.database import init_db
from pathlib import Path
from fastapi.staticfiles import StaticFiles


app = FastAPI(title="Course Project API")

# Configuración de CORS (DEBE ir PRIMERO, antes de otros middlewares y mounts)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar la carpeta public para servir archivos estáticos
BASE_DIR = Path(__file__).resolve().parent
app.mount("/public", StaticFiles(directory=str(BASE_DIR / "public")), name="public")

# Montar /contenido para que http://localhost:8000/contenido/... sirva public/contenido/...
app.mount("/contenido", StaticFiles(directory=str(BASE_DIR / "public" / "contenido")), name="contenido")

# Inicializar la base de datos
init_db()

app.include_router(api_router)

@app.get("/")
def root():
    return {"message": "Bienvenido a la API del curso 🚀"}

