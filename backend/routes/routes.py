
from fastapi import APIRouter
from .routesPersonas import routerPersonas
from .routesUsuarios import routerUsuarios
from .routesAvances import routerAvances
from .routesModulos import routerModulos
from .routesSubModulos import routerSubModulos
from .routesContenidos import routerContenidos

router = APIRouter()
router.include_router(routerUsuarios)
router.include_router(routerPersonas)
router.include_router(routerAvances)
router.include_router(routerModulos)
router.include_router(routerSubModulos)
router.include_router(routerContenidos)
