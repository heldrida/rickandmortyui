import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
  // Disables Redux dev-tools in production
  devTools: process.env.NODE_ENV !== "development" ? false : true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
