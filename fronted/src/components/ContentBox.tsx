import { useEffect, useState } from "react";
import { ImgContent } from "./contentItems/ImgContent";
import { TextContent } from "./contentItems/TextContent";
import { TitleContent } from "./contentItems/TittleContent";
import { VideoContent } from "./contentItems/VideoContent";

type ContentBoxProps = {
  Tipo: string;
  RutaContenido: string;
  Posicion: number;
};

const API_URL = import.meta.env.VITE_API_URL;

export const ContentBox = ({ contenidos }: { contenidos: ContentBoxProps[] }) => {
  const [contenidosOrdenados, setContenidosOrdenados] = useState<ContentBoxProps[]>([]);
  useEffect(() => {
    if (!contenidos) return;
    try {
      const contenidosOrdenados = contenidos.sort((a, b) => a.Posicion - b.Posicion);
      setContenidosOrdenados(contenidosOrdenados);
    } catch (error) {
      console.error("Error al ordenar contenidos:", error);
    }
  }, [contenidos]);
  return (
    <div className="bg-[#d9d9d9] rounded-2xl w-full max-h-150 min-h-105 mb-2 p-4 overflow-y-auto">
      {contenidosOrdenados.map((contenido, index) => {
        console.log("Contenido:", contenido);
        switch (contenido.Tipo) {
          case "titulo":
            if (contenido.RutaContenido === null) return null;
            return <TitleContent key={index} ruta={`${API_URL}/${contenido.RutaContenido}`} />;
          case "texto":
            if (contenido.RutaContenido === null) return null;
            return <TextContent key={index} ruta={`${API_URL}/${contenido.RutaContenido}`} />;
          case "imagen":
            if (contenido.RutaContenido === null) return null;
            return <ImgContent key={index} src={`${API_URL}/${contenido.RutaContenido}`} alt="Descripción de la imagen" />;
          case "video":
            if (contenido.RutaContenido === null) return null;
            return <VideoContent key={index} src={`${API_URL}/${contenido.RutaContenido}`} title="Título del video" />;
          default:
            return null;
        }
      })}
    </div>
  );
};
