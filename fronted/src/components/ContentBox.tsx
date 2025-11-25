import { useEffect, useState } from "react";
import { ImgContent } from "./contentItems/ImgContent";
import { TextContent } from "./contentItems/TextContent";
import { TitleContent } from "./contentItems/TittleContent";
import { VideoContent } from "./contentItems/VideoContent";
import { ContentActions } from "./contentItems/ContentActions";

type ContentBoxProps = {
  Tipo: string;
  RutaContenido: string | null;
  Posicion: number;
};

const API_URL = import.meta.env.VITE_API_URL || "";

export const ContentBox = ({ contenidos }: { contenidos: ContentBoxProps[] }) => {
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
          apiUrl={API_URL}
          onContinue={() => console.log("Continuar acción para")}
          onFinish={() => console.log("Finalizar acción para")}
          onGrade={(password, ok) => {
            if (ok) {
              console.log("Contraseña válida. Proceder a calificar.", password);
            } else {
              console.log("Contraseña inválida o error.", password);
            }
          }}
        />
      </div>
    </div>
  );
};
