import { useEffect, useState } from "react"
import { moduleListService, submoduleListService } from "../services/listService";
import { getApiUrl } from "../config/api";

const API_URL = getApiUrl();

export const CreateSubmoduleForm = ({ setIsUpdated }: { setIsUpdated: () => void }) => {

    const [modulos, setModulos] = useState<{ [key: number]: string }>({})
    const [ocupiedPositions, setOcupiedPositions] = useState<number[]>([])
    const [error, setError] = useState<string>("")

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

    // Cargar posiciones ocupadas cuando cambia el módulo seleccionado
    useEffect(() => {
        const fetchOcupiedPositions = async () => {
            if (!formData.modulo) {
                setOcupiedPositions([]);
                return;
            }
            try {
                const submodulos = await submoduleListService(Number(formData.modulo));
                // submodulos es un objeto {id: nombre}
                const ids = Object.keys(submodulos).map(Number);
                
                // Obtener los detalles de cada submodulo para sus posiciones
                const positions: number[] = [];
                for (const id of ids) {
                    const res = await fetch(`${API_URL}/submodulos/${id}`);
                    if (res.ok) {
                        const sub = await res.json();
                        positions.push(sub.Posicion);
                    }
                }
                setOcupiedPositions(positions);
            } catch (error) {
                console.error("Error cargando posiciones:", error);
            }
        };
        fetchOcupiedPositions();
    }, [formData.modulo])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Validar posición en tiempo real
        if (name === "posicion") {
            const pos = Number(value);
            if (ocupiedPositions.includes(pos)) {
                setError(`La posición ${pos} ya está ocupada en este módulo`);
            } else {
                setError("");
            }
        }
    }

    const resetForm = () => {
        setFormData({
            nombre: "",
            modulo: "",
            descripcion: "",
            posicion: "",
            tipo: "contenido",
        });
        setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.nombre.trim() || !formData.descripcion.trim() || !formData.posicion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const pos = Number(formData.posicion);
        if (ocupiedPositions.includes(pos)) {
            alert(`La posición ${pos} ya está ocupada en este módulo. Por favor elige otra.`);
            return;
        }

        const data = new FormData();
        data.append("Nombre", formData.nombre);
        data.append("ID_ModuloPertenece", String(formData.modulo));
        data.append("Descripcion", formData.descripcion);
        data.append("Posicion", String(pos));
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

            setIsUpdated();
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
                {error && (
                    <span className="text-red-600 text-sm mt-1 font-semibold">{error}</span>
                )}
                {ocupiedPositions.length > 0 && (
                    <span className="text-gray-600 text-xs mt-1">
                        Posiciones ocupadas: {ocupiedPositions.sort((a, b) => a - b).join(", ")}
                    </span>
                )}
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
