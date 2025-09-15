import { User } from "lucide-react"
import { Login } from "../components/Login"

export const MainView = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="absolute top-13 right-7 bg-[#d9d9d9] hover:bg-[#2e2e2e] w-12 h-12 rounded-[50px] flex items-center justify-center">
                <button className="hover:cursor-pointer text-[#2e2e2e] hover:text-white transition-colors">
                    <User size={30} className="m-3" />
                </button>
            </div>

            <div className="bg-[#D9D9D9] w-260 h-120 flex rounded-[50px] shadow-lg instrument-sans">
                <div className="flex items-center justify-center w-full p-6">
                    <h1 className="text-[42px] text-[#2e2e2e] p-8">
                        INTRODUCCIÓN TÉCNICA A LA CIBERSEGURIDAD
                    </h1>
                </div>
                <div className="flex items-center justify-center w-full p-4">
                    <Login />
                </div>
            </div>

        </div>
    )
}
