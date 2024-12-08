import axios from 'axios';

// Configuration de l'URL de base pour les appels API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL du backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fonction pour obtenir les utilisateurs
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs', error);
    throw error;
  }
};