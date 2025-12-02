import { ModulesProgress } from "../components/ModulesProgress"
import { SideBar } from "../components/SideBar"
import { useEffect, useState } from "react"
import { getApiUrl } from "../config/api"

const API_URL = getApiUrl();

type Avance = {
  ID_User: number;
  ID_Modulo: number;
  PorcentajeAvance?: number;
  Estado?: string;
};

type StatCard = {
  title: string;
  value: string | number;
  color?: string;
};

export const ProgressView = () => {
  const [stats, setStats] = useState<{
    totalProgress: number;
    modulosCompletados: number;
    totalModulos: number;
    examenesCompletados: number;
    totalExamenes: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        const userId = user?.ID_Persona ?? user?.ID_Usuario ?? user?.id;

        // Obtener avances del usuario
        const avancesRes = await fetch(`${API_URL}/avances`);
        if (!avancesRes.ok) throw new Error("Error al obtener avances");
        const allAvances = await avancesRes.json();
        
        const userAvances: Avance[] = allAvances.filter((a: Avance) => String(a.ID_User) === String(userId));

        // Obtener módulos y submodulos para contar exámenes
        const modulosRes = await fetch(`${API_URL}/modulos`);
        const submodRes = await fetch(`${API_URL}/submodulos`);

        if (!modulosRes.ok || !submodRes.ok) throw new Error("Error al obtener módulos");

        const modulos = await modulosRes.json();
        const submodulos = await submodRes.json();

        // Calcular estadísticas
        const totalModulos = modulos.length;
        const modulosCompletados = new Set(
          userAvances
            .filter(a => a.Estado?.toLowerCase() === "completado")
            .map(a => a.ID_Modulo)
        ).size;

        const totalExamenes = submodulos.filter((s: any) => s.Tipo === "examen").length;
        const examenesCompletados = userAvances.filter(a => {
          const sub = submodulos.find((s: any) => s.ID_SubModulo === a.ID_Modulo);
          return sub?.Tipo === "examen" && a.Estado?.toLowerCase() === "completado";
        }).length;

        const totalProgress = userAvances.length > 0
          ? Math.round(
              userAvances.reduce((sum: number, a: Avance) => sum + (a.PorcentajeAvance || 0), 0) /
              userAvances.length
            )
          : 0;

        setStats({
          totalProgress,
          modulosCompletados,
          totalModulos,
          examenesCompletados,
          totalExamenes,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards: StatCard[] = [
    {
      title: "Progreso Total",
      value: stats?.totalProgress ? `${stats.totalProgress}%` : "0%",
      color: "bg-blue-500",
    },
    {
      title: "Módulos",
      value: stats
        ? `${stats.modulosCompletados}/${stats.totalModulos}`
        : "0/0",
      color: "bg-green-500",
    },
    {
      title: "Exámenes",
      value: stats
        ? `${stats.examenesCompletados}/${stats.totalExamenes}`
        : "0/0",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="w-screen h-screen flex bg-[#0D1B2A] overflow-hidden">
      {/* Sidebar fijo */}
      <SideBar />

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 p-6">
        {/* Título */}
        <div className="h-[10%] flex items-center p-4 md:pl-20">
          <h2 className="text-4xl font-bold text-[#d9d9d9]">
            PROGRESO
          </h2>
        </div>

        {/* Resumen */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          {loading ? (
            <div className="text-[#d9d9d9]">Cargando estadísticas...</div>
          ) : (
            statCards.map((card) => (
              <div
                key={card.title}
                className="w-40 h-32 bg-[#d9d9d9] border border-[#2e2e2e] rounded-lg p-4 shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition"
              >
                <h3 className="text-3xl font-bold text-[#0D1B2A]">{card.value}</h3>
                <p className="mt-2 text-sm text-gray-600">{card.title}</p>
              </div>
            ))
          )}
        </div>

        {/* Lista de módulos */}
        <div className="flex-1 flex justify-center">
          <ModulesProgress />
        </div>
      </div>
    </div>
  );
}
