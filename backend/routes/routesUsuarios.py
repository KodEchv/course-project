from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import controllers

from models.schemas import UsuarioCreate, UsuarioUpdate
from controllers.controllers import get_db

routerUsuarios = APIRouter(tags=["Usuarios"], prefix="")

@routerUsuarios.get("/usuarios", summary="Listar usuarios", description="Obtiene una lista de todos los usuarios registrados")
def get_usuarios(db: Session = Depends(get_db)):
    return controllers.get_usuarios_controller(db)

@routerUsuarios.get("/usuarios/{usuario_id}", summary="Obtener usuario", description="Obtiene los datos de un usuario por su ID")
def get_usuario(usuario_id: int, db: Session = Depends(get_db)):
    return controllers.get_usuario_controller(usuario_id, db)

@routerUsuarios.post("/usuarios", summary="Crear usuario", description="Crea un nuevo usuario en el sistema")
def create_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    return controllers.create_usuario_controller(usuario.dict(), db)

@routerUsuarios.delete("/usuarios/{usuario_id}", summary="Eliminar usuario", description="Elimina un usuario por su ID")
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    return controllers.delete_usuario_controller(usuario_id, db)

@routerUsuarios.put("/usuarios/{usuario_id}", summary="Actualizar usuario", description="Actualiza los datos de un usuario")
def update_usuario(usuario_id: int, usuario: UsuarioUpdate, db: Session = Depends(get_db)):
    return controllers.update_usuario_controller(usuario_id, usuario, db)
