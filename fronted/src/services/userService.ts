// Obtener persona por ID
export async function getPersonaById(id: number | string): Promise<{ Nombres: string; Cedula: string; Correo: string; Telefono: string }> {
  const response = await fetch(`${API_URL}/personas/${id}`);
  if (!response.ok) {
    throw new Error('No se pudo obtener la persona');
  }
  return response.json();
}
// Servicio para obtener usuarios
export interface User {
  id: string;
  name: string;
  role: string;
}


const API_URL = import.meta.env.VITE_API_URL;

// Crear persona
export async function createPersona(persona: { Nombres: string; Cedula: string; Correo: string; Telefono: string }): Promise<any> {
  const response = await fetch(`${API_URL}/personas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(persona)
  });
  if (!response.ok) {
    throw new Error('No se pudo crear la persona');
  }
  return response.json();
}

// Crear usuario
export async function createUsuario(usuario: { rol: string; ID_Persona: number }): Promise<any> {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  if (!response.ok) {
    throw new Error('No se pudo crear el usuario');
  }
  return response.json();
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/usuarios`);
  if (!response.ok) {
    throw new Error('No se pudieron obtener los usuarios');
  }
  return response.json();
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('No se pudo eliminar el usuario');
  }

  const response2 = await fetch(`${API_URL}/personas/${id}`, {
    method: 'DELETE'
  });
  if (!response2.ok) {
    throw new Error('No se pudo eliminar la persona asociada');
  }
}
