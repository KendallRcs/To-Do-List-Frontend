import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tasks/';

export const getTasks = async (token) => {
    return await axios.get(`${API_URL}`, {
      headers: {Authorization: `Bearer ${token}`}
    });
}