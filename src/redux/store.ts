import { configureStore } from '@reduxjs/toolkit'
import { characterSlice } from './slices/characterSlice'

export const store = configureStore({
  reducer: {
    character: characterSlice.reducer,
  },
  // Disables Redux dev-tools in production
  devTools: process.env.NODE_ENV !== "development" ? false : true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
