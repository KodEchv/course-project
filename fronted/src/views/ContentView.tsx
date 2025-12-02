
import { ContentHeader } from "../components/ContentHeader";
import { SubmodulesList } from "../components/SubmodulesList";
import { ContentSection } from "../components/ContentSection";
import { ContentBox } from "../components/ContentBox";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiUrl } from "../config/api";

// la lista de submódulos se cargará desde el backend según el id del módulo
// submodules se inicializa vacío y se llena con la respuesta de /submodulos/list-names/:idModulo
const API_URL = getApiUrl();

type SubmoduleInfo = {
  id: string;
  title: string;
  tipo: string;
  posicion: number;
};

export const ContentView = () => {
  const [contenidos, setContenidos] = useState<Array<{ Tipo: string; RutaContenido: string; Posicion: number }>>([]);
  const [titulo, setTitulo] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState<string | null>(null);
  const [submodules, setSubmodules] = useState<SubmoduleInfo[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Obtener userId desde localStorage
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        const id = user?.ID_Persona ?? user?.ID_Usuario ?? user?.id ?? user?.userId ?? null;
        setUserId(id ? String(id) : null);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const urlParams = location.pathname.split("/");
    const tituloFromPath = decodeURI(urlParams[2] || "");
    setTitulo(tituloFromPath || null);

    const third = urlParams[3] || null;
    const fourth = urlParams[4] || null;

    setSelectedModule(third);
    setSelectedSubmodule(fourth);

    if (third && fourth) {
      (async () => {
        try {
          // Obtener lista de submodulos del módulo
          const res = await fetch(`${API_URL}/submodulos/list-names/${third}`);
          if (res.ok) {
            const raw = await res.json();
            let list: { id: string; title: string }[] = [];
            if (raw && !Array.isArray(raw) && typeof raw === "object") {
              list = Object.entries(raw).map(([k, v]) => ({ id: String(k), title: String(v) }));
            } else if (Array.isArray(raw)) {
              list = raw.map((it: any) => ({ id: String(it.id), title: String(it.title || it.name || it.label) }));
            }
            list.sort((a, b) => Number(a.id) - Number(b.id));

            // Obtener info detallada de cada submodulo (tipo, posición)
            const detailedList: SubmoduleInfo[] = [];
            for (const sub of list) {
              try {
                const subRes = await fetch(`${API_URL}/submodulos/${sub.id}`);
                if (subRes.ok) {
                  const subData = await subRes.json();
                  detailedList.push({
                    id: sub.id,
                    title: sub.title,
                    tipo: subData.Tipo || "",
                    posicion: subData.Posicion || 0,
                  });
                } else {
                  detailedList.push({ id: sub.id, title: sub.title, tipo: "", posicion: 0 });
                }
              } catch {
                detailedList.push({ id: sub.id, title: sub.title, tipo: "", posicion: 0 });
              }
            }
            setSubmodules(detailedList);

            if (fourth === "0") {
              navigate(`/contenido/${encodeURIComponent(detailedList[0]?.title || "")}/${third}/${detailedList[0]?.id}`);
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

  const currentSubmodule = submodules.find(s => s.id === selectedSubmodule);

  const handleSelectSubmodule = (id: string) => {
    const sub = submodules.find(s => s.id === id);
    if (sub) {
      const path = `/contenido/${encodeURIComponent(sub.title)}/${selectedModule}/${id}`;
      navigate(path, { replace: false });
    }
  };

  const handleNavigateSubmodule = (nextSubmoduleId: string) => {
    const sub = submodules.find(s => s.id === nextSubmoduleId);
    if (sub) {
      const path = `/contenido/${encodeURIComponent(sub.title)}/${selectedModule}/${nextSubmoduleId}`;
      navigate(path, { replace: false });
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-4">
      <ContentHeader modulo={titulo || "Título del Módulo"} />
      <div className="flex flex-1 gap-6 mt-2">
        <div className="flex flex-col flex-1">
          <ContentBox
            contenidos={contenidos}
            currentSubmodule={currentSubmodule}
            allSubmodules={submodules}
            moduleId={selectedModule}
            userId={userId}
            onNavigate={handleNavigateSubmodule}
          />
          <ContentSection title={titulo || "Título del Contenido"} />
        </div>
        <SubmodulesList submodules={submodules} onSelect={handleSelectSubmodule} selectedId={selectedSubmodule} />
      </div>
    </div>
  );
};
