import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { CharacterList } from './Components/CharacterList'
import { Sidebar } from './Components/Sidebar'
import { DisplayProvider } from './Context/Display'
import { getRouteValue, getRouteSearchQuery, Router, pushState } from './Components/Router'
import { generateCharacterQuery, fetchCharacters, Query } from './redux/slices/characterSlice'
import { useAppDispatch } from './redux/hooks'
import { getKeys } from './utils/object'

const App = () => {
  const dispatch = useAppDispatch()
  const pageHandler = (urlParams: Record<string, string | {}>) => {
    const page = (urlParams.page as number)
    const { search } = urlParams
    let state = ({ page } as Query)
    state = generateCharacterQuery(page, search)
    console.log('App state', state)
    dispatch(fetchCharacters({
      query: state
    }))
  }
  // Designate the role for each route
  // as a friendly pathname + callback handler
  // the usecase is a basic relation between
  // base route and value `/key/value` e.g. `/page/1`
  const routes = {
    '/': pageHandler,
    '/page/:num': pageHandler
  }
  useEffect(() => {
    let param = {}
    let title = 'root'
    let url = '/'

    const defaultPage = 1
    const page = getRouteValue({ name: 'page', fallbackValue: defaultPage, callback: parseInt });

    // Parse page (as URI is string)
    if (page !== defaultPage) {
      title = `Page ${page}` 
      url = `/page/${page}`
    }

    pushState({
      state: {
        page,
      },
      title,
      url,
    })
  }, [])

  return (
    <DisplayProvider>
      <Router routes={routes}>
        <Layout
          sidebar={<Sidebar/>}
          content={<CharacterList/>}
        />
      </Router>
    </DisplayProvider>
  )
}

export default App