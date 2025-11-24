from fastapi import APIRouter, Depends, Form, File, UploadFile
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

@routerContenidos.get("/contenidos/{modulo_id}/{submodulo_id}", summary="Obtener contenido", description="Obtiene los datos de un contenido por su ID")
def get_contenido(modulo_id: int, submodulo_id: int, db: Session = Depends(get_db)):
    return controllers.get_contenidosByModulos_controller(modulo_id, submodulo_id, db)

@routerContenidos.post("/contenidos", summary="Crear contenido", description="Crea un nuevo contenido en el sistema")
async def create_contenido(
    ID_SubModuloPertenece: int = Form(...),
    Tipo: str = Form(...),
    RutaContenido: str = Form(...),
    Posicion: int = Form(...),
    archivo: UploadFile | None = File(None),
    db: Session = Depends(get_db)
):
    return controllers.create_contenido_controller(
        {
            "ID_SubModuloPertenece": ID_SubModuloPertenece,
            "Tipo": Tipo,
            "RutaContenido": RutaContenido,
            "Posicion": Posicion,
        },
        archivo,
        db
    )

@routerContenidos.delete("/contenidos/{contenido_id}", summary="Eliminar contenido", description="Elimina un contenido por su ID")
def delete_contenido(contenido_id: int, db: Session = Depends(get_db)):
    return controllers.delete_contenido_controller(contenido_id, db)

@routerContenidos.put("/contenidos/{contenido_id}", summary="Actualizar contenido", description="Actualiza los datos de un contenido")
def update_contenido(contenido_id: int, contenido: ContenidoUpdate, db: Session = Depends(get_db)):
    return controllers.update_contenido_controller(contenido_id, contenido, db)
