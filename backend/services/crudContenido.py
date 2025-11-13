from sqlalchemy.orm import Session
from models.models import Contenido

def get_contenidos(db: Session):
    return db.query(Contenido).all()

def get_contenido(db: Session, contenido_id: int):
    return db.query(Contenido).filter(Contenido.ID_Contenido == contenido_id).first()

def create_contenido(db: Session, contenido: Contenido):
    db.add(contenido)
    db.commit()
    db.refresh(contenido)
    return contenido

def delete_contenido(db: Session, contenido_id: int):
    contenido = get_contenido(db, contenido_id)
    if contenido:
        db.delete(contenido)
        db.commit()
    return contenido

def update_contenido(db: Session, contenido_id: int, contenido_data: dict):
    contenido = get_contenido(db, contenido_id)
    if contenido:
        for key, value in contenido_data.items():
            setattr(contenido, key, value)
        db.commit()
        db.refresh(contenido)
    return contenido
