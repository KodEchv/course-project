
import { ContentHeader } from "../components/ContentHeader";
import { SubmodulesList } from "../components/SubmodulesList";
import { ContentSection } from "../components/ContentSection";
import { ContentBox } from "../components/ContentBox";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// la lista de submódulos se cargará desde el backend según el id del módulo
// submodules se inicializa vacío y se llena con la respuesta de /submodulos/list-names/:idModulo
const API_URL = import.meta.env.VITE_API_URL || "";

export const ContentView = () => {
  const [contenidos, setContenidos] = useState<Array<{ Tipo: string; RutaContenido: string; Posicion: number }>>([]);
  const [titulo, setTitulo] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();


  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState<string | null>(null);
  const [submodules, setSubmodules] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const urlParams = location.pathname.split("/");
    const tituloFromPath = decodeURI(urlParams[2] || "");
    setTitulo(tituloFromPath || null);

    const third = urlParams[3] || null;
    const fourth = urlParams[4] || null;

    setSelectedModule(third);
    setSelectedSubmodule(fourth);

    if (third  && fourth) {
      (async () => {
        try {
          const res = await fetch(`${API_URL}/submodulos/list-names/${third}`);
          if (res.ok) {
            const raw = await res.json();
            let list: { id: string; title: string }[] = [];
            if (raw && !Array.isArray(raw) && typeof raw === "object") {
              list = Object.entries(raw).map(([k, v]) => ({ id: String(k), title: String(v) }));
            } else if (Array.isArray(raw)) {
              list = raw.map((it: any) => ({ id: String(it.id), title: String(it.title || it.name || it.label) }));
            }
            // ordenar por id numérico cuando sea posible
            list.sort((a, b) => Number(a.id) - Number(b.id));
            setSubmodules(list);

            if (fourth === "0") {
              navigate(`/contenido/${list[0]?.title}/${third}/${list[0]?.id}`);
            }
          }
        } catch (e) {
          console.warn("No se pudieron cargar submódulos:", e);
        }

      })();
    } else {
      setSelectedSubmodule(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchContenidos = async () => {
      try {
        if (!selectedSubmodule) {
          setContenidos([]);
          return;
        }
        const response = await fetch(`${API_URL}/contenidos/submodulo/${selectedSubmodule}`);
        const data = await response.json();
        setContenidos(data);
      } catch (error) {
        console.error("Error al obtener los contenidos:", error);
        setContenidos([]);
      }
    };
    fetchContenidos();
  }, [selectedSubmodule]);

  const handleSelectSubmodule = (id: string, submoduloName: string) => {
    const path = `/contenido/${encodeURIComponent(submoduloName)}/${selectedModule}/${id}${location.search || ""}${location.hash || ""}`;
    navigate(path, { replace: false });
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <ContentHeader modulo={titulo || "Título del Módulo"} />
      <div className="flex flex-1 gap-6 mt-2">
        <div className="flex flex-col flex-1">
          <ContentBox contenidos={contenidos} />
          <ContentSection title={titulo || "Título del Contenido"} />
        </div>
        <SubmodulesList submodules={submodules} onSelect={handleSelectSubmodule} selectedId={selectedSubmodule} />
      </div>
    </div>
  );
};
