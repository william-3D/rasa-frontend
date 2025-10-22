import aspida from '@aspida/axios';
import axios from 'axios';
import api from '../api/$api';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const apiClient = api(aspida(axiosInstance));