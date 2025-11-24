import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL;


export const CreateModuleForm = ({ setIsUpdated }: { setIsUpdated: () => void }) => {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        posicion: "",
        imagen: null as File | null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
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

        const data = new FormData();
        data.append("nombre", formData.nombre);
        data.append("descripcion", formData.descripcion);
        data.append("posicion", String(Number(formData.posicion))); 
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
