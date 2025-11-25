import { useEffect, useState } from "react";

export const TextContent = ({ruta}: {ruta:string}) => {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const loadText = async () => {
      const res = await fetch(ruta);
      const txt = await res.text();
      setTexto(txt);

      console.log("Texto cargado:", txt);
    };
    loadText();
  }, [ruta]);

  return (
    <div className="my-4 text-lg">{texto}</div>
  )
}
