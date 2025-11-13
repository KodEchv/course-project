import { useEffect, useState } from "react";
import { getUsers, getPersonaById } from "../services/userService";
import { ModulesProgress } from "../components/ModulesProgress";
import { SideBar } from "../components/SideBar";
import PersonaInfo from "../components/PersonaInfo";

// Helper para mapear usuario de la API a estructura común
function mapApiUser(u: any) {
    return {
        id: u.ID_Usuario,
        name: u.nombre_persona,
        rol: u.rol,
        ID_Persona: u.ID_Persona
    };
}

const StudentsListView = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Adaptar los datos recibidos para que tengan las propiedades esperadas
    useEffect(() => {
        getUsers().then(data => {
            setUsers(data.map(mapApiUser));
            setLoading(false);
        });
    }, []);

    // Para el select/input combinados
    const [inputValue, setInputValue] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Filtrar usuarios por búsqueda (input o selección), omitiendo admin (id 1)
    const filteredUsers = users.filter(u =>
        u.id !== 1 && u.name?.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Info del usuario seleccionado
    const [persona, setPersona] = useState<any | null>(null);
    const [personaLoading, setPersonaLoading] = useState(false);
    useEffect(() => {
        if (selectedUser) {
            setPersonaLoading(true);
            getPersonaById(selectedUser.ID_Persona)
                .then(data => setPersona(data))
                .finally(() => setPersonaLoading(false));
        } else {
            setPersona(null);
        }
    }, [selectedUser]);

    return (
        <div className="h-screen w-screen bg-[#0D1B2A] flex overflow-hidden instrument-sans">
            <SideBar />
            <div className="flex-1 flex flex-col items-center w-full h-full p-4 md:p-8 overflow-y-auto">
                <div className="bg-[#d9d9d9] rounded-[40px] shadow-lg w-full max-w-5xl h-full flex flex-col items-center p-4 md:p-8 overflow-y-auto">
                    {/* Mini nav: select/input combinados */}
                    <div className="w-full max-w-3xl mb-6 flex flex-col md:flex-row gap-4 items-center justify-between relative">
                        <h1 className="text-2xl font-bold text-[#2e2e2e] bg-[#d9d9d9] rounded-lg px-4 py-2 shadow">Listado de Estudiantes</h1>
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Buscar o seleccionar estudiante..."
                                value={inputValue}
                                onChange={e => {
                                    setInputValue(e.target.value);
                                    setDropdownOpen(true);
                                }}
                                onFocus={() => setDropdownOpen(true)}
                                className="px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow w-full"
                            />
                            {dropdownOpen && filteredUsers.length > 0 && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                                    {filteredUsers.map(u => (
                                        <li
                                            key={u.id}
                                            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedUser?.id === u.id ? 'bg-blue-200' : ''}`}
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setInputValue(u.name);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            {u.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {/* Progreso del usuario seleccionado */}
                    {selectedUser ? (
                        <div className="w-full max-w-4xl flex flex-col gap-8 items-center">
                            {/* Info usuario */}
                            <div className="relative w-full max-w-2xl">

                                <PersonaInfo persona={persona} loading={personaLoading} />

                            </div>
                            <div className="w-full max-w-4xl">
                                <ModulesProgress userId={selectedUser.id} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-3xl text-center text-[#2e2e2e] mt-10">
                            <p>Selecciona un estudiante para ver su progreso.</p>
                            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                {loading ? (
                                    <span className="text-[#2e2e2e]">Cargando usuarios...</span>
                                ) : filteredUsers.length === 0 ? (
                                    <span className="text-[#2e2e2e]">No se encontraron usuarios.</span>
                                ) : (
                                    filteredUsers.map(u => (
                                        <button
                                            key={u.id}
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setInputValue(u.name);
                                            }}
                                            className={`px-4 py-2 rounded-lg shadow bg-white text-[#2e2e2e] font-semibold hover:bg-blue-200 transition-colors ${selectedUser?.id === u.id ? 'ring-2 ring-blue-500' : ''}`}
                                        >
                                            {u.name}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentsListView;
