import axios from 'axios'
import {
  RESOURCES_ENDPOINT as baseURL,
} from './constants';

const axiosInstance = axios.create({
  baseURL
})

export const getCharacters = (endpoint: string) => axiosInstance.get(endpoint)