import json
from fastapi import Depends, HTTPException, Form, File, UploadFile
from sqlalchemy.orm import Session
from models.models import Contenido
from services import crud
from controllers.db_dependency import get_db
from models.schemas import ContenidoUpdate

def get_contenidos_controller(db: Session = Depends(get_db)):
    return crud.get_contenidos(db)

def get_contenido_controller(contenido_id: int, db: Session = Depends(get_db)):
    contenido = crud.get_contenido(db, contenido_id)
    if not contenido:
        raise HTTPException(status_code=404, detail="Contenido no encontrado")
    return contenido

def get_contenidosByModulos_controller(submodulo_id: int, db: Session = Depends(get_db)):
    contenido = crud.get_contenido_by_modulo_submodulo(db, submodulo_id)
    if not contenido:
        raise HTTPException(status_code=404, detail="Contenido no encontrado")
    return contenido

def create_contenido_controller(modulo_data: dict, archivo: UploadFile | None, db: Session):
    contenido = crud.create_contenido(db, modulo_data, archivo)
    if not contenido:
        raise HTTPException(status_code=400, detail="Error al crear el Contenido")
    return contenido

def delete_contenido_controller(contenido_id: int, db: Session = Depends(get_db)):
    contenido = crud.delete_contenido(db, contenido_id)
    if not contenido:
        raise HTTPException(status_code=404, detail="Contenido no encontrado")
    return {"detail": "Contenido eliminado"}

def update_contenido_controller(contenido_id: int, contenido_data: ContenidoUpdate, db: Session = Depends(get_db)):
    contenido = crud.update_contenido(db, contenido_id, contenido_data.dict(exclude_unset=True))
    if not contenido:
        raise HTTPException(status_code=404, detail="Contenido no encontrado")
    return contenido
