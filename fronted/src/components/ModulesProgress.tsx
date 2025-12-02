import { useEffect, useMemo, useState } from "react";
import { getApiUrl } from "../config/api";

type Avance = {
  ID_Avance: number;
  ID_User: number;
  ID_Modulo: number | null;
  ID_SubModulo?: number | null;
  Estado: string;
  FechaInicio?: string | null;
  FechaFin?: string | null;
  PorcentajeAvance?: number | null;
};

const API_URL = getApiUrl();

// Muestra progreso por módulo, opcionalmente filtrado por userId
export const ModulesProgress = ({ userId }: { userId?: string | number }) => {
  const [avances, setAvances] = useState<Avance[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // determinar usuario actual desde localStorage (forma flexible porque en distintas partes se guarda distinto)
  const getViewer = () => {
    try {
      const s = localStorage.getItem("user");
      if (!s) return null;
      const parsed = JSON.parse(s);
      // buscar campos comunes
      const id = parsed?.ID_Persona ?? parsed?.ID_Usuario ?? parsed?.id ?? parsed?.userId ?? null;
      const role = parsed?.rol ?? parsed?.role ?? parsed?.rol_usuario ?? null;
      return { id: id != null ? String(id) : null, role };
    } catch {
      return null;
    }
  };

  const viewer = getViewer();
  const viewerId = viewer?.id ?? null;
  const viewerIsAdmin = viewerId === "1" || (viewer?.role && String(viewer.role).toLowerCase() === "admin");

  // objetivo (user whose avances are shown): si no se pasa userId, mostramos del viewer (si está logueado)
  const targetUserId = userId !== undefined && userId !== null ? String(userId) : viewerId;

  // permiso: si intentan ver otro usuario y no son admin, denegar
  const isAuthorized = (() => {
    if (!targetUserId) return false; // nothing to show
    if (!userId) return true; // viewing self (no userId param -> viewer)
    if (viewerIsAdmin) return true; // admin puede ver cualquiera
    if (viewerId && String(viewerId) === String(userId)) return true; // owner
    return false;
  })();

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      // permisos y presencia de usuario
      if (!targetUserId) {
        setError("Inicia sesión para ver los avances");
        setAvances([]);
        return;
      }
      if (!isAuthorized) {
        setError("No estás autorizado para ver los avances de este usuario");
        setAvances([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL.replace(/\/+$/, "")}/avances`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list: Avance[] = Array.isArray(data) ? data : data.results || [];
        // Si se especificó userId en props, mostramos ese usuario; si no, mostramos del viewer
        const filterId = userId !== undefined && userId !== null ? String(userId) : viewerId;
        if (filterId) {
          setAvances(list.filter((a) => String(a.ID_User) === String(filterId)));
        } else {
          setAvances(list);
        }
      } catch (e: any) {
        if (e.name === "AbortError") return;
        console.error("Error cargando avances:", e);
        setError("No se pudieron cargar los avances");
        setAvances([]);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [userId]);

  // Agrupar por ID_Modulo
  const modules = useMemo(() => {
    if (!avances) return [] as Array<{
      id: string;
      avances: Avance[];
      avg: number;
      completados: number;
    }>;

    const map = new Map<string, Avance[]>();
    for (const a of avances) {
      const id = a.ID_Modulo != null ? String(a.ID_Modulo) : "unknown";
      if (!map.has(id)) map.set(id, []);
      map.get(id)!.push(a);
    }

    const out: { id: string; avances: Avance[]; avg: number; completados: number }[] = [];
    for (const [id, list] of map.entries()) {
      const porcentajes = list.map((x) => (typeof x.PorcentajeAvance === "number" ? x.PorcentajeAvance : 0));
      const avg = porcentajes.length ? porcentajes.reduce((s, v) => s + v, 0) / porcentajes.length : 0;
      const completados = list.filter((x) => x.Estado && x.Estado.toLowerCase() === "completado").length;
      out.push({ id, avances: list, avg: Math.round(avg * 100) / 100, completados });
    }

    // ordenar por id numérico cuando sea posible
    out.sort((a, b) => Number(a.id || 0) - Number(b.id || 0));
    return out;
  }, [avances]);

  return (
    <div
      className={`
        bg-[#d9d9d9] w-full max-w-4xl 
        h-[40vh] md:h-[50vh] lg:h-[40vh] 
        flex flex-col p-4 sm:p-6 
        rounded-lg overflow-y-auto gap-4 
        shadow-lg
        overflow-y-hidden hover:overflow-y-auto
      `}
    >
      {loading && <div className="text-sm text-slate-500">Cargando avances...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {!loading && !error && modules.length === 0 && (
        <div className="text-sm text-slate-500">No hay avances para mostrar{userId ? ` para el usuario ${userId}` : ''}.</div>
      )}

      {modules.map((mod) => (
        <div
          key={mod.id}
          className="
            bg-[#e0e0e0] border border-gray-400 
            rounded-2xl px-4 sm:px-6 py-3 sm:py-4 
            flex flex-col gap-2 shadow-sm
          "
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-base sm:text-lg font-semibold">{mod.id === 'unknown' ? 'Módulo (sin id)' : `Módulo ${mod.id}`}{userId ? ` (Usuario ${userId})` : ''}</span>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="border border-gray-600 rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm bg-[#d9d9d9]">{mod.completados}/{mod.avances.length}</span>
              <input
                type="checkbox"
                checked={mod.avg >= 99.99}
                readOnly
                className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-gray-500 rounded-md focus:ring-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className={`h-3 bg-blue-500 rounded-full transition-all duration-300`}
                style={{ width: `${Math.min(100, Math.max(0, mod.avg))}%` }}
              ></div>
            </div>
            <div className="w-14 text-right text-sm font-medium">{mod.avg}%</div>
          </div>

          <div className="text-xs text-slate-600">{mod.avances.length} avance(s) registrado(s)</div>
        </div>
      ))}
    </div>
  );
};
