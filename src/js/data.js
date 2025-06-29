// src/js/data.js
import { buscarLocais } from './api.js';

// Função para filtrar os locais (agora feita no servidor)
async function filtrarLocais(filtros) {
  try {
    return await buscarLocais(filtros);
  } catch (error) {
    console.error("Erro ao filtrar locais:", error);
    return [];
  }
}

// Função para carregar os destaques
export async function carregarDestaques(filtros = {}) {
  const container = document.getElementById('destaques-container');
  
  if (!container) return;
  
  try {
    const locais = await filtrarLocais(filtros);
    let html = '';
    
    if (locais.length === 0) {
      html = `
        <div class="col-12 text-center py-5">
          <h3 class="text-muted">Nenhum local encontrado com esses filtros</h3>
          <button class="btn btn-outline-primary mt-3" onclick="carregarDestaques()">Limpar filtros</button>
        </div>
      `;
    } else {
      locais.forEach(lugar => {
        html += `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm border-0">
              <a href="src/pages/detalhes.html?id=${lugar.id}" class="text-decoration-none">
                <img src="${lugar.imagem}" class="card-img-top" alt="${lugar.nome}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <h5 class="card-title text-dark">${lugar.nome}</h5>
                    <span class="badge bg-primary">${lugar.avaliacao} ⭐</span>
                  </div>
                  <p class="card-text text-muted">${lugar.descricao}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-primary fw-bold">R$ ${lugar.preco.toLocaleString('pt-BR')}</span>
                    <span class="badge bg-light text-dark">${lugar.capacidade} pessoas</span>
                  </div>
                </div>
                <div class="card-footer bg-white border-top-0">
                  <div class="d-grid">
                    <button class="btn btn-outline-primary">Ver Detalhes</button>
                  </div>
                </div>
              </a>
            </div>
          </div>
        `;
      });
    }
    
    container.innerHTML = html;
  } catch (error) {
    console.error("Erro ao carregar destaques:", error);
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <h3 class="text-danger">Erro ao carregar locais</h3>
        <p>Por favor, tente novamente mais tarde</p>
      </div>
    `;
  }
}

// Atualiza os selects com opções dinâmicas
export async function atualizarOpcoesFiltros() {
  try {
    const locais = await buscarLocais();
    
    const tipos = [...new Set(locais.map(l => l.tipo))];
    const localidades = [...new Set(locais.map(l => l.localidade))];
    
    const tipoSelect = document.getElementById('filtro-tipo');
    const localidadeSelect = document.getElementById('filtro-localidade');
    const bairroSelect = document.getElementById('filtro-bairro');
    
    // Preenche tipos
    tipos.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo;
      option.textContent = tipo;
      tipoSelect.appendChild(option);
    });
    
    // Preenche localidades
    localidades.forEach(localidade => {
      const option = document.createElement('option');
      option.value = localidade;
      option.textContent = localidade;
      localidadeSelect.appendChild(option);
    });
    
    // Atualiza bairros quando muda localidade
    localidadeSelect.addEventListener('change', function() {
      const bairros = [...new Set(locais
        .filter(l => l.localidade === this.value)
        .map(l => l.bairro))];
      
      bairroSelect.innerHTML = '<option value="">Bairro Espaço</option>';
      bairros.forEach(bairro => {
        const option = document.createElement('option');
        option.value = bairro;
        option.textContent = bairro;
        bairroSelect.appendChild(option);
      });
    });
  } catch (error) {
    console.error("Erro ao carregar opções de filtro:", error);
  }
}

// Função para aplicar filtros
export function aplicarFiltros() {
  const filtros = {
    tipo: document.getElementById('filtro-tipo').value,
    localidade: document.getElementById('filtro-localidade').value,
    bairro: document.getElementById('filtro-bairro').value,
    capacidade: document.getElementById('filtro-capacidade').value
  };
  
  carregarDestaques(filtros);
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', async () => {
  await carregarDestaques();
  await atualizarOpcoesFiltros();
  
  // Torna a função global para ser chamada pelo botão
  window.aplicarFiltros = aplicarFiltros;
});