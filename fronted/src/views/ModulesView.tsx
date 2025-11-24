import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { ModuleCard } from "../components/ModuleCard"
import { SideBar } from "../components/SideBar"
import { useEffect, useState } from "react"
import { fetchModules } from "../services/modulesService";

type Module = {
    ID_modulo: number;
    Nombre: string;
    url_imagen: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export const ModulesView = () => {
    const [modules, setModules] = useState<Module[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const modulosData: Module[] = await fetchModules();
            console.log(modulosData);
            setModules(modulosData);
        };
        fetchData();
    }, []);
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
                <div className="flex-1 px-8 md:px-35 pb-10">
                    <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full w-full">
                        {modules.length > 0 ? modules.map((module) => (
                            <ModuleCard
                                key={module.ID_modulo}
                                id={module.ID_modulo}
                                imageUrl={`${API_URL}/${module.url_imagen}`}
                                moduleName={module.Nombre}
                            />
                        )) : (
                            <div className="text-white">No hay módulos disponibles....</div>
                        )}
                    </div>
                </div>

                {/* Flechas */}
                {modules.length > 8 && (
                    <div className="h-[10%] w-full flex items-center justify-between text-[#d9d9d9] px-10">
                        <CircleArrowLeft size={40} className="cursor-pointer hover:scale-110 transition" />
                        <CircleArrowRight size={40} className="cursor-pointer hover:scale-110 transition" />
                    </div>
                )}
            </div>
        </div>
    )
}
