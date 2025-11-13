from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.models import SubModulo
import os

def get_submodulos(db: Session):
    return db.query(SubModulo).all()

def get_submodulo(db: Session, submodulo_id: int):
    return db.query(SubModulo).filter(SubModulo.ID_SubModulo == submodulo_id).first()

def create_submodulo(db: Session, submodulo_data: dict):

    submodulo = SubModulo(**submodulo_data)
    existe = db.query(SubModulo).filter(
        SubModulo.Nombre == submodulo.Nombre,
        SubModulo.ID_ModuloPertenece == submodulo.ID_ModuloPertenece
    ).first()
    existe_pos = db.query(SubModulo).filter(
        SubModulo.Posicion == submodulo.Posicion,
        SubModulo.ID_ModuloPertenece == submodulo.ID_ModuloPertenece
    ).first()

    if existe or existe_pos:
        return None

    db.add(submodulo)
    db.commit()
    db.refresh(submodulo)


    nombre = submodulo.Nombre.replace(" ", "_")
    path = f"public/contenido/submodulos/{nombre}-IDM{submodulo.ID_SubModulo}"

    if os.path.exists(path):
        return None
    else:
        os.makedirs(path, exist_ok=True)

    return submodulo

def delete_submodulo(db: Session, submodulo_id: int):
    submodulo = get_submodulo(db, submodulo_id)
    if submodulo:
        db.delete(submodulo)
        db.commit()
    return submodulo

def update_submodulo(db: Session, submodulo_id: int, submodulo_data: dict):
    submodulo = get_submodulo(db, submodulo_id)
    if submodulo:
        for key, value in submodulo_data.items():
            setattr(submodulo, key, value)
        db.commit()
        db.refresh(submodulo)
    return submodulo

def list_submodulo_names(db: Session, modulo_id: int):
    submodulos = db.query(SubModulo).filter(SubModulo.ID_ModuloPertenece == modulo_id).all()
    subModulosObjet = {}
    for submodulo in submodulos:
        subModulosObjet[submodulo.ID_SubModulo] = submodulo.Nombre
    return subModulosObjet
