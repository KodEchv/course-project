from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import controllers
from models.schemas import AvancePersonaCreate, AvancePersonaUpdate
from controllers.controllers import get_db

routerAvances = APIRouter(tags=["Avances"], prefix="")

@routerAvances.get("/avances", summary="Listar avances", description="Obtiene una lista de todos los avances registrados")
def get_avances(db: Session = Depends(get_db)):
    return controllers.get_avances_controller(db)

@routerAvances.get("/avances/{avance_id}", summary="Obtener avance", description="Obtiene los datos de un avance por su ID")
def get_avance(avance_id: int, db: Session = Depends(get_db)):
    return controllers.get_avance_controller(avance_id, db)

@routerAvances.post("/avances", summary="Crear avance", description="Crea un nuevo avance en el sistema")
def create_avance(avance: AvancePersonaCreate, db: Session = Depends(get_db)):
    return controllers.create_avance_controller(avance.dict(), db)

@routerAvances.delete("/avances/{avance_id}", summary="Eliminar avance", description="Elimina un avance por su ID")
def delete_avance(avance_id: int, db: Session = Depends(get_db)):
    return controllers.delete_avance_controller(avance_id, db)

@routerAvances.put("/avances/{avance_id}", summary="Actualizar avance", description="Actualiza los datos de un avance")
def update_avance(avance_id: int, avance: AvancePersonaUpdate, db: Session = Depends(get_db)):
    return controllers.update_avance_controller(avance_id, avance, db)
