import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_ENDPOINTS } from '../../utils/constants';
import { getCharacters } from '../../utils/api'

interface CharacterOrigin {
  name: string,
  url: string,
}

export interface Character extends Record<string, number | string | string[] | CharacterOrigin> {
  id: number,
  name: string,
  status: string,
  species: string,
  gender: string,
  origin: CharacterOrigin,
  created: string,
  image: string,
  episode: string[],
}

export interface Info {
  count: number,
  next: string,
  pages: number
  prev: number
}

interface InitialState {
  error: string | unknown | undefined,
  loading: boolean,
  info: Info | undefined,
  results: Character[],
}

export enum Gender {
  Female = "female",
  Genderless = "genderless",
  Male = "male",
  Unknown = "uknown",
}

export enum Status {
  Alive = "alive",
  Dead = "dead",
  Unknown = "unknown",
}

export interface Query extends Record<string, any> {
  gender?: Gender
  name?: string,
  page: number,
  status?: Status,
}

interface FetchCharactersArgs {
  query: Query,
}

const initialState: InitialState = {
  error: undefined,
  loading: false,
  info: undefined,
  results: [],
}

// GET Characters
export const fetchCharacters = createAsyncThunk(
  'character/fetchCharacters',
  async ({ query }: FetchCharactersArgs, { rejectWithValue }) => {
    try {
      let endpoint = `${APP_ENDPOINTS.character}`
      const queryParams = Object.keys(query).map(property => `${property}=${query[property]}`)
      endpoint += `?${queryParams.join('&')}`
      const response = await getCharacters(endpoint)
      return response.data as InitialState;
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.error
      }
      return rejectWithValue(errorMessage);
    }
  }
)

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCharacters.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      const { info, results } = action.payload
      return {
        ...state,
        loading: false,
        error: undefined,
        info,
        results,
      }
    })
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      return {
        ...initialState,
        error: action.payload,
      }
    })
  },
})