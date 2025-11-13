from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import Modulo
from services import crud
from controllers.db_dependency import get_db
from models.schemas import ModuloUpdate

def get_modulos_controller(db: Session = Depends(get_db)):
    return crud.get_modulos(db)

def get_modulo_controller(modulo_id: int, db: Session = Depends(get_db)):
    modulo = crud.get_modulo(db, modulo_id)
    if not modulo:
        raise HTTPException(status_code=404, detail="Modulo no encontrado")
    return modulo

def create_modulo_controller(modulo_data: dict, imagen, db: Session):
    modulo = crud.create_modulo(db, modulo_data, imagen)
    if not modulo:
        raise HTTPException(status_code=400, detail="Error al crear el Modulo")
    return modulo


def delete_modulo_controller(modulo_id: int, db: Session = Depends(get_db)):
    modulo = crud.delete_modulo(db, modulo_id)
    if not modulo:
        raise HTTPException(status_code=404, detail="Modulo no encontrado")
    return {"detail": "Modulo eliminado"}

def update_modulo_controller(modulo_id: int, modulo_data: ModuloUpdate, db: Session = Depends(get_db)):
    modulo = crud.update_modulo(db, modulo_id, modulo_data.dict(exclude_unset=True))
    if not modulo:
        raise HTTPException(status_code=404, detail="Modulo no encontrado")
    return modulo

def list_modulo_names_controller(db: Session = Depends(get_db)):
    return crud.list_modulo_names(db)
