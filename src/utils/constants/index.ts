export interface AppEndpoints {
  character: string,
  episode: string,
}
export const RESOURCES_ENDPOINT = "https://rickandmortyapi.com/api"
export const APP_ENDPOINTS: AppEndpoints = {
  character: '/character',
  episode: '/episode'
}

export const CACHE_TTL = 24 * 60 * 1000