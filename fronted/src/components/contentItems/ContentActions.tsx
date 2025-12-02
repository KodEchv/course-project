import { useState } from "react";

type ActionType = "continuar" | "finalizar" | "calificar";

export const ContentActions = ({
  actionType = "continuar",
  onContinue,
  onFinish,
  onGrade,
  isBlocked = false,
}: {
  actionType?: ActionType;
  onContinue?: () => void;
  onFinish?: () => void;
  onGrade?: (password: string, ok: boolean) => void;
  isBlocked?: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmGrade = async () => {
    setSubmitting(true);
    setError(null);
    try {
      // Validar contraseña local (admin123)
      if (password !== "admin123") {
        setError("Contraseña incorrecta");
        onGrade?.(password, false);
        setSubmitting(false);
        return;
      }

      onGrade?.(password, true);
      setPassword("");
      setShowModal(false);
    } catch (e) {
      setError("Error al validar la contraseña");
      onGrade?.(password, false);
    } finally {
      setSubmitting(false);
    }
  };

  if (isBlocked) {
    return (
      <div className="w-full flex justify-end gap-2 mt-4">
        <button
          disabled
          className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md shadow-sm text-sm cursor-not-allowed"
        >
          Bloqueado
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-end gap-2 mt-4">
      {actionType === "continuar" && (
        <button
          onClick={() => onContinue?.()}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium transition"
        >
          Continuar
        </button>
      )}

      {actionType === "finalizar" && (
        <button
          onClick={() => onFinish?.()}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm text-sm font-medium transition"
        >
          Finalizar
        </button>
      )}

      {actionType === "calificar" && (
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md shadow-sm text-sm font-medium transition"
        >
          Calificar
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Autenticación de examen</h3>
            <p className="text-sm text-slate-600 mb-4">Introduce la contraseña del administrador para calificar este examen.</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmGrade()}
              className="w-full px-3 py-2 border border-slate-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Contraseña de admin"
              disabled={submitting}
            />
            {error && <div className="text-sm text-red-500 mb-3 font-medium">{error}</div>}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPassword("");
                  setError(null);
                }}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition"
                disabled={submitting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmGrade}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
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
