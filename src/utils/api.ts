import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import {
  RESOURCES_ENDPOINT as baseURL,
  CACHE_TTL,
} from './constants';

const cache = setupCache({
  maxAge: CACHE_TTL,
  exclude: {
    query: false,
  }
})

const axiosInstance = axios.create({
  adapter: cache.adapter,
  baseURL
})

export const getCharacters = (endpoint: string) => axiosInstance.get(endpoint)