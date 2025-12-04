import { useEffect, useState } from "react";
import { ImgContent } from "./contentItems/ImgContent";
import { TextContent } from "./contentItems/TextContent";
import { TitleContent } from "./contentItems/TittleContent";
import { VideoContent } from "./contentItems/VideoContent";
import { ContentActions } from "./contentItems/ContentActions";
import { getApiUrl } from "../config/api";

type ContentBoxProps = {
  Tipo: string;
  RutaContenido: string | null;
  Posicion: number;
};

type SubmoduleInfo = {
  id: string;
  title: string;
  tipo: string;
  posicion: number;
};

const API_URL = getApiUrl();

export const ContentBox = ({
  contenidos,
  currentSubmodule,
  allSubmodules,
  moduleId,
  userId,
  onNavigate,
}: {
  contenidos: ContentBoxProps[];
  currentSubmodule?: SubmoduleInfo;
  allSubmodules?: SubmoduleInfo[];
  moduleId?: string | null;
  userId?: string | number | null;
  onNavigate?: (nextSubmoduleId: string) => void;
}) => {
  const [contenidosOrdenados, setContenidosOrdenados] = useState<ContentBoxProps[]>([]);

  useEffect(() => {
    if (!contenidos) return;
    try {
      const contenidosOrdenados = [...contenidos].sort((a, b) => a.Posicion - b.Posicion);
      setContenidosOrdenados(contenidosOrdenados);
    } catch (error) {
      console.error("Error al ordenar contenidos:", error);
    }
  }, [contenidos]);

  // Determinar tipo de botón a mostrar
  const getActionType = (): "continuar" | "finalizar" | "calificar" | null => {
    if (!currentSubmodule) return null;
    
    // Si el submodule es de tipo examen, mostrar calificar
    if (currentSubmodule.tipo && currentSubmodule.tipo.toLowerCase().includes("examen")) {
      return "calificar";
    }

    // Si es el último submodule, mostrar finalizar
    const isLastSubmodule = allSubmodules && allSubmodules.length > 0 && 
      currentSubmodule.posicion === Math.max(...allSubmodules.map(s => s.posicion));
    
    if (isLastSubmodule) return "finalizar";
    
    // Si no, mostrar continuar
    return "continuar";
  };

  const handleContinue = async () => {
    try {
      // Guardar avance completado
      if (userId && currentSubmodule && moduleId) {
        const response = await fetch(`${API_URL}/avances`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ID_User: Number(userId),
            ID_Modulo: Number(moduleId),
            ID_SubModulo: Number(currentSubmodule.id),
            Estado: "Completado",
            PorcentajeAvance: 100,
            FechaFin: new Date().toISOString(),
          }),
        });
        if (!response.ok) {
          const err = await response.json();
          console.error("Error guardando avance:", err);
          alert("Error al guardar el avance: " + (err.detail || "Error desconocido"));
          return;
        }
      }

      // Navegar al siguiente submodule
      if (allSubmodules && currentSubmodule) {
        const currentIndex = allSubmodules.findIndex(s => s.id === currentSubmodule.id);
        if (currentIndex >= 0 && currentIndex < allSubmodules.length - 1) {
          const nextSubmodule = allSubmodules[currentIndex + 1];
          onNavigate?.(nextSubmodule.id);
        }
      }
    } catch (error) {
      console.error("Error al continuar:", error);
      alert("Error de conexión: " + (error instanceof Error ? error.message : "Error desconocido"));
    } 
  };

  const handleFinish = async () => {
    try {
      // Guardar avance completado
      if (userId && currentSubmodule && moduleId) {
        const response = await fetch(`${API_URL}/avances`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ID_User: Number(userId),
            ID_Modulo: Number(moduleId),
            ID_SubModulo: Number(currentSubmodule.id),
            Estado: "Completado",
            PorcentajeAvance: 100,
            FechaFin: new Date().toISOString(),
          }),
        });
        if (!response.ok) {
          const err = await response.json();
          console.error("Error guardando avance:", err);
          alert("Error al guardar el avance: " + (err.detail || "Error desconocido"));
          return;
        }
      }

      // Redirigir a módulos
      window.location.href = "/modulos";
    } catch (error) {
      console.error("Error al finalizar:", error);
      alert("Error de conexión: " + (error instanceof Error ? error.message : "Error desconocido"));
    } finally {
    }
  };

  const handleGrade = async (_password: string, ok: boolean) => {
    if (!ok) {
      console.error("Contraseña incorrecta");
      return;
    }

    try {
      // Guardar examen como completado
      if (userId && currentSubmodule && moduleId) {
        const response = await fetch(`${API_URL}/avances`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ID_User: Number(userId),
            ID_Modulo: Number(moduleId),
            ID_SubModulo: Number(currentSubmodule.id),
            Estado: "Completado",
            PorcentajeAvance: 100,
            FechaFin: new Date().toISOString(),
          }),
        });
        if (!response.ok) {
          const err = await response.json();
          console.error("Error guardando examen:", err);
          alert("Error al guardar el examen: " + (err.detail || "Error desconocido"));
          return;
        }
      }

      // Si es el último, redirigir a módulos; si no, continuar al siguiente
      const isLastSubmodule = allSubmodules && allSubmodules.length > 0 && 
        currentSubmodule?.posicion === Math.max(...allSubmodules.map(s => s.posicion));
      
      if (isLastSubmodule) {
        window.location.href = "/modulos";
      } else {
        if (allSubmodules && currentSubmodule) {
          const currentIndex = allSubmodules.findIndex(s => s.id === currentSubmodule.id);
          if (currentIndex >= 0 && currentIndex < allSubmodules.length - 1) {
            const nextSubmodule = allSubmodules[currentIndex + 1];
            onNavigate?.(nextSubmodule.id);
          }
        }
      }
    } catch (error) {
      console.error("Error al calificar:", error);
      alert("Error de conexión: " + (error instanceof Error ? error.message : "Error desconocido"));
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-slate-50/80 to-slate-100/60 rounded-2xl w-full max-h-[60vh] min-h-[12rem] p-4 overflow-y-auto shadow-inner">
        {contenidosOrdenados.length === 0 && (
          <div className="w-full text-center py-10 text-slate-500">No hay contenido para mostrar</div>
        )}

        {contenidosOrdenados.map((contenido, index) => {
          if (!contenido) return null;

          const contentKey = `contenido-${index}`;

          const renderContent = () => {
            switch (contenido.Tipo) {
              case "titulo":
                if (!contenido.RutaContenido) return null;
                return <TitleContent key={contentKey} ruta={`${API_URL}/${contenido.RutaContenido}`} />;
              case "texto":
                if (!contenido.RutaContenido) return null;
                return <TextContent key={contentKey} ruta={`${API_URL}/${contenido.RutaContenido}`} />;
              case "imagen":
                if (!contenido.RutaContenido) return null;
                return <ImgContent key={contentKey} src={`${API_URL}/${contenido.RutaContenido}`} alt="Imagen del contenido" />;
              case "video":
                if (!contenido.RutaContenido) return null;
                return <VideoContent key={contentKey} src={`${API_URL}/${contenido.RutaContenido}`} title="Video del contenido" />;
              default:
                return null;
            }
          };

          return (
            <div key={contentKey} className="mb-4">
              {renderContent()}
            </div>
          );
        })}

        <ContentActions
          actionType={getActionType() ?? "continuar"}
          onContinue={handleContinue}
          onFinish={handleFinish}
          onGrade={handleGrade}
          isBlocked={false}
        />
      </div>
    </div>
  );
};
