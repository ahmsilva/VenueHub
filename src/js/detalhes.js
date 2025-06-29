document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const localId = urlParams.get('id');
    
    if (localId) {
        fetch('../js/data.js')
            .then(response => response.text())
            .then(data => {
                // Extrai o array lugaresDestaque do arquivo data.js
                const lugaresDestaque = eval(data.split('const lugaresDestaque = ')[1].split(';')[0]);
                const local = lugaresDestaque.find(l => l.id == localId);
                
                if (local) {
                    carregarDetalhesLocal(local);
                } else {
                    window.location.href = '../index.html';
                }
            });
    } else {
        window.location.href = '../index.html';
    }
});

function carregarDetalhesLocal(local) {
    // Atualiza breadcrumb
    document.getElementById('breadcrumb-categoria').textContent = local.tipo;
    document.getElementById('breadcrumb-categoria').href = `../index.html?tipo=${encodeURIComponent(local.tipo)}`;
    document.getElementById('breadcrumb-local').textContent = local.nome;
    
    // Foto principal
    document.getElementById('foto-principal').src = local.imagem;
    document.getElementById('foto-principal').alt = local.nome;
    
    // Galeria de fotos (simulando múltiplas fotos)
    const galeria = document.getElementById('galeria-fotos');
    for (let i = 0; i < 5; i++) {
        galeria.innerHTML += `
            <div class="col-4 col-md-3">
                <a href="${local.imagem}" data-lightbox="galeria" data-title="${local.nome}">
                    <img src="${local.imagem}" class="img-fluid" alt="Foto ${i+1}">
                </a>
            </div>
        `;
    }
    
    // Informações básicas
    document.getElementById('nome-local').textContent = local.nome;
    document.getElementById('avaliacao').textContent = `${local.avaliacao} ⭐`;
    document.getElementById('endereco').textContent = `${local.bairro}, ${local.localidade}`;
    document.getElementById('descricao').innerHTML = `<p>${local.descricao}</p>`;
    document.getElementById('capacidade').textContent = `${local.capacidade} pessoas`;
    document.getElementById('preco').textContent = `R$ ${local.preco.toLocaleString('pt-BR')}`;
    document.getElementById('tipo').textContent = local.tipo;
    document.getElementById('horario').textContent = "08:00 - 00:00"; // Simulado
    
    // Comodidades (simuladas)
    const comodidades = [
        { nome: "Estacionamento", icone: "bi-car-front-fill" },
        { nome: "Wi-Fi", icone: "bi-wifi" },
        { nome: "Ar Condicionado", icone: "bi-snow" },
        { nome: "Cozinha", icone: "bi-egg-fried" },
        { nome: "Acessibilidade", icone: "bi-wheelchair" }
    ];
    
    const comodidadesContainer = document.getElementById('comodidades');
    comodidades.forEach(comodidade => {
        comodidadesContainer.innerHTML += `
            <div class="col-auto">
                <span class="comodidade-badge">
                    <i class="bi ${comodidade.icone}"></i>
                    ${comodidade.nome}
                </span>
            </div>
        `;
    });
    
    // Link para o Google Maps
    document.getElementById('link-maps').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.nome + ' ' + local.bairro + ' ' + local.localidade)}`;
    
    // Inicializa o mapa (simulado)
    initMap(local);
}

function initMap(local) {
    // Simulação do mapa - na implementação real use a API do Google Maps
    const mapa = document.getElementById('mapa');
    mapa.innerHTML = `
        <div style="height: 100%; display: flex; align-items: center; justify-content: center; background-color: #eee; color: #666;">
            <div class="text-center p-4">
                <i class="bi bi-map" style="font-size: 2rem;"></i>
                <p class="mt-2">Mapa interativo de ${local.nome}</p>
                <small>Localização: ${local.bairro}, ${local.localidade}</small>
            </div>
        </div>
    `;
}