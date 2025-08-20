import { CircleArrowLeft, CircleArrowRight } from "lucide-react"
import { ModuleCard } from "../components/ModuleCard"
import { SideBar } from "../components/SideBar"
import { Link } from "react-router-dom"

export const ModulesView = () => {
    return (
        <div className="w-full h-screen flex">
            <SideBar />
            <div className="contentArea w-full">
                <h2 className="text-6xl font-bold text-left mt-10 text-[#d9d9d9] p-4 pl-20">MÓDULOS</h2>
                <div className="modulosContainer w-full h-3/4 flex flex-col items-center justify-center">
                    <div className="w-full overflow-x-auto flex justify-center">
                        <div className="grid grid-rows-2 grid-flow-col gap-15 px-4 w-max">
                            <Link to={"/contenido"}>
                                <ModuleCard moduleName="Modulo 1" />
                            </Link>
                            <ModuleCard moduleName="Modulo 1"/>
                            <ModuleCard moduleName="Modulo 1"/>
                            <ModuleCard moduleName="Modulo 1"/>
                            <ModuleCard moduleName="Modulo 1"/>
                            <ModuleCard moduleName="Modulo 1"/>
                            <ModuleCard moduleName="Modulo 1"/>
                            <ModuleCard moduleName="Modulo 1"/>
                        </div>
                    </div>
                </div>
                <div className="arrowContainer w-full h-25 flex items-center justify-between text-[#d9d9d9] px-40 hover:cursor-pointer">
                    <CircleArrowLeft size={60} className="m-3" />
                    <CircleArrowRight size={60} className="m-3" />
                </div>
            </div>
        </div>
    )
}
