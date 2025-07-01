// src/js/main.js

import { api } from './api.js';
import { auth } from './auth.js';
import { templates } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-root');
    let allVenues = []; // Armazena todos os locais para filtrar no lado do cliente
    let phoneMask, priceMask; // Variáveis para guardar as instâncias das máscaras

    /**
     * Renderiza os cards dos locais na grade.
     * @param {Array} venues - A lista de locais a ser renderizada.
     */
    const renderVenues = (venues) => {
        const grid = document.getElementById('venues-grid');
        const noResults = document.getElementById('no-results');
        if (!grid) return;

        grid.innerHTML = venues.map(templates.venueCard).join('');
        
        if (venues.length === 0) {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    };

    /**
     * Aplica os filtros à lista de locais.
     */
    const applyFilters = () => {
        const locationFilter = document.getElementById('filter-location').value.toLowerCase();
        const categoryFilter = document.getElementById('filter-category').value;
        const dateFilter = document.getElementById('filter-date').value;
        const amenitiesFilter = Array.from(document.querySelectorAll('input[name="amenity"]:checked')).map(cb => cb.value);

        const filteredVenues = allVenues.filter(venue => {
            const locationMatch = venue.cidade.toLowerCase().includes(locationFilter);
            const categoryMatch = !categoryFilter || (venue.categorias || []).includes(categoryFilter);
            const dateMatch = !dateFilter || !(venue.unavailable_dates || []).includes(dateFilter);
            const amenitiesMatch = amenitiesFilter.every(amenity => (venue.amenities || []).includes(amenity));
            return locationMatch && categoryMatch && dateMatch && amenitiesMatch;
        });

        renderVenues(filteredVenues);
    };

    /**
     * Configura os listeners para a barra de filtros.
     */
    const setupFilterListeners = () => {
        const filterForm = document.getElementById('filter-form');
        const clearButton = document.getElementById('clear-filters-btn');

        if (filterForm) {
            filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                applyFilters();
            });
        }
        if(clearButton) {
            clearButton.addEventListener('click', () => {
                filterForm.reset();
                // Força a atualização da UI dos checkboxes de amenities
                document.querySelectorAll('#amenities-list input[type="checkbox"]').forEach(cb => {
                    cb.checked = false;
                });
                renderVenues(allVenues);
            });
        }
    };

    /**
     * Aplica máscaras aos campos do formulário.
     */
    const setupFormMasks = () => {
        const phoneInput = document.getElementById('form-telefone');
        const priceInput = document.getElementById('form-preco');

        if (phoneInput) {
            phoneMask = IMask(phoneInput, { mask: '(00) 00000-0000' });
        }
        if (priceInput) {
            priceMask = IMask(priceInput, {
                mask: 'R$ num',
                blocks: {
                    num: {
                        mask: Number,
                        thousandsSeparator: '.',
                        scale: 2,
                        radix: ',',
                        padFractionalZeros: true,
                        min: 0
                    }
                }
            });
        }
    };

    /**
     * Roteador: Controla qual "página" é exibida com base na URL hash
     */
    const router = async () => {
        // Limpa as instâncias de máscaras ao trocar de página para evitar erros
        if (phoneMask) phoneMask.destroy();
        if (priceMask) priceMask.destroy();

        appRoot.innerHTML = templates.loading();
        const path = location.hash || '#home';
        
        try {
            if (path === '#home') {
                appRoot.innerHTML = templates.homePage();
                // Na home, mostramos apenas alguns locais em destaque
                const venues = await api.get('/locais?_limit=3');
                const grid = document.getElementById('venues-grid');
                if(grid) {
                    grid.innerHTML = venues.map(templates.venueCard).join('');
                }
            } else if (path === '#locais') {
                appRoot.innerHTML = templates.allVenuesPage();
                allVenues = await api.get('/locais');
                renderVenues(allVenues);
                setupFilterListeners();
            } else if (path.startsWith('#venues/') && !path.endsWith('/edit')) {
                const id = path.split('/')[1];
                const venue = await api.get(`/locais/${id}`);
                // CORREÇÃO 1: Comparar IDs como strings
                const isOwner = auth.isLoggedIn() && auth.getUserId() === venue.usuarioId;
                appRoot.innerHTML = templates.venueDetailsPage(venue, isOwner);
            } else if (path === '#login') {
                if (auth.isLoggedIn()) return location.hash = '#profile';
                appRoot.innerHTML = templates.loginPage();
            } else if (path === '#register') {
                if (auth.isLoggedIn()) return location.hash = '#profile';
                appRoot.innerHTML = templates.registerPage();
            } else if (path === '#new-venue' || (path.startsWith('#venues/') && path.endsWith('/edit'))) {
                if (!auth.isLoggedIn()) return location.hash = '#login';
                
                let venue = {};
                if (path.endsWith('/edit')) {
                    const id = path.split('/')[1];
                    venue = await api.get(`/locais/${id}`);
                    // CORREÇÃO 2: Comparar IDs como strings para permissão de edição
                    if (auth.getUserId() !== venue.usuarioId) {
                        alert('Você não tem permissão para editar este local.');
                        return location.hash = '#home';
                    }
                }
                
                appRoot.innerHTML = templates.venueFormPage(venue);
                setupFormMasks(); // Aplica as máscaras
            } else if (path === '#profile') {
                if (!auth.isLoggedIn()) return location.hash = '#profile';
                const userId = auth.getUserId();
                const user = await api.get(`/usuarios/${userId}`);
                const venues = await api.get(`/locais?usuarioId=${userId}`);
                appRoot.innerHTML = templates.profilePage(user, venues);
            } else {
                location.hash = '#home';
            }
        } catch (error) {
            console.error('Erro no roteador:', error);
            appRoot.innerHTML = templates.error(error.statusText || 'Não foi possível carregar o conteúdo. Verifique se o json-server está rodando.');
        }
    };

    /**
     * Handlers de Eventos
     */
    const setupEventListeners = () => {
        appRoot.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Handler de Login
            if (e.target.id === 'login-form') {
                const email = e.target.email.value;
                const password = e.target.password.value;
                const users = await api.get(`/usuarios?email=${email}&senha=${password}`);
                const errorMessageDiv = document.getElementById('error-message');
                if (users.length > 0) {
                    auth.login(users[0].id);
                    updateNav();
                    location.hash = '#profile';
                } else {
                    errorMessageDiv.textContent = 'Email ou senha inválidos.';
                    errorMessageDiv.classList.remove('hidden');
                }
            }

            // Handler de Cadastro
            if (e.target.id === 'register-form') {
                const name = e.target.name.value;
                const email = e.target.email.value;
                const password = e.target.password.value;
                const existingUsers = await api.get(`/usuarios?email=${email}`);
                const errorMessageDiv = document.getElementById('error-message');
                if (existingUsers.length > 0) {
                    errorMessageDiv.textContent = 'Este email já está cadastrado.';
                    errorMessageDiv.classList.remove('hidden');
                } else {
                    const newUser = await api.post('/usuarios', { nome: name, email, senha: password });
                    auth.login(newUser.id);
                    updateNav();
                    location.hash = '#profile';
                }
            }

            // Handler de Formulário de Local (Criar/Editar)
            if (e.target.id === 'venue-form') {
                const venueId = e.target.dataset.venueId;
                const imageName = e.target.imagem.value;
                const imageUrl = `./src/img/${imageName}`;

                const selectedCategories = Array.from(document.querySelectorAll('input[name="categoria"]:checked'))
                                                .map(cb => cb.value);

                const formData = {
                    nome: e.target.nome.value,
                    endereco: e.target.endereco.value,
                    cidade: e.target.cidade.value,
                    estado: e.target.estado.value.toUpperCase(),
                    capacidade: parseInt(e.target.capacidade.value),
                    telefone: phoneMask.unmaskedValue,
                    preco: priceMask.unmaskedValue,
                    imagemUrl: imageUrl,
                    descricao: e.target.descricao.value,
                    categorias: selectedCategories,
                    // CORREÇÃO 3: Salvar o ID do usuário como string
                    usuarioId: auth.getUserId(),
                    amenities: [], // Em um formulário real, coletaríamos isso
                    unavailable_dates: [] // Em um formulário real, coletaríamos isso
                };

                try {
                    if (venueId) {
                        await api.put(`/locais/${venueId}`, formData);
                        alert('Local atualizado com sucesso!');
                        location.hash = `#venues/${venueId}`;
                    } else {
                        const newVenue = await api.post('/locais', formData);
                        alert('Local anunciado com sucesso!');
                        location.hash = `#venues/${newVenue.id}`;
                    }
                } catch (err) {
                    console.error('Erro ao salvar local:', err);
                    alert('Ocorreu um erro. Tente novamente.');
                }
            }
        });

        // Handler para o modal de exclusão
        let venueIdToDelete = null;
        const modal = document.getElementById('delete-modal');
        
        appRoot.addEventListener('click', e => {
            if (e.target.classList.contains('delete-btn')) {
                venueIdToDelete = e.target.dataset.venueId;
                modal.classList.remove('hidden');
            }
        });

        document.getElementById('cancel-delete-btn').addEventListener('click', () => {
            modal.classList.add('hidden');
            venueIdToDelete = null;
        });

        document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
            if (venueIdToDelete) {
                try {
                    await api.delete(`/locais/${venueIdToDelete}`);
                    alert('Local excluído com sucesso!');
                    modal.classList.add('hidden');
                    location.hash = '#profile';
                } catch (err) {
                    console.error('Erro ao excluir:', err);
                    alert('Não foi possível excluir o local.');
                }
            }
        });
    };

    /**
     * Atualização da Navegação
     */
    const updateNav = () => {
    const navLinks = document.getElementById('nav-links');
    const mobileNavLinks = document.getElementById('mobile-nav-links');
    const isLoggedIn = auth.isLoggedIn();

    const commonLinks = `
        <a href="#home" class="text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-sm font-medium">Home</a>
        <a href="#locais" class="text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-sm font-medium">Explorar</a>
    `;
    const loggedOutLinks = `
        <a href="#login" class="text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-sm font-medium">Login</a>
        <a href="#register" class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#134556] bg-[#e8f3f6] hover:bg-[#d0e9f0]">Cadastro</a>
    `;
    const loggedInLinks = `
        <a href="#profile" class="text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-sm font-medium">Meu Perfil</a>
        <a href="#" id="logout-btn" class="text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-sm font-medium">Sair</a>
    `;
    
    const mobileCommon = `
        <a href="#home" class="block text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-base font-medium">Home</a>
        <a href="#locais" class="block text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-base font-medium">Explorar</a>
    `;
    const mobileLoggedOut = `
        <a href="#login" class="block text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-base font-medium">Login</a>
        <a href="#register" class="block text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-base font-medium">Cadastro</a>`;
    const mobileLoggedIn = `
        <a href="#profile" class="block text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-base font-medium">Meu Perfil</a>
        <a href="#" id="mobile-logout-btn" class="block text-gray-700 hover:text-[#195a6f] px-3 py-2 rounded-md text-base font-medium">Sair</a>`;

    navLinks.innerHTML = isLoggedIn ? commonLinks + loggedInLinks : commonLinks + loggedOutLinks;
    mobileNavLinks.innerHTML = isLoggedIn ? mobileCommon + mobileLoggedIn : mobileCommon + mobileLoggedOut;

    document.querySelectorAll('#logout-btn, #mobile-logout-btn').forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
            updateNav();
            location.hash = '#home';
        });
    });

    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });
};

    /**
     * Inicialização da Aplicação
     */
    const init = () => {
        window.addEventListener('hashchange', router);
        window.addEventListener('load', router);
        setupEventListeners();
        updateNav();
    };

    init();
});