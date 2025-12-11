
import { Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsers, createPersona, createUsuario, deleteUser } from '../services/userService';
import { Link } from "react-router-dom";
import { UserForm } from "./UserForm";

export const Login = () => {
    const [usuarios, setUsuarios] = useState<{ id: number; name: string; rol: string }[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getUsers()
            .then(data => {
                // Mapear los campos recibidos a los usados en el componente
                const mapped = data.map((u: any) => ({
                    id: u.ID_Usuario,
                    id_persona: u.ID_Persona,
                    name: u.nombre_persona,
                    rol: u.rol
                }));
                setUsuarios(mapped);
            })
            .catch(() => setUsuarios([]));
    }, [success]);

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const handleDeleteClick = (id: string) => {
        setPendingDeleteId(id);
        setShowPasswordModal(true);
        setPasswordInput('');
    }

    const confirmDelete = () => {
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        
        if (passwordInput !== adminPassword) {
            alert('Contraseña incorrecta');
            setPasswordInput('');
            return;
        }
        
        if (pendingDeleteId) {
            deleteUser(pendingDeleteId)
                .then(() => {
                    setSuccess('Usuario eliminado correctamente');
                    setShowPasswordModal(false);
                    setPendingDeleteId(null);
                    setPasswordInput('');
                })
                .catch(() => {
                    alert('Error al eliminar el usuario');
                    setShowPasswordModal(false);
                    setPendingDeleteId(null);
                    setPasswordInput('');
                });
        }
    }

    const handleDeleteUser = (id: string) => {
        handleDeleteClick(id);
    }

    // El formulario ahora está en UserForm

    return (
        <div className="w-80 h-90 border-1 border-[#2e2e2e] rounded-[20px] p-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">USUARIOS</h2>
            <div className="flex flex-col gap-2 overflow-y-auto h-64 scrollbar-none">
                {usuarios.length === 0 ? (
                    <div className="text-gray-500 italic">No hay usuarios.</div>
                ) : (
                    usuarios.map((usuario: any) => (
                        (usuario.rol != "admin" && <div key={usuario.id} className="flex items-center justify-between rounded px-3 py-2">
                            <Link to="/modulos">
                                <button
                                    className="buttonStyle px-3 overflow-hidden"
                                    style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        display: 'block'
                                    }}
                                    onClick={() => localStorage.setItem('user', JSON.stringify({ ID_Persona: usuario.id_persona, rol: usuario.rol }))}
                                    title={usuario.name}
                                >
                                    {usuario.name}
                                </button>
                            </Link>
                            <button className="text-[#2e2e2e] text-bold hover:text-red-500 hover:cursor-pointer transition-colors" onClick={() => handleDeleteUser(usuario.id)}>
                                <Trash size={20}/>
                            </button>
                        </div>)
                    ))
                )}
            </div>
            <div className="mt-auto flex items-center justify-between rounded px-3 py-4">
                <button className="buttonStyle" onClick={() => setShowForm(true)}>
                    Crear Usuario
                </button>
                <Plus size={20} />
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#0D1B2A] bg-opacity-40 z-50">
                    <UserForm
                        onSuccess={() => { setShowForm(false); setSuccess('Usuario creado correctamente'); }}
                        onCancel={() => setShowForm(false)}
                        createPersona={createPersona}
                        createUsuario={createUsuario}
                    />
                </div>
            )}
            {showPasswordModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#0D1B2A] bg-opacity-40 z-50">
                    <div className="bg-[#D9D9D9] p-6 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[300px] border border-gray-200">
                        <h3 className="font-bold text-lg">Confirmar eliminación</h3>
                        <p className="text-sm">Ingresa la contraseña de admin para eliminar este usuario:</p>
                        <input 
                            type="password"
                            placeholder="Contraseña"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && confirmDelete()}
                            className="border border-[#2e2e2e] rounded-xl px-3 py-2"
                            autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                            <button 
                                type="button" 
                                className="px-3 py-1 rounded-xl bg-gray-300"
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPasswordInput('');
                                    setPendingDeleteId(null);
                                }}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="button" 
                                className="px-3 py-1 rounded-xl bg-red-600 text-white"
                                onClick={confirmDelete}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
