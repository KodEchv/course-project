from sqlalchemy.orm import Session
from models.models import AvancePersona

def get_avances(db: Session):
    return db.query(AvancePersona).all()

def get_avance(db: Session, avance_id: int):
    return db.query(AvancePersona).filter(AvancePersona.ID_Avance == avance_id).first()

def create_avance(db: Session, avance: AvancePersona):
    db.add(avance)
    db.commit()
    db.refresh(avance)
    return avance

def delete_avance(db: Session, avance_id: int):
    avance = get_avance(db, avance_id)
    if avance:
        db.delete(avance)
        db.commit()
    return avance

def update_avance(db: Session, avance_id: int, avance_data: dict):
    avance = get_avance(db, avance_id)
    if avance:
        for key, value in avance_data.items():
            setattr(avance, key, value)
        db.commit()
        db.refresh(avance)
    return avance
