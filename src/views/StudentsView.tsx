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
    telefono: "+58 412-1234567"
  };

  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="flex flex-1 flex-col items-center justify-start p-1 gap-8 py-30 w-full">
        <div className="relative w-full max-w-xl">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#D9D9D9] rounded-full p-2 shadow-lg">
            <User size={80} className="text-[#2e2e2e]" />
          </div>
          <div className="bg-[#D9D9D9] rounded-[30px] shadow-lg pt-16 pb-8 px-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#2e2e2e] mb-2 text-center">Información personal</h2>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2"><span className="font-semibold text-[#2e2e2e] w-32">Nombre:</span><span>{student.nombre}</span></div>
              <div className="flex gap-2"><span className="font-semibold text-[#2e2e2e] w-32">Cédula:</span><span>{student.cedula}</span></div>
              <div className="flex gap-2"><span className="font-semibold text-[#2e2e2e] w-32">Correo:</span><span>{student.correo}</span></div>
              <div className="flex gap-2"><span className="font-semibold text-[#2e2e2e] w-32">Dirección:</span><span>{student.direccion}</span></div>
              <div className="flex gap-2"><span className="font-semibold text-[#2e2e2e] w-32">Teléfono:</span><span>{student.telefono}</span></div>
            </div>
          </div>
        </div>
        
        <ModulesProgress />
      </div>
    </div>
  );
}
