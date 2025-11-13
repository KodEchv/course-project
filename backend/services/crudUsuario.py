from sqlalchemy.orm import Session
from models.models import Usuario, Persona

def get_usuarios(db: Session):
    return db.query(Usuario).all()

def get_usuario(db: Session, usuario_id: int):
    return db.query(Usuario).filter(Usuario.ID_Usuario == usuario_id).first()

def create_usuario(db: Session, usuario: Usuario):
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

def delete_usuario(db: Session, usuario_id: int):
    usuario = get_usuario(db, usuario_id)
    if usuario:
        db.delete(usuario)
        db.commit()
    return usuario

def update_usuario(db: Session, usuario_id: int, usuario_data: dict):
    usuario = get_usuario(db, usuario_id)
    if usuario:
        for key, value in usuario_data.items():
            setattr(usuario, key, value)
        db.commit()
        db.refresh(usuario)
    return usuario

def get_usuarios_with_persona(db: Session):
    usuarios = db.query(Usuario).all()
    result = []
    for usuario in usuarios:
        persona = db.query(Persona).filter(Persona.ID_Persona == usuario.ID_Persona).first()
        result.append({
            "ID_Usuario": usuario.ID_Usuario,
            "rol": usuario.rol,
            "ID_Persona": usuario.ID_Persona,
            "nombre_persona": persona.Nombres if persona else None
        })
    return result
