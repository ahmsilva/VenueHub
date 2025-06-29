import { buscarLocais } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('lista-locais');
  container.innerHTML = '<p>Carregando...</p>';

  try {
    const locais = await buscarLocais();
    if(locais.length === 0) {
      container.innerHTML = '<p>Nenhum local cadastrado.</p>';
      return;
    }

    container.innerHTML = '';
    locais.forEach(l => {
      const div = document.createElement('div');
      div.className = 'local-card';
      div.innerHTML = `
        <img src="${l.imagem}" alt="${l.nome}">
        <h3>${l.nome}</h3>
        <p>${l.bairro} - ${l.localidade}</p>
        <a href="detalhes.html?id=${l.id}">Ver detalhes</a>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    container.innerHTML = '<p>Erro ao carregar locais.</p>';
    console.error(err);
  }
});
