import { BookOpen, CircleDashed, SquareX, User, Users, BarChart2, Settings } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

export const SideBar = () => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setRole(user.rol || user.role || null);
            } catch {
                setRole(null);
            }
        } else {
            setRole(null);
        }
    }, []);

    return (
    <div className="navSidebar min-w-40 max-h-full bg-[#d9d9d9] flex flex-col items-center">
        <div className="mt-10 mb-40 group relative flex flex-col items-center">
            <Link to="/estudiante">
                <User size={60} className="m-3" />
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Perfil
                </span>
            </Link>
        </div>
        <div className="flex flex-col items-center gap-4 flex-1">
            {role === 'admin' ? (
                <>
                    <Link to="/dashboard" className="group relative flex flex-col items-center">
                        <BarChart2 size={55} className="m-3" />
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Dashboard
                        </span>
                    </Link>
                    <Link to="/listado-estudiantes" className="group relative flex flex-col items-center">
                        <Users size={55} className="m-3" />
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Estudiantes
                        </span>
                    </Link>
                    <Link to="/configuracion" className="group relative flex flex-col items-center">
                        <Settings size={55} className="m-3" />
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Configuración
                        </span>
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/modulos" className="group relative flex flex-col items-center">
                        <BookOpen size={55} className="m-3" />
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Módulos
                        </span>
                    </Link>
                    <Link to="/progreso" className="group relative flex flex-col items-center">
                        <CircleDashed size={55} />
                        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            Progreso

                            </span>
                        </Link>
                    </>
                )}
            </div>
            <div className="group relative flex flex-col items-center mb-10">
                <Link to="/">
                    <SquareX size={60} onClick={() => {
                        localStorage.removeItem("user");
                        <Navigate to="/" replace />;
                    }} />
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Cerrar sesión
                    </span>
                </Link>
            </div>
        </div>
    )
}


