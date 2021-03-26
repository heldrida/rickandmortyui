import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios';
import { Info } from '../slices/characterSlice';

export interface Episode {
  id: number,
  name: string,
  air_date: string,
  episode: string,
}

interface InitialState {
  error: string | undefined,
  loading: boolean,
  info: Info | undefined,
  results: Episode[],
}

const initialState: InitialState = {
  error: undefined,
  loading: false,
  info: undefined,
  results: [],
}

// GET Episodes
export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async (endpoints: string[], { rejectWithValue }) => {
    try {
      const promises = endpoints.map(endpoint => axios.get(endpoint));

      const responses = await Promise.all(promises)
      const results = responses.map(response => response.data)
      return results as Episode[];
    } catch (error) {
      let errorMessage = "Internal Server Error";
      if (error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
)

export const episodeSlice = createSlice({
  name: 'episode',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchEpisodes.fulfilled, (state, action) => {
      state.results = action.payload
    })
  },
})

export default episodeSlice.reducer