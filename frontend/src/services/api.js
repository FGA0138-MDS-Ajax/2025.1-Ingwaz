const API_BASE = 'http://192.168.15.10:8000/api';

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log('Erro ou sucesso no registro:', json); // 👈 mostra no console
  return json;
}

export async function loginUser(data) {
  const response = await fetch(`${API_BASE}/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  console.log('Resultado do login:', json); // opcional
  return json;
}
