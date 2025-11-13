import { ModulesProgress } from "../components/ModulesProgress";
import { SideBar } from "../components/SideBar";
import { useEffect, useState } from "react";
import { getPersonaById } from "../services/userService";
import PersonaInfo from "../components/PersonaInfo";

export const StudentsView = () => {
  const [persona, setPersona] = useState<{ Nombres: string; Cedula: string; Correo: string; Telefono: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setLoading(false);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      const personaId = user.ID_Persona || user.id_persona || user.personaId || user.persona_id;
      if (!personaId) {
        setLoading(false);
        return;
      }
      getPersonaById(personaId)
        .then((data) => {
          setPersona(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex bg-[#0D1B2A] overflow-hidden">
      <SideBar />
      <div className="flex flex-1 flex-col items-center justify-start p-6 gap-10">
        <div className="relative w-full max-w-2xl">
          <PersonaInfo persona={persona} loading={loading} />
        </div>
        <div className="w-full max-w-4xl">
          {(() => {
            const userStr = localStorage.getItem("user");
            if (!userStr) return null;
            try {
              const user = JSON.parse(userStr);
              if (user.rol === "admin" || user.role === "admin") {
                return null;
              }
            } catch {}
            return <ModulesProgress />;
          })()}
        </div>
      </div>
    </div>
  );
};
