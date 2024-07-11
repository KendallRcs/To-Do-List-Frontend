import axios from 'axios';

const API_URL = 'http://localhost:4000/api/tasks/';

export const getTasks = async (token) => {
    return await axios.get(`${API_URL}`, {
      headers: {Authorization: `Bearer ${token}`}
    });
}

export const createTask = async (token, task) => {
    return await axios.post(`${API_URL}`, task, {
      headers: {Authorization: `Bearer ${token}`}
    });
}

export const editTask = async (token, task) => {
    return await axios.put(`${API_URL}${task.id}`, task, {
      headers: {Authorization: `Bearer ${token}`}
    });
}

export const deleteTask = async (token, taskId) => {
    return await axios.delete(`${API_URL}${taskId}`, {
      headers: {Authorization: `Bearer ${token}`}
    });
}