import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_ENDPOINTS } from '../../utils/constants';
import { getCharacters } from '../../utils/api'
import { getKeys } from '../../utils/object'

export interface CharacterOrigin {
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

export interface InitialState {
  error: string | unknown | undefined,
  loading: boolean,
  info: Info | undefined,
  results: Character[],
  result: Character | undefined,
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

export interface Query extends Record<string, string | number | undefined> {
  gender?: Gender,
  name?: string,
  page: number,
  status?: Status,
}

interface FetchCharactersArgs {
  query: Query,
}

interface FetchCharacterArgs {
  characterId?: number,
}

const initialState: InitialState = {
  error: undefined,
  loading: false,
  info: undefined,
  results: [],
  result: undefined,
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

export const fetchCharacter = createAsyncThunk(
  'character/fetchCharacter',
  async ({ characterId }: FetchCharacterArgs, { rejectWithValue }) => {
    try {
      let endpoint = `${APP_ENDPOINTS.character}/${characterId}`
      const { data } = await getCharacters(endpoint)
      return data
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
        ...initialState,
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
    builder.addCase(fetchCharacter.fulfilled, (state, action) => {
      state.result = action.payload
    })
  },
})

export const generateCharacterQuery = (page: number, search: {}) => {
  const keys = getKeys((search))
  const state = keys
    .filter(key => search[key])
    .reduce((acc: Query, key) => {
      acc[key] = search[key]
      return acc
    }, { page } as Query)
  return state
}