import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const Login = () => {

    const [usuarios, setUsuarios] = useState<{ id: number; username?: string; name?: string }[]>([])

    useEffect(() => {
        /* fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsuarios(data)) */

        setUsuarios([{ id: 1, username: "User" }, { id: 2, name: "Admin" }, { id: 3, username: "Guest" }, { id: 4, name: "SuperUser" },
            { id: 5, username: "Moderator" }, { id: 6, name: "Tester" }, { id: 7, username: "Developer" }, { id: 8, name: "Support" },
            { id: 9, username: "Manager" }, { id: 10, name: "Analyst" }
        ])
        console.log(usuarios)
    }, [])
    return (
        <div className="w-80 h-90 border-1 border-[#2e2e2e] rounded-[20px] p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">USUARIOS</h2>
            <div className="flex flex-col gap-2 overflow-y-auto h-64 scrollbar-none">
                {usuarios.length === 0 ? (
                    <div className="text-gray-500 italic">No hay usuarios.</div>
                ) : (
                    usuarios.map((usuario: any) => (
                        <div key={usuario.id} className="flex items-center justify-between rounded px-3 py-2">

                            <Link to="/modulos">
                                <button className="buttonStyle">{usuario.username || usuario.name}</button>
                            </Link>

                            <button className="text-[#2e2e2e] text-bold hover:text-red-500 hover:cursor-pointer transition-colors">
                                <Trash size={20}/>
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-auto flex items-center justify-between rounded px-3 py-4">
                <button className="buttonStyle">
                    Crear Usuario
                </button>
                <Plus size={20} />
            </div>
        </div>
    )
}
