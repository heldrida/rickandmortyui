import React, { useEffect } from 'react'
import { Layout } from './Layout'
import { CharacterList } from './Components/CharacterList'
import { Sidebar } from './Components/Sidebar'
import { DisplayProvider } from './Context/Display'
import { Router } from './Components/Router'

const App = () => {
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