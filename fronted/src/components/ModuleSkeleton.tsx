import { useState } from "react"
import { ChevronUp, ChevronDown, Trash2, ChevronRight } from "lucide-react"
import { ConfirmDeleteModal } from "./ConfirmDeleteModal"

interface Content {
    id: number
    nombre: string
    tipo: string
    posicion: number
}

interface Submodulo {
    id: number
    nombre: string
    descripcion: string
    tipo: string
    posicion: number
    contenidos: Content[]
}

interface Modulo {
    id: number
    nombre: string
    descripcion: string
    posicion: number
    submodulos: Submodulo[]
}

export const ModuleSkeleton = () => {
    const [modulos, setModulos] = useState<Modulo[]>([
        {
            id: 1,
            nombre: "Módulo 1 - Introducción",
            descripcion: "Conceptos básicos",
            posicion: 0,
            submodulos: [
                {
                    id: 11,
                    nombre: "Submódulo 1.1 - Bienvenida",
                    descripcion: "Introducción al curso",
                    tipo: "contenido",
                    posicion: 0,
                    contenidos: [
                        { id: 111, nombre: "Título inicial", tipo: "titulo", posicion: 0 },
                        { id: 112, nombre: "Video introductorio", tipo: "video", posicion: 1 },
                    ],
                },
            ],
        },
        {
            id: 2,
            nombre: "Módulo 2 - Desarrollo",
            descripcion: "Temas intermedios",
            posicion: 1,
            submodulos: [
                {
                    id: 21,
                    nombre: "Submódulo 2.1 - Parte teórica",
                    descripcion: "Conceptos clave",
                    tipo: "contenido",
                    posicion: 0,
                    contenidos: [
                        { id: 211, nombre: "Texto teórico", tipo: "texto", posicion: 0 },
                    ],
                },
                {
                    id: 22,
                    nombre: "Submódulo 2.2 - Parte práctica",
                    descripcion: "Ejercicios de práctica",
                    tipo: "contenido",
                    posicion: 1,
                    contenidos: [
                        { id: 221, nombre: "Ejercicio 1", tipo: "imagen", posicion: 0 },
                    ],
                },
            ],
        },
        {
            id: 3,
            nombre: "Módulo 3 - Evaluación",
            descripcion: "Exámenes finales",
            posicion: 2,
            submodulos: [
                {
                    id: 31,
                    nombre: "Submódulo 3.1 - Examen final",
                    descripcion: "Evaluación general",
                    tipo: "examen",
                    posicion: 0,
                    contenidos: [
                        { id: 311, nombre: "Examen PDF", tipo: "documento", posicion: 0 },
                    ],
                },
            ],
        },
        {
            id: 3,
            nombre: "Módulo 3 - Evaluación",
            descripcion: "Exámenes finales",
            posicion: 2,
            submodulos: [
                {
                    id: 31,
                    nombre: "Submódulo 3.1 - Examen final",
                    descripcion: "Evaluación general",
                    tipo: "examen",
                    posicion: 0,
                    contenidos: [
                        { id: 311, nombre: "Examen PDF", tipo: "documento", posicion: 0 },
                    ],
                },
            ],
        },
    ])

    // Estado para controlar qué acordeones están abiertos
    const [openModules, setOpenModules] = useState<number[]>([])
    const [openSubmodules, setOpenSubmodules] = useState<number[]>([])

    const toggleModule = (id: number) => {
        setOpenModules((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        )
    }

    const toggleSubmodule = (id: number) => {
        setOpenSubmodules((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        )
    }

    // Estado del modal
    const [showModal, setShowModal] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState<{ tipo: string; id: number } | null>(null)

    // Mover posiciones
    const handleMove = (tipo: string, parentId: number | null, id: number, direction: "up" | "down") => {
        setModulos((prev) => {
            const updated = [...prev]

            const moveItem = <T extends { id: number; posicion: number }>(
                arr: T[],
                id: number,
                dir: "up" | "down"
            ) => {
                const idx = arr.findIndex((item) => item.id === id)
                if (idx === -1) return arr
                const newIdx = dir === "up" ? idx - 1 : idx + 1
                if (newIdx < 0 || newIdx >= arr.length) return arr
                const newArr = [...arr]
                const temp = newArr[idx]
                newArr[idx] = newArr[newIdx]
                newArr[newIdx] = temp
                return newArr.map((item, i) => ({ ...item, posicion: i }))
            }

            if (tipo === "modulo") return moveItem(updated, id, direction)

            return updated.map((mod) => {
                if (tipo === "submodulo" && mod.id === parentId) {
                    mod.submodulos = moveItem(mod.submodulos, id, direction)
                }
                if (tipo === "contenido") {
                    mod.submodulos = mod.submodulos.map((sub) => {
                        if (sub.id === parentId) {
                            sub.contenidos = moveItem(sub.contenidos, id, direction)
                        }
                        return sub
                    })
                }
                return mod
            })
        })
    }

    // Modal
    const openDeleteModal = (tipo: string, id: number) => {
        setDeleteTarget({ tipo, id })
        setShowModal(true)
    }

    const handleDelete = () => {
        if (!deleteTarget) return
        const { tipo, id } = deleteTarget

        setModulos((prev) => {
            let updated = [...prev]
            if (tipo === "modulo") {
                updated = updated.filter((m) => m.id !== id)
            } else if (tipo === "submodulo") {
                updated = updated.map((m) => ({
                    ...m,
                    submodulos: m.submodulos.filter((s) => s.id !== id),
                }))
            } else if (tipo === "contenido") {
                updated = updated.map((m) => ({
                    ...m,
                    submodulos: m.submodulos.map((s) => ({
                        ...s,
                        contenidos: s.contenidos.filter((c) => c.id !== id),
                    })),
                }))
            }
            return updated
        })
        setShowModal(false)
        setDeleteTarget(null)
    }

    return (
        <div className="bg-[#D9D9D9] rounded-2xl shadow-lg p-6 text-[#0D1B2A] overflow-y-auto w-full">
            <h3 className="text-2xl font-bold mb-4">Estructura de Módulos</h3>

            <div className="space-y-3 overflow-y-auto max-h-[70vh] rounded-md p-2">
                {modulos
                    .sort((a, b) => a.posicion - b.posicion)
                    .map((mod, modIdx) => (
                        <div key={mod.id} className="bg-white rounded-lg p-3 shadow">
                            {/* Encabezado del módulo */}
                            <div
                                className="cursor-pointer flex justify-between items-center font-semibold select-none"
                                onClick={() => toggleModule(mod.id)}
                            >
                                <div className="flex items-center gap-2">
                                    <ChevronRight
                                        className={`transition-transform ${openModules.includes(mod.id) ? "rotate-90" : ""
                                            }`}
                                    />
                                    <span>
                                        {modIdx + 1}. {mod.nombre}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <ChevronUp
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleMove("modulo", null, mod.id, "up")
                                        }}
                                    />
                                    <ChevronDown
                                        className="cursor-pointer hover:text-blue-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleMove("modulo", null, mod.id, "down")
                                        }}
                                    />
                                    <Trash2
                                        className="cursor-pointer hover:text-red-600"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            openDeleteModal("modulo", mod.id)
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Submódulos */}
                            {openModules.includes(mod.id) && (
                                <div className="ml-6 mt-3 space-y-2">
                                    {mod.submodulos
                                        .sort((a, b) => a.posicion - b.posicion)
                                        .map((sub, subIdx) => (
                                            <div
                                                key={sub.id}
                                                className="bg-gray-100 p-2 rounded-lg"
                                            >
                                                <div
                                                    className="cursor-pointer flex justify-between items-center select-none"
                                                    onClick={() => toggleSubmodule(sub.id)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <ChevronRight
                                                            className={`transition-transform ${openSubmodules.includes(sub.id)
                                                                ? "rotate-90"
                                                                : ""
                                                                }`}
                                                        />
                                                        <span>
                                                            {modIdx + 1}.{subIdx + 1} {sub.nombre}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <ChevronUp
                                                            className="cursor-pointer hover:text-blue-600"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleMove("submodulo", mod.id, sub.id, "up")
                                                            }}
                                                        />
                                                        <ChevronDown
                                                            className="cursor-pointer hover:text-blue-600"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleMove("submodulo", mod.id, sub.id, "down")
                                                            }}
                                                        />
                                                        <Trash2
                                                            className="cursor-pointer hover:text-red-600"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                openDeleteModal("submodulo", sub.id)
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Contenidos */}
                                                {openSubmodules.includes(sub.id) && (
                                                    <div className="ml-6 mt-2 space-y-1">
                                                        {sub.contenidos
                                                            .sort((a, b) => a.posicion - b.posicion)
                                                            .map((cont, contIdx) => (
                                                                <div
                                                                    key={cont.id}
                                                                    className="flex justify-between items-center bg-gray-200 px-3 py-1 rounded"
                                                                >
                                                                    <span>
                                                                        {modIdx + 1}.{subIdx + 1}.{contIdx + 1}{" "}
                                                                        {cont.nombre} ({cont.tipo})
                                                                    </span>
                                                                    <div className="flex gap-2">
                                                                        <ChevronUp
                                                                            className="cursor-pointer hover:text-blue-600"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleMove("contenido", sub.id, cont.id, "up")
                                                                            }}
                                                                        />
                                                                        <ChevronDown
                                                                            className="cursor-pointer hover:text-blue-600"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                handleMove("contenido", sub.id, cont.id, "down")
                                                                            }}
                                                                        />
                                                                        <Trash2
                                                                            className="cursor-pointer hover:text-red-600"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                openDeleteModal("contenido", cont.id)
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

            {/* Modal */}
            <ConfirmDeleteModal
                isOpen={showModal}
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />
        </div>
    )
}
