import { Login } from "../components/Login"

export const MainView = () => {
    return (
        <div className="bg-stone-300 w-250 h-120 flex rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center w-full p-6">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                    INTRODUCCIÓN TÉCNICA A LA CIBERSEGURIDAD
                </h1>
            </div>
            <div className="flex items-center justify-center w-full p-4">
                <Login />
            </div>
        </div>
    )
}
