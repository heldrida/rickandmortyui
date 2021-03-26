import React, { useEffect, useState } from 'react'
import { Layout } from './Layout'
import { CharacterList } from './Components/CharacterList'
import { Sidebar } from './Components/Sidebar'
import { DisplayProvider } from './Context/Display'
import { getRouteValue, Router, pushState } from './Components/Router'

const App = () => {
  useEffect(() => {
    let param = {}
    let title = 'root'
    let url = '/'

    const defaultPage = 1
    const page = getRouteValue({ name: 'page', fallbackValue: defaultPage });

    if (page != defaultPage) {
      title = `Page ${page}` 
      url = `/page/${page}`
    }

    pushState({
      state: {
        page,
      },
      title: `Page ${page}`,
      url: `/page/${page}`,
    })
  }, [])

  return (
    <DisplayProvider>
      <Router>
        <Layout
          sidebar={<Sidebar/>}
          content={<CharacterList/>}
        />
      </Router>
    </DisplayProvider>
  )
}

export default App