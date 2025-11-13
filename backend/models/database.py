from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.models import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
    # Crear usuario admin por defecto si no existe
    from models.models import Usuario, Persona
    db = SessionLocal()
    try:
        admin_persona = db.query(Persona).filter_by(Cedula="0000000000").first()
        if not admin_persona:
            admin_persona = Persona(
                Nombres="Administrador",
                Cedula="0000000000",
                Correo="admin@admin.com",
                Telefono="0000000000"
            )
            db.add(admin_persona)
            db.commit()
            db.refresh(admin_persona)
        admin_user = db.query(Usuario).filter_by(rol="admin", ID_Persona=admin_persona.ID_Persona).first()
        if not admin_user:
            admin_user = Usuario(
                rol="admin",
                ID_Persona=admin_persona.ID_Persona
            )
            db.add(admin_user)
            db.commit()
    finally:
        db.close()
