import { User } from "lucide-react"
import { Login } from "../components/Login"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainView = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // La contraseña se toma del .env
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleUserClick = () => {
        setShowPassword(true);
        setError("");
        setPassword("");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setShowPassword(false);
            setError("");
            localStorage.setItem("user", JSON.stringify({ ID_Persona: 1, rol: "admin" }));
            navigate("/dashboard");
        } else {
            setError("Contraseña incorrecta");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="absolute top-13 right-7 bg-[#d9d9d9] hover:bg-[#2e2e2e] w-12 h-12 rounded-[50px] flex items-center justify-center">
                <button className="hover:cursor-pointer text-[#2e2e2e] hover:text-white transition-colors" onClick={handleUserClick}>
                    <User size={30} className="m-3" />
                </button>
            </div>

            {showPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <form onSubmit={handlePasswordSubmit} className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 min-w-[300px]">
                        <label className="font-semibold">Contraseña de administrador</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="border rounded px-3 py-2"
                            autoFocus
                        />
                        {error && <span className="text-red-500 text-sm">{error}</span>}
                        <div className="flex gap-2 justify-end">
                            <button type="button" className="px-3 py-1 rounded bg-gray-300" onClick={() => setShowPassword(false)}>Cancelar</button>
                            <button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Entrar</button>
                        </div>
                    </form>
                </div>
            )}

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
