import { useEffect, useState } from "react"
import { ChevronUp, ChevronDown, Trash2, ChevronRight } from "lucide-react"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"
import { getApiUrl } from "../config/api"

interface Content {
    ID_Contenido: number
    ID_SubModuloPertenece: number
    Nombre: string
    RutaContenido: string
    Tipo: string
    Posicion: number
}

interface Submodulo {
    ID_ModuloPertenece: number
    ID_SubModulo: number
    Nombre: string
    Descripcion: string
    Tipo: string
    Posicion: number
    contenidos: Content[]
}

interface Modulo {
    ID_modulo: number
    Nombre: string
    Descripcion: string
    Posicion: number
    submodulos: Submodulo[]
}

const API_URL = getApiUrl();

export const ModuleSkeleton = ({isUpdated}: {isUpdated: boolean}) => {
    const [modulos, setModulos] = useState<Modulo[]>([])

    // Función para refrescar los datos
    const fetchData = async () => {
        try {
            const modulosData: Modulo[] = await fetch(`${API_URL}/modulos`).then(res => res.json())
            const subModulosData: Submodulo[] = await fetch(`${API_URL}/submodulos`).then(res => res.json())
            const contenidosData: Content[] = await fetch(`${API_URL}/contenidos`).then(res => res.json())

            // Construir estructura correctamente
            const estructura = modulosData.map(mod => ({
                ...mod,
                submodulos: subModulosData
                    .filter(sub => sub.ID_ModuloPertenece === mod.ID_modulo)
                    .map(sub => ({
                        ...sub,
                        contenidos: contenidosData.filter(
                            cont => cont.ID_SubModuloPertenece === sub.ID_SubModulo
                        )
                    }))
            }))

            console.log(estructura)
            setModulos(estructura)
        } catch (error) {
            console.error("Error al cargar datos:", error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [isUpdated])

    const [openModules, setOpenModules] = useState<number[]>([])
    const [openSubmodules, setOpenSubmodules] = useState<number[]>([])

    const toggleModule = (id: number) => {
        setOpenModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        )
    }

    const toggleSubmodule = (id: number) => {
        setOpenSubmodules(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    // Modal
    const [showModal, setShowModal] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<{ tipo: string; id: number } | null>(null)

    const openDeleteModal = (tipo: string, id: number) => {
        setDeleteTarget({ tipo, id })
        setShowModal(true)
    }

    const handleDelete = async () => {
        if (!deleteTarget) return
        const { tipo, id } = deleteTarget

        try {
            // Llamar al backend para eliminar
            let endpoint = "";
            if (tipo === "modulo") {
                endpoint = `/modulos/${id}`;
            } else if (tipo === "submodulo") {
                endpoint = `/submodulos/${id}`;
            } else if (tipo === "contenido") {
                endpoint = `/contenidos/${id}`;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Si el backend respondió bien, refrescar los datos
                await fetchData();
            } else {
                alert(`Error al eliminar ${tipo}`);
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert(`Error al eliminar ${tipo}`);
        }

        setShowModal(false)
        setDeleteTarget(null)
    }

    // Reordenamiento
    const handleMove = async (
        tipo: "modulo" | "submodulo" | "contenido",
        parentId: number | null,
        id: number,
        direction: "up" | "down"
    ) => {
        // Primero, calcular la nueva posición SIN actualizar el estado
        let newPosicion = 0;
        let found = false;

        // Función auxiliar para encontrar la nueva posición
        const findNewPosition = () => {
            if (tipo === "modulo") {
                const sortedModulos = [...modulos].sort((a, b) => a.Posicion - b.Posicion);
                const itemIdx = sortedModulos.findIndex(m => m.ID_modulo === id);
                if (itemIdx === -1) return;
                const newIdx = direction === "up" ? itemIdx - 1 : itemIdx + 1;
                if (newIdx >= 0 && newIdx < sortedModulos.length) {
                    newPosicion = newIdx;
                    found = true;
                }
            } else if (tipo === "submodulo") {
                const modul = modulos.find(m => m.ID_modulo === parentId);
                if (!modul) return;
                const sortedSubs = [...modul.submodulos].sort((a, b) => a.Posicion - b.Posicion);
                const itemIdx = sortedSubs.findIndex(s => s.ID_SubModulo === id);
                if (itemIdx === -1) return;
                const newIdx = direction === "up" ? itemIdx - 1 : itemIdx + 1;
                if (newIdx >= 0 && newIdx < sortedSubs.length) {
                    newPosicion = newIdx;
                    found = true;
                }
            } else if (tipo === "contenido") {
                for (const mod of modulos) {
                    for (const sub of mod.submodulos) {
                        if (sub.ID_SubModulo === parentId) {
                            const sortedCons = [...sub.contenidos].sort((a, b) => a.Posicion - b.Posicion);
                            const itemIdx = sortedCons.findIndex(c => c.ID_Contenido === id);
                            if (itemIdx === -1) return;
                            const newIdx = direction === "up" ? itemIdx - 1 : itemIdx + 1;
                            if (newIdx >= 0 && newIdx < sortedCons.length) {
                                newPosicion = newIdx;
                                found = true;
                            }
                            return;
                        }
                    }
                }
            }
        };

        findNewPosition();

        if (!found) return;

        // Ahora actualizar el estado localmente
        setModulos(prev => {
            const updated = [...prev];

            const moveItem = <T extends { Posicion: number; [key: string]: any }>(
                arr: T[],
                id: number,
                dir: "up" | "down"
            ): T[] => {
                const itemIdx = arr.findIndex(item =>
                    (item as any).ID_Modulo === id ||
                    (item as any).ID_SubModulo === id ||
                    (item as any).ID_Contenido === id
                );

                if (itemIdx === -1) return arr;

                const newIdx = dir === "up" ? itemIdx - 1 : itemIdx + 1;
                if (newIdx < 0 || newIdx >= arr.length) return arr;

                const newArr = [...arr];
                [newArr[itemIdx], newArr[newIdx]] = [newArr[newIdx], newArr[itemIdx]];

                return newArr.map((item, i) => ({
                    ...item,
                    Posicion: i
                }));
            };

            // Modulos
            if (tipo === "modulo") {
                updated.sort((a, b) => a.Posicion - b.Posicion);
                return moveItem(updated, id, direction);
            }

            // Submodulos o Contenidos
            return updated.map(mod => {
                if (tipo === "submodulo" && mod.ID_modulo === parentId) {
                    mod.submodulos.sort((a, b) => a.Posicion - b.Posicion);
                    mod.submodulos = moveItem(mod.submodulos, id, direction);
                }

                if (tipo === "contenido") {
                    mod.submodulos = mod.submodulos.map(sub => {
                        if (sub.ID_SubModulo === parentId) {
                            sub.contenidos.sort((a, b) => a.Posicion - b.Posicion);
                            sub.contenidos = moveItem(sub.contenidos, id, direction);
                        }
                        return sub;
                    });
                }

                return mod;
            });
        });

        // Llamar al backend para actualizar la posición
        try {
            let endpoint = "";
            if (tipo === "modulo") {
                endpoint = `/modulos/${id}`;
            } else if (tipo === "submodulo") {
                endpoint = `/submodulos/${id}`;
            } else if (tipo === "contenido") {
                endpoint = `/contenidos/${id}`;
            }

            console.log(`Updating ${tipo} ${id} with position ${newPosicion}`);

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Posicion: newPosicion }),
            });

            if (!response.ok) {
                console.error(`Error al actualizar posición en backend: ${response.status}`);
                const errorText = await response.text();
                console.error("Error details:", errorText);
            } else {
                console.log("Posición actualizada exitosamente");
                // Refrescar los datos después de actualizar
                await fetchData();
            }
        } catch (error) {
            console.error("Error al mover item:", error);
        }
    }

    return (
        <div className="bg-[#D9D9D9] rounded-2xl shadow-lg p-6 text-[#0D1B2A] overflow-y-auto w-full">
            <h3 className="text-2xl font-bold mb-4">Estructura de Módulos</h3>

            <div className="space-y-3 overflow-y-auto max-h-[70vh] rounded-md p-2">
                {modulos
                    .sort((a, b) => a.Posicion - b.Posicion)
                    .map((mod, modIdx) => (
                        <div key={mod.ID_modulo} className="bg-white rounded-lg p-3 shadow">
                            
                            {/* Encabezado módulo */}
                            <div
                                className="cursor-pointer flex justify-between items-center font-semibold select-none"
                                onClick={() => toggleModule(mod.ID_modulo)}
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronRight
                                        className={`transition-transform ${
                                            openModules.includes(mod.ID_modulo) ? "rotate-90" : ""
                                        }`}
                                    />
                                    <span>
                                        {modIdx + 1}. {mod.Nombre}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <ChevronUp
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={e => {
                                            e.stopPropagation()
                                            handleMove("modulo", null, mod.ID_modulo, "up")
                                        }}
                                    />
                                    <ChevronDown
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={e => {
                                            e.stopPropagation()
                                            handleMove("modulo", null, mod.ID_modulo, "down")
                                        }}
                                    />
                                    <Trash2
                                        className="cursor-pointer hover:text-red-600"
                                        onClick={e => {
                                            e.stopPropagation()
                                            openDeleteModal("modulo", mod.ID_modulo)
                                        }}
                                    />
                                </div>
                            </div>

                            {/* SUBMODULOS */}
                            {openModules.includes(mod.ID_modulo) && (
                                <div className="ml-6 mt-3 space-y-2">
                                    {mod.submodulos
                                        .sort((a, b) => a.Posicion - b.Posicion)
                                        .map((sub, subIdx) => (
                                            <div key={sub.ID_SubModulo} className="bg-gray-100 p-2 rounded-lg">
                                                
                                                <div
                                                    className="cursor-pointer flex justify-between items-center select-none"
                                                    onClick={() => toggleSubmodule(sub.ID_SubModulo)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <ChevronRight
                                                            className={`transition-transform ${
                                                                openSubmodules.includes(sub.ID_SubModulo)
                                                                    ? "rotate-90"
                                                                    : ""
                                                            }`}
                                                        />
                                                        <span>
                                                            {modIdx + 1}.{subIdx + 1} {sub.Nombre}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <ChevronUp
                                                            className="cursor-pointer hover:text-blue-600"
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                handleMove(
                                                                    "submodulo",
                                                                    mod.ID_modulo,
                                                                    sub.ID_SubModulo,
                                                                    "up"
                                                                )
                                                            }}
                                                        />
                                                        <ChevronDown
                                                            className="cursor-pointer hover:text-blue-600"
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                handleMove(
                                                                    "submodulo",
                                                                    mod.ID_modulo,
                                                                    sub.ID_SubModulo,
                                                                    "down"
                                                                )
                                                            }}
                                                        />
                                                        <Trash2
                                                            className="cursor-pointer hover:text-red-600"
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                openDeleteModal("submodulo", sub.ID_SubModulo)
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* CONTENIDOS */}
                                                {openSubmodules.includes(sub.ID_SubModulo) && (
                                                    <div className="ml-6 mt-2 space-y-1">
                                                        {sub.contenidos
                                                            .sort((a, b) => a.Posicion - b.Posicion)
                                                            .map((cont, contIdx) => (
                                                                <div
                                                                    key={cont.ID_Contenido}
                                                                    className="flex justify-between items-center bg-gray-200 px-3 py-1 rounded"
                                                                >
                                                                    <span>
                                                                        {modIdx + 1}.{subIdx + 1}.{contIdx + 1}{" "}
                                                                        {cont.Nombre} ({cont.Tipo})
                                                                    </span>

                                                                    <div className="flex gap-2">
                                                                        <ChevronUp
                                                                            className="cursor-pointer hover:text-blue-600"
                                                                            onClick={e => {
                                                                                e.stopPropagation()
                                                                                handleMove(
                                                                                    "contenido",
                                                                                    sub.ID_SubModulo,
                                                                                    cont.ID_Contenido,
                                                                                    "up"
                                                                                )
                                                                            }}
                                                                        />
                                                                        <ChevronDown
                                                                            className="cursor-pointer hover:text-blue-600"
                                                                            onClick={e => {
                                                                                e.stopPropagation()
                                                                                handleMove(
                                                                                    "contenido",
                                                                                    sub.ID_SubModulo,
                                                                                    cont.ID_Contenido,
                                                                                    "down"
                                                                                )
                                                                            }}
                                                                        />
                                                                        <Trash2
                                                                            className="cursor-pointer hover:text-red-600"
                                                                            onClick={e => {
                                                                                e.stopPropagation()
                                                                                openDeleteModal("contenido", cont.ID_Contenido)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>

            <ConfirmDeleteModal
                isOpen={showModal}
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />
        </div>
    )
}
