const modules = [
  { nombre: "Módulo 1", completados: 3, total: 5, completado: false },
  { nombre: "Módulo 2", completados: 5, total: 5, completado: true },
  { nombre: "Módulo 3", completados: 2, total: 4, completado: false },
  { nombre: "Módulo 4", completados: 4, total: 4, completado: true },
];


export const ModulesProgress = () => {
  return (
    <div className="bg-[#d9d9d9] w-300 min-h-115 max-h-115 flex flex-col p-8 rounded-lg overflow-y-auto gap-5">
        
    {modules.map((mod) => (
        <div
          key={mod.nombre}
          className="bg-[#e0e0e0] border border-gray-500 rounded-2xl px-8 py-6 flex flex-col gap-2 mb-2 shadow-sm"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-4xl font-normal tracking-wide">{mod.nombre}</span>
            <span className="border border-gray-600 rounded-full px-6 py-1 text-lg bg-[#d9d9d9]">{mod.completados}/{mod.total}</span>
            <input
              type="checkbox"
              checked={mod.completado}
              readOnly
              className="w-8 h-8 border-2 border-gray-500 rounded-md focus:ring-0"
            />
          </div>
          <div className="flex items-center mt-2">
            <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-400 rounded-full"
                style={{ width: `${(mod.completados / mod.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
)}
