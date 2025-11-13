from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import SubModulo
from services import crud
from controllers.db_dependency import get_db
from models.schemas import SubModuloUpdate

def get_submodulos_controller(db: Session = Depends(get_db)):
    return crud.get_submodulos(db)

def list_submodulo_names_controller(modulo_id: int, db: Session = Depends(get_db)):
    return crud.list_submodulo_names(db, modulo_id)

def get_submodulo_controller(submodulo_id: int, db: Session = Depends(get_db)):
    submodulo = crud.get_submodulo(db, submodulo_id)
    if not submodulo:
        raise HTTPException(status_code=404, detail="SubModulo no encontrado")
    return submodulo

def create_submodulo_controller(submodulo_data: dict, db: Session):
    submodulo = crud.create_submodulo(db, submodulo_data)
    if not submodulo:
        raise HTTPException(status_code=400, detail="Error al crear el submodulo")
    return submodulo

def delete_submodulo_controller(submodulo_id: int, db: Session = Depends(get_db)):
    submodulo = crud.delete_submodulo(db, submodulo_id)
    if not submodulo:
        raise HTTPException(status_code=404, detail="SubModulo no encontrado")
    return {"detail": "SubModulo eliminado"}

def update_submodulo_controller(submodulo_id: int, submodulo_data: SubModuloUpdate, db: Session = Depends(get_db)):
    submodulo = crud.update_submodulo(db, submodulo_id, submodulo_data.dict(exclude_unset=True))
    if not submodulo:
        raise HTTPException(status_code=404, detail="SubModulo no encontrado")
    return submodulo
