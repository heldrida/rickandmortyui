export interface AppEndpoints {
  character: string,
  episode: string,
}
export const RESOURCES_ENDPOINT = "https://rickandmortyapi.com/api"
export const APP_ENDPOINTS: AppEndpoints = {
  character: '/character',
  episode: '/episode'
}