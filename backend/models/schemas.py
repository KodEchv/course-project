from pydantic import BaseModel

class UsuarioCreate(BaseModel):
    rol: str
    ID_Persona: int

class PersonaCreate(BaseModel):
    Nombres: str
    Cedula: str
    Correo: str
    Telefono: str | None = None

class ModuloCreate(BaseModel):
    Nombre: str
    Descripcion: str | None = None
    url_imagen: str | None = None
    Posicion: int | None = None

class SubModuloCreate(BaseModel):
    ID_ModuloPertenece: int
    Nombre: str
    Descripcion: str | None = None
    Tipo: str
    Posicion: int | None = None

class ContenidoCreate(BaseModel):
    ID_SubModuloPertenece: int
    Tipo: str
    RutaContenido: str | None = None
    Posicion: int | None = None

class AvancePersonaCreate(BaseModel):
    ID_User: int
    ID_Modulo: int
    ID_SubModulo: int | None = None
    Estado: str
    FechaInicio: str | None = None
    FechaFin: str | None = None
    PorcentajeAvance: float | None = None

class UsuarioUpdate(BaseModel):
    rol: str | None = None
    ID_Persona: int | None = None

class PersonaUpdate(BaseModel):
    Nombres: str | None = None
    Cedula: str | None = None
    Correo: str | None = None
    Telefono: str | None = None

class ModuloUpdate(BaseModel):
    Nombre: str | None = None
    Descripcion: str | None = None
    url_imagen: str | None = None
    Posicion: int | None = None

class SubModuloUpdate(BaseModel):
    ID_ModuloPertenece: int | None = None
    Nombre: str | None = None
    Descripcion: str | None = None
    Tipo: str | None = None
    Posicion: int | None = None

class ContenidoUpdate(BaseModel):
    ID_SubModuloPertenece: int | None = None
    Tipo: str | None = None
    RutaContenido: str | None = None
    Posicion: int | None = None

class AvancePersonaUpdate(BaseModel):
    ID_User: int | None = None
    ID_Modulo: int | None = None
    ID_SubModulo: int | None = None
    Estado: str | None = None
    FechaInicio: str | None = None
    FechaFin: str | None = None
    PorcentajeAvance: float | None = None
