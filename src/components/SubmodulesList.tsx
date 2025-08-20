export const SubmodulesList = ({ submodules }: { submodules: string[] }) => (
  <div className="bg-[#d9d9d9] rounded-2xl p-6 w-80 min-w-64 max-h-200 flex flex-col gap-4 overflow-y-auto">
    <h2 className="text-2xl font-normal mb-2">Lista submódulos</h2>
    {submodules.map((sub, idx) => (
      <div key={idx} className="text-xl font-normal mb-2">
        {sub}
      </div>
    ))}
  </div>
);
