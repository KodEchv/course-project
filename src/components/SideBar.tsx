import { BookOpen, CircleDashed, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
    return (
        <div className="navSidebar min-w-40 max-h-full bg-[#d9d9d9] flex flex-col items-center">
            <div className="mt-10 mb-6 group relative flex flex-col items-center">
                <Link to="/estudiante">
                    <User size={60} className="m-3" />
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Perfil
                    </span>
                </Link>
            </div>
            <div className="flex flex-col items-center gap-4 flex-1 py-60">
                <Link to="/modulos" className="group relative flex flex-col items-center">
                    <BookOpen size={55} className="m-3" />
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Módulos
                    </span>
                </Link>
                <Link to="/progreso" className="group relative flex flex-col items-center">
                    <CircleDashed size={55} className="m-3" />
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        Progreso
                    </span>
                </Link>
            </div>
        </div>
    )
}
