from fastapi import APIRouter, Depends, Form, File, UploadFile
from sqlalchemy.orm import Session
from controllers import controllers
from models.schemas import ModuloCreate, ModuloUpdate
from controllers.controllers import get_db

routerModulos = APIRouter(tags=["Modulos"], prefix="")

@routerModulos.get("/modulos", summary="Listar módulos", description="Obtiene una lista de todos los módulos registrados")
def get_modulos(db: Session = Depends(get_db)):
    return controllers.get_modulos_controller(db)

@routerModulos.get("/modulos/list-names", summary="Listar nombres de módulos", description="Obtiene una lista de nombres de todos los módulos registrados")
def list_modulo_names(db: Session = Depends(get_db)):
    return controllers.list_modulo_names_controller(db)

@routerModulos.get("/modulos/{modulo_id}", summary="Obtener módulo", description="Obtiene los datos de un módulo por su ID")
def get_modulo(modulo_id: int, db: Session = Depends(get_db)):
    return controllers.get_modulo_controller(modulo_id, db)

@routerModulos.post("/modulos", summary="Crear módulo", description="Crea un nuevo módulo en el sistema")
async def create_modulo(
    nombre: str = Form(...),
    descripcion: str = Form(...),
    posicion: int = Form(...),
    imagen: UploadFile | None = File(None),
    db: Session = Depends(get_db)
):
    return controllers.create_modulo_controller(
        {
            "Nombre": nombre,
            "Descripcion": descripcion,
            "Posicion": posicion,
        },
        imagen,
        db
    )

@routerModulos.delete("/modulos/{modulo_id}", summary="Eliminar módulo", description="Elimina un módulo por su ID")
def delete_modulo(modulo_id: int, db: Session = Depends(get_db)):
    return controllers.delete_modulo_controller(modulo_id, db)

@routerModulos.put("/modulos/{modulo_id}", summary="Actualizar módulo", description="Actualiza los datos de un módulo")
def update_modulo(modulo_id: int, modulo: ModuloUpdate, db: Session = Depends(get_db)):
    return controllers.update_modulo_controller(modulo_id, modulo, db)



