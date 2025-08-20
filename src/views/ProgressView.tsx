import { ModulesProgress } from "../components/ModulesProgress"
import { SideBar } from "../components/SideBar"

export const ProgressView = () => {
  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="contentArea w-full">
                <h2 className="text-6xl font-bold text-left mt-10 text-[#d9d9d9] p-4 pl-20">PROGRESO</h2>

                <div className="progresoContainer w-full h-3/4 flex flex-col items-center justify-center gap-4">
                  <div className="bg-[#d9d9d9] w-300 h-50 flex items-center justify-center rounded-lg gap-4">
                    <div className="w-70 h-35 border-1 border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
                      <h3 className="text-3xl text-center">5%</h3>
                      <p className="mt-2 text-sm text-center">Total</p>
                    </div>
                    <div className="w-70 h-35 border-1 border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
                      <h3 className="text-3xl text-center">1/8</h3>
                      <p className="mt-2 text-sm text-center">Módulos</p>
                    </div>
                    <div className="w-70 h-35 border-1 border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center">
                      <h3 className="text-3xl text-center">0/8</h3>
                      <p className="mt-2 text-sm text-center">Exámenes</p>
                    </div>
                  </div>
                  
                  <ModulesProgress />
                  
                </div>
                        
            </div>
    </div>
  )
}
