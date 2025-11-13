const API_URL = import.meta.env.VITE_API_URL;

export const getAvances = async () => {
    const res = await fetch(`${API_URL}/avances`);
    if (!res.ok) throw new Error('Error al obtener avances');
    return res.json();
};
