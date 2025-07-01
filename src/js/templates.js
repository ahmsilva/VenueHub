// src/js/templates.js

// NOVO: Importa o módulo de autenticação para usar nas lógicas de template
import { auth } from './auth.js';

const allAmenities = ["Cozinha Equipada", "Ar Condicionado", "Wi-Fi", "Estacionamento", "Área Externa", "Permite Pets", "Projetor", "Acessibilidade", "Piscina"];
const allCategories = ["Casamento", "Aniversário", "Corporativo", "Palestra", "Ao ar livre", "Show/Concerto"];

/**
 * Formata um valor numérico como moeda brasileira (BRL).
 * @param {string} value - O valor a ser formatado.
 * @returns {string} O valor formatado como moeda.
 */
const formatPrice = (value) => {
    if (!value) return 'Preço a consultar';
    const number = parseFloat(value);
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
};

/**
 * Formata um número de telefone.
 * @param {string} value - O número de telefone não formatado.
 * @returns {string} O telefone formatado.
 */
const formatPhone = (value) => {
    if (!value || value.length < 10) return 'Telefone indisponível';
    const cleanValue = String(value).replace(/\D/g, '');
    const ddd = cleanValue.substring(0, 2);
    const part1 = cleanValue.length === 11 ? cleanValue.substring(2, 7) : cleanValue.substring(2, 6);
    const part2 = cleanValue.length === 11 ? cleanValue.substring(7, 11) : cleanValue.substring(6, 10);
    return `(${ddd}) ${part1}-${part2}`;
};


/**
 * Funções que geram o HTML para cada "página"
 */
