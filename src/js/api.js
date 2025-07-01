// js/api.js

const API_URL = 'https://venuehub-mz9o.onrender.com/';

/**
 * Funções para comunicar com o json-server
 */
export const api = {
    get: (endpoint) => fetch(`${API_URL}${endpoint}`).then(res => res.ok ? res.json() : Promise.reject(res)),
    
    post: (endpoint, data) => fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.ok ? res.json() : Promise.reject(res)),

    put: (endpoint, data) => fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.ok ? res.json() : Promise.reject(res)),

    delete: (endpoint) => fetch(`${API_URL}${endpoint}`, { method: 'DELETE' })
                          .then(res => res.ok ? res.json() : Promise.reject(res)),
};
