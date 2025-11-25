import { useState } from "react";

export const ContentActions = ({
  onContinue,
  onFinish,
  onGrade,
  apiUrl,
}: {
  onContinue?: () => void;
  onFinish?: () => void;
  onGrade?: (password: string, ok: boolean) => void;
  apiUrl?: string; // opcional: base para validar admin
}) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmGrade = async () => {
    setSubmitting(true);
    setError(null);
    try {
      if (apiUrl) {
        // intentar validar contra backend (ruta asumida /admin/validate)
        const res = await fetch(`${apiUrl.replace(/\/+$/, "")}/admin/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          setError(body?.detail || "Contraseña inválida o error del servidor");
          onGrade?.(password, false);
          return;
        }

        onGrade?.(password, true);
      } else {
        // si no hay apiUrl, solo notificamos al callback
        onGrade?.(password, true);
      }
      setPassword("");
      setShowModal(false);
    } catch (e) {
      setError("Error al validar la contraseña");
      onGrade?.(password, false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      <button
        onClick={() => onContinue?.()}
        className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-sm text-sm"
      >
        Continuar
      </button>

      <button
        onClick={() => onFinish?.()}
        className="px-3 py-1 bg-green-500 text-white rounded-md shadow-sm text-sm"
      >
        Finalizar
      </button>

      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1 bg-amber-500 text-white rounded-md shadow-sm text-sm"
      >
        Calificar
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Autenticación requerida</h3>
            <p className="text-sm text-slate-600 mb-4">Introduce la contraseña del administrador para calificar.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
              placeholder="Contraseña de admin"
            />
            {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-200 rounded-md"
                disabled={submitting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmGrade}
                className="px-3 py-1 bg-amber-500 text-white rounded-md"
                disabled={submitting}
              >
                {submitting ? "Validando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
