import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { ModuleCard } from "../components/ModuleCard"
import { SideBar } from "../components/SideBar"
import { Link } from "react-router-dom"

export const ModulesView = () => {
    return (
        <div className="flex h-screen w-screen bg-[#0D1B2A] overflow-hidden">
            {/* Sidebar fijo */}
            <SideBar />

            {/* Área de contenido */}
            <div className="flex flex-col flex-1">
                {/* Título */}
                <div className="h-[10%] flex items-center p-4 md:pl-20">
                    <h2 className="text-4xl font-bold text-[#d9d9d9]">
                        MÓDULOS
                    </h2>
                </div>

                {/* Grid central (2 filas × 4 columnas) */}
                <div className="flex-1 px-8 md:px-20 pb-8">
                    <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full w-full">
                        <Link to={"/contenido"}>
                            <ModuleCard moduleName="Modulo 1" />
                        </Link>
                        <ModuleCard moduleName="Modulo 2" />
                        <ModuleCard moduleName="Modulo 3" />
                        <ModuleCard moduleName="Modulo 4" />
                        <ModuleCard moduleName="Modulo 5" />
                        <ModuleCard moduleName="Modulo 6" />
                        <ModuleCard moduleName="Modulo 7" />
                        <ModuleCard moduleName="Modulo 8" />
                    </div>
                </div>

                {/* Flechas */}
                <div className="h-[10%] w-full flex items-center justify-between text-[#d9d9d9] px-10">
                    <CircleArrowLeft size={40} className="cursor-pointer hover:scale-110 transition" />
                    <CircleArrowRight size={40} className="cursor-pointer hover:scale-110 transition" />
                </div>
            </div>
        </div>
    )
}
