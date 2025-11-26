import { useEffect, useState, useMemo } from "react";
import { SideBar } from "../components/SideBar";
import StatCard from "../components/StatCard";
import Bar from "../components/Bar";
import { getUsers } from "../services/userService";

export const DashboardView = () => {
    const [avances, setAvances] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ---------------------
    // Cargar datos desde API
    // ---------------------
    useEffect(() => {
        setLoading(true);

        Promise.all([
            fetch(import.meta.env.VITE_API_URL + "/avances").then(res => {
                if (!res.ok) throw new Error("Error al obtener avances");
                return res.json();
            }),
            getUsers()
        ])
            .then(([avancesData, usuariosData]) => {
                setAvances(avancesData);
                setUsuarios(usuariosData);
            })
            .catch(() => setError("No se pudieron cargar los datos"))
            .finally(() => setLoading(false));
    }, []);

    // ---------------------
    // MÉTRICAS DEL DASHBOARD
    // ---------------------

    const totalUsuarios = usuarios.length - 1; // excluir admin

    const modulosSet = useMemo(
        () => new Set(avances.map(a => a.ID_Modulo)),
        [avances]
    );
    const totalModulos = modulosSet.size;

    const finalizados = avances.filter(a => a.Estado === "finalizado").length;

    // Usuarios en progreso por módulo
    const usuariosPorModulo = useMemo(() => {
        const map: Record<string, Set<number>> = {};

        avances.forEach(a => {
            if (a.Estado !== "finalizado") {
                const key = String(a.ID_Modulo);
                if (!map[key]) map[key] = new Set();
                map[key].add(a.ID_User);
            }
        });

        return map;
    }, [avances]);

    const usuariosPorModuloCount = Object.fromEntries(
        Object.entries(usuariosPorModulo).map(([mod, users]) => [mod, users.size])
    );

    const maxUsuariosModulo = Math.max(...Object.values(usuariosPorModuloCount), 1);

    // Avances por estado
    const estados = ["finalizado", "en progreso"];
    const avancesPorEstado = estados.map(
        estado => avances.filter(a => a.Estado === estado).length
    );

    // Avances por módulo
    const modulosArr = Array.from(modulosSet).map(String);
    const avancesPorModulo = modulosArr.map(
        mod => avances.filter(a => String(a.ID_Modulo) === mod).length
    );

    // Promedio de demora
    const promedioDemora = useMemo(() => {
        const items = avances.filter(a => a.FechaInicio && a.FechaFin);
        if (items.length === 0) return 0;

        const total = items.reduce((acc, a) => {
            const ini = new Date(a.FechaInicio).getTime();
            const fin = new Date(a.FechaFin).getTime();
            return acc + (fin - ini);
        }, 0);

        return Math.round(total / items.length / (1000 * 60 * 60 * 24));
    }, [avances]);

    // ---------------------
    // UI
    // ---------------------

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="h-screen w-screen bg-[#0D1B2A] flex overflow-hidden">
            <SideBar />

            <main className="flex-1 flex flex-col items-center p-4 md:p-10 overflow-y-auto">
                <section className="bg-[#D9D9D9] rounded-[40px] shadow-lg w-full max-w-[1200px] p-6 md:p-12">

                    {/* HEADER */}
                    <header className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-[#2e2e2e]">Dashboard</h1>
                        <p className="text-[#2e2e2e] mt-2">
                            Panel general del progreso de usuarios y módulos.
                        </p>
                    </header>

                    {/* TARJETAS DE ESTADÍSTICAS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard title="Usuarios registrados" value={totalUsuarios} />
                        <StatCard title="Módulos distintos" value={totalModulos} />
                        <StatCard title="Avances finalizados" value={finalizados} />
                        <StatCard title="Promedio demora (días)" value={promedioDemora} />
                    </div>

                    {/* USUARIOS POR MÓDULO */}
                    <section className="mb-12">
                        <h2 className="text-xl font-bold text-[#2e2e2e] mb-4">Usuarios por módulo</h2>

                        {Object.keys(usuariosPorModuloCount).length === 0 ? (
                            <p className="text-[#2e2e2e]">No hay datos disponibles.</p>
                        ) : (
                            modulosArr.map(mod => (
                                <Bar
                                    key={mod}
                                    label={`Módulo ${mod}`}
                                    value={usuariosPorModuloCount[mod] || 0}
                                    max={maxUsuariosModulo}
                                    color="#3b82f6"
                                />
                            ))
                        )}
                    </section>

                    {/* GRÁFICOS PRINCIPALES */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Avances por estado */}
                        <div>
                            <h2 className="text-xl font-bold text-[#2e2e2e] mb-4">Avances por estado</h2>
                            {estados.map((estado, i) => (
                                <Bar
                                    key={estado}
                                    label={estado}
                                    value={avancesPorEstado[i]}
                                    max={Math.max(...avancesPorEstado, 1)}
                                    color={estado === "finalizado" ? "#22c55e" : "#f97316"}
                                />
                            ))}
                        </div>

                        {/* Avances por módulo */}
                        <div>
                            <h2 className="text-xl font-bold text-[#2e2e2e] mb-4">Avances por módulo</h2>
                            {modulosArr.map((mod, i) => (
                                <Bar
                                    key={mod}
                                    label={`Módulo ${mod}`}
                                    value={avancesPorModulo[i]}
                                    max={Math.max(...avancesPorModulo, 1)}
                                    color="#8b5cf6"
                                />
                            ))}
                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default DashboardView;
