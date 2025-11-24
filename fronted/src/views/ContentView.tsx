
import { ContentHeader } from "../components/ContentHeader";
import { SubmodulesList } from "../components/SubmodulesList";
import { ContentSection } from "../components/ContentSection";
import { ContentBox } from "../components/ContentBox";
import { useEffect, useState } from "react";

const submodules = [
  "1.1 Introducción al módulo",
  "1.2 Introducción al módulo"
];
const API_URL = import.meta.env.VITE_API_URL;
export const ContentView = () => {
  const [contenidos, setContenidos] = useState<Array<{ tipo: string; ruta: string; posicion: number }>>([]);
  const [moduloSelectedID, setModuloSelectedID] = useState<string | null>(null);
  const [submoduloSelectedID, setSubmoduloSelectedID] = useState<string | null>(null);
  const [titulo, setTitulo] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = window.location.pathname.split("/");
    const moduloID = urlParams[3];
    setModuloSelectedID(moduloID);
    const titulo = decodeURI(urlParams[2]);
    setTitulo(titulo);

    console.log("Modulo ID:", titulo);
    //const submoduloID = urlParams[4];
    setSubmoduloSelectedID("1"); // Temporalmente fijo

    const fetchContenidos = async () => {
      try {
        if (!moduloSelectedID || !submoduloSelectedID) return;
      } catch (error) {
        console.error("Error al obtener los IDs de módulo y submódulo:", error);
      }
      const response = await fetch(`${API_URL}/contenidos/${moduloSelectedID}/${submoduloSelectedID}`);
      const data = await response.json();
      setContenidos(data);
    };
    fetchContenidos();
    
  }, []);
  return (
    <div className="w-full h-full flex flex-col p-4">
      <ContentHeader modulo={titulo || "Título del Módulo"} />
      <div className="flex flex-1 gap-6 mt-2">
        <div className="flex flex-col flex-1">
          <ContentBox contenidos={contenidos} />
          <ContentSection title={titulo || "Título del Contenido"} />
        </div>
        <SubmodulesList submodules={submodules} />
      </div>
    </div>
  );
}
