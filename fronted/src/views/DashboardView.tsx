import { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import StatCard from '../components/StatCard';
import Bar from '../components/Bar';
import { SideBar } from '../components/SideBar';

export const DashboardView = () => {
    const [avances, setAvances] = useState<any[]>([]);
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch(import.meta.env.VITE_API_URL + '/avances').then(res => {
                if (!res.ok) throw new Error('Error al obtener avances');
                return res.json();
            }),
            getUsers()
        ])
        .then(([avancesData, usuariosData]) => {
            setAvances(avancesData);
            setUsuarios(usuariosData);
        })
        .catch(() => setError('No se pudieron cargar los datos'))
        .finally(() => setLoading(false));
    }, []);*/

    // --- DATOS ESTÁTICOS DE EJEMPLO ---
    // Para usar datos estáticos, descomenta las siguientes líneas y comenta el useEffect de la API:
    
    useEffect(() => {
        const avancesEjemplo = [
            { ID_User: 1, ID_Modulo: 1, ID_SubModulo: 1, Estado: 'finalizado', FechaInicio: '2025-09-01', FechaFin: '2025-09-10', PorcentajeAvance: 100 },
            { ID_User: 2, ID_Modulo: 1, ID_SubModulo: 2, Estado: 'en progreso', FechaInicio: '2025-09-05', FechaFin: '', PorcentajeAvance: 60 },
            { ID_User: 3, ID_Modulo: 2, ID_SubModulo: 1, Estado: 'finalizado', FechaInicio: '2025-09-02', FechaFin: '2025-09-12', PorcentajeAvance: 100 },
            { ID_User: 4, ID_Modulo: 2, ID_SubModulo: 2, Estado: 'en progreso', FechaInicio: '2025-09-07', FechaFin: '', PorcentajeAvance: 40 },
            { ID_User: 1, ID_Modulo: 2, ID_SubModulo: 3, Estado: 'finalizado', FechaInicio: '2025-09-10', FechaFin: '2025-09-20', PorcentajeAvance: 100 },
            { ID_User: 2, ID_Modulo: 3, ID_SubModulo: 1, Estado: 'en progreso', FechaInicio: '2025-09-15', FechaFin: '', PorcentajeAvance: 20 },
        ];
        const usuariosEjemplo = [
            { id: 1, name: 'Ana', rol: 'user' },
            { id: 2, name: 'Luis', rol: 'user' },
            { id: 3, name: 'Carlos', rol: 'user' },
            { id: 4, name: 'Sofía', rol: 'user' },
        ];
        setAvances(avancesEjemplo);
        setUsuarios(usuariosEjemplo);
        setLoading(false);
    }, []);
    
    // --- FIN DATOS ESTÁTICOS ---

    // Estadísticas
    const totalUsuarios = usuarios.length;
    const modulos = avances.reduce((acc, a) => acc.add(a.ID_Modulo), new Set());
    const totalModulos = modulos.size;
    const finalizados = avances.filter(a => a.Estado === 'finalizado').length;
    // Cambiar usuariosPorModulo a Record<string, number> para evitar errores de tipo
    // Usuarios por módulo: usuarios que están actualmente en progreso en cada módulo (no finalizados)
    const usuariosPorModulo: Record<string, Set<number>> = {};
    avances.forEach(a => {
        if (a.Estado !== 'finalizado') {
            const key = String(a.ID_Modulo);
            if (!usuariosPorModulo[key]) usuariosPorModulo[key] = new Set();
            usuariosPorModulo[key].add(a.ID_User);
        }
    });
    // Para mostrar el número de usuarios por módulo
    const usuariosPorModuloCount: Record<string, number> = {};
    Object.entries(usuariosPorModulo).forEach(([mod, set]) => {
        usuariosPorModuloCount[mod] = set.size;
    });
    const maxUsuariosModulo = Math.max(...Object.values(usuariosPorModuloCount), 1);
    // Avances por estado para gráfico
    const estados = ['finalizado', 'en progreso'];
    const avancesPorEstado = estados.map(e => avances.filter(a => a.Estado === e).length);
    // Avances por módulo para gráfico
    const modulosArr = Array.from(modulos).map(String);
    const avancesPorModulo = modulosArr.map(m => avances.filter(a => String(a.ID_Modulo) === m).length);
    // Promedio de demora (días)
    const promedioDemora = (() => {
        const fechas = avances.filter(a => a.FechaInicio && a.FechaFin);
        if (fechas.length === 0) return 0;
        const sum = fechas.reduce((acc, a) => {
            const ini = new Date(a.FechaInicio).getTime();
            const fin = new Date(a.FechaFin).getTime();
            return acc + (fin - ini);
        }, 0);
        return Math.round(sum / fechas.length / (1000 * 60 * 60 * 24)); // días
    })();

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="h-screen w-screen bg-[#0D1B2A] flex overflow-hidden instrument-sans">
            <SideBar />
            <div className="flex-1 flex flex-col items-center justify-start p-0 md:p-8 overflow-hidden">
                <div className="bg-[#D9D9D9] rounded-none md:rounded-[50px] shadow-lg flex flex-col items-center w-full h-full max-w-full overflow-y-auto p-4 md:p-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#2e2e2e] mb-2 md:mb-4">Dashboard</h1>
                    <p className="text-[#2e2e2e] text-base md:text-lg mb-4 md:mb-6 text-center">Bienvenido al panel de administración.</p>
                    <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8 w-full justify-center">
                        <StatCard title="Usuarios registrados" value={totalUsuarios} />
                        <StatCard title="Módulos distintos" value={totalModulos} />
                        <StatCard title="Avances finalizados" value={finalizados} />
                        <StatCard title="Promedio de demora (días)" value={promedioDemora} />
                    </div>
                    <div className="w-full max-w-2xl mb-6 md:mb-8">
                        <h2 className="text-lg md:text-xl font-bold text-[#2e2e2e] mb-2">Usuarios por módulo</h2>
                        {Object.entries(usuariosPorModuloCount).length === 0 ? (
                            <span className="text-[#2e2e2e]">No hay datos de módulos.</span>
                        ) : (
                            Object.entries(usuariosPorModuloCount).map(([mod, count]) => (
                                <Bar key={mod} label={`Módulo ${mod}`} value={count} max={maxUsuariosModulo} />
                            ))
                        )}
                    </div>
                    {/* Gráficos simples con barras horizontales */}
                    <div className="w-full max-w-2xl mb-6 md:mb-8 flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-[#2e2e2e] mb-2">Avances por estado</h2>
                            {estados.map((estado, i) => (
                                <Bar key={estado} label={estado} value={avancesPorEstado[i]} max={Math.max(...avancesPorEstado, 1)} color={estado === 'finalizado' ? '#22c55e' : '#2563eb'} />
                            ))}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-[#2e2e2e] mb-2">Avances por módulo</h2>
                            {modulosArr.map((mod, i) => (
                                <Bar key={mod} label={`Módulo ${mod}`} value={avancesPorModulo[i]} max={Math.max(...avancesPorModulo, 1)} color="#f59e42" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
