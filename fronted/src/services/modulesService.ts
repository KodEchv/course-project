const API_URL = import.meta.env.VITE_API_URL;

export const fetchModules = async () => {
    const response = await fetch(`${API_URL}/modulos`);
    if (!response.ok) {
        throw new Error('Failed to fetch modules');
    }
    const data = await response.json();
    return data;
}