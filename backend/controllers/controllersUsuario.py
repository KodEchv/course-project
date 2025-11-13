from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import Usuario
from services import crud
from controllers.db_dependency import get_db
from models.schemas import UsuarioUpdate

def get_usuarios_controller(db: Session = Depends(get_db)):
    return crud.get_usuarios_with_persona(db)

def get_usuario_controller(usuario_id: int, db: Session = Depends(get_db)):
    usuario = crud.get_usuario(db, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario

def create_usuario_controller(usuario_data: dict, db: Session = Depends(get_db)):
    usuario = Usuario(**usuario_data)
    return crud.create_usuario(db, usuario)

def delete_usuario_controller(usuario_id: int, db: Session = Depends(get_db)):
    usuario = crud.delete_usuario(db, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"detail": "Usuario eliminado"}

def update_usuario_controller(usuario_id: int, usuario_data: UsuarioUpdate, db: Session = Depends(get_db)):
    usuario = crud.update_usuario(db, usuario_id, usuario_data.dict(exclude_unset=True))
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario
