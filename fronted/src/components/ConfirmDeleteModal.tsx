interface ConfirmDeleteModalProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
}

export const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }: ConfirmDeleteModalProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
                <h2 className="text-lg font-bold mb-4 text-[#0D1B2A]">
                    ¿Seguro que quieres eliminar este elemento?
                </h2>
                <p className="text-gray-600 mb-6">
                    Esta acción eliminará todos los elementos dependientes.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}
