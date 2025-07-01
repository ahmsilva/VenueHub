// js/auth.js

/**
 * Gerenciamento de Autenticação (usando sessionStorage)
 */
export const auth = {
    login: (userId) => sessionStorage.setItem('userId', userId),
    logout: () => sessionStorage.removeItem('userId'),
    getUserId: () => sessionStorage.getItem('userId'),
    isLoggedIn: () => !!sessionStorage.getItem('userId'),
};
