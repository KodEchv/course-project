from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import AvancePersona
from services.crudAvance import get_avances, get_avance, create_avance, delete_avance, update_avance
from controllers.db_dependency import get_db
from models.schemas import AvancePersonaUpdate
from datetime import datetime

def get_avances_controller(db: Session = Depends(get_db)):
    return get_avances(db)

def get_avance_controller(avance_id: int, db: Session = Depends(get_db)):
    avance = get_avance(db, avance_id)
    if not avance:
        raise HTTPException(status_code=404, detail="Avance no encontrado")
    return avance

def create_avance_controller(avance_data: dict, db: Session = Depends(get_db)):
    # Parsear fechas si son strings ISO
    if avance_data.get('FechaInicio') and isinstance(avance_data['FechaInicio'], str):
        avance_data['FechaInicio'] = datetime.fromisoformat(avance_data['FechaInicio'].replace('Z', '+00:00'))
    if avance_data.get('FechaFin') and isinstance(avance_data['FechaFin'], str):
        avance_data['FechaFin'] = datetime.fromisoformat(avance_data['FechaFin'].replace('Z', '+00:00'))
    
    avance = AvancePersona(**avance_data)
    return create_avance(db, avance)

def delete_avance_controller(avance_id: int, db: Session = Depends(get_db)):
    avance = delete_avance(db, avance_id)
    if not avance:
        raise HTTPException(status_code=404, detail="Avance no encontrado")
    return {"detail": "Avance eliminado"}

def update_avance_controller(avance_id: int, avance_data: AvancePersonaUpdate, db: Session = Depends(get_db)):
    avance = update_avance(db, avance_id, avance_data.dict(exclude_unset=True))
    if not avance:
        raise HTTPException(status_code=404, detail="Avance no encontrado")
    return avance
