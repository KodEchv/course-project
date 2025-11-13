import { User as UserIcon } from "lucide-react";

interface PersonaInfoProps {
  persona: {
    Nombres: string;
    Cedula: string;
    Correo: string;
    Telefono: string;
  } | null;
  loading?: boolean;
}

const PersonaInfo: React.FC<PersonaInfoProps> = ({ persona, loading }) => (
  <div className="relative w-full max-w-2xl">
    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#D9D9D9] rounded-full p-2 shadow-lg">
      <UserIcon size={60} className="text-[#2e2e2e]" />
    </div>
    <div className="bg-[#D9D9D9] rounded-[20px] shadow-lg pt-16 pb-4 px-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[#2e2e2e] mb-2 text-center">
        Información personal
      </h2>
      <div className="flex flex-col gap-3">
        {loading ? (
          <span className="text-gray-500">Cargando...</span>
        ) : persona ? (
          [
            { label: "Nombre", value: persona.Nombres },
            { label: "Cédula", value: persona.Cedula },
            { label: "Correo", value: persona.Correo },
            { label: "Teléfono", value: persona.Telefono },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
            >
              <span className="font-semibold text-[#2e2e2e] sm:w-32">
                {item.label}:
              </span>
              <span className="break-words">{item.value}</span>
            </div>
          ))
        ) : null}
      </div>
    </div>
  </div>
);

export default PersonaInfo;
