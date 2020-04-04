import axios from 'axios';

const api = axios.create({   
    baseURL: 'https://sauslash-devradar-backend.herokuapp.com'
});

export default api;