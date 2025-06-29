import { buscarLocais, excluirLocal } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  
  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }

  // Preencher informações do usuário
  document.querySelector('.profile-info h1').textContent = usuario.nome;
  document.querySelector('.profile-info p').textContent = `Email: ${usuario.email}`;
  
  // Carregar locais do usuário (apenas para anunciantes)
  if (usuario.tipo === 'anunciante') {
    const locais = await buscarLocais({ proprietarioId: usuario.id });
    const anunciosContainer = document.getElementById('anuncios');
    anunciosContainer.innerHTML = '';
    
    locais.forEach(local => {
      anunciosContainer.innerHTML += `
        <div class="card">
          <h3>${local.nome}</h3>
          <p>Localização: ${local.bairro}, ${local.localidade}</p>
          <p>Capacidade: ${local.capacidade} pessoas</p>
          <div class="acoes">
            <button class="btn-editar" data-id="${local.id}">Editar</button>
            <button class="btn-excluir" data-id="${local.id}">Excluir</button>
          </div>
        </div>
      `;
    });
    
    // Adicionar event listeners para exclusão
    document.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        if (confirm('Tem certeza que deseja excluir este local?')) {
          await excluirLocal(id);
          btn.closest('.card').remove();
        }
      });
    });
  }
  
  // Botão Sair
  document.querySelector('.btn.danger').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = '../../index.html';
  });
});