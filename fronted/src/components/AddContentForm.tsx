import { useEffect, useState } from "react"
import { moduleListService, submoduleListService } from "../services/listService"
import { getApiUrl } from "../config/api"

const API_URL = getApiUrl();

export const AddContentForm = ({ setIsUpdated }: { setIsUpdated: () => void }) => {

    const [modulos, setModulos] = useState<{ [key: number]: string }>({})
    const [submodulos, setSubmodulos] = useState<{ [key: number]: string }>({})
    const [ocupiedPositions, setOcupiedPositions] = useState<number[]>([])
    const [error, setError] = useState<string>("")

    const [formData, setFormData] = useState({
        modulo: "",
        submodulo: "",
        tipo: "texto",
        contenido: "",
        archivo: null as File | null,
        posicion: "",
    })

    useEffect(() => {
        const fetchModulos = async () => {
            const modulosList = await moduleListService()
            setModulos(modulosList)
        }
        fetchModulos()
    }, [])

    useEffect(() => {
        const fetchSubmodulos = async () => {
            if (formData.modulo) {
                const submodulosList = await submoduleListService(Number(formData.modulo))
                setSubmodulos(submodulosList)
            } else {
                setSubmodulos({})
            }
        }
        fetchSubmodulos()
    }, [formData.modulo])

    // Cargar posiciones ocupadas cuando cambia el submodulo seleccionado
    useEffect(() => {
        const fetchOcupiedPositions = async () => {
            if (!formData.submodulo) {
                setOcupiedPositions([]);
                return;
            }
            try {
                const res = await fetch(`${API_URL}/contenidos`);
                if (res.ok) {
                    const contenidos = await res.json();
                    const positions = contenidos
                        .filter((c: any) => c.ID_SubModuloPertenece === Number(formData.submodulo))
                        .map((c: any) => c.Posicion);
                    setOcupiedPositions(positions);
                }
            } catch (error) {
                console.error("Error cargando posiciones:", error);
            }
        };
        fetchOcupiedPositions();
    }, [formData.submodulo])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Validar posición en tiempo real
        if (name === "posicion") {
            const pos = Number(value);
            if (ocupiedPositions.includes(pos)) {
                setError(`La posición ${pos} ya está ocupada en este submódulo`);
            } else {
                setError("");
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData({ ...formData, archivo: file })
    }

    const resetForm = () => {
        setFormData({
            modulo: "",
            submodulo: "",
            tipo: "texto",
            contenido: "",
            archivo: null,
            posicion: "",
        })
        setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const pos = Number(formData.posicion);
        if (ocupiedPositions.includes(pos)) {
            alert(`La posición ${pos} ya está ocupada en este submódulo. Por favor elige otra.`);
            return;
        }

        const contenidoData = {
            Tipo: formData.tipo,
            RutaContenido: "",
            Posicion: pos,
            ID_SubModuloPertenece: Number(formData.submodulo),
        }

        const form = new FormData()

        form.append("ID_SubModuloPertenece", String(contenidoData.ID_SubModuloPertenece))
        form.append("Tipo", contenidoData.Tipo)
        form.append("RutaContenido", contenidoData.RutaContenido)
        form.append("Posicion", String(contenidoData.Posicion))

        // 🔥 Si es texto o título → generar archivo .txt automáticamente
        if (formData.tipo === "texto" || formData.tipo === "titulo") {
            const blob = new Blob([formData.contenido], { type: "text/plain" })
            const file = new File([blob], "contenido.txt", { type: "text/plain" })
            form.append("archivo", file)
        } else if (formData.archivo) {
            // video o imagen
            form.append("archivo", formData.archivo)
        }

        try {
            const response = await fetch(`${API_URL}/contenidos`, {
                method: "POST",
                body: form
            })

            const data = await response.json()
            console.log("Servidor respondió:", data)

            setIsUpdated()
            resetForm()

        } catch (error) {
            console.error("Error enviando contenido:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <label className="flex flex-col">
                <span className="font-semibold py-2">Módulo</span>
                <select
                    name="modulo"
                    value={formData.modulo}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                >
                    <option value="" disabled>Selecciona un módulo</option>
                    {Object.entries(modulos).map(([id, nombre]) => (
                        <option key={id} value={id}>{nombre}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col">
                <span className="font-semibold py-2">Submódulo</span>
                <select
                    name="submodulo"
                    value={formData.submodulo}
                    onChange={handleChange}
                    disabled={formData.modulo === ""}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                >
                    <option value="" disabled>Selecciona un submódulo</option>
                    {Object.entries(submodulos).map(([id, nombre]) => (
                        <option key={id} value={id}>{nombre}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col">
                <span className="font-semibold py-2">Tipo de contenido</span>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                >
                    <option value="video">Video</option>
                    <option value="imagen">Imagen</option>
                    <option value="texto">Texto</option>
                    <option value="titulo">Título</option>
                </select>
            </label>

            {(formData.tipo === "texto" || formData.tipo === "titulo") ? (
                <label className="flex flex-col">
                    <span className="font-semibold py-2">
                        {formData.tipo === "titulo" ? "Título" : "Texto"}
                    </span>
                    <textarea
                        name="contenido"
                        value={formData.contenido}
                        onChange={handleChange}
                        required
                        className="p-2 rounded-lg bg-[#EFEFEF]"
                    />
                </label>
            ) : (
                <label className="flex flex-col">
                    <span className="font-semibold py-2">Subir archivo ({formData.tipo})</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept={formData.tipo === "video" ? "video/*" : "image/*"}
                        required
                        className="p-2 rounded-lg bg-[#EFEFEF]"
                    />
                </label>
            )}

            <label className="flex flex-col">
                <span className="font-semibold py-2">Posición</span>
                <input
                    type="number"
                    name="posicion"
                    value={formData.posicion}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                />
                {error && (
                    <span className="text-red-600 text-sm mt-1 font-semibold">{error}</span>
                )}
                {ocupiedPositions.length > 0 && (
                    <span className="text-gray-600 text-xs mt-1">
                        Posiciones ocupadas: {ocupiedPositions.sort((a, b) => a - b).join(", ")}
                    </span>
                )}
            </label>

            <button type="submit" className="bg-[#0D1B2A] text-white py-2 rounded-lg font-semibold">
                Agregar Contenido
            </button>

        </form>
    )
}
