import axios from 'axios';

const api = axios.create({
  baseURL: 'https://betheherobkend.herokuapp.com',
});

export default api;