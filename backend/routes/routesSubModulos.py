from fastapi import APIRouter, Depends, Form
from sqlalchemy.orm import Session
from controllers import controllers
from models.schemas import SubModuloCreate, SubModuloUpdate
from controllers.controllers import get_db

routerSubModulos = APIRouter(tags=["SubModulos"], prefix="")

@routerSubModulos.get("/submodulos", summary="Listar submódulos", description="Obtiene una lista de todos los submódulos registrados")
def get_submodulos(db: Session = Depends(get_db)):
    return controllers.get_submodulos_controller(db)

@routerSubModulos.get("/submodulos/list-names/{modulo_id}", summary="Listar nombres de submódulos", description="Obtiene una lista de nombres de todos los submódulos registrados")
def get_list_submodulo_name(modulo_id: int, db:Session = Depends(get_db)):
    return controllers.list_submodulo_names_controller(modulo_id, db)

@routerSubModulos.get("/submodulos/{submodulo_id}", summary="Obtener submódulo", description="Obtiene los datos de un submódulo por su ID")
def get_submodulo(submodulo_id: int, db: Session = Depends(get_db)):
    return controllers.get_submodulo_controller(submodulo_id, db)

@routerSubModulos.post("/submodulos", summary="Crear submódulo", description="Crea un nuevo submódulo en el sistema")
async def create_submodulo(
    ID_ModuloPertenece: int = Form(...),
    Nombre: str = Form(...),
    Descripcion: str = Form(...),
    Tipo: str = Form(...),
    Posicion: int = Form(...),
    db: Session = Depends(get_db)
):
    return controllers.create_submodulo_controller(
        {
            "ID_ModuloPertenece": ID_ModuloPertenece,
            "Nombre" : Nombre,
            "Descripcion" : Descripcion,
            "Tipo" : Tipo,
            "Posicion" : Posicion
        },
        db
    )

@routerSubModulos.delete("/submodulos/{submodulo_id}", summary="Eliminar submódulo", description="Elimina un submódulo por su ID")
def delete_submodulo(submodulo_id: int, db: Session = Depends(get_db)):
    return controllers.delete_submodulo_controller(submodulo_id, db)

@routerSubModulos.put("/submodulos/{submodulo_id}", summary="Actualizar submódulo", description="Actualiza los datos de un submódulo")
def update_submodulo(submodulo_id: int, submodulo: SubModuloUpdate, db: Session = Depends(get_db)):
    return controllers.update_submodulo_controller(submodulo_id, submodulo, db)
