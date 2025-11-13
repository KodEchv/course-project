import { useEffect, useState } from "react"
import { moduleListService } from "../services/listService";

const API_URL = import.meta.env.VITE_API_URL;

export const CreateSubmoduleForm = () => {

    const [modulos, setModulos] = useState<{ [key: number]: string }>({})

    const [formData, setFormData] = useState({
        nombre: "",
        modulo: "",
        descripcion: "",
        posicion: "",
        tipo: "contenido",
    })

    useEffect(() => {

        const fetchModulos = async () => {
            const modulosList = await moduleListService()
            setModulos(modulosList);
        }

        fetchModulos();

    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const resetForm = () => {
        setFormData({
            nombre: "",
            modulo: "",
            descripcion: "",
            posicion: "",
            tipo: "contenido",
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.nombre.trim() || !formData.descripcion.trim() || !formData.posicion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const data = new FormData();
        data.append("Nombre", formData.nombre);
        data.append("ID_ModuloPertenece", String(formData.modulo));
        data.append("Descripcion", formData.descripcion);
        data.append("Posicion", String(formData.posicion));
        data.append("Tipo", formData.tipo);

        console.log(data)

        try {
            const res = await fetch(`${API_URL}/submodulos`, {
                method: "POST",
                body: data,
            });

            if (!res.ok) {
                alert("Error al crear el submódulo, revisa la consola.");
                resetForm();
                return;
            }

            alert("Submódulo creado exitosamente.");
        } catch (error) {
            console.error("Error al crear el submódulo:", error)
            alert("No se pudo conectar con el servidor.");
        }

        resetForm();


    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
                <span className="font-semibold py-2">Nombre del submódulo</span>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                />
            </label>

            <label className="flex flex-col">
                <span className="font-semibold py-2">Módulo al que pertenece</span>
                <select
                    name="modulo"
                    value={formData.modulo}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                    disabled = {Object.keys(modulos).length === 0}
                >
                    <option value="" disabled>Selecciona un módulo</option>
                    {Object.entries(modulos).map(([id, nombre]) => (
                        <option key={id} value={id}>
                            {nombre}
                        </option>
                    ))}

                </select>
            </label>

            <label className="flex flex-col">
                <span className="font-semibold py-2">Descripción</span>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                />
            </label>

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

            <label className="flex flex-col">
                <span className="font-semibold py-2">Tipo</span>
                <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                >
                    <option value="contenido">Contenido</option>
                    <option value="examen">Examen</option>
                </select>
            </label>

            <button type="submit" className="bg-[#0D1B2A] text-white py-2 rounded-lg font-semibold">
                Crear Submódulo
            </button>
        </form>
    )
}
