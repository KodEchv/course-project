from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.models import Contenido, Modulo, SubModulo
import os

def get_contenidos(db: Session):
    return db.query(Contenido).all()

def get_contenido(db: Session, contenido_id: int):
    return db.query(Contenido).filter(Contenido.ID_Contenido == contenido_id).first()

def get_contenido_by_modulo_submodulo(db: Session, modulo_id: int, submodulo_id: int):
    return db.query(Contenido).filter(
        Contenido.ID_Modulo == modulo_id,
        Contenido.ID_Submodulo == submodulo_id
    ).all()

def create_contenido(db: Session, contenido_data: dict, archivo):

    if archivo and not archivo.filename.endswith((".txt", ".png", ".jpg", ".mp4")):
        raise HTTPException(400, "Tipo de archivo no permitido")

    contenido = Contenido(**contenido_data)

    db.add(contenido)
    db.commit()

    db.refresh(contenido)

    # Crear carpeta según ruta del módulo y submódulo
    sub = db.query(SubModulo).filter(SubModulo.ID_SubModulo == contenido.ID_SubModuloPertenece).first()
    mod = db.query(Modulo).filter(Modulo.ID_modulo == sub.ID_ModuloPertenece).first()

    nombre_mod = mod.Nombre.replace(" ", "_")
    nombre_sub = sub.Nombre.replace(" ", "_")

    folder_path = f"public/contenido/contenidos/{nombre_mod}/{nombre_sub}"

    os.makedirs(folder_path, exist_ok=True)

    # Guardar archivo si existe
    if archivo:
        filename = f"{contenido.Tipo}-{mod.ID_modulo}-{sub.ID_SubModulo}-{contenido.ID_Contenido}{os.path.splitext(archivo.filename)[1]}"
        path = f"{folder_path}/{filename}"

        with open(path, "wb") as f:
            f.write(archivo.file.read())

        contenido.RutaContenido = path
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
