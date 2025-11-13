from sqlalchemy.orm import Session
from models.models import Modulo
import os

def get_modulos(db: Session):
    return db.query(Modulo).all()

def get_modulo(db: Session, modulo_id: int):
    return db.query(Modulo).filter(Modulo.ID_modulo == modulo_id).first()

def create_modulo(db: Session, modulo_data: dict, imagen):
    
    modulo = Modulo(**modulo_data)
    existe = db.query(Modulo).filter(Modulo.Nombre == modulo.Nombre).first()
    existe_pos = db.query(Modulo).filter(Modulo.Posicion == modulo.Posicion).first()

    if existe or existe_pos: 
        return None

    db.add(modulo)
    db.commit()
    db.refresh(modulo)

    # Crear carpeta
    nombre = modulo.Nombre.replace(" ", "_")
    path = f"public/contenido/modulos/{nombre}"

    if os.path.exists(path):
        return None
    else:
        os.makedirs(path, exist_ok=True)

    # Guardar imagen si se envía
    if imagen:
        image_path = f"{path}/{imagen.filename}"
        with open(image_path, "wb") as f:
            f.write(imagen.file.read())

        # Guardar ruta en la BD
        modulo.url_imagen = image_path
        db.commit()
        db.refresh(modulo)
    

    return modulo

def delete_modulo(db: Session, modulo_id: int):
    modulo = get_modulo(db, modulo_id)
    if modulo:
        db.delete(modulo)
        db.commit()
    return modulo

def update_modulo(db: Session, modulo_id: int, modulo_data: dict):
    modulo = get_modulo(db, modulo_id)
    if modulo:
        for key, value in modulo_data.items():
            setattr(modulo, key, value)
        db.commit()
        db.refresh(modulo)
    return modulo

def list_modulo_names(db: Session):
    modulos = db.query(Modulo).all()
    modulosObject = {}
    for modulo in modulos:
        modulosObject[modulo.ID_modulo] = modulo.Nombre
    return modulosObject