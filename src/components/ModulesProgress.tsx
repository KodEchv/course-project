const modules = [
  { nombre: "Módulo 1", completados: 3, total: 5, completado: false },
  { nombre: "Módulo 2", completados: 5, total: 5, completado: true },
  { nombre: "Módulo 3", completados: 2, total: 4, completado: false },
  { nombre: "Módulo 4", completados: 4, total: 4, completado: true },
  { nombre: "Módulo 5", completados: 1, total: 6, completado: false },
  { nombre: "Módulo 6", completados: 3, total: 7, completado: false },
];

export const ModulesProgress = () => {
  return (
    <div
      className="
        bg-[#d9d9d9] w-full max-w-4xl 
        h-[40vh] md:h-[50vh] lg:h-[40vh] 
        flex flex-col p-4 sm:p-6 
        rounded-lg overflow-y-auto gap-4 
        shadow-lg
        overflow-y-hidden hover:overflow-y-auto
      "
    >
      {modules.map((mod) => (
        <div
          key={mod.nombre}
          className="
            bg-[#e0e0e0] border border-gray-400 
            rounded-2xl px-4 sm:px-6 py-3 sm:py-4 
            flex flex-col gap-2 shadow-sm
          "
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between w-full">
            <span className="text-base sm:text-lg font-semibold">
              {mod.nombre}
            </span>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="border border-gray-600 rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm bg-[#d9d9d9]">
                {mod.completados}/{mod.total}
              </span>
              <input
                type="checkbox"
                checked={mod.completado}
                readOnly
                className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-500 rounded-md focus:ring-0"
              />
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="flex items-center">
            <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${(mod.completados / mod.total) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
