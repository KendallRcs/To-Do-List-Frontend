import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth/';

export const login = async (credentials) => {
    return await axios.post(`${API_URL}login`, credentials);
}

export const register = async (credentials) => {
    return await axios.post(`${API_URL}register`, credentials);
}