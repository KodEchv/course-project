import { useEffect, useState } from "react";

export const TitleContent = ({ruta}: {ruta:string}) => {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const loadText = async () => {
      const res = await fetch(ruta);
      const txt = await res.text();
      setTexto(txt);
    };
    loadText();
  }, [ruta]);

  return (
    <div className="my-4 font-bold text-4xl">{texto}</div>
  )
}
