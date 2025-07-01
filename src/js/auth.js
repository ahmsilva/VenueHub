// js/auth.js

/**
 * Gerenciamento de Autenticação (usando sessionStorage)
 */
export const auth = {
    // ALTERADO: Salva o objeto do usuário como uma string JSON
    login: (userObject) => sessionStorage.setItem('user', JSON.stringify(userObject)),
    
    // ALTERADO: Remove o objeto do usuário
    logout: () => sessionStorage.removeItem('user'),
    
    // NOVO: Retorna o objeto do usuário logado (ou null)
    getUser: () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    // ALTERADO: Mantém a mesma funcionalidade, mas usa a nova função
    getUserId: () => {
        const user = auth.getUser();
        return user ? user.id : null;
    },

    // ALTERADO: Verifica se o objeto do usuário existe na sessão
    isLoggedIn: () => !!sessionStorage.getItem('user'),
};