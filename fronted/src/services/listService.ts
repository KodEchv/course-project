const API_URL = import.meta.env.VITE_API_URL;

export const moduleListService = async () => {
    const response = await fetch(`${API_URL}/modulos/list-names`);
    if (!response.ok) {
        throw new Error("Error al obtener los módulos");
    }
    return response.json();
};

export const submoduleListService = async (idModulo: number) => {
    const response = await fetch(`${API_URL}/submodulos/list-names/${idModulo}`);
    if (!response.ok) {
        throw new Error("Error al obtener los submódulos");
    }
    return response.json();
};

