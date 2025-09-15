import { ModulesProgress } from "../components/ModulesProgress";
import { SideBar } from "../components/SideBar";
import { User } from "lucide-react";

export const StudentsView = () => {
  // Datos de ejemplo del estudiante
  const student = {
    nombre: "Juan Pérez",
    cedula: "12345678",
    correo: "juan.perez@email.com",
    direccion: "Calle 123, Ciudad, País",
    telefono: "+58 412-1234567",
  };

  return (
    <div className="w-screen h-screen flex bg-[#0D1B2A] overflow-hidden">
      {/* Sidebar fijo */}
      <SideBar />

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col items-center justify-start p-6 gap-10">
        {/* Card de información personal */}
        <div className="relative w-full max-w-2xl">
          {/* Icono usuario */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#D9D9D9] rounded-full p-2 shadow-lg">
            <User size={60} className="text-[#2e2e2e]" />
          </div>

          {/* Caja de datos */}
          <div className="bg-[#D9D9D9] rounded-[20px] shadow-lg pt-16 pb-4 px-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#2e2e2e] mb-2 text-center">
              Información personal
            </h2>

            <div className="flex flex-col gap-3">
              {[
                { label: "Nombre", value: student.nombre },
                { label: "Cédula", value: student.cedula },
                { label: "Correo", value: student.correo },
                { label: "Dirección", value: student.direccion },
                { label: "Teléfono", value: student.telefono },
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
              ))}
            </div>
          </div>
        </div>

        {/* Progreso de módulos */}
        <div className="w-full max-w-4xl">
          <ModulesProgress />
        </div>
      </div>
    </div>
  );
};
