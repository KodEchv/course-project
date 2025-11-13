import { useEffect, useState } from "react"
import { moduleListService, submoduleListService } from "../services/listService"

export const AddContentForm = () => {

    const [modulos, setModulos] = useState<{ [key: number]: string }>({})
    const [submodulos, setSubmodulos] = useState<{ [key: number]: string }>({})
    const [idModulo, setIdModulo] = useState<number | null>(null);

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
            setModulos(modulosList);
        }
        fetchModulos();

    }, [])

    useEffect(() => {
        const fetchSubmodulos = async () => {
            if (formData.modulo) {
                const submodulosList = await submoduleListService(Number(formData.modulo))
                setSubmodulos(submodulosList);
            } else {
                setSubmodulos({});
            }
        }
        fetchSubmodulos();
    }, [formData.modulo])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
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
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const output = {
            ...formData,
            archivo: formData.archivo ? formData.archivo.name : null,
        }

        console.log("✅ Contenido agregado:", output)
        resetForm()
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
                    <option value="" disabled >Selecciona un módulo</option>
                    {Object.entries(modulos).map(([id, nombre]) => (
                        <option key={id} value={id}>
                            {nombre}
                        </option>
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
                        <option key={id} value={id}>
                            {nombre}
                        </option>
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

            {/* Campo dinámico según tipo */}
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
            </label>

            <button type="submit" className="bg-[#0D1B2A] text-white py-2 rounded-lg font-semibold">
                Agregar Contenido
            </button>
        </form>
    )
}
