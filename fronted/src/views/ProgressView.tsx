import { ModulesProgress } from "../components/ModulesProgress"
import { SideBar } from "../components/SideBar"

export const ProgressView = () => {
  return (
    <div className="w-screen h-screen flex bg-[#0D1B2A] overflow-hidden">
      {/* Sidebar fijo */}
      <SideBar />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 p-6">
        {/* Título */}
        <div className="h-[10%] flex items-center p-4 md:pl-20">
          <h2 className="text-4xl font-bold text-[#d9d9d9]">
            PROGRESO
          </h2>
        </div>

        {/* Resumen */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          {/* Card */}
          <div className="w-40 h-32 bg-[#d9d9d9] border border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold">25%</h3>
            <p className="mt-2 text-sm">Total</p>
          </div>

          <div className="w-40 h-32 bg-[#d9d9d9] border border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold">1/8</h3>
            <p className="mt-2 text-sm">Módulos</p>
          </div>

          <div className="w-40 h-32 bg-[#d9d9d9] border border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-3xl font-bold">1/8</h3>
            <p className="mt-2 text-sm">Exámenes</p>
          </div>
        </div>

        {/* Lista de módulos */}
        <div className="flex-1 flex justify-center">
          <ModulesProgress />
        </div>
      </div>
    </div>
  )
}
