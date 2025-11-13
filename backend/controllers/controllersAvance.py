from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import AvancePersona
from services import crud
from controllers.db_dependency import get_db
from models.schemas import AvancePersonaUpdate

def get_avances_controller(db: Session = Depends(get_db)):
    return crud.get_avances(db)

def get_avance_controller(avance_id: int, db: Session = Depends(get_db)):
    avance = crud.get_avance(db, avance_id)
    if not avance:
        raise HTTPException(status_code=404, detail="Avance no encontrado")
    return avance

def create_avance_controller(avance_data: dict, db: Session = Depends(get_db)):
    avance = AvancePersona(**avance_data)
    return crud.create_avance(db, avance)

def delete_avance_controller(avance_id: int, db: Session = Depends(get_db)):
    avance = crud.delete_avance(db, avance_id)
    if not avance:
        raise HTTPException(status_code=404, detail="Avance no encontrado")
    return {"detail": "Avance eliminado"}

def update_avance_controller(avance_id: int, avance_data: AvancePersonaUpdate, db: Session = Depends(get_db)):
    avance = crud.update_avance(db, avance_id, avance_data.dict(exclude_unset=True))
    if not avance:
        raise HTTPException(status_code=404, detail="Avance no encontrado")
    return avance
