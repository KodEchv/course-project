from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import controllers
from models.schemas import ContenidoCreate, ContenidoUpdate
from controllers.controllers import get_db

routerContenidos = APIRouter(tags=["Contenidos"], prefix="")

@routerContenidos.get("/contenidos", summary="Listar contenidos", description="Obtiene una lista de todos los contenidos registrados")
def get_contenidos(db: Session = Depends(get_db)):
    return controllers.get_contenidos_controller(db)

@routerContenidos.get("/contenidos/{contenido_id}", summary="Obtener contenido", description="Obtiene los datos de un contenido por su ID")
def get_contenido(contenido_id: int, db: Session = Depends(get_db)):
    return controllers.get_contenido_controller(contenido_id, db)

@routerContenidos.post("/contenidos", summary="Crear contenido", description="Crea un nuevo contenido en el sistema")
def create_contenido(contenido: ContenidoCreate, db: Session = Depends(get_db)):
    return controllers.create_contenido_controller(contenido.dict(), db)

@routerContenidos.delete("/contenidos/{contenido_id}", summary="Eliminar contenido", description="Elimina un contenido por su ID")
def delete_contenido(contenido_id: int, db: Session = Depends(get_db)):
    return controllers.delete_contenido_controller(contenido_id, db)

@routerContenidos.put("/contenidos/{contenido_id}", summary="Actualizar contenido", description="Actualiza los datos de un contenido")
def update_contenido(contenido_id: int, contenido: ContenidoUpdate, db: Session = Depends(get_db)):
    return controllers.update_contenido_controller(contenido_id, contenido, db)
