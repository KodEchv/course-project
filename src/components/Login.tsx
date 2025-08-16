import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"

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
        <div className="w-80 h-90 border-1 border-black rounded-lg p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">USUARIOS</h2>
            <div className="flex flex-col gap-2 overflow-y-auto h-64 scrollbar-none">
                {usuarios.length === 0 ? (
                    <div className="text-gray-500 italic">No hay usuarios.</div>
                ) : (
                    usuarios.map((usuario: any) => (
                        <div key={usuario.id} className="flex items-center justify-between rounded px-3 py-2">
                            <span>{usuario.username || usuario.name}</span>
                            <button className="text-red-500 hover:text-red-700">
                                <Trash size={20} />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className="mt-auto">
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start">
                    Crear Usuario
                    <Plus size={20} />
                </button>
            </div>
        </div>
    )
}
