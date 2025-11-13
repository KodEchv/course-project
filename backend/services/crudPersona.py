from sqlalchemy.orm import Session
from models.models import Persona

def get_personas(db: Session):
    return db.query(Persona).all()

def get_persona(db: Session, persona_id: int):
    return db.query(Persona).filter(Persona.ID_Persona == persona_id).first()

def create_persona(db: Session, persona: Persona):
    db.add(persona)
    db.commit()
    db.refresh(persona)
    return persona

def delete_persona(db: Session, persona_id: int):
    persona = get_persona(db, persona_id)
    if persona:
        db.delete(persona)
        db.commit()
    return persona

def update_persona(db: Session, persona_id: int, persona_data: dict):
    persona = get_persona(db, persona_id)
    if persona:
        for key, value in persona_data.items():
            setattr(persona, key, value)
        db.commit()
        db.refresh(persona)
    return persona