export const templates = {
    // Template para a barra de filtros
    filterBar: () => `
        <div id="filter-bar">
            <form id="filter-form" class="!p-0 !shadow-none !bg-transparent">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label for="filter-location" class="block text-sm font-medium text-gray-700">Localização (Cidade)</label>
                        <input type="text" id="filter-location" placeholder="Ex: Belo Horizonte" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                    <div>
                        <label for="filter-category" class="block text-sm font-medium text-gray-700">Tipo de Evento</label>
                        <select id="filter-category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Todos</option>
                            ${allCategories.map(cat => `<option>${cat}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label for="filter-date" class="block text-sm font-medium text-gray-700">Data Disponível</label>
                        <input type="date" id="filter-date" min="${new Date().toISOString().split('T')[0]}" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Estrutura Disponível</label>
                    <div id="amenities-list" class="flex flex-wrap gap-2">
                        ${allAmenities.map(amenity => `
                            <label>
                                <input type="checkbox" name="amenity" value="${amenity}">
                                <span class="bg-gray-200 text-gray-800 py-1 px-3 rounded-full cursor-pointer transition">${amenity}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="flex items-center justify-end space-x-4 pt-4 border-t">
                    <button type="button" id="clear-filters-btn" class="text-sm font-semibold text-gray-600 hover:text-gray-900">Limpar Filtros</button>
                    <button type="submit" class="btn btn-primary">Aplicar Filtros</button>
                </div>
            </form>
        </div>
    `,
    // Template para um card de local
    venueCard: (venue) => `
        <div class="venue-card">
            <a href="#venues/${venue.id}" class="block overflow-hidden">
                <img src="${venue.imagemUrl}" alt="Imagem de ${venue.nome}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/cbd5e0?text=Imagem+Indisponível';">
            </a>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800 truncate">
                    <a href="#venues/${venue.id}">${venue.nome}</a>
                </h3>
                <p class="text-sm text-gray-500 mt-1 truncate">${venue.cidade}, ${venue.estado}</p>
                <p class="text-lg font-bold text-[#195a6f] mt-2">${formatPrice(venue.preco)}</p>
                <div class="mt-3 flex items-center justify-between">
                    <span class="text-sm text-gray-600">Capacidade: ${venue.capacidade}</span>
                    <a href="#venues/${venue.id}" class="text-sm font-medium text-[#195a6f] hover:text-[#134556]">Ver Detalhes &rarr;</a>
                </div>
            </div>
        </div>
    `,
    // Template da Página Inicial
    homePage: () => `
        <div>
            <div id="hero-banner" class="text-center">
                <h1 class="text-4xl md:text-6xl font-black text-white fade-in">Encontre o seu lugar perfeito</h1>
                <p class="mt-4 text-lg text-white/90 max-w-2xl mx-auto fade-in">Explore locais incríveis para todos os tipos de eventos.</p>
                <a href="#locais" class="btn btn-primary mt-8 fade-in">Explorar Locais</a>
            </div>
            <div class="py-16">
                <h2 class="text-center text-3xl font-bold text-gray-800 mb-2">Locais em Destaque</h2>
                <p class="text-center text-gray-500 mb-10">Uma seleção dos nossos melhores espaços para você.</p>
                <div id="venues-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    </div>
            </div>
        </div>
    `,
    // Template para a nova página de todos os locais
    allVenuesPage: () => `
        <div>
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-800 tracking-tight sm:text-5xl fade-in">Todos os Locais</h1>
                <p class="mt-4 text-lg text-gray-600 fade-in">Use os filtros para encontrar o espaço ideal para o seu próximo evento.</p>
            </div>
            ${templates.filterBar()}
            <div id="venues-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                </div>
             <div id="no-results" class="hidden text-center text-gray-500 bg-gray-100 p-8 rounded-lg">
                Nenhum local encontrado com os filtros selecionados.
            </div>
        </div>
    `,
    // Template da Página de Detalhes do Local
    venueDetailsPage: (venue, owner) => `
        <div class="fade-in bg-white rounded-lg shadow-xl overflow-hidden">
            <img src="${venue.imagemUrl}" alt="Imagem de ${venue.nome}" class="w-full h-64 sm:h-96 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/1200x600/e2e8f0/cbd5e0?text=Imagem+Indisponível';">
            <div class="p-6 md:p-8">
                <div class="md:flex justify-between items-start">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">${venue.nome}</h1>
                        <p class="text-md text-gray-500 mt-1">${venue.endereco}, ${venue.cidade} - ${venue.estado}</p>
                    </div>
                    <div class="mt-4 md:mt-0 text-left md:text-right">
                        <span class="text-3xl font-bold text-[#195a6f]">${formatPrice(venue.preco)}</span>
                        <p class="text-sm text-gray-500">por evento</p>
                    </div>
                </div>
                
                <div class="mt-6 border-t pt-6">
                    <h2 class="text-xl font-semibold text-gray-800">Sobre o local</h2>
                    <p class="mt-2 text-gray-600 leading-relaxed">${venue.descricao}</p>
                </div>

                 <div class="mt-6 border-t pt-6">
                    <h2 class="text-xl font-semibold text-gray-800">Estrutura</h2>
                    <div class="mt-3 flex flex-wrap gap-2">
                        ${(venue.amenities || []).map(item => `<span class="bg-[#e8f3f6] text-[#134556] text-xs font-medium px-2.5 py-0.5 rounded-full">${item}</span>`).join('')}
                    </div>
                </div>

                <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <span class="text-sm text-gray-500">Capacidade</span>
                        <p class="font-bold text-lg text-gray-800">${venue.capacidade} pessoas</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <span class="text-sm text-gray-500">Contato</span>
                        <p class="font-bold text-lg text-gray-800">${formatPhone(venue.telefone)}</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-lg col-span-2 sm:col-span-1">
                        <span class="text-sm text-gray-500">Categorias</span>
                        <p class="font-bold text-lg text-gray-800 truncate">${(venue.categorias || []).join(', ')}</p>
                    </div>
                </div>

                ${ // ALTERADO: Permite que o proprietário OU o admin vejam os botões
                  (owner || (auth.getUser() && auth.getUser().role === 'admin')) ? `
                <div class="mt-8 border-t pt-6 flex items-center space-x-4">
                    <a href="#venues/${venue.id}/edit" class="btn btn-primary">Editar</a>
                    <button data-venue-id="${venue.id}" class="delete-btn btn btn-danger">Excluir</button>
                </div>
                ` : ''}
            </div>
        </div>
    `,
    // Template para formulário de Login
    loginPage: () => `
        <div class="fade-in flex justify-center">
            <div class="w-full max-w-md">
                <form id="login-form">
                    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                    <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert"></div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="email" type="email" placeholder="seu@email.com" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Senha</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none" id="password" type="password" placeholder="******************" required>
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="btn btn-primary w-full" type="submit">
                            Entrar
                        </button>
                    </div>
                    <p class="text-center text-sm text-gray-600 mt-6">
                        Não tem conta? <a class="font-medium text-[#195a6f] hover:text-[#217a94]" href="#register">Cadastre-se</a>
                    </p>
                </form>
            </div>
        </div>
    `,
    // ALTERADO: Template para formulário de Cadastro com seleção de papel
    registerPage: () => `
         <div class="fade-in flex justify-center">
            <div class="w-full max-w-md">
                <form id="register-form">
                    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crie sua Conta</h2>
                    <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert"></div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nome Completo</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="name" type="text" placeholder="Seu Nome" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="email" type="email" placeholder="seu@email.com" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Senha</label>
                        <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none" id="password" type="password" placeholder="******************" required>
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Qual o seu objetivo?</label>
                        <div class="flex items-center space-x-4">
                            <label class="flex items-center">
                                <input type="radio" name="role" value="usuario" class="form-radio" checked>
                                <span class="ml-2">Buscar um local para evento</span>
                            </label>
                            <label class="flex items-center">
                                <input type="radio" name="role" value="proprietario" class="form-radio">
                                <span class="ml-2">Anunciar um local</span>
                            </label>
                        </div>
                    </div>

                    <div id="user-preferences-section" class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2">Quais tipos de eventos você mais procura?</label>
                        <div class="grid grid-cols-2 gap-2">
                            ${allCategories.map(cat => `
                                <label class="flex items-center space-x-2">
                                    <input type="checkbox" name="preferencia" value="${cat}" class="rounded border-gray-300 text-[#195a6f] shadow-sm">
                                    <span>${cat}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                         <button class="btn btn-primary w-full" type="submit">
                            Cadastrar
                        </button>
                    </div>
                     <p class="text-center text-sm text-gray-600 mt-6">
                        Já tem conta? <a class="font-medium text-[#195a6f] hover:text-[#217a94]" href="#login">Faça Login</a>
                    </p>
                </form>
            </div>
        </div>
    `,
    // Template para formulário de Anunciar/Editar Local
    venueFormPage: (venue = {}) => {
        const isEditing = !!venue.id;
        const imageName = isEditing ? venue.imagemUrl.split('/').pop() : '';

        return `
        <div class="fade-in flex justify-center">
            <div class="w-full max-w-2xl">
                <form id="venue-form" data-venue-id="${venue.id || ''}">
                    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">${isEditing ? 'Editar Local' : 'Anuncie Seu Local'}</h2>
                    <div class="space-y-6">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="nome">Nome do Local</label>
                            <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="nome" type="text" value="${venue.nome || ''}" required>
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="imagem">Nome do Arquivo de Imagem</label>
                            <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="imagem" type="text" placeholder="ex: meu-local.jpg" value="${imageName}" required>
                            <p class="text-xs text-gray-500 mt-1">A imagem deve ser adicionada manualmente na pasta 'src/img' do projeto.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="endereco">Endereço</label>
                                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="endereco" type="text" value="${venue.endereco || ''}" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="cidade">Cidade</label>
                                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="cidade" type="text" value="${venue.cidade || ''}" required>
                            </div>
                             <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="estado">Estado (UF)</label>
                                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="estado" type="text" value="${venue.estado || ''}" required maxlength="2">
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="capacidade">Capacidade (pessoas)</label>
                                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="capacidade" type="number" value="${venue.capacidade || ''}" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="telefone">Telefone</label>
                                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="form-telefone" type="tel" value="${venue.telefone || ''}" required placeholder="(00) 00000-0000">
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="preco">Preço</label>
                                <input class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="form-preco" type="text" value="${venue.preco || ''}" required placeholder="R$ 0,00">
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2">Categorias</label>
                            <div id="form-categories-list">
                                ${allCategories.map(cat => `
                                    <label class="flex items-center space-x-2">
                                        <input type="checkbox" name="categoria" value="${cat}" class="rounded border-gray-300 text-[#195a6f] shadow-sm" ${(venue.categorias || []).includes(cat) ? 'checked' : ''}>
                                        <span>${cat}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>

                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="descricao">Descrição</label>
                            <textarea class="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700" id="descricao" rows="4" required>${venue.descricao || ''}</textarea>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-end">
                        <button class="btn btn-primary" type="submit">
                            ${isEditing ? 'Salvar Alterações' : 'Anunciar Local'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `;
    },
    // Template da Página de Perfil do Proprietário
    profilePage: (user, venues) => `
        <div class="fade-in">
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h1 class="text-3xl font-bold text-gray-800">Perfil de ${user.nome}</h1>
                <p class="text-lg text-gray-600">${user.email}</p>
                <span class="mt-2 inline-block bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Proprietário</span>
            </div>

            <div class="mt-8">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Meus Locais Anunciados</h2>
                    <a href="#new-venue" class="btn btn-primary">Anunciar Novo Local</a>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="profile-venues-grid">
                    ${venues.length > 0 ? venues.map(templates.venueCard).join('') : '<p class="col-span-full text-gray-500 bg-gray-100 p-8 rounded-lg text-center">Você ainda não anunciou nenhum local.</p>'}
                </div>
            </div>
        </div>
    `,
    // NOVO: Template para o perfil do usuário comum
    userProfilePage: (user) => `
        <div class="fade-in">
            <div class="bg-white p-8 rounded-lg shadow-md mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Perfil de ${user.nome}</h1>
                <p class="text-lg text-gray-600">${user.email}</p>
                <span class="mt-2 inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">Usuário/Cliente</span>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Minhas Preferências de Evento</h2>
                <p class="text-gray-600 mb-4">Estes são os tipos de evento que você mais se interessa:</p>
                <div class="flex flex-wrap gap-2">
                    ${(user.preferencias && user.preferencias.length > 0) ? user.preferencias.map(p => `<span class="bg-gray-200 text-gray-800 py-1 px-3 rounded-full">${p}</span>`).join('') : '<p>Você ainda não definiu suas preferências.</p>'}
                </div>
                <button class="btn btn-primary mt-6">Editar Preferências</button>
            </div>
        </div>
    `,

    // NOVO: Templates para o Painel do Administrador
    adminUserRow: (user) => `
        <tr class="border-b">
            <td class="p-3">${user.nome}</td>
            <td class="p-3">${user.email}</td>
            <td class="p-3 capitalize">${user.role}</td>
            <td class="p-3">
                <button class="text-red-500 hover:text-red-700">Excluir</button>
            </td>
        </tr>
    `,
    adminVenueRow: (venue) => `
        <tr class="border-b">
            <td class="p-3"><a href="#venues/${venue.id}" class="text-blue-600 hover:underline">${venue.nome}</a></td>
            <td class="p-3">${venue.cidade}</td>
            <td class="p-3">
                <a href="#venues/${venue.id}/edit" class="text-blue-500 hover:text-blue-700 mr-4">Editar</a>
                <button data-venue-id="${venue.id}" class="delete-btn text-red-500 hover:text-red-700">Excluir</button>
            </td>
        </tr>
    `,
    adminDashboardPage: (user, allUsers, allVenues) => `
        <div class="fade-in">
            <div class="bg-white p-8 rounded-lg shadow-md mb-8">
                <h1 class="text-3xl font-bold text-gray-800">Painel do Administrador</h1>
                <p class="text-lg text-gray-600">Bem-vindo, ${user.nome}.</p>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Gerenciar Usuários</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="border-b"><th class="p-3">Nome</th><th class="p-3">Email</th><th class="p-3">Papel</th><th class="p-3">Ações</th></tr></thead>
                        <tbody>${allUsers.filter(u => u.id !== user.id).map(templates.adminUserRow).join('')}</tbody>
                    </table>
                </div>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Gerenciar Todos os Locais</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead><tr class="border-b"><th class="p-3">Nome do Local</th><th class="p-3">Cidade</th><th class="p-3">Ações</th></tr></thead>
                        <tbody>${allVenues.map(templates.adminVenueRow).join('')}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `,

    // Template de Loading
    loading: () => `<div class="text-center text-gray-500 py-16"><p>Carregando...</p></div>`,
    // Template de Erro
    error: (message) => `<div class="text-center text-red-500 bg-red-100 p-4 rounded-md"><p>Ocorreu um erro: ${message}</p></div>`,
};