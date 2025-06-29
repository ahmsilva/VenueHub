// src/js/api.js
const API_URL = "http://localhost:3000";

// Operações de Usuário
export const loginUsuario = async (email, senha) => {
  const response = await fetch(`${API_URL}/usuarios?email=${email}&senha=${senha}`);
  const usuarios = await response.json();
  return usuarios[0];
};

export const criarUsuario = async (usuario) => {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(usuario)
  });
  return await response.json();
};

// Operações de Locais
export const buscarLocais = async (filtros = {}) => {
  const query = new URLSearchParams(filtros).toString();
  const response = await fetch(`${API_URL}/locais?${query}`);
  return await response.json();
};

export const criarLocal = async (local) => {
  const response = await fetch(`${API_URL}/locais`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(local)
  });
  return await response.json();
};

export const atualizarLocal = async (id, dados) => {
  const response = await fetch(`${API_URL}/locais/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dados)
  });
  return await response.json();
};

export const excluirLocal = async (id) => {
  await fetch(`${API_URL}/locais/${id}`, {method: 'DELETE'});
};

// Operações de Reservas
export const criarReserva = async (reserva) => {
  const response = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(reserva)
  });
  return await response.json();
};

// Operações de Favoritos
export const adicionarFavorito = async (favorito) => {
  const response = await fetch(`${API_URL}/favoritos`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(favorito)
  });
  return await response.json();
};

export const removerFavorito = async (id) => {
  await fetch(`${API_URL}/favoritos/${id}`, {method: 'DELETE'});
};