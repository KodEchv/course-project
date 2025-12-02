import { useState, useEffect } from "react"
import { getApiUrl } from "../config/api"

const API_URL = getApiUrl();

export const CreateModuleForm = ({ setIsUpdated }: { setIsUpdated: () => void }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        posicion: "",
        imagen: null as File | null,
    })

    const [ocupiedPositions, setOcupiedPositions] = useState<number[]>([]);
    const [error, setError] = useState<string>("");

    // Cargar posiciones ocupadas
    useEffect(() => {
        const fetchOcupiedPositions = async () => {
            try {
                const res = await fetch(`${API_URL}/modulos`);
                const modulos = await res.json();
                const positions = modulos.map((m: any) => m.Posicion);
                setOcupiedPositions(positions);
            } catch (error) {
                console.error("Error cargando posiciones:", error);
            }
        };
        fetchOcupiedPositions();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Validar posición en tiempo real
        if (name === "posicion") {
            const pos = Number(value);
            if (ocupiedPositions.includes(pos)) {
                setError(`La posición ${pos} ya está ocupada`);
            } else {
                setError("");
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData({ ...formData, imagen: file })
    }

    const resetForm = () => {
        setFormData({
            nombre: "",
            descripcion: "",
            posicion: "",
            imagen: null,
        });
        setError("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.nombre.trim() || !formData.descripcion.trim() || !formData.posicion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (!formData.imagen) {
            alert("Debes seleccionar una imagen.");
            return;
        }

        // Validar posición
        const pos = Number(formData.posicion);
        if (ocupiedPositions.includes(pos)) {
            alert(`La posición ${pos} ya está ocupada. Por favor elige otra.`);
            return;
        }

        const data = new FormData();
        data.append("nombre", formData.nombre);
        data.append("descripcion", formData.descripcion);
        data.append("posicion", String(pos)); 
        data.append("imagen", formData.imagen);

        try {
            const res = await fetch(`${API_URL}/modulos`, {
                method: "POST",
                body: data, 
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error del servidor:", errorText);
                alert("Error al crear el módulo, revisa la consola.");
                resetForm();
                return;
            }

            const result = await res.json();
            console.log("✅ Módulo creado:", result);
            setIsUpdated();
            alert("Módulo creado exitosamente.");
        } catch (error) {

            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor.");
            
        }

        resetForm();
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col">
                <span className="font-semibold py-2">Nombre del módulo</span>
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
                <span className="font-semibold py-2">Agregar imagen</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="p-2 rounded-lg bg-[#EFEFEF]"
                />
            </label>

            <button type="submit" className="bg-[#0D1B2A] text-white py-2 rounded-lg font-semibold">
                Crear Módulo
            </button>
        </form>
    )
}
