import { useEffect, useState } from "react";
import { ImgContent } from "./contentItems/ImgContent";
import { TextContent } from "./contentItems/TextContent";
import { TitleContent } from "./contentItems/TittleContent";
import { VideoContent } from "./contentItems/VideoContent";

type ContentBoxProps = {
  tipo: string;
  ruta: string;
  posicion: number;
};

export const ContentBox = ({ contenidos }: { contenidos: ContentBoxProps[] }) => {
  const [contenidosOrdenados, setContenidosOrdenados] = useState<ContentBoxProps[]>([]);
  useEffect(() => {
    const contenidosOrdenados = contenidos.sort((a, b) => a.posicion - b.posicion);
    setContenidosOrdenados(contenidosOrdenados);
  }, [contenidos]);
  return (
    <div className="bg-[#d9d9d9] rounded-2xl w-full max-h-150 min-h-105 mb-2 p-4 overflow-y-auto">
      {contenidosOrdenados.map((contenido, index) => {
        switch (contenido.tipo) {
          case "titulo":
            return <TitleContent key={index} title={contenido.ruta} />;
          case "texto":
            return <TextContent key={index} text={contenido.ruta} />;
          case "imagen":
            return <ImgContent key={index} src={contenido.ruta} alt="Descripción de la imagen" />;
          case "video":
            return <VideoContent key={index} src={contenido.ruta} title="Título del video" />;
          default:
            return null;
        }
      })}
    </div>
  );
};
