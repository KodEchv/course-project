// Servicio de autenticación para login
export interface User {
  id: string;
  name: string;
  role: string;
}


const API_URL = import.meta.env.VITE_API_URL;

export async function login(username: string): Promise<User> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/logout`, { method: 'POST' });
}
