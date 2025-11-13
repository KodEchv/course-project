from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Enum
from sqlalchemy.orm import relationship, declarative_base
import enum

Base = declarative_base()

class RolEnum(enum.Enum):
    admin = "admin"
    user = "user"

class EstadoAvanceEnum(enum.Enum):
    EnProceso = "EnProceso"
    Completado = "Completado"
    Bloqueado = "Bloqueado"

class Usuario(Base):
    __tablename__ = 'usuarios'
    ID_Usuario = Column(Integer, primary_key=True, index=True)
    rol = Column(String, nullable=False)
    ID_Persona = Column(Integer, ForeignKey('personas.ID_Persona'))
    persona = relationship("Persona", back_populates="usuario")

class Persona(Base):
    __tablename__ = 'personas'
    ID_Persona = Column(Integer, primary_key=True, index=True)
    Nombres = Column(String, nullable=False)
    Cedula = Column(String, nullable=False, unique=True)
    Correo = Column(String, nullable=False, unique=True)
    Telefono = Column(String, nullable=True)
    usuario = relationship("Usuario", back_populates="persona", uselist=False)

class Modulo(Base):
    __tablename__ = 'modulos'
    ID_modulo = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String, nullable=False)
    Descripcion = Column(String, nullable=True)
    url_imagen = Column(String, nullable=True)
    Posicion = Column(Integer, nullable=True)
    submodulos = relationship("SubModulo", back_populates="modulo")

class SubModulo(Base):
    __tablename__ = 'submodulos'
    ID_SubModulo = Column(Integer, primary_key=True, index=True)
    ID_ModuloPertenece = Column(Integer, ForeignKey('modulos.ID_modulo'))
    Nombre = Column(String, nullable=False)
    Descripcion = Column(String, nullable=True)
    Tipo = Column(String, nullable=False)  # Examen-Contenido
    Posicion = Column(Integer, nullable=True)
    modulo = relationship("Modulo", back_populates="submodulos")
    contenidos = relationship("Contenido", back_populates="submodulo")

class Contenido(Base):
    __tablename__ = 'contenidos'
    ID_Contenido = Column(Integer, primary_key=True, index=True)
    ID_SubModuloPertenece = Column(Integer, ForeignKey('submodulos.ID_SubModulo'))
    Tipo = Column(String, nullable=False)  # Texto-imagen-video-titulo
    RutaContenido = Column(String, nullable=True)
    Posicion = Column(Integer, nullable=True)
    submodulo = relationship("SubModulo", back_populates="contenidos")

class AvancePersona(Base):
    __tablename__ = 'avance_persona'
    ID_Avance = Column(Integer, primary_key=True, index=True)
    ID_User = Column(Integer, ForeignKey('usuarios.ID_Usuario'))
    ID_Modulo = Column(Integer, ForeignKey('modulos.ID_modulo'))
    ID_SubModulo = Column(Integer, ForeignKey('submodulos.ID_SubModulo'), nullable=True)
    Estado = Column(String, nullable=False)  # EnProceso, Completado, Bloqueado, etc.
    FechaInicio = Column(DateTime, nullable=True)
    FechaFin = Column(DateTime, nullable=True)
    PorcentajeAvance = Column(Float, nullable=True)
