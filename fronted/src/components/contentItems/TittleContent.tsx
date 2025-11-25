import { useEffect, useState } from "react";

export const TitleContent = ({ ruta }: { ruta: string }) => {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadText = async () => {
      try {
        setLoading(true);
        const res = await fetch(ruta);
        const txt = await res.text();
        setTexto(txt);
      } catch (e) {
        setTexto("(Título no disponible)");
      } finally {
        setLoading(false);
      }
    };
    loadText();
  }, [ruta]);

  return (
    <div className="my-6 w-full flex justify-center">
      <div className="w-full max-w-3xl bg-transparent text-center">
        <h1 className={`font-extrabold text-3xl md:text-4xl leading-tight ${loading ? 'opacity-50 animate-pulse' : 'opacity-100'}`}>
          {texto}
        </h1>
      </div>
    </div>
  );
};
