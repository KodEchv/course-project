import React, { useState } from "react";

interface UserFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  createPersona: (persona: { Nombres: string; Cedula: string; Correo: string; Telefono: string }) => Promise<any>;
  createUsuario: (usuario: { rol: string; ID_Persona: number }) => Promise<any>;
}

export const UserForm: React.FC<UserFormProps> = ({ onSuccess, onCancel, createPersona, createUsuario }) => {
  const [form, setForm] = useState({ Nombres: '', Cedula: '', Correo: '', Telefono: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const persona = await createPersona(form);
      await createUsuario({ rol: 'user', ID_Persona: persona.ID_Persona });
      setSuccess('Usuario creado correctamente');
      setForm({ Nombres: '', Cedula: '', Correo: '', Telefono: '' });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#D9D9D9] p-6 rounded-2xl shadow-lg flex flex-col gap-4 min-w-[320px] border border-gray-200 instrument-sans">
      <h3 className="font-bold text-xl">CREAR USUARIO</h3>
      <input name="Nombres" placeholder="Nombres" value={form.Nombres} onChange={handleInputChange} className="border border-[#2e2e2e] rounded-xl px-3 py-2" required />
      <input name="Cedula" placeholder="Cédula" value={form.Cedula} onChange={handleInputChange} className="border border-[#2e2e2e] rounded-xl px-3 py-2" required />
      <input name="Correo" placeholder="Correo" value={form.Correo} onChange={handleInputChange} className="border border-[#2e2e2e] rounded-xl px-3 py-2" required />
      <input name="Telefono" placeholder="Teléfono" value={form.Telefono} onChange={handleInputChange} className="border border-[#2e2e2e] rounded-xl px-3 py-2" required />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {success && <span className="text-green-600 text-sm">{success}</span>}
      <div className="flex gap-2 justify-end">
        <button type="button" className="px-3 py-1 rounded-xl bg-gray-300" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="px-3 py-1 rounded-xl bg-blue-600 text-white" disabled={loading}>{loading ? 'Creando...' : 'Crear'}</button>
      </div>
    </form>
  );
};
