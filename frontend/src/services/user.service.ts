import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8000';

class UserService {
    getPublicContent() {
        return axios.post(API_URL + '/categorie/new');
    }

    getUserBoard() {
        return axios.get(API_URL + '/user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + '/mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + '/admin', { headers: authHeader() });
    }
    getUsers() {
        return axios.get(API_URL + '/utilisateur', { headers: authHeader() });
    }
    getTasks() {
        return axios.get(API_URL + '/tache', { headers: authHeader() });
    }
    getCategories() {
        return axios.get(API_URL + '/categorie', { headers: authHeader() });
    }
    getPriorities() {
        return axios.get(API_URL + '/priorite', { headers: authHeader() });
    }
    getStatuts() {
        return axios.get(API_URL + '/statut', { headers: authHeader() });
    }
}

export default new UserService();