import { useState } from "react"
import { CreateModuleForm } from "./CreateModuleForm"
import { CreateSubmoduleForm } from "./CreateSubmoduleForm"
import { AddContentForm } from "./AddContentForm"

export const AddModuleSection = ({ setIsUpdated }: { setIsUpdated: () => void }) => {
    const [activeTab, setActiveTab] = useState("modulo")

    return (
        <div className="w-full h-full bg-[#D9D9D9] rounded-2xl shadow-lg p-6 flex flex-col">
            {/* Tabs superiores */}
            <div className="flex justify-around mb-6 border-b-2 border-[#0D1B2A]">
                <button
                    onClick={() => setActiveTab("modulo")}
                    className={`pb-2 text-lg font-semibold transition-colors ${activeTab === "modulo"
                            ? "text-[#0D1B2A] border-b-4 border-[#0D1B2A]"
                            : "text-gray-600 hover:text-[#0D1B2A]"
                        }`}
                >
                    Crear Módulo
                </button>
                <button
                    onClick={() => setActiveTab("submodulo")}
                    className={`pb-2 text-lg font-semibold transition-colors ${activeTab === "submodulo"
                            ? "text-[#0D1B2A] border-b-4 border-[#0D1B2A]"
                            : "text-gray-600 hover:text-[#0D1B2A]"
                        }`}
                >
                    Crear Submódulo
                </button>
                <button
                    onClick={() => setActiveTab("contenido")}
                    className={`pb-2 text-lg font-semibold transition-colors ${activeTab === "contenido"
                            ? "text-[#0D1B2A] border-b-4 border-[#0D1B2A]"
                            : "text-gray-600 hover:text-[#0D1B2A]"
                        }`}
                >
                    Agregar Contenido
                </button>
            </div>

            {/* Contenido dinámico */}
            <div className="flex-1 overflow-y-auto">
                {activeTab === "modulo" && <CreateModuleForm setIsUpdated={setIsUpdated} />}
                {activeTab === "submodulo" && <CreateSubmoduleForm setIsUpdated={setIsUpdated} />}
                {activeTab === "contenido" && <AddContentForm setIsUpdated={setIsUpdated} />}
            </div>
        </div>
    )
}
