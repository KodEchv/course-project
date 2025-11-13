import { AddModuleSection } from "../components/AddModuleSection"
import { ModuleSkeleton } from "../components/ModuleSkeleton"
import { SideBar } from "../components/SideBar"

export const ConfigurationView = () => {
    return (
        <div className="flex h-screen w-screen bg-[#0D1B2A] overflow-hidden">
            <SideBar />

            {/* Área de contenido */}
            <div className="flex flex-col flex-1">
                {/* Título */}
                <div className="h-[10%] flex items-center p-4 md:pl-20">
                    <h2 className="text-4xl font-bold text-[#d9d9d9]">
                        CONFIGURACIÓN
                    </h2>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 px-8 md:px-20 pb-10">
                    {/* Contenedor de dos columnas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        {/* Columna izquierda - Agregar módulo */}
                        <div className="bg-[#D9D9D9] rounded-2xl shadow-lg flex items-center justify-center text-[#0D1B2A] font-semibold text-xl">
                            <AddModuleSection />
                        </div>

                        {/* Columna derecha - Esqueleto de módulos */}
                        <div className=" rounded-2xl shadow-lg flex justify-center text-[#0D1B2A] font-semibold text-xl">
                            <ModuleSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
