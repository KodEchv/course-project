from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from models.models import Persona
from services import crud
from controllers.db_dependency import get_db
from models.schemas import PersonaUpdate

def get_personas_controller(db: Session = Depends(get_db)):
    return crud.get_personas(db)

def get_persona_controller(persona_id: int, db: Session = Depends(get_db)):
    persona = crud.get_persona(db, persona_id)
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return persona

def create_persona_controller(persona_data: dict, db: Session = Depends(get_db)):
    persona = Persona(**persona_data)
    return crud.create_persona(db, persona)

def delete_persona_controller(persona_id: int, db: Session = Depends(get_db)):
    persona = crud.delete_persona(db, persona_id)
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return {"detail": "Persona eliminada"}

def update_persona_controller(persona_id: int, persona_data: PersonaUpdate, db: Session = Depends(get_db)):
    persona = crud.update_persona(db, persona_id, persona_data.dict(exclude_unset=True))
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")
    return persona
