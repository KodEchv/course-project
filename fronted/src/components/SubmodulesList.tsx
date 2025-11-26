import { useEffect, useState } from "react";

export const SubmodulesList = ({
  submodules,
  onSelect,
  selectedId,
}: {
  submodules: { id: string; title: string }[];
  onSelect?: (id: string, title: string) => void;
  selectedId?: string | null;
}) => {
  const [submodulesState, setSubmodulesState] = useState(submodules);

  useEffect(() => {
    setSubmodulesState(submodules);
  }, [submodules]);

  if (submodulesState.length === 0) {
    return (
      <>
        <div className="bg-[#d9d9d9] rounded-2xl p-6 w-80 min-w-64 max-h-200 flex flex-col gap-4 overflow-y-auto">
          <div className="text-gray-500">No hay submódulos disponibles.</div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-[#d9d9d9] rounded-2xl p-6 w-80 min-w-64 max-h-200 flex flex-col gap-4 overflow-y-auto">
      <h2 className="text-2xl font-normal mb-2">Lista submódulos</h2>
      {submodules.map((sub, idx) => {
        const active = String(selectedId) === String(sub.id);
        return (
          <button
            key={sub.id}
            onClick={() => onSelect?.(sub.id, sub.title)}
            className={`flex items-center gap-3 text-left p-2 rounded-md w-full ${active ? 'bg-blue-100 font-semibold' : 'bg-transparent'} hover:bg-blue-50 transition` }
          >
            <span className="w-6 text-sm text-slate-500">{idx + 1}.</span>
            <span className="truncate">{sub.title}</span>
          </button>
        );
      })}
    </div>
  );
};
