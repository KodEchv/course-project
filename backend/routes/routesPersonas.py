from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import controllers
from models.schemas import PersonaCreate, PersonaUpdate
from controllers.controllers import get_db

routerPersonas = APIRouter(tags=["Personas"], prefix="")

@routerPersonas.get("/personas", summary="Listar personas", description="Obtiene una lista de todas las personas registradas")
def get_personas(db: Session = Depends(get_db)):
    return controllers.get_personas_controller(db)

@routerPersonas.get("/personas/{persona_id}", summary="Obtener persona", description="Obtiene los datos de una persona por su ID")
def get_persona(persona_id: int, db: Session = Depends(get_db)):
    return controllers.get_persona_controller(persona_id, db)

@routerPersonas.post("/personas", summary="Crear persona", description="Crea una nueva persona en el sistema")
def create_persona(persona: PersonaCreate, db: Session = Depends(get_db)):
    return controllers.create_persona_controller(persona.dict(), db)

@routerPersonas.delete("/personas/{persona_id}", summary="Eliminar persona", description="Elimina una persona por su ID")
def delete_persona(persona_id: int, db: Session = Depends(get_db)):
    return controllers.delete_persona_controller(persona_id, db)

@routerPersonas.put("/personas/{persona_id}", summary="Actualizar persona", description="Actualiza los datos de una persona")
def update_persona(persona_id: int, persona: PersonaUpdate, db: Session = Depends(get_db)):
    return controllers.update_persona_controller(persona_id, persona, db)
